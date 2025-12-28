import OpenAI from 'openai';

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function runOpenAIRequest(
  model: string,
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
  responseFormat: { type: 'json_object' | 'text' } = { type: 'json_object' },
  temperature?: number
) {
  const response = await openai.chat.completions.create({
    model,
    messages,
    response_format: responseFormat,
    temperature: temperature || undefined,
  });

  const content = response.choices[0].message.content;

  if (responseFormat.type === 'json_object' && content) {
    return JSON.parse(content);
  }

  return content;
}
