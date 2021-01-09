import React, { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PropTypes } from "prop-types";

//useState permite tener estados

//Formulario recibe un props

const Formulario = ({ crearCita }) => {

    //Crear estate de citas 

    const [cita, actualizarCita] = useState(
        //Se crea un objetao para guardar todos los campos del formulario 
        //Todos los campos se inicializan vacios 
        {
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        }
    );


    const [error, actualizarError] = useState(false);
    //Funcion que se ejecuta cada vez que escribe en un input y captura los datos ingresados en cada inout

    const actualizarState = (e) => {
        // console.log(e.target.name)

        actualizarCita({
            //mantiene el valor anterior y lo actualiza cada vez que cambia el valor de los input 
            ...cita, [e.target.name]: e.target.value
        })
    }

    //Extraer los valores utilizando la desestructuracion del objeto
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    //Funcion utilizada cuando el usuario presiona enter
    const submitCita = (e) => {
        e.preventDefault();

        //Validacion de datos
        if (mascota.trim() === '' ||
            propietario.trim() === '' ||
            fecha.trim() === '' ||
            hora.trim() === '' ||
            sintomas.trim() === '') {

            actualizarError(true);
            //Se agrega el return para evitar que se siga ejecutando el codigo 
            return;
        }
        //ELimiar el mensaje de validacion
        actualizarError(false);

        //Asignar un ID utilizando la libreria UUID
        //Se modifica el objeto y se agrega el id
        cita.id = uuidv4();

        //Crear cita 
        crearCita(cita);

        //Reiniciar formulario
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        });
    }

    return (
        <Fragment>
            <h2>Crear citas</h2>

            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null

            }

            <form onSubmit={submitCita} >
                <label>Nombre Mascota</label>
                <input type="text" name="mascota" className="u-full-width" placeholder="Nombre Mascota" onChange={actualizarState} value={mascota} />

                <label>Nombre Dueño</label>
                <input type="text" name="propietario" className="u-full-width" placeholder="Nombre Dueño de la mascota" onChange={actualizarState} value={propietario} />

                <label>Fecha</label>
                <input type="date" name="fecha" className="u-full-width" onChange={actualizarState} value={fecha} />

                <label>Hora</label>
                <input type="time" name="hora" className="u-full-width" onChange={actualizarState} value={hora} />

                <label>Síntomas</label>
                <textarea className="u-full-width" name="sintomas" onChange={actualizarState} value={sintomas}></textarea>

                <button type="submit" className="u-full-width button-primary" >Agregar Cita</button>
            </form>

        </Fragment>


    );
}

//Los PropTypes especifica que valor recibira el componente
Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
export default Formulario;