import React from 'react';

const Maps = () => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.195614804268!2d-70.7164260848851!3d-30.03124538188711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96901a297ce62617%3A0xccc672040cdef428!2zU2FuIE1hcnTDrW4gNDcyLCBWaWN1w7FhLCBSZWdpw7NuIGRlIENvcXVpbWJv!5e0!3m2!1ses!2scl!4v1511388777091"
      title="Nuestra ubicacion!"
      width="320"
      height="320"
      frameBorder="0"
      style={{ border: '0' }}
      allowFullScreen
    ></iframe>
  );
};

export default Maps;