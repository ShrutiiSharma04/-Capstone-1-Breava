// src/pages/Diagnose.js
import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Alert,
  Box,
  Button,
  Stack
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';

export default function Diagnose() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError]               = useState('');
  const [dragging, setDragging]         = useState(false);
  const { isLoggedIn }                  = useContext(AuthContext);
  const navigate                        = useNavigate();
  const fileInputRef                    = useRef();

  // only accept CSV files
  const isCsv = file => file.name.toLowerCase().endsWith('.csv');

  const handleFileChange = e => {
    setError('');
    const file = e.target.files?.[0];
    if (file) {
      if (!isCsv(file)) {
        setSelectedFile(null);
        setError('Only .csv files are allowed.');
      } else {
        setSelectedFile(file);
      }
    }
  };

  const handleDragOver = e => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = e => {
    e.preventDefault();
    setDragging(false);
  };
  const handleDrop = e => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!isCsv(file)) {
        setSelectedFile(null);
        setError('Only .csv files are allowed.');
      } else {
        setError('');
        setSelectedFile(file);
      }
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!selectedFile) {
      setError('Please select a .csv file.');
      return;
    }
    if (!isLoggedIn) {
      setError('You must be signed in to diagnose.');
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await axios.post('/api/diagnose', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/result', { state: { result: res.data.result } });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Breast Cancer Diagnosis
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Typography variant="h6" gutterBottom>
            Upload CSV File
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Only <strong>.csv</strong> format is supported
          </Typography>

          {/* Drag & Drop */}
          <Box
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
            sx={{
              border: '2px dashed',
              borderColor: dragging ? 'primary.main' : 'grey.500',
              borderRadius: 2,
              height: 160,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              mb: 3,
              bgcolor: dragging ? 'action.hover' : 'transparent',
              transition: 'background-color 0.2s, border-color 0.2s',
            }}
          >
            <Stack alignItems="center" spacing={1}>
              <UploadFileIcon fontSize="large" color="action" />
              {selectedFile ? (
                <Typography variant="body1">{selectedFile.name}</Typography>
              ) : (
                <>
                  <Typography variant="body1">Drag & drop a CSV here</Typography>
                  <Typography variant="caption" color="textSecondary">
                    (.csv only)
                  </Typography>
                </>
              )}
            </Stack>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </Box>

          {/* Actions */}
          <Stack spacing={2} alignItems="center">
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => fileInputRef.current.click()}
            >
              Browse CSV
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
            >
              Submit for Analysis
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}