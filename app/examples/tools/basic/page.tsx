"use client";

import { useState } from "react";
import { Message, continueConversation } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <h1 className="text-xl font-semibold">Tools Example</h1>
      <p className="mb-8">
        Ask for the temperature in San Francisco. Then ask for it to be
        converted to Fahrenheit
      </p>
      <div>
        {conversation.map((message, index) => (
          <div key={index} className="border-b py-2 my-2">
            {message.role}: {message.content}
          </div>
        ))}
      </div>

      <form
        className="flex max-w-2xl"
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          const { messages } = await continueConversation([
            ...conversation,
            { role: "user", content: input },
          ]);

          setConversation(messages);
          setLoading(false);
          setInput("");
        }}
      >
        <Input
          type="text"
          value={input}
          disabled={loading}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
        <Button disabled={loading}>
          {loading ? "thinking..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
}
