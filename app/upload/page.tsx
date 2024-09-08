// src/app/upload/page.tsx
"use client";

import { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import ResponsiveAppBar from "@/components/navbar";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [transcript, setTranscript] = useState<string>("");
  const [submitLoading, setSubmitLoading] = useState(false); // File submission

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    // Loading state for uploading file
    setSubmitLoading(true);

    const response = await fetch("/api/transcribe", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setTranscript(data.transcript || "Error processing the file.");
    setSubmitLoading(false);
  };

  return (
    <Box>
      {/* Header and navigation */}
      <ResponsiveAppBar userPresent={true} />

      <Box
        sx={{
          p: 2,
          mt: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" sx={{ m: 2 }}>
          Upload Lecture Audio/Video
        </Typography>
        <input type="file" onChange={handleFileChange} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={!file || submitLoading}
          sx={{ m: 3 }}
        >
          Upload and Transcribe
        </Button>

        {submitLoading && <CircularProgress sx={{ mt: 2 }} />}

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
    </Box>
  );
}
