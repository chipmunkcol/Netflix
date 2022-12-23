const API_KEY = "a96ecb105f0214953ccc67ed2055f725"
const BASE_URL = "https://api.themoviedb.org/3"

export function getMovies() {
    return fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`)
            .then((res) => res.json())
}

export function getPosterImg(poster_path : string) {
    return `https://image.tmdb.org/t/p/original${poster_path}`
}



interface Iresults {
"backdrop_path": string;
"id": number;
"overview": string;
"popularity": number;
"poster_path": string;
"release_date": string;
"title": string;
"video": boolean;
"vote_average": number;
"vote_count": number;
}

export interface Idata {
    dates: {
        "maximum": string;
        "minimum": string;
        },
        "page": number;
        "results": Iresults[];
}