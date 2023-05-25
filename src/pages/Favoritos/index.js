import { Link } from "react-router-dom";
import "./favoritos.css"
import { useEffect, useState } from "react"
import { toast } from "react-toastify";

export default function Favoritos() {

  const [filmes, setFilmes] = useState([])

  useEffect(() => {
    const primeflix_key = "@primeflix"
    const minhaLista = localStorage.getItem(primeflix_key)

    setFilmes(JSON.parse(minhaLista) || [])

  }, []);

  function excluirFilme(id) {
    const primeflix_key = "@primeflix"
    let filtroFilmes = filmes.filter((item) => {
      return(item.id !== id)
    })

    setFilmes(filtroFilmes)
    toast.success("Filme excluido com sucesso!!")
    localStorage.setItem(primeflix_key, JSON.stringify(filtroFilmes))
  }

  return (
    <div className="my-filmes">
      <h1>Meus Filmes</h1>

      {filmes.length === 0 && <span>Nenhum filme salvo</span>}

      <ul>
        {filmes.map((item) => {
          return (
            <li key={item.id}>
              <span className="filme-title">{item.title}</span>
              <div>
                <Link to={`/filme/${item.id}`}>Ver Detalhes</Link>
                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
