"use server";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export const generateTextAction = async () => {
  const result = await generateText({
    model: openai("gpt-3.5-turbo"),
    temperature: 1,
    prompt: "Tell me a joke.",
  });
  return result.text;
};
