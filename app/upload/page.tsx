// src/app/upload/page.tsx
'use client';

import { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [transcript, setTranscript] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/transcribe', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    setTranscript(data.transcript || 'Error processing the file.');
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">Upload Lecture Audio/Video</Typography>
      <input type="file" onChange={handleFileChange} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!file}
      >
        Upload and Transcribe
      </Button>
      {transcript && (
        <Box mt={2}>
          <Typography variant="h6">Transcript:</Typography>
          <TextField
            fullWidth
            multiline
            rows={10}
            value={transcript}
            variant="outlined"
          />
        </Box>
      )}
    </Box>
  );
}
