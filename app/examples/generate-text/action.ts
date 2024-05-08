"use server";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export const generateTextAction = async () => {
  const { text } = await generateText({
    model: openai("gpt-3.5-turbo"),
    temperature: 0.5,
    prompt: "Tell me a joke.",
  });
  return text;
};
