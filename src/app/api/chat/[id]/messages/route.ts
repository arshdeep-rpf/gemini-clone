import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { prismaClient } from "../../../../../utils/prismaClient";

export const GET = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  const chatId = parseInt(id);

  if (isNaN(chatId)) {
    return NextResponse.json(
      { success: false, message: "Invalid ChatId, should be a number" },
      { status: 400 }
    );
  }

  const messages = await prismaClient.message.findMany({
    where: { chatId },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({ messages });
};

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function getChatCompletion(text: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: text },
    ],
    model: "gpt-4o-mini",
  });

  return completion.choices[0];
}

export const POST = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  const chatId = parseInt(id);

  if (isNaN(chatId)) {
    return NextResponse.json(
      { success: false, message: "Invalid ChatId, should be a number" },
      { status: 400 }
    );
  }

  try {
    const { content } = await req.json();

    const start = performance.now();
    const { message: systemResponse } = await getChatCompletion(content);
    const llmResponseTime = Math.round((performance.now() - start) / 1000);

    const messages = await prismaClient.$transaction([
      prismaClient.message.create({ data: { content, role: "user", chatId } }),
      prismaClient.message.create({
        data: { content: systemResponse.content!, role: "system", chatId },
      }),
    ]);

    return NextResponse.json({ messages, llmResponseTime }, { status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ success: false }, { status: 500 });
  }
};
