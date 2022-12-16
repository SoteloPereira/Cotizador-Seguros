import { useMemo, useCallback, useRef } from "react"
import useCotizador from "../hooks/useCotizador"
import { MARCAS, PLANES } from "../constants"


const Resultado = () => {

const {resultado, datos} = useCotizador()
const {marca, plan, year} = datos
//fijamos el año que se usó para cotizar
const yearRef = useRef(year)

console.log(MARCAS);
console.log(PLANES);

//nos devuelve un array con el objeto filtrado
//al colocarlo en [nombreMarca] nos devuelve solo el objeto {}
//useCallback recibe una fn y dependencias, indicamos resultado, que es el que se obtiene al cotizar, entonces
//cuando cambie ese haremos el rerender
const [nombreMarca] = useCallback( MARCAS.filter(m => m.id === Number(marca)), [resultado] )
//para este ejemplo usamos useMemo, que tiene similar estructura, agregando un arrow fn dando un return implicito
const [nombrePlan] = useMemo( () => PLANES.filter(p => p.id === Number(plan) ), [resultado] )

console.log(nombreMarca);

    if (resultado === 0) return null
  return (
    <div className="bg-gray-100 text-center mt-5 p-5 shadow">
        <h2 className="text-gray-600 font-bold text-3xl">Resumen</h2>
        <p className="my-2">
            <span className="font-bold">Marca: </span>
            {nombreMarca.nombre}
        </p>
        <p className="my-2">
            <span className="font-bold">Plan: </span>
            {nombrePlan.nombre}
        </p>
        <p className="my-2">
            <span className="font-bold">Año del Vehiculo: </span>
            {yearRef.current}
        </p>
        <p className="my-2 text-2xl">
            <span className="font-bold">Total Cotización: </span>
            {resultado}
        </p>
    </div>
  )
}

export default Resultado
