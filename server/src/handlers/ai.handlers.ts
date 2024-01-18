import { Request, Response } from "express";
import { ChatCompletion } from "openai/resources";
import { AIClient } from "../../libs/ai-client/ai-client.libs";
import { DEFAULT_TEMPERATURE } from "../constants/ai.constants";
import { AIFilterRequest } from "../dtos/ai-filter-request.dto";
import { AIMapper } from "../mappers/ai.mapper";
import { AIError } from "../utils/errors.utils";
import { ApiResponseFormatter } from "../utils/api-response-formatter.utils";

export async function handleFilterPrompt(req: Request, res: Response) {
  const reqBody = new AIFilterRequest(req.body);

  try {
    const aiClient = new AIClient({
      defaultTemperature: DEFAULT_TEMPERATURE,
      model: "gpt-3.5-turbo",
    });

    const resp = await aiClient
      .createChatCompletion([{ role: "user", content: reqBody.toPrompt() }])
      .execute<ChatCompletion>();

    if (!resp) {
      throw new AIError();
    }

    ApiResponseFormatter.success(res, AIMapper.toChatMessageResponse(resp));
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
    });

    const resp = await aiClient
      .createChatCompletion([{ role: "user", content: req.body.prompt }])
      .execute<ChatCompletion>();

    if (!resp) {
      throw new AIError();
    }

    ApiResponseFormatter.success(res, AIMapper.toChatMessageResponse(resp));
  } catch (error) {
    console.log(error);
    ApiResponseFormatter.error(res, error as Error);
  }
}
