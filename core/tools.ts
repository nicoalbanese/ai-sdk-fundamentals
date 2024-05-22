import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const location = "London";
  const result = await generateText({
    model: openai("gpt-4o"),
    prompt: `You are a funny chatbot. users location: ${location}`,
  });
}

main().catch(console.error);
