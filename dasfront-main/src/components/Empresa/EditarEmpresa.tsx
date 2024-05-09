import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./EditarEmpresa.css"; // Importa tu archivo CSS para estilos personalizados

const EditarEmpresa = () => {
    const { id } = useParams();
    const [empresa, setEmpresa] = useState({});
    const [empresas, setEmpresas] = useState([]);

    const [formulario, setFormulario] = useState({
        nombre: "",
        razonSocial: "",
        cuil: "",
    });

    useEffect(() => {
        fetch(`http://localhost:8080/empresas/${id}`)
            .then((response) => response.json())
            .then((empresa) => {
                setEmpresa(empresa);
                setFormulario({
                    nombre: empresa.nombre || "",
                    razonSocial: empresa.razonSocial || "",
                    cuil: empresa.cuil || "",
                });
            })
            .catch((error) => {
                console.error("Error al obtener datos de la empresa:", error);
            });
    }, [id]);

    useEffect(() => {
        fetch(`http://localhost:8080/empresas`)
            .then((response) => response.json())
            .then((empresas) => {
                setEmpresas(empresas);
            })
            .catch((error) => {
                console.error("Error al obtener datos de empresas:", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos de la empresa actualizados:", formulario);

        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formulario),
        };

        fetch(`http://localhost:8080/empresas/${id}`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al actualizar la empresa");
                }
                alert("Empresa actualizada exitosamente");
                console.log("Empresa actualizada exitosamente");
            })
            .catch((error) => {
                console.error("Error al actualizar la empresa:", error);
            });
    };

    return (
        <div className="editar-empresa-container">
            <h1>Editar Empresa</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nombre:</label>
                    <input
                        required
                        type="text"
                        name="nombre"
                        value={formulario.nombre}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Razón Social:</label>
                    <input
                        required
                        type="text"
                        name="razonSocial"
                        value={formulario.razonSocial}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>CUIL:</label>
                    <input
                        required
                        type="text"
                        name="cuil"
                        value={formulario.cuil}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditarEmpresa;
