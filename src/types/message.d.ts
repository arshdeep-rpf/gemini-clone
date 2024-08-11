export interface IMessage {
  id: number;
  content: string;
  chatId: number;
  role: "user" | "system";
  createdAt: Date;
}
