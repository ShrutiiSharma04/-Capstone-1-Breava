// src/pages/Records.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

import {
  Container,
  Card,
  CardContent,
  Typography,
  Alert,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

export default function Records() {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [records, setRecords] = useState([]);
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      if (!isLoggedIn) {
        setError('You must be signed in to view records.');
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get('/api/records');
        setRecords(res.data);
      } catch (err) {
        console.error('Error fetching records:', err);
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, [isLoggedIn]);

  // Loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            color="primary"
          >
            {user.name}’s Diagnosis Records
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {records.length === 0 ? (
            <Typography variant="body1" align="center">
              No records found.
            </Typography>
          ) : (
            <List>
              {records.map((record) => {
                const date = new Date(record.createdAt).toLocaleString();
                return (
                  <ListItem key={record._id} divider>
                    <ListItemText
                      primary={record.filename}
                      secondary={`${record.result} — ${date}`}
                    />
                  </ListItem>
                );
              })}
            </List>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}