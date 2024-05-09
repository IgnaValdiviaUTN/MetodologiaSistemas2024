import  { useState, useEffect } from "react";
import { Box, Typography, Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material"; // Importamos los iconos de Material-UI
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const Empresa = () => {
  const [empresas, setEmpresas] = useState([]);
  const navigate = useNavigate(); // Define useNavigate aquí

  useEffect(() => {
    fetch(`http://localhost:8080/empresas`)
        .then((response) => response.json()) 
        .then((empresas) => {
            setEmpresas(empresas);
        })
        .catch(() => {
        });
  }, []);

  const handleEdit = (id) => {
    const detalleUrl = `/editarEmpresa/`+id;
    navigate(detalleUrl);
  };

  const handleDelete = (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar esta empresa?");
    if (confirmacion) {
      fetch(`http://localhost:8080/empresas/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (response.ok) {
          setEmpresas(prevEmpresas => prevEmpresas.filter(item => item.id !== id));
        }
      })
      .catch(error => {
        console.error('Error al eliminar la empresa:', error);
      });
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, my: 2}}>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
          <Typography variant="h5" gutterBottom>
            Empresas
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
            Empresa
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Razón Social</TableCell>
                <TableCell>CUIL</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {empresas.map((empresa) => (
                <TableRow key={empresa.id}>
                  <TableCell>{empresa.nombre}</TableCell>
                  <TableCell>{empresa.razonSocial}</TableCell>
                  <TableCell>{empresa.cuil}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(empresa.id)}><Edit /></Button> {/* Icono de editar */}
                    <Button onClick={() => handleDelete(empresa.id)}><Delete /></Button> {/* Icono de eliminar */}
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

export default Empresa;
