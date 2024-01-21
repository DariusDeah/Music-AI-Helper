import { Request, Response } from "express";
import { pool } from "../../server";
import { ChatMapper } from "../mappers/chat.mapper";
import { ChatRepository } from "../repository/chat.repository";
import { ApiResponseFormatter } from "../utils/api-response-formatter.utils";

export async function getUserChats(req: Request, res: Response) {
  try {
    const chats = await new ChatRepository(
      pool,
      new ChatMapper()
    ).findByAllQuery({
      recipient: req.user.id,
    });
    ApiResponseFormatter.success(res, chats);
  } catch (error) {
    ApiResponseFormatter.error(res, error as Error);
  }
}
