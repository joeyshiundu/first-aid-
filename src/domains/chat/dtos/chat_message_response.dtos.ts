export interface ChatMessageResponseDTO {
  messageId: number;
  senderId: number;
  recipientId: number;
  message: string;
  timestamp: Date;
  read: boolean;
}
