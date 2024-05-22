import dotenv from "dotenv";

dotenv.config();

async function main() {
  console.log(process.env.OPENAI_API_KEY);
}

main().catch(console.error);
