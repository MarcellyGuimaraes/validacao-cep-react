import axios from 'axios'
import { useState } from 'react'
import api from './api'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch() {
    if (searchQuery === '') {
      return
    }

    try {
      const response = await api.get(`/${searchQuery}/json`)
      if (Object.keys(response.data).length === 1) {
        alert('Esse cep não existe, verifique e tente novamente :(')
      }
      setCep(response.data)
      setSearchQuery('')
    } catch {
      alert('Digite um cep válido!')
      setSearchQuery('')
    }
  }

  return (
    <div className="flex h-screen font-mono flex-col bg-gradient-to-t from-slate-900 to-sky-900 py-16">
      <h1 className="mb-11 text-center text-2xl font-bold text-white">
        Buscador de cep
      </h1>
      <div className="flex flex-col justify-center md:flex-row">
        <input
          className="mx-14 block border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 md:m-0"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="mx-14 mt-3 bg-zinc-400 p-3 text-white md:m-0 md:p-0"
        >
          pesquisar
        </button>
      </div>

      {Object.keys(cep).length > 1 && (
        <div className="mx-5 mt-12 self-center bg-white p-6">
          <p>Cep: {cep.cep}</p>
          <p>Estado: {cep.uf}</p>
          <p>Cidade: {cep.localidade}</p>
          <p>Logradouro: {cep.logradouro}</p>
        </div>
      )}
    </div>
  )
}

export default App
