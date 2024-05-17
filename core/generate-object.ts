import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

async function main() {
  const result = await generateObject({
    model: openai("gpt-4o"),
    prompt: "Tell me a joke. Please incorporate the current temperature in NYC",
    schema: z.object({
      setup: z.string().describe("the setup of the joke"),
      punchline: z.string().describe("the punchline of the joke"),
    }),
  });

  console.log(result.object);
}

main().catch(console.error);
