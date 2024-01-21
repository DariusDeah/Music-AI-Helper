import { Request, Response } from "express";
import { ChatCompletion } from "openai/resources";
import { AIClient } from "../../libs/ai-client/ai-client.libs";
import { DEFAULT_TEMPERATURE } from "../constants/ai.constants";
import { AIFilterRequest } from "../dtos/ai-filter-request.dto";
import { AIMapper } from "../mappers/ai.mapper";
import { AIError } from "../utils/errors.utils";
import { ApiResponseFormatter } from "../utils/api-response-formatter.utils";
import OpenAI from "openai";
import { ChatRepository } from "../repository/chat.repository";
import { pool } from "../../server";
import { ChatMapper } from "../mappers/chat.mapper";
import { v4 as uuid } from "uuid";

export async function handleFilterPrompt(req: Request, res: Response) {
  const filterRequest = new AIFilterRequest(req.body);

  try {
    const requestPrompt = filterRequest.toPrompt();
    const aiClient = new AIClient({
      defaultTemperature: DEFAULT_TEMPERATURE,
      model: "gpt-3.5-turbo",
      provider: new OpenAI({
        apiKey: process.env.API_KEY,
        organization: process.env.ORGANIZATION,
      }),
    });

    const resp = await aiClient
      .createChatCompletion([{ role: "user", content: requestPrompt }])
      .execute<ChatCompletion>();

    if (!resp) {
      throw new AIError();
    }

    const formattedResp = AIMapper.toChatMessageResponse(resp);

    //this process would normal be done using a transaction but for simplicity we will insert both separately
    const chatRepository = new ChatRepository(pool, new ChatMapper());
    chatRepository.insert({
      id: uuid(),
      role: "user",
      message: requestPrompt,
      recipient: "AI",
      sender: req.user.id,
    });

    chatRepository.insert({
      id: uuid(),
      role: "ai",
      message: formattedResp,
      recipient: req.user.id,
      sender: "AI",
    });

    ApiResponseFormatter.success(res, formattedResp);
  } catch (error) {
    console.log(error);
    ApiResponseFormatter.error(res, error as Error);
  }
}

export async function handleDirectPrompt(req: Request, res: Response) {
  try {
    const aiClient = new AIClient({
      defaultTemperature: DEFAULT_TEMPERATURE,
      model: "gpt-3.5-turbo",
      provider: new OpenAI({
        apiKey: process.env.API_KEY,
        organization: process.env.ORGANIZATION,
      }),
    });
    const prompt = req.body.prompt;

    const resp = await aiClient
      .createChatCompletion([{ role: "user", content: prompt }])
      .execute<ChatCompletion>();

    if (!resp) {
      throw new AIError();
    }

    const formattedResp = AIMapper.toChatMessageResponse(resp);

    //this process would normal be done using a transaction but for simplicity we will insert both separately
    const chatRepository = new ChatRepository(pool, new ChatMapper());

    chatRepository.insert({
      id: uuid(),
      role: "user",
      message: prompt,
      recipient: "AI",
      sender: req.user.id,
    });

    chatRepository.insert({
      id: uuid(),
      role: "ai",
      message: formattedResp,
      recipient: req.user.id,
      sender: "AI",
    });

    ApiResponseFormatter.success(res, formattedResp);
  } catch (error) {
    console.log(error);
    ApiResponseFormatter.error(res, error as Error);
  }
}
