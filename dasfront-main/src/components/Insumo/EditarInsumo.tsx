import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Editarinsumo.css"; 

const EditarInsumo = () => {
    const { id } = useParams();
    const [insumo, setInsumo] = useState({});
    const [insumos, setInsumos] = useState([]);

    const [formulario, setFormulario] = useState({
        precioCompra: "",
        precioVenta: "",
        stockActual: "",
        stockMaximo: "",
        denominacion: "",
    });
    const [nombreSeleccionado, setNombreSeleccionado] = useState(""); // Estado para almacenar el nombre del objeto seleccionado

    useEffect(() => {
        fetch(`http://localhost:8080/articulosInsumos/${id}`)
            .then((response) => response.json())
            .then((insumo) => {
                setInsumo(insumo);
                setFormulario({
                    precioCompra: insumo.precioCompra ? insumo.precioCompra.toString() : "",
                    precioVenta: insumo.precioVenta ? insumo.precioVenta.toString() : "",
                    stockActual: insumo.stockActual ? insumo.stockActual.toString() : "",
                    stockMaximo: insumo.stockMaximo ? insumo.stockMaximo.toString() : "",
                    denominacion: insumo.denominacion || "",
                });
                setNombreSeleccionado(insumo.denominacion); 
            })
            .catch((error) => {
                console.error("Error al obtener datos del insumo:", error);
            });
    }, [id]);

    useEffect(() => {
        fetch(`http://localhost:8080/articulosInsumos`)
            .then((response) => response.json())
            .then((insumos) => {
                setInsumos(insumos);
            })
            .catch((error) => {
                console.error("Error al obtener datos de insumos:", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });

        // Buscar el insumo seleccionado y actualizar el formulario con sus datos
        const selectedInsumo = insumos.find((item) => item.id === parseInt(value));
        if (selectedInsumo) {
            setFormulario({
                ...formulario,
                precioCompra: selectedInsumo.precioCompra ? selectedInsumo.precioCompra.toString() : "",
                precioVenta: selectedInsumo.precioVenta ? selectedInsumo.precioVenta.toString() : "",
                stockActual: selectedInsumo.stockActual ? selectedInsumo.stockActual.toString() : "",
                stockMaximo: selectedInsumo.stockMaximo ? selectedInsumo.stockMaximo.toString() : "",
                denominacion: selectedInsumo.denominacion || "",
            });
        } setNombreSeleccionado(selectedInsumo.denominacion); // Actualizar el nombre seleccionado

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos del insumo actualizado:", formulario);

        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formulario),
        };

        fetch(`http://localhost:8080/articulosInsumos/${id}`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al actualizar el insumo");
                }
                alert("Insumo actualizado exitosamente");
                console.log("Insumo actualizado exitosamente");
                // Puedes realizar cualquier acción adicional después de actualizar el insumo
            })
            .catch((error) => {
                console.error("Error al actualizar el insumo:", error);
            });
    };

    return (
        <div className="editar-insumo-container">
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
                        {insumos.map((insumo) => (
                            <option key={insumo.id} value={insumo.id}>
                                {insumo.denominacion}
                            </option>
                        ))}
                    </select>
                    <p>Nombre seleccionado: {nombreSeleccionado}</p> {/* Mostrar el nombre del objeto seleccionado */}
                </div>
                <div className="form-group">
                    <label>Precio de Compra:</label>
                    <input
                        required
                        type="number"
                        name="precioCompra"
                        value={formulario.precioCompra}
                        onChange={(e) => setFormulario({ ...formulario, precioCompra: e.target.value })}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Precio de Venta:</label>
                    <input
                        required
                        type="number"
                        name="precioVenta"
                        value={formulario.precioVenta}
                        onChange={(e) => setFormulario({ ...formulario, precioVenta: e.target.value })}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Stock Actual:</label>
                    <input
                        required
                        type="number"
                        name="stockActual"
                        value={formulario.stockActual}
                        onChange={(e) => setFormulario({ ...formulario, stockActual: e.target.value })}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Stock Máximo:</label>
                    <input
                        required
                        type="number"
                        name="stockMaximo"
                        value={formulario.stockMaximo}
                        onChange={(e) => setFormulario({ ...formulario, stockMaximo: e.target.value })}
                        className="form-control"
                    />
                </div>

                <button type="submit" className="btn btn-primary">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditarInsumo;
