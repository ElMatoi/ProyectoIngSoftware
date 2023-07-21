import React from 'react';

export const SelloCalidad = () => {
  return (
    <div className="sello">
        

      <img
        src="/imagenes/sello-confianza.png" alt=""
        
        className="img-sello"
        style={{ width: '20%', height: 'auto', marginLeft: '-20%' }}
      />
       <img src="/imagenes/logo.jpg.png" alt="" className="Logosello"  style={{ width: '50%', height: 'auto', marginLeft: '9%' }} />

      <div className="text-sello">
        <h2 style={{ textAlign: 'center', marginTop: '10px', marginLeft: '-78%' }}>
          (+56)9 68772015<br />
          info@elkimagic.com<br />
          San Martín 477, Vicuña, Chile
        </h2>
      </div>
    </div>
  );
};

export default SelloCalidad;