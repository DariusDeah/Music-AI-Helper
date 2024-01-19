import OpenAI from "openai";
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions";

export interface AIClientProps {
  apiKey?: string;
  model: ChatCompletionCreateParamsBase["model"];
  defaultTemperature: number;
  org?: string;
  provider: OpenAI;
}

export interface RequestObject {
  req: any;
  method: StateRequestMethod;
}

export enum StateRequestMethod {
  chat = "chat",
}
