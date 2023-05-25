import api from "../../services/api"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./filme.css"
import { toast } from "react-toastify"

export default function Filme() {

  const { id } = useParams()
  const [filme, setFilme] = useState({})
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {

    async function loadFilme() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: "4366f66419460d685c883143e6de6a71",
          language: "pt-BR",
        }
      })
        .then((response) => {
          setFilme(response.data)
          setLoading(false)
        })
        .catch(() => {
          navigate("/", { replace: true})
        })
    }

    loadFilme()

  }, [id, navigate])

  function salvarFilme(){

    const primeflix_key = "@primeflix"
    const minhaLista = localStorage.getItem(primeflix_key)

    let filmesSalvos = JSON.parse(minhaLista) || [];
    const hasFilmes = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

    if(hasFilmes){
      toast.warning("O filme já existe na sua lista!")
      return;
    }

    filmesSalvos.push(filme)
    localStorage.setItem(primeflix_key, JSON.stringify(filmesSalvos))
    toast.success("Filme salvo com sucesso!")

  }




  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className="btns">
        <a onClick={salvarFilme}>Salvar</a>
        <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
      </div>
    </div>
  )
}
