import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  CardMedia,
  Stack,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import womanImage from '../assets/woman.png'; // adjust path to your image

const features = [
  {
    title: 'AI-Powered Analysis',
    text: 'Advanced machine learning model "Naive Bayes" with 96% accuracy.'
  },
  {
    title: 'Quick Results',
    text: 'Get comprehensive analysis and receive initial results within minutes.'
  },
  {
    title: 'Privacy First',
    text: 'Advanced machine learning models ensure data security and user anonymity.'
  },
];

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>

      {/* Hero: side by side image on left, text+buttons on right */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 6
        }}
      >
        {/* Image on left */}
        <Box sx={{ flex: '1 1 0%', mb: { xs: 4, sm: 0 }, pr: { sm: 4 } }}>
          <CardMedia
            component="img"
            image={womanImage}
            alt="Early detection"
            sx={{width: '90%' }}
          />
        </Box>

        {/* Text + Buttons on right */}
        <Box sx={{ flex: '1 1 0%', textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography variant="h3" component="h1" gutterBottom color="primary">
            Early Detection Saves Lives
          </Typography>
          <Typography variant="h6" paragraph color="textSecondary">
            Our AI-powered breast cancer detection platform combines advanced machine learning with medical expertise for accurate and early detection.
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            justifyContent={{ xs: 'center', sm: 'flex-start' }}
            flexWrap="wrap"
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={RouterLink}
              to="/diagnose"
            >
              Start Free Diagnose
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              component={RouterLink}
              to="/about"
            >
              Learn More
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Features */}
      <Grid container spacing={4} sx={{ mt: 6 }}>
        {features.map(f => (
          <Grid key={f.title} item xs={12} sm={6} md={4}>
            <Card elevation={2} sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom color="primary">
                  {f.title}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {f.text}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* CTA */}
      <Box
        sx={{
          mt: 8,
          p: 4,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 2,
          textAlign: 'center'
        }}
      >
        <Typography variant="h4" gutterBottom color="primary">
          Take the First Step Towards Early Detection
        </Typography>
        <Typography variant="body1" paragraph color="textSecondary">
          Our platform is designed to support you every step of the way.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={RouterLink}
          to="/diagnose"
        >
          Start Free Diagnose
        </Button>
      </Box>

    </Container>
  );
}