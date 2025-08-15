export interface MessageEntity {
  message_id: number;   // Unique identifier for the message
  session_id: number;   // Identifier for the chat session this message belongs to
  user_id: number;      // Identifier for the user who sent the message
  content: string;      // The content of the message
  timestamp: Date;      // The time when the message was sent
}