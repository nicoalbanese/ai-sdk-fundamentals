"use server";

import { experimental_streamText as streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { createStreamableValue } from "ai/rsc";

export const streamTextAction = async () => {
  const stream = createStreamableValue();

  (async () => {
    const { textStream } = await streamText({
      model: openai.chat("gpt-3.5-turbo"),
      temperature: 0.5,
      prompt: "Tell me a joke.",
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return stream.value;
};
