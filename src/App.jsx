import { useState } from 'react'
import './App.css'
import Header from "./Header"
import Footer from "./Footer"
import ListaAlunos from "./ListaAlunos";
import Botao from "./Botao"
import Alertas from "./Alertas"
import Açoes from "./Açoes"
import Card from"./Card"
function App() {
  const [count, setCount] = useState(0)

  return (

    <>
      <Header /> {}
      
      <h1>Mini Aplicação React - To-Do List</h1>
      <div className="card">
        <p>Marcio Junior</p>
      </div>
      <ListaAlunos />
      <Botao />
      <Footer /> {}
      <Alertas/>
      <Açoes/>
      <Card titulo="Tarefa 1" descricao="Estudar React" />
      <Card titulo="Tarefa 2" descricao="Enviar trabalho no GitHub" />
      <Card titulo="Tarefa 3" descricao="fazer o versionamento de cada etapa concluida"/>
      <Card titulo="Tarefa 4" descricao="enviar link do repositório do github com o arquivo README atualizado e print do projeto rodando"/>
      </>
  )
}

export default App