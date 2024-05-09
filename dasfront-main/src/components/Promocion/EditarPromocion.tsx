import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./EditarPromocion.css"; // Importa tu archivo CSS para estilos personalizados

const EditarPromocion = () => {
    const { id } = useParams();
    const [promocion, setPromocion] = useState({});
    const [promociones, setPromociones] = useState([]);

    const [formulario, setFormulario] = useState({
        fechaDesde: "",
        fechaHasta: "",
        descripcionDescuento: "",
        precioPromocional: "",
        denominacion: "",
    });

    useEffect(() => {
        fetch(`http://localhost:8080/promociones/${id}`)
            .then((response) => response.json())
            .then((promocion) => {
                setPromocion(promocion);
                setFormulario({
                    fechaDesde: promocion.fechaDesde ? promocion.fechaDesde.toString() : "",
                    fechaHasta: promocion.fechaHasta ? promocion.fechaHasta.toString() : "",
                    descripcionDescuento: promocion.descripcionDescuento ? promocion.descripcionDescuento.toString() : "",
                    precioPromocional: promocion.precioPromocional ? promocion.precioPromocional.toString() : "",
                    denominacion: promocion.denominacion || "",
                });
            })
            .catch((error) => {
                console.error("Error al obtener datos de la promocion:", error);
            });
    }, [id]);

    useEffect(() => {
        fetch(`http://localhost:8080/promociones`)
            .then((response) => response.json())
            .then((promociones) => {
                setPromociones(promociones);
            })
            .catch((error) => {
                console.error("Error al obtener datos de la promocion:", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos de la promocion actualizada:", formulario);

        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formulario),
        };

        fetch(`http://localhost:8080/promociones/${id}`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al actualizar la promocion");
                }
                alert("Promocion actualizada exitosamente");
                console.log("Promocion actualizada exitosamente");
                // Puedes realizar cualquier acción adicional después de actualizar el insumo
            })
            .catch((error) => {
                console.error("Error al actualizar la promocion:", error);
            });
    };

    return (
        <div className="editar-promocion-container">
            <h1>Editar Insumo</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Denominación:</label>
                    <select
                        name="denominacion"
                        value={formulario.denominacion || ''}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="">Seleccionar denominación</option>
                        {promociones.map((promocion) => (
                            <option key={promocion.id} value={promocion.id}>
                                {promocion.denominacion}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Fecha Desde:</label>
                    <input
                        required
                        name="fechaDesde"
                        value={formulario.fechaDesde}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Fecha Hasta:</label>
                    <input
                        required
                        name="fechaHasta"
                        value={formulario.fechaHasta}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Descripcion Descuento:</label>
                    <input
                        required
                        name="descripcionDescuento"
                        value={formulario.descripcionDescuento}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Precio Promocional:</label>
                    <input
                        required
                        type="number"
                        name="precioPromocional"
                        value={formulario.precioPromocional}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditarPromocion;