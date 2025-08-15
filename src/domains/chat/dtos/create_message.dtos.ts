// CreateChatMessageDTO.ts
export interface CreateChatMessageDTO {
  senderId: number;     
  recipientId: number;       
  message: string;             
  timestamp?: Date;           
}
