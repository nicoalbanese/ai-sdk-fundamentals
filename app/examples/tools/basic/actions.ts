"use server";

import { experimental_generateText as generateText } from "ai";
import { openai } from "ai/openai";
import { z } from "zod";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function continueConversation(history: Message[]) {
  "use server";

  const { text, toolResults } = await generateText({
    model: openai.chat("gpt-3.5-turbo"),
    system: "You are a friendly assistant!",
    messages: history,
    tools: {
      celsiusToFahrenheit: {
        description: "Converts celsius to fahrenheit",
        parameters: z.object({
          value: z.string().describe("The value in celsius"),
        }),
        execute: async ({ value }) => {
          const celsius = parseFloat(value);
          const fahrenheit = celsius * (9 / 5) + 32;
          return `${celsius}°C is ${fahrenheit.toFixed(2)}°F`;
        },
      },
      weather: {
        description:
          "Return the weather (in celsius) in a location. Use the celsius to fahrenheit tool if the user asks for the value in fahrenheit",
        parameters: z.object({
          location: z.string().describe("the location for the desired weather"),
        }),
        execute: async ({ location }: { location: string }) => {
          const temperature = Math.floor(Math.random() * (30 - 0 + 1)) + 0;
          let feeling = "";
          if (temperature < 5) feeling = "Brrrr...🥶";
          if (temperature > 5 && temperature < 15)
            feeling = "Chilly...bring a coat 🥼";
          if (temperature > 15 && temperature < 25)
            feeling = "It's nice out, maybe bring a sweater though 😊";
          if (temperature > 25) feeling = "Find a pool 🥵";
          return `It's ${temperature}c in ${location}. ${feeling}`;
        },
      },
    },
  });

  return {
    messages: [
      ...history,
      {
        role: "assistant" as const,
        content:
          text || toolResults.map((toolResult) => toolResult.result).join("\n"),
      },
    ],
  };
}
