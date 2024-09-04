// src/app/api/query/route.ts
import { NextResponse } from 'next/server';
import { Configuration, OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}));

export async function POST(req: Request) {
  try {
    const { transcript, question } = await req.json();

    const response = await openai.createCompletion({
      model: "text-davinci-003", // Use a suitable OpenAI model for questions and answers
      prompt: `You are a helpful assistant. Based on the following lecture transcription, answer the question coherently:\n\n${transcript}\n\nQuestion: ${question}\nAnswer:`,
      max_tokens: 150,
      temperature: 0.5,
    });

    return NextResponse.json({ answer: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error('Error querying transcript:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
