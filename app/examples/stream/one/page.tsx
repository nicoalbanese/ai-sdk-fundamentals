"use client";

import { Button } from "@/components/ui/button";
import { exampleFunction } from "./action";
import { useState } from "react";
import { readStreamableValue } from "ai/rsc";

export default function Page() {
  const [generation, setGeneration] = useState<number>();
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Stream Text Example</h1>
      <Button
        onClick={async () => {
          const result = await exampleFunction();
          for await (const delta of readStreamableValue(result)) {
            setGeneration(delta);
            console.log(delta);
          }
        }}
      >
        Trigger Action
      </Button>
      <pre>{JSON.stringify(generation, null, 2)}</pre>
    </div>
  );
}
