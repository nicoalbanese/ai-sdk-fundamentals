"use client";

import { Button } from "@/components/ui/button";
import { Joke, streamTextAction } from "./action";
import { useState } from "react";
import { readStreamableValue } from "ai/rsc";

export default function Page() {
  const [generation, setGeneration] = useState<Joke>();
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Stream Object Example</h1>
      <Button
        onClick={async () => {
          const result = await streamTextAction();
          for await (const delta of readStreamableValue(result))
            setGeneration(delta);
        }}
      >
        Trigger Action
      </Button>
      <pre>{JSON.stringify(generation, null, 2)}</pre>
    </div>
  );
}
