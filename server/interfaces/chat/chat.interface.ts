export interface ChatApiResponse {
  id: string;
  sender: string;
  recipient: string;
  role: string;
  message: string;
}

export interface ChatQueryFields {
  sender: string;
  recipient: string;
  interactionId: string;
}

export interface ChatHistoryRequest {
  userId: string;
}
