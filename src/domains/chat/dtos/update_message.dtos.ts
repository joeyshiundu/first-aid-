export interface UpdateChatMessageDTO {
  messageId: number;          // ID of the message to update
  content: string;            // Updated message content
  timestamp?: Date;          // Optional timestamp (auto-generated if not provided)
}
