import OpenAI from "openai";
import {
  AIClientProps,
  RequestObject,
  StateRequestMethod,
} from "./ai-client.types";

export class AIClient {
  private readonly defaultTemperature: AIClientProps["defaultTemperature"];
  private readonly model: AIClientProps["model"];
  private readonly client: OpenAI;
  private stateRequest: RequestObject | undefined;

  constructor(clientProps: AIClientProps) {
    this.defaultTemperature = clientProps.defaultTemperature;
    this.model = clientProps.model;
    this.client = new OpenAI({
      apiKey: clientProps.apiKey || process.env.API_KEY,
      organization: clientProps.org || process.env.ORGANIZATION,
    });
  }

  stream() {
    this.stateRequest!.req["stream"] = true;
    return this;
  }

  createChatCompletion(
    messages: {
      role: string;
      content: string;
    }[]
  ) {
    const req = {
      model: this.model,
      messages,
      temperature: this.defaultTemperature,
    };

    this.stateRequest!.req = req;
    this.stateRequest!.method = StateRequestMethod.chat;
    return this;
  }

  async execute<T>() {
    try {
      let res;
      switch (this.stateRequest!.method) {
        case StateRequestMethod.chat:
          res = await this.client.chat.completions.create({
            ...this.stateRequest!.req,
          });
      }
      return res as T;
    } catch (error) {
      console.error(error);
    }
  }
}
