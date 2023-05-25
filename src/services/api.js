
// Base da URL: https://api.themoviedb.org/3/
// URL: /movie/now_playing?api_key=4366f66419460d685c883143e6de6a71&language=pt-br

import axios from "axios";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/"
})

export default api;