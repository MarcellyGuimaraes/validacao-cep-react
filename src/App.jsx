import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [cep, setCep] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredList, setFilteredList] = useState(null)

  const handleChange = (event) => {
    const query = event.target.value
    setSearchQuery(query)
  }
  const handleSearch = () => {
    const searchList = axios
      .get(`https://viacep.com.br/ws/${searchQuery}/json/`)
      .then((response) => {
        setCep(response.data)
      })
      .catch((error) => {
        console.log('erro', error)
      })

    setFilteredList(searchList)
  }

  return (
    <div className="m-4">
      <input
        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleChange}
      />
      <button onClick={handleSearch} className="p-1 bg-red-200">
        teste
      </button>

      {cep ? console.log(cep) : ''}
    </div>
  )
}

export default App
