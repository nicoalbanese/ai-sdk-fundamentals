"use server";
import { createStreamableValue } from "ai/rsc";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const exampleFunction = async () => {
  const stream = createStreamableValue(1);
  (async () => {
    await delay(500);
    stream.update(3);
    await delay(500);
    stream.update(4);
    await delay(500);
    stream.update(5);
    await delay(500);
    stream.done(6);
  })();
  return stream.value;
};
