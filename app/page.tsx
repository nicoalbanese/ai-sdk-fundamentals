import { Link } from "@/components/link";

export default function Page() {
  return (
    <main className="space-y-4">
      <h1 className="text-xl font-semibold">AI SDK Core Fundamentals</h1>
      <p>
        The following examples aim to showcase the fundamentals behind the new
        Vercel AI SDK Core. The examples are very simple, with minimal loading
        states to remain as simple as possible.
      </p>
      <p>
        The prompt for the first 4 examples (stream/generate text/object) is
        `Tell me a joke`.
      </p>
      <ul className="list-disc list-inside">
        <li>
          <Link href="/examples/generate-text">Generate Text</Link>
        </li>
        <li>
          <Link href="/examples/generate-object">Generate Object</Link>
        </li>
        <li>
          <Link href="/examples/stream-text">Stream Text</Link>
        </li>
        <li>
          <Link href="/examples/stream-object">Stream Object</Link>
        </li>
        <li>
          <Link href="/examples/tools/basic">Basic Tool</Link>
        </li>
        <li>
          <Link href="/examples/basic-chatbot">Chatbot with `useChat`</Link>
        </li>
        <li>
          <Link href="/examples/generate-ui">Generate UI</Link>
        </li>
      </ul>
    </main>
  );
}
