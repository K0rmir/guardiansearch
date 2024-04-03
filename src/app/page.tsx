import { PrimeReactProvider } from 'primereact/api';        
import Home from "@/components/Home"

export default function App() {

  return (

    <PrimeReactProvider >
      <Home></Home>
    </PrimeReactProvider>

 

  )
 

}