import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function openAIRequest(
  model: string,
  systemPrompt: string,
  prompt: string,
) {

  const completion = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ],
  });
  return completion.choices[0].message.content;
}
