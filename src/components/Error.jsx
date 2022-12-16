import useCotizador from "../hooks/useCotizador"

const Error = () => {

    const { error } = useCotizador()

  return (
    <div>
        <p className=" text-center font-bold text-red-800 bg-red-200 py-3 border border-red-600">{error}</p>
    </div>
  )
}

export default Error
