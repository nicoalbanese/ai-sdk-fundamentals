"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { GenerateJokeAI, streamUIAction } from "./action";
import { readStreamableValue, useUIState } from "ai/rsc";

export default function Page() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useUIState<typeof GenerateJokeAI>();

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Generate UI</h1>
      <Button
        onClick={async () => {
          const result = await streamUIAction();

          setResult(result);

          const isGeneratingStream = readStreamableValue(result.isGenerating);
          for await (const value of isGeneratingStream) {
            if (value != null) {
              setIsGenerating(value);
            }
          }
        }}
      >
        Trigger Action
      </Button>
      {isGenerating ? <div>loading...</div> : result.jokeComponent}
    </div>
  );
}
