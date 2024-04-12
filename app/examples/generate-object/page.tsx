"use client";

import { Button } from "@/components/ui/button";
import { generateObjectAction } from "./action";
import { useState } from "react";

export default function Page() {
  const [generation, setGeneration] = useState<{
    setup: string;
    punchline: string;
  }>();
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Generate Object Example</h1>
      <Button
        onClick={async () => {
          const { joke } = await generateObjectAction();
          setGeneration(joke);
        }}
      >
        Action
      </Button>
      <pre>{JSON.stringify(generation, null, 2)}</pre>
    </div>
  );
}
