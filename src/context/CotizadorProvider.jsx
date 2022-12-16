import { createContext, useState } from "react";
import { calcularMarca, calcularPlan, formatearMoneda, obtenerDiferenciaYear } from "../helpers";

const CotizadorContext = createContext()

//Provider es de donde nacen/vienen los datos
const CotizadorProvider = ( {children}) =>{
    //const [modal, setModal] = useState(false)

     //seteamos un objeto con propiedades vacias
     const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    //un state para mostrar errores
    const [error, setError] = useState('')
    const [resultado, setResultado] = useState(0)
    const [cargando, setCargando] = useState(false)

    //fn que modifica los valores cuando cambian los values en el formulario
    const handleChangeDatos = e => {
        setDatos({
            //le pasamos con un spread los datos que tenia de antes
            ...datos,
            //y luego actualizamos con el valor del input modificado
            [e.target.name]: e.target.value
        }) 
    }

    const cotizarSeguro = () =>{
        //valor base del seguro
        let resultado = 2000
        //Obtener diferencia de años
        const diferencia = obtenerDiferenciaYear(datos.year)
        //Restar el 3% de cada año
        resultado -=((diferencia * 3) * resultado) / 100
    
        //Americano 15%
        //Europeo 30%
        //Asiatico 5%
        resultado = resultado * calcularMarca(datos.marca)

        //basico 20%
        //completo 50%
        resultado = resultado * calcularPlan(datos.plan)
        resultado = formatearMoneda(resultado)

         //para spinner
        setCargando(true)
       
        setTimeout(() => {
            setResultado(resultado)
            setCargando(false)
        }, 2000);
    }

    return (
        <CotizadorContext.Provider 
                value={{ 
                    // modal,setModal
                    handleChangeDatos,
                    datos,
                    error,
                    setError,
                    cotizarSeguro,
                    resultado,
                    cargando
                 }}
            >
            {children}
        </CotizadorContext.Provider>
    )
}

export { CotizadorProvider }

export default CotizadorContext