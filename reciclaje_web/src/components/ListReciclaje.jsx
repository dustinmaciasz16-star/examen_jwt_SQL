import "./ListReciclaje.css"
function ListReciclaje({ puntos }) {
    if (!puntos || puntos.length === 0) {
        return <p style={{ textAlign: "center", color: "#666" }}>No hay puntos de reciclaje registrados todavía.</p>;
    }

    return (
        <div className="cards-grid">
            {puntos.map((punto) => (
                <div key={punto.id} className="punto-card">
                    <h3>{punto.nombre}</h3>
                    <p><strong>Sector:</strong> {punto.sector}</p>
                    <p><strong>Material:</strong> {punto.material}</p>
                    <p><strong>Capacidad:</strong> {punto.capacidad} unidades</p>
                </div>
            ))}
        </div>
    );
}
export default ListReciclaje