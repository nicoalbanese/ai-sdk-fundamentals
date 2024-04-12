"use server";

import { experimental_generateObject as generateObject } from "ai";
import { openai } from "ai/openai";
import { z } from "zod";

export const generateObjectAction = async () => {
  const { object: joke } = await generateObject({
    model: openai.chat("gpt-3.5-turbo"),
    temperature: 0.5,
    prompt: "Tell me a joke.",
    schema: z.object({
      joke: z.object({
        setup: z.string().describe("the setup for the joke"),
        punchline: z.string().describe("the punchline for the joke"),
      }),
    }),
  });
  return joke;
};
