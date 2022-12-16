import {CotizadorProvider} from './context/CotizadorProvider'
import AppSeguro from "./components/AppSeguro"


function App() {

  return (
    <h1 className="App">
      <CotizadorProvider>
          <AppSeguro />
      </CotizadorProvider>
    </h1>
  )
}

export default App
