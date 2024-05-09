import  { useState, useEffect } from "react";
import { Box, Typography, Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material"; // Importamos los iconos de Material-UI
import { useNavigate } from 'react-router-dom'; // Importa useNavigate


const Promocion = () => {
  const [promociones, setPromociones] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const navigate = useNavigate(); // Define useNavigate aquí

    useEffect(() => {
      fetch(`http://localhost:8080/promociones`)
          .then((response) => response.json()) 
          .then((promociones) => {
              setPromociones(promociones);
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
  console.log(imagenes)


  const handleEdit = (id) => {
    const detalleUrl = `/EditarPromocion/`+id;
    navigate(detalleUrl);
  };

  const handleDelete = (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta promocion?");
    if (confirmacion) {
      fetch(`http://localhost:8080/promociones/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (response.ok) {
          setPromociones(prevInsumos => prevInsumos .filter(item => item.id !== id));
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
            Promoción
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
            Promoción
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Imagen</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Fecha Desde</TableCell>
                <TableCell>Fecha Hasta</TableCell>
                <TableCell>Descripcion Descuento</TableCell>
                <TableCell>Precio Promocional</TableCell>
                <TableCell>Acciones</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {promociones.map((promociones) => (
                <TableRow key={promociones.id}>
                  <TableCell><img src={imagenes[promociones.id+5].url}  style={{width: '100px'}} /></TableCell>
                  <TableCell>{promociones.denominacion}</TableCell>
                  <TableCell>{promociones.fechaDesde}</TableCell>
                  <TableCell>{promociones.fechaHasta}</TableCell>
                  <TableCell>{promociones.descripcionDescuento}</TableCell>
                  <TableCell>{promociones.precioPromocional}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(promociones.id)}><Edit /></Button> {/* Icono de editar */}
                    <Button onClick={() => handleDelete(promociones.id)}><Delete /></Button> {/* Icono de eliminar */}
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

export default Promocion;
