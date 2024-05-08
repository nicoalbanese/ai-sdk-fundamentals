"use server";

import { DeepPartial, experimental_streamObject as streamObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { createStreamableValue } from "ai/rsc";
import { z } from "zod";

const jokeSchema = z.object({
  setup: z.string().describe("the setup of the joke"),
  punchline: z.string().describe("the punchline of the joke"),
});

export type Joke = DeepPartial<typeof jokeSchema>;

export const streamObjectAction = async () => {
  const stream = createStreamableValue<Joke>();

  (async () => {
    const result = await streamObject({
      model: openai.chat("gpt-3.5-turbo"),
      temperature: 0.5,
      prompt: "Tell me a joke.",
      schema: jokeSchema,
    });

    for await (const partialObject of result.partialObjectStream) {
      stream.update(partialObject);
    }

    stream.done();
  })();

  return stream.value;
};
