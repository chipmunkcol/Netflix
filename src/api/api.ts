const API_KEY = "a96ecb105f0214953ccc67ed2055f725"
const BASE_URL = "https://api.themoviedb.org/3"

export function getMovies() {
    return fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=ko`)
            .then((res) => res.json())
}
export function getMovie(movie_id?: string) {
    return fetch(`${BASE_URL}/movie/${movie_id}?api_key=${API_KEY}&language=ko`)
            .then((res) => res.json())
}

export function getPosterImg(poster_path: string, size?: string ) {
    return `https://image.tmdb.org/t/p/${size?size:"original"}${poster_path}`
}

export function searchMovie(search:string) {
    return fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=ko&query=${search}`)
            .then((res) => res.json())
}

export function getPopularMovie(){
    return fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko&page=2`)
            .then((res) => res.json())
}

export function getTopMovie(){
    return fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=ko&page=1`)
            .then((res) => res.json())
}

export const getGenre = [
    {
    "id": 28,
    "name": "액션"
    },
    {
    "id": 12,
    "name": "모험"
    },
    {
    "id": 16,
    "name": "애니메이션"
    },
    {
    "id": 35,
    "name": "코미디"
    },
    {
    "id": 80,
    "name": "범죄"
    },
    {
    "id": 99,
    "name": "다큐멘터리"
    },
    {
    "id": 18,
    "name": "드라마"
    },
    {
    "id": 10751,
    "name": "가족"
    },
    {
    "id": 14,
    "name": "판타지"
    },
    {
    "id": 36,
    "name": "역사"
    },
    {
    "id": 27,
    "name": "공포"
    },
    {
    "id": 10402,
    "name": "음악"
    },
    {
    "id": 9648,
    "name": "미스터리"
    },
    {
    "id": 10749,
    "name": "로맨스"
    },
    {
    "id": 878,
    "name": "SF"
    },
    {
    "id": 10770,
    "name": "TV 영화"
    },
    {
    "id": 53,
    "name": "스릴러"
    },
    {
    "id": 10752,
    "name": "전쟁"
    },
    {
    "id": 37,
    "name": "서부"
    }
]


export interface Iresults {
"genre_ids": number[];
"adult": boolean;
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

export interface IDetailresults {
    "genres": {
        "id": number;
        "name": string;
    }[];
    "adult": boolean;
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
    "runtime": number;
    }