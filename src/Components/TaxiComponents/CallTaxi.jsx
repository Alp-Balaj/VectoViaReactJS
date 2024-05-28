import React from 'react';
import {Container, Grid} from '@mui/material';
import styled from 'styled-components';

const Card = styled.div`
    
`

const CallTaxi = () => {
  return (
    <div>
        <Container maxWidth="xl">
            <Grid container spacing={3}>
                <Grid xs={12} md={12}>
                    <Card>

                    </Card>
                </Grid>
            </Grid>
        </Container>
    </div>
  )
}

export default CallTaxi;