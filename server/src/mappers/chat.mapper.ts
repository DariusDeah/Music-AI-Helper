import { QueryResult } from "pg";
import { ChatApiResponse } from "../../interfaces/chat/chat.interface";
import { Chat, ChatProp } from "../models/chat.model";

export class ChatMapper {
  toApiResponse(chat: Chat): ChatApiResponse;

  toApiResponse(chat: ChatProp): ChatApiResponse;

  toApiResponse(chat: any): any {
    return {
      id: chat.id || chat.getId(),
      sender: chat.sender || chat.getSender(),
      recipient: chat.recipient || chat.getRecipient(),
      role: chat.role || chat.getRole(),
      message: chat.message || chat.getMessage(),
      interactionId: chat.interactionId || chat.getInteractionId(),
    };
  }

  toDomain(chat: Partial<Chat>): Chat;

  toDomain(chat: QueryResult<Chat>): Chat;
  toDomain(chat: ChatProp): Chat;

  toDomain(chat: any): any {
    console.log({ chat });
    return new Chat({
      id: chat.id || chat.getId(),
      sender: chat.sender || chat.getSender(),
      recipient: chat.recipient || chat.getRecipient(),
      role: chat.role || chat.getRole(),
      message: chat.message || chat.getMessage(),
      // interactionId: chat.interactionid || chat.getInteractionId(),
    });
  }
}
