"use server";

import { experimental_generateText as generateText } from "ai";
import { openai } from "ai/openai";

export const generateTextAction = async () => {
  const { text } = await generateText({
    model: openai.chat("gpt-3.5-turbo"),
    temperature: 0.5,
    prompt: "Tell me a joke.",
  });
  return text;
};
