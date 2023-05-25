import { Link } from "react-router-dom"
import "./header.css"
import { MdOutlineFavoriteBorder as Heart } from "react-icons/md"

export default function Header() {
  return (
    <header>
      <Link className="logo" to="/"><span>Prime</span><span>Flix</span></Link>
      <Link className="favorites" to="/favoritos">
        <Heart size={25} color="#fff"/>
        Favoritos
      </Link>
    </header>
  )
}
