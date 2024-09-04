// src/app/api/query/route.ts
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { transcript, question } = await req.json();
    
    const response = await openai.chat.completions.create({
      model: "text-davinci-003",
      messages: [
        {"role": "system", "content": "You are a helpful assistant. You answer questions with coherently explanations based lecture transcription: " + transcript},
        {"role": "user", "content": question }
      ],
      stream: true,
    })

    // Create a ReadableStream to handle the streaming response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder(); // Create a TextEncoder to convert strings to Uint8Array
        try {
          // Iterate over the streamed chunks of the response
          for await (const chunk of response) {
            const content = chunk.choices[0]?.delta?.content; // Extract the content from the chunk
            if (content) {
              const text = encoder.encode(content); // Encode the content to Uint8Array
              controller.enqueue(text); // Enqueue the encoded text to the stream
            }
          }

        } catch (err) {
          controller.error(err); // Handle any errors that occur during streaming
        } finally {
          controller.close(); // Close the stream when done
        }
      },
    });

    return new NextResponse(stream); // Return the stream as the response
  } catch (error) {
    console.error('Error querying transcript:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
