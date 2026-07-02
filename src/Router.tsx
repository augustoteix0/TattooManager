import { Route, Routes } from 'react-router-dom'
import  {Dashboard}  from './pages/Dashboard/Dashboard'
import { DefaultLayout } from './layout/DefaultLayout'
import { Agenda } from './pages/Agenda/Agenda'
import { Formulario } from './pages/Formulario/Formulario'
import { Lembrete } from './pages/Lembrete/Lembrete'

export function Router () {
    return (
    <Routes>
        <Route path='/' element={<DefaultLayout/>}>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/Agenda' element={<Agenda/>}/>
            <Route path='/Formulario' element={<Formulario/>}/>
            <Route path='/Lembrete' element={<Lembrete/>}/>
        </Route>
    </Routes>
    )
}