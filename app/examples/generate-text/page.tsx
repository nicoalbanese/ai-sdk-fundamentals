"use client";

import { Button } from "@/components/ui/button";
import { generateTextAction } from "./action";
import { useState } from "react";

export default function Page() {
  const [generation, setGeneration] = useState("");
  return (
    <div>
      <h1 className="text-xl font-semibold">Generate Text Example</h1>
      <Button
        onClick={async () => {
          const result = await generateTextAction();
          setGeneration(result);
        }}
      >
        Trigger Action
      </Button>
      <pre>{JSON.stringify(generation, null, 2)}</pre>
    </div>
  );
}
