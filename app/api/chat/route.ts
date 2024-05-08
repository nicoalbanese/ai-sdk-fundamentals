import { StreamingTextResponse, experimental_streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(request: Request) {
  const { messages } = await request.json();
  const stream = await experimental_streamText({
    model: openai.chat("gpt-3.5-turbo"),
    system: "You are a helpful assistant.",
    messages,
  });
  return new StreamingTextResponse(stream.toAIStream());
}
