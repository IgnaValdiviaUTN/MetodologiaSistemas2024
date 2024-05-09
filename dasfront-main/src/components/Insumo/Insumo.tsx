import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material"; // Importamos los iconos de Material-UI
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const Insumo = () => {
  const [insumos, setInsumos] = useState([]);
  const [imagenes, setImagenes] = useState({});
  const navigate = useNavigate(); // Define useNavigate aquí

  useEffect(() => {
    fetch(`http://localhost:8080/articulosInsumos`)
        .then((response) => response.json()) 
        .then((insumos) => {
            setInsumos(insumos);
        })
        .catch(() => {
        });

    fetch(`http://localhost:8080/imagenes`)
        .then((response) => response.json()) 
        .then((imagenes) => {
            setImagenes(imagenes);
        })
        .catch(() => {
        });
  }, []);

  console.log(insumos)
  console.log(imagenes)

  const handleEdit = (id) => {
    const detalleUrl = `/editarInsumo/`+id;
    navigate(detalleUrl);
  };

  const handleDelete = (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este instrumento?");
    if (confirmacion) {
      fetch(`http://localhost:8080/articulosInsumos/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (response.ok) {
          setInsumos(prevInsumos => prevInsumos .filter(item => item.id !== id));
        }
      })
      .catch(error => {
        console.error('Error al eliminar el instrumento:', error);
      });
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, my: 2}}>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
          <Typography variant="h5" gutterBottom>
            Insumos
          </Typography>
          <Button
            sx={{
              bgcolor: "#fb6376",
              "&:hover": {
                bgcolor: "#d73754",
              },
            }}
            variant="contained"
          >
            Insumo
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell></TableCell> 
                <TableCell>Nombre</TableCell>
                <TableCell>Precio de Compra</TableCell>
                <TableCell>Precio de Venta</TableCell>
                <TableCell>Stock Actual</TableCell>
                <TableCell>Stock Máximo</TableCell>
 
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {insumos.map((insumo) => (
                <TableRow key={insumo.id}>
                  <TableCell>
                    <img src={imagenes[insumo.id-1].url} 
                     style={{width: '100px'}} />
                  </TableCell>
                  <TableCell>{insumo.denominacion}</TableCell>
                  <TableCell>{insumo.precioCompra}</TableCell>
                  <TableCell>{insumo.precioVenta}</TableCell>
                  <TableCell>{insumo.stockActual}</TableCell>
                  <TableCell>{insumo.stockMaximo}</TableCell>

                  <TableCell>
                    <Button onClick={() => handleEdit(insumo.id)}><Edit /></Button> {/* Icono de editar */}
                    <Button onClick={() => handleDelete(insumo.id)}><Delete /></Button> {/* Icono de eliminar */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default Insumo;
