import { Pool } from "pg";
import { ChatQueryFields } from "../../interfaces/chat/chat.interface";
import { RepositoryBase } from "../../interfaces/repository-base.interface";
import { ChatMapper } from "../mappers/chat.mapper";
import { Chat, ChatProp } from "../models/chat.model";

export class ChatRepository
  implements RepositoryBase<Chat, ChatProp, ChatQueryFields>
{
  constructor(
    private readonly pool: Pool,
    private readonly mapper: ChatMapper
  ) {}

  async insert(chat: ChatProp): Promise<Chat> {
    const query = `
    INSERT INTO chats (id,sender,recipient, role, message) 
    VALUES ($1,$2,$3,$4,$5)
    RETURNING id,sender,recipient, role, message
    `;

    const client = await this.pool.connect();
    console.log({ chat });
    const createdChat = await client.query<Chat>(query, [
      chat.id,
      chat.sender,
      chat.recipient,
      chat.role,
      chat.message,
    ]);

    if (!createdChat) {
      throw new Error("can't create Chat");
    }

    client.release();

    return this.mapper.toDomain(createdChat.rows[0]);
  }

  async findAll(): Promise<Chat[]> {
    const client = await this.pool.connect();
    const Chats = await client.query(
      "SELECT * FROM chats ORDER BY timestamp ASC"
    );

    if (!Chats.rows.length) {
      throw new Error("Chat not found!");
    }

    return Chats.rows.map((Chat) => this.mapper.toDomain(Chat));
  }

  async findOneByQuery(queryFields: Partial<ChatQueryFields>): Promise<Chat> {
    let query = "SELECT * FROM chats WHERE ";

    Object.keys(queryFields).forEach((queryField: string) => {
      query += `${queryField} = '${
        queryFields[queryField as keyof ChatQueryFields]
      }'`;
    });

    query += `ORDER BY timestamp ASC`;

    const client = await this.pool.connect();
    const chat = await client.query(query);

    if (!chat.rows.length) {
      throw new Error("Chat not found!");
    }

    client.release();
    return this.mapper.toDomain(chat.rows[0]);
  }

  async findByAllQuery(queryFields: Partial<ChatQueryFields>): Promise<Chat[]> {
    const client = await this.pool.connect();

    const chats = await client.query<Chat>(
      `SELECT * FROM chats WHERE sender = $1 OR recipient = $1 ORDER BY pos ASC`,
      [queryFields.recipient]
    );

    if (!chats.rows.length) {
      throw new Error("Chat not found!");
    }

    return chats.rows.map((chat) => this.mapper.toDomain(chat));
  }

  delete(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
