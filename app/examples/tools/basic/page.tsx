"use client";

import { useState } from "react";
import { Message, continueConversation } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  return (
    <div>
      <div>
        {conversation.map((message, index) => (
          <div key={index} className="border-b py-2 my-2">
            {message.role}: {message.content}
          </div>
        ))}
      </div>

      <div>
        <Input
          type="text"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
        <Button
          onClick={async () => {
            const { messages } = await continueConversation([
              ...conversation,
              { role: "user", content: input },
            ]);

            setConversation(messages);
          }}
        >
          Send Message
        </Button>
      </div>
    </div>
  );
}
