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
    <div className="m-4 flex flex-col">
      <div className="flex">
        <input
          className="block w-3/4 p-4 pl-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch} className=" w-1/4 bg-red-200">
          pesquisar
        </button>
      </div>

      {Object.keys(cep).length > 1 && (
        <div>
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
