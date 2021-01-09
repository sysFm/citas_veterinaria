import React, { Fragment, useState, useEffect } from 'react';
import Cita from './components/Cita';
import Formulario from './components/Formulario';
function App() {

  //Ciatas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  //Arreglo de citas 
  const [citas, guardarCitas] = useState(citasIniciales);

  //Use effect para realizar ciertas operaciones cuando el state cambia (siempre es un funcion de flecha )
  //El use effect se ejecuta cuando el componente esta listo o se modifica 
  //Para que se ejecute solo una vez hay que enviar un arreglo vacio sino se va a ciclar 
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas]);

  //Funcion que toma las citas actuales y agrega las nuevas 
  const crearCita = (cita) => {
    guardarCitas([
      ...citas, cita
    ]);
  }

  //Funcion que elimina una cita por su ID
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  //Mensaje condicional

  const titulo = citas.length === 0 ? 'No hay citas!' : 'Administra tus citas';

  return (
    <Fragment>
      <h1>Veterinaria</h1>
      <h2>Administrador de citas de mascotas</h2>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />

          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {
              citas.map(cita => (
                <Cita
                  key={cita.id}
                  cita={cita}
                  eliminarCita={eliminarCita}
                />

              ))
            }


          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
