import { NextResponse } from "next/server";
import { openAIRequest } from '@/server/services/openai';

export async function POST(req: Request) {
  try {
    const { model, systemPrompt, prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const output = await openAIRequest(model, systemPrompt, prompt);
    console.log(output);
    return NextResponse.json({ output });  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
