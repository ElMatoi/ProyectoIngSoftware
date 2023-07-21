import React, { useState } from 'react';

const VehicleTour = () => {
  const tours = [
    {
      id: 1,
      name: 'Interior del Valle',
      price: 25000,
      image: '/imagenes/interiorvalle.jpg',
     
    },
    {
      id: 2,
      name: 'La laguna y Paso Agua Negra',
      price: 80000,
      image: '/imagenes/laguna.jpg',
      
    },
    {
      id: 3,
      name: 'Aldrededores de Vicuña',
      price: 20000,
      image: '/imagenes/vicuna.jpg',
      
    },
  ];

  
/// hasta aca
  return (
    <div style={{ marginTop: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Arial, sans-serif' }}>
    <div style={{ display: 'flex' }}>
      {tours.map((tour) => (
        <div key={tour.id} style={{ marginRight: '20px' }}>
          <img src={tour.image} alt="" className="img-con-marco" style={{ width: '300px', height: '300px' }} />
          <h3>{tour.name}</h3>
          <p>Precio: ${tour.price}</p>
        </div>
      ))}
      

      
        </div>
        </div>
      )};
    


export default VehicleTour;