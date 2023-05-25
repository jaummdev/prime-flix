import { useEffect, useState } from "react"
import api from "../../services/api"
import "./home.css"
import { Link } from "react-router-dom"

// URL: /movie/now_playing?api_key=4366f66419460d685c883143e6de6a71&language=pt-br

export default function Home() {

  const [filmes, setFilmes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "4366f66419460d685c883143e6de6a71",
          language: "pt-BR",
          page: 1,
        }
      })

      // console.log(response.data.results.slice(0, 10))
      setFilmes(response.data.results)
    }

    loadFilmes()
    setLoading(false)

  }, [])

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando Filmes...</h2>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return (
            <article key={filme.id} title="Acessar">
              <Link to={`/filme/${filme.id}`}>
                <strong>{filme.title}</strong>
                <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
              </Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}
