import { prismaClient } from "@/utils/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const userId = Number(req.headers.get("x-gemini-userId"));
  const chats = await prismaClient.chat.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ chats });
};

export const POST = async (req: NextRequest) => {
  const userId = Number(req.headers.get("x-gemini-userId"));
  const { content } = await req.json();
  const chat = await prismaClient.chat.create({
    data: { title: content, userId },
  });

  return NextResponse.json({ chat }, { status: 201 });
};
