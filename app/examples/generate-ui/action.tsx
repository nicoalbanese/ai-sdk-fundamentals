"use server";

import { streamObject } from "ai";
import { openai } from "@ai-sdk/openai";
import {
  StreamableValue,
  createAI,
  createStreamableUI,
  createStreamableValue,
} from "ai/rsc";
import { JokeComponent } from "./joke-component";
import { jokeSchema } from "./joke";

export async function streamUIAction() {
  "use server";

  const uiStream = createStreamableUI(
    <div className="animate-pulse bg-neutral-100 max-w-prose p-4 m-4 rounded-lg">
      thinking...
    </div>
  );
  const isGenerating = createStreamableValue(true);

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: openai("gpt-3.5-turbo"),
      temperature: 0.7,
      prompt: "Tell me a joke. Be creative. Make it next.js themed.",
      schema: jokeSchema,
    });

    for await (const partialObject of partialObjectStream) {
      uiStream.update(<JokeComponent joke={partialObject} />);
    }

    uiStream.done();
    isGenerating.done(false);
  })();

  return { isGenerating: isGenerating.value, jokeComponent: uiStream.value };
}

const initialAIState: {
  setup: string;
  punchline: string;
} = {
  setup: "",
  punchline: "",
};

const initialUIState: {
  isGenerating: StreamableValue<boolean>;
  jokeComponent: React.ReactNode;
} = {
  isGenerating: true,
  jokeComponent: null,
};

export const GenerateJokeAI = createAI({
  actions: {
    streamUIAction,
  },
  initialUIState,
  initialAIState,
});
