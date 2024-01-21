import { z } from "zod";

export interface ChatProp {
  id: string;
  sender: string;
  recipient: string;
  role: "user" | "ai";
  message: string;
  // interactionId: string;
}

export class Chat {
  private readonly id: string;
  private readonly sender: string;
  private readonly recipient: string;
  private readonly role: string;
  private readonly message: string;
  // private readonly interactionId: string;

  constructor(data: ChatProp) {
    this.validate(data);
    this.id = data.id;
    this.message = data.message;
    this.recipient = data.recipient;
    this.sender = data.sender;
    this.role = data.role;
    // this.interactionId = data.interactionId;
  }

  getId() {
    return this.id;
  }

  getMessage() {
    return this.message;
  }

  getRecipient() {
    return this.recipient;
  }

  getSender() {
    return this.sender;
  }

  getRole() {
    return this.role;
  }

  getInteractionId() {
    // return this.interactionId;
  }

  getProperties() {
    return {
      id: this.id,
      message: this.message,
      recipient: this.recipient,
      sender: this.sender,
      role: this.role,
      // interactionId: this.interactionId,
    };
  }

  private validate(data: any) {
    const chat = z.object({
      id: z.string().uuid(),
      message: z.string(),
      recipient: z.string(),
      sender: z.string(),
      role: z.enum(["user", "ai"]),
      // interactionId: z.string().uuid(),
    });

    return chat.parse(data);
  }
}
