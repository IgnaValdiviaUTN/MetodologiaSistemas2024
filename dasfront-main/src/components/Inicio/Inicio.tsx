import { Box, Container, Grid, Typography, styled } from "@mui/material";
import React from 'react';
import InicioCard from "../common/InicioCard";
import BaseBar from "./BaseBar";
import BasePie from "./BasePie";
import ChartCard from "./ChartCard";

const productosContent = {
    url: 'https://imgs.search.brave.com/3RHsFdubjr_XJwrbqJUCCjzABPrZXBieICFzzleGDYI/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS9lbnNhbGFkYS1w/YXN0YS1tYXJpc2Nv/cy1zb2JyZS1mb25k/by1henVsXzIzNTMt/NjM5LmpwZz9zaXpl/PTYyNiZleHQ9anBn',
    title: 'Productos',
    content: 'Añade nuevos platos o actualiza los precios para mejorar la experiencia de tus clientes.',
};

const empresasContent = {
    url: 'https://imgs.search.brave.com/JMbaqJ9k409DE2S-2s14AqFiyc4Ak9qTME2ocPtN0fc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTA4/MzQ4NjI3L2VzL2Zv/dG8vYXJxdWl0ZWN0/dXJhLW1vZGVybmEt/ZGUtdmlkcmlvLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz0y/SElQUzE1NzM4NEND/WGlXajNSMG5DVmtq/aG41dHdvcmlEVjNL/c29wSmdZPQ',
    title: 'Empresas',
    content: 'Agrega, actualiza o elimina información sobre tus empresas asociadas.'
};

const promocionesContent = {
    url: 'https://imgs.search.brave.com/WJ-ULyW5--1VUcCVKL9oVS4oSKIrGky6FNBBXJkuspA/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtcHJlbWl1/bS9jdXBvbi1kZXNj/dWVudG8tM2Qtby12/ZW50YS1ib2xldG9f/MjQ5NDA1LTQ0OC5q/cGc_c2l6ZT02MjYm/ZXh0PWpwZw',
    title: 'Promociones',
    content: 'Personaliza tus ofertas y haz que destaquen para que tus clientes no puedan resistirse.',
};

const cardStyle = {
    width: "100%",
    height: "100%",
    textAlign: 'center',
};

const Title = styled(Typography)({
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#4D648D', // Azul pastel oscuro
    marginTop: '2rem',
    marginBottom: '2rem',
    textAlign: 'center',
});

const Inicio: React.FC = () => {
    return (
        <Box component="main" sx={{ flexGrow: 1, pl: 9, pt: 4 }}>
            <Container>
                <Title component="h1" variant="h4" color="initial">¡Bienvenido!</Title>

                <Grid container spacing={3} sx={{ py: 2, alignContent: 'center', justifyContent: 'center' }}>
                    <Grid item xs={12} md={6}>
                        <ChartCard>
                            <BaseBar />
                        </ChartCard>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <ChartCard>
                            <BasePie />
                        </ChartCard>
                    </Grid>
                </Grid>
                <Grid container spacing={3} sx={{ alignContent: 'center', justifyContent: 'center' }}>
                    <Grid item xs={12} md={4}>
                        <InicioCard content={productosContent} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <InicioCard content={empresasContent} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <InicioCard content={promocionesContent} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Inicio;
