import { ChatCompletion } from "openai/resources";

export class AIMapper {
  static toChatMessageResponse(data: ChatCompletion) {
    return data.choices[0].message.content!;
  }
}
