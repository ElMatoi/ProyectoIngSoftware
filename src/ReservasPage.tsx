import React, { useEffect, useState } from 'react';

const ReservasPage = () => {
  const [reservas, setReservas] = useState(null);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await fetch('http://localhost:3001/reservas');
        const data = await response.json();
        setReservas(data);
      } catch (error) {
        console.error('Error al obtener las reservas', error);
      }
    };

    fetchReservas();
  }, []);

  return (
    <div>
      {reservas ? (
        // Renderiza los datos de las reservas en tu componente
        <div>{JSON.stringify(reservas)}</div>
      ) : (
        // Muestra un indicador de carga o mensaje de espera
        <div>Cargando reservas...</div>
      )}
    </div>
  );
};

export default ReservasPage;
