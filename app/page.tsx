import Link from "next/link";

export default function Page() {
  return (
    <main className="px-8">
      <h1 className="text-xl font-semibold">AI SDK Core</h1>
      <ul>
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
          <Link href="/examples/generate-ui">Generate UI</Link>
        </li>
        <li>
          <Link href="/examples/tools/basic">Basic Tool</Link>
        </li>
      </ul>
    </main>
  );
}
