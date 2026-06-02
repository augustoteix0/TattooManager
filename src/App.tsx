import { BrowserRouter } from 'react-router-dom'
import { Router } from "./Router";
import { ClientProvider } from './contexts/Contexts';

export function App() {

  return (
    <>
      <BrowserRouter>
          <ClientProvider>
            <Router /> 
          </ClientProvider>    
      </BrowserRouter>
    </>
  )
}

