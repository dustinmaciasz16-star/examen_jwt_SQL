import { useState, useEffect } from "react";
import ListReciclaje from "../components/ListReciclaje";
import { API_URL } from "../config_api/config_api";
import "./Reciclaje.css";

export function Reciclaje() {
    const [nombre, setNombre] = useState("");
    const [sector, setSector] = useState("");
    const [material, setMaterial] = useState("");
    const [capacidad, setCapacidad] = useState("");
    const [error, setError] = useState("");

    const [puntos, setPuntos] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/puntos`)
            .then((res) => res.json())
            .then((data) => setPuntos(data))
            .catch((err) => console.error("Error al cargar los puntos:", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!nombre.trim() || !sector.trim() || !material.trim() || !capacidad) {
            setError("Todos los campos son obligatorios y no pueden estar vacíos.");
            return;
        }

        const soloLetrasRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
        
        if (!soloLetrasRegex.test(nombre)) {
            setError("El nombre del punto no debe contener números.");
            return;
        }

        if (!soloLetrasRegex.test(sector)) {
            setError("El sector o barrio no debe contener números.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/puntos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre: nombre.trim(),
                    sector: sector.trim(),
                    material: material.trim(),
                    capacidad: Number(capacidad),
                }),
            });

            if (response.ok) {
                const nuevoPunto = await response.json();
                setPuntos([...puntos, nuevoPunto]);
                
                setNombre("");
                setSector("");
                setMaterial("");
                setCapacidad("");
            } else {
                setError("No se pudo registrar el punto en el servidor.");
            }
        } catch (err) {
            console.error("Error de red:", err);
            setError("Error de conexión con el servidor.");
        }
    };

    return (
        <div className="container">
            <h1>Puntos de Reciclaje Urbano</h1>

            <form onSubmit={handleSubmit} className="punto-form">
                <h2>Registrar Nuevo Punto</h2>
                
                {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

                <input
                    type="text"
                    placeholder="Nombre del punto"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Sector o barrio"
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Material que recibe"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Capacidad (unidades)"
                    value={capacidad}
                    onChange={(e) => setCapacidad(e.target.value)}
                    min="1"
                    required
                />
                <button type="submit">Guardar Punto</button>
            </form>

            <h2>Listado de Puntos Disponibles</h2>
            <ListReciclaje puntos={puntos} />
        </div>
    );
}