import React from 'react';
 import { useNavigate, useLocation } from 'react-router-dom';
 import {
   Container,
   Card,
   CardContent,
   Typography,
   Button,
   Box
 } from '@mui/material';
 
 export default function Result() {
   const navigate = useNavigate();
   const location = useLocation();
   const { result = 'unknown' } = location.state || {};
 
   return (
     <Container maxWidth="sm" sx={{ py: 6 }}>
       <Card elevation={3}>
         <CardContent sx={{ textAlign: 'center' }}>
           <Typography variant="h4" gutterBottom color="primary">
             Diagnosis Result
           </Typography>
 
           <Typography variant="body1" sx={{ my: 3 }}>
             The sample is diagnosed as:
           </Typography>
           {Array.isArray(result) ? (
             result.map((r, idx) => (
               <Typography
                 key={idx}
                 variant="h5"
                 component="div"
                 sx={{ fontWeight: 700, mb: 2, color: 'primary.main' }}
               >
                 {r.toUpperCase()}
               </Typography>
             ))
           ) : (
             <Typography
               variant="h5"
               component="div"
               sx={{ fontWeight: 700, mb: 4, color: 'primary.main' }}
             >
               {result.toUpperCase()}
             </Typography>
           )}

          <Box>
             <Button
               variant="contained"
               color="primary"
               size="large"
               onClick={() => navigate('/')}
             >
               Back to Home
             </Button>
           </Box>
         </CardContent>
       </Card>
     </Container>
   );
  }