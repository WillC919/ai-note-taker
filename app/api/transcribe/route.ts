// src/app/api/transcribe/route.ts
import { NextResponse } from 'next/server';
import OpenAI from "openai";
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure to set your OpenAI API key in your environment variables
});

export async function POST(req: Request) {
  try {
    // Assuming the file comes as a FormData
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 });
    }

    // Save the file temporarily
    const filePath = path.join(process.cwd(), 'public', 'uploads', file.name);
    fs.writeFileSync(filePath, Buffer.from(await file.arrayBuffer()));

    // Convert to a suitable format if necessary using FFmpeg
    // (e.g., convert to .wav or other formats suitable for transcription)
    // Note: You need to configure ffmpeg path if necessary on your environment.
    // ffmpeg().input(filePath).output(newFilePath).run();

    // Transcribe using OpenAI Whisper model (or similar)
    const transcript = await openai.audio.transcriptions.create({
      model: "whisper-1", // Example model, use appropriate OpenAI transcription model
      file: fs.createReadStream(filePath),
    });

    // Remove the temporary file
    fs.unlinkSync(filePath);

    return NextResponse.json({ transcript: transcript.text });
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
