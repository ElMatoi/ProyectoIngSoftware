// pages/index.js
"use client"

/*
________________________________________________________________________________________________________________________________

nunca olvidar el "use client" si no da error 
________________________________________________________________________________________________________________________________

*/
// pages/index.js

import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import axios from 'axios';

import './globals.css';
import Header from './Header';
import BiciTours from './BiciTours';
import VehiculeTours from './VehiculeTours';
import FacebookPlugin from './FacebookPlugin';
import Maps from './Maps';
import SelloCalidad from './SelloCalidad';


function DatePicker() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [cantidad_personas, setCantidadPersonas] = useState('');
  const [servicioId, setServicioId] = useState('');
  const [servicios, setServicios] = useState([]);
  const [reservasEnFecha, setReservasEnFecha] = useState([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState('');
  const [cuposDisponibles, setCuposDisponibles] = useState(0);
  const [blockedDates, setBlockedDates] = useState([]);
  const [showBlockedDates, setShowBlockedDates] = useState(false);
  const [fetchResult, setFetchResult] = useState(null); // muestra el resultado
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    '/imagenes/pisco.jpg',
    '/imagenes/tourbici.jpg',
    '/imagenes/bici2.jpg',
    
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Cambiar la imagen cada 5 segundos

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, [images.length]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/reservas/2023-07-04');
        setFetchResult(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/servicios')
      .then((response) => {
        setServicios(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetchBlockedDates();
  }, []);

  const fetchBlockedDates = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/blocked-dates');
      setBlockedDates(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleBlockedDates = () => {
    setShowBlockedDates(!showBlockedDates);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setReservasEnFecha([]);
    fetchReservasEnFecha(date);
  };

  const fetchReservasEnFecha = (date) => {
    const formattedDate = formatDate(date);
    axios
      .get(`http://localhost:3001/api/reservas/${formattedDate}`)
      .then((response) => {
        setReservasEnFecha(response.data);

        if (response.data.length > 0) {
          const reservaServicioId = response.data[0].servicio_id;
          const servicio = servicios.find((servicio) => servicio.id === reservaServicioId);
          const nombreServicio = servicio?.nombre;
          const totalCupos = servicio?.cupos_maximos - response.data.reduce((total, reserva) => total + reserva.cantidad_personas, 0);

          setServicioSeleccionado(nombreServicio);
          setCuposDisponibles(totalCupos);
        } else {
          setServicioSeleccionado('');
          setCuposDisponibles(0);
        }
      })
      .catch((error) => {
        console.error(error);
        setReservasEnFecha([]);
        setServicioSeleccionado('');
        setCuposDisponibles(0);
      });
  };

  const formatDate = (date) => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return '';
  };

  const saveDateToDatabase = () => {
    const formattedDate = formatDate(selectedDate);

    if (formattedDate && validateServicioId() && validateCantidadPersonas()) {
      const data = {
        servicio_id: parseInt(servicioId),
        fecha_reserva: formattedDate,
        correo: 'franciscolopmez599@gmail.com',
        cantidad_personas: parseInt(cantidad_personas),
        valor_pagado:parseInt(10000 * cantidad_personas)
      };

      axios
        .post('https://backedpago.fly.dev/reservas', data)
        .then((response) => {
          console.log(response.data);
          setFetchResult(response.data.message);
          
        window.location.href = response.data.redirectUrl;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const validateServicioId = () => {
    const parsedServicioId = parseInt(servicioId);
    return !isNaN(parsedServicioId) && parsedServicioId >= 1 && parsedServicioId <= 7;
  };

  const validateCantidadPersonas = () => {
    const parsedCantidadPersonas = parseInt(cantidad_personas);
    const selectedServicio = servicios.find((servicio) => servicio.id === parseInt(servicioId));

    return (
      !isNaN(parsedCantidadPersonas) &&
      parsedCantidadPersonas >= 1 &&
      selectedServicio &&
      parsedCantidadPersonas <= selectedServicio.cupos_maximos
    );
  };

  const maxCupos = servicios.find((servicio) => servicio.id === parseInt(servicioId))?.cupos_maximos || 0;

  return (
    <div className="container">
      <Header />
     
      <div class="image-gallery">
  <img src={images[currentImageIndex]} alt={`Imagen ${currentImageIndex + 1}`} />
  <div class="gallery-title">Nuestros Servicios</div>
</div>

      
      <div className="Tour" style={{ marginTop: '-70px' }}>
        <BiciTours />
        <VehiculeTours />
      </div>
      <div className="form-container">
        <h1>Reserva tu tour</h1>
        <button onClick={toggleBlockedDates}>
          {showBlockedDates ? 'Ocultar' : 'Mostrar'} Fechas no disponibles
        </button>
        {showBlockedDates && (
          <ul>
            {blockedDates.map((date, index) => (
              <li key={index}>{date.fecha_reserva}</li>
            ))}
          </ul>
        )}
        <Calendar onChange={handleDateChange} value={selectedDate} />
        <p>Servicios</p>
        <select
          value={servicioId}
          onChange={(e) => setServicioId(e.target.value)}
          placeholder="Selecciona un servicio"
        >
          <option value="">Selecciona un servicio</option>
          {servicios.map((servicio) => (
            <option key={servicio.id} value={servicio.id}>
              {servicio.nombre}
            </option>
          ))}
        </select>
        {!validateServicioId() && (
          <p className="error-message">Por favor, selecciona un servicio válido.</p>
        )}
        <input
          type="number"
          value={cantidad_personas}
          onChange={(e) => setCantidadPersonas(e.target.value)}
          placeholder={`Cantidad de personas (1-${maxCupos})`}
          max={maxCupos}
        />
        {!validateCantidadPersonas() && (
          <p className="error-message">
            Por favor, ingresa una cantidad de personas válida (1 a {maxCupos}).
          </p>
        )}
        {servicioSeleccionado && (
          <p>
            Hay reservas en la fecha seleccionada del servicio {servicioSeleccionado} y quedan {cuposDisponibles} cupos disponibles.
          </p>
        )}
        {!servicioSeleccionado && <p>No hay reservas en la fecha seleccionada.</p>}
        <button onClick={saveDateToDatabase}>Guardar fecha</button>
      </div>
      
        <FacebookPlugin/>
      
      <div className="Maps">
        <Maps />
        
      </div>
      <div className="Sello">
        <SelloCalidad/>
      </div>
      <div class="image-container">
        <img src="/imagenes/valle.jpg" alt="" />
        <div class="image-overlay">
          <h2>4 RAZONES PARA VISITAR EL VALLE DE ELQUI</h2>
          <p>300 días de cielos despejados al año</p>
          <p>50% de la oferta nacional de astroturismo</p>
          <p>62 km de La Serena</p>
          <p>24 grados Celsius en promedio</p>
        </div>


</div>



     

      
      
    </div>
  );
}

export default DatePicker;

