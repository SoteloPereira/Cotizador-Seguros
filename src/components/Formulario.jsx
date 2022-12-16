//quitamos useContext ya que se hace en useCotizador, al igual que CotizadorContext
import { Fragment, useState } from 'react'
import { MARCAS, YEARS, PLANES } from '../constants'
import useCotizador from '../hooks/useCotizador';
import Error from './Error';
//import CotizadorContext from '../context/CotizadorProvider'

export default function Formulario() {
    //con esto, buscamos y obtenemos todo lo que este dentro de los values
    // en <CotizadorContext.Provider en CotizadorProvider.jsx, 
    //aqui estamos extrayendo lo que haya definido en el context y definido en values
    //luego de crear hook useCotizador, llamamos ese hook para extraer las variables //useContext(CotizadorContext)
    // const { modal, setModal} = useCotizador()
    // console.log(modal);

    //usamos el customHook que nos devuelve la funcion declarada, y el state datos
    const { datos, handleChangeDatos, setError, error, cotizarSeguro } = useCotizador()

    const handleSubmit = e =>{
        e.preventDefault()
        if(Object.values(datos).includes('')){
            setError("Debe completar todos los campos")
            return
        }
        else{
            cotizarSeguro()
        }
        setError('')
    }
  return (
    <>
    {/* para ejemplo de ContextProvider
        <button
            onClick={() => setModal(!modal)}
            >
            Cambiar modal de Context
        </button> */}
        {/* si error tiene algo, muestra el componente  */}
        {error && <Error />}
        <form
            onSubmit={handleSubmit}
            >
            <div className="my-5">
                <label htmlFor="marca" className="block mb-5 font-bold text-gray-400 uppercase">Marca</label>
                <select name="marca" id="marca"
                    className="w-full p-3 bg-white border border-gray-200"
                    onChange={e => handleChangeDatos(e)}
                    value={datos.marca}
                    >
                        <option value="">--Selecciona Marca--</option>
                        {MARCAS.map( marca => (
                            <option 
                                key = {marca.id}
                                value = {marca.id}>{marca.nombre}</option>
                            )
                        )}                       
                </select>
                <label htmlFor="year" className="block mb-5 mt-5 font-bold text-gray-400 uppercase">Año</label>
                <select name="year" id="year"
                    className="w-full p-3 bg-white border border-gray-200"
                    onChange={e => handleChangeDatos(e)}
                    value={datos.year}
                    >
                        <option value="">--Selecciona Año--</option>
                        {YEARS.map( year => (
                            <option 
                                key = {year}
                                value = {year}>{year}</option>
                            )
                        )}                       
                </select>
                <div className='my-5'>
                    <label htmlFor="plan" className="block mb-5 mt-5 font-bold text-gray-400 uppercase">Elije un plan:</label>
                    <div className='flex gap-3 items-center'>
                        {PLANES.map( plan => (
                            <Fragment key={plan.id}>
                                <label >
                                    {plan.nombre}
                                </label>
                                <input type="radio"
                                    name="plan"
                                    value = {plan.id}
                                    onChange={e => handleChangeDatos(e)}
                                    /> 
                            </Fragment>  
                            ))}  
                        
                    </div>  
                </div>                   
            </div>
            <input type="submit" value="Cotizar"
                className='w-full bg-indigo-500 hover:bg-indigo-800 uppercase text-white cursor-pointer p-3 font-bold transition-colors' 
            />
        </form>

    </>
  )
}
