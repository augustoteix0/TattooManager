import { Route, Routes } from 'react-router-dom'
import  {Dashboard}  from './pages/Dashboard/Dashboard'
import { DefaultLayout } from './layout/DefaultLayout'
import { Agenda } from './pages/Agenda/Agenda'
import { Formulario } from './pages/Formulario/Formulario'
import { LembretePage } from './pages/Lembrete/LembretePage'
import { Financeiro } from './pages/Financeiro/Financeiro'

export function Router () {
    return (
    <Routes>
        <Route path='/' element={<DefaultLayout/>}>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/Agenda' element={<Agenda/>}/>
            <Route path='/Formulario' element={<Formulario/>}/>
            <Route path='/Lembrete' element={<LembretePage/>}/>
            <Route path='/Financeiro' element={<Financeiro/>}/>
        </Route>
    </Routes>
    )
}