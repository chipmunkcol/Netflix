const API_KEY = "a96ecb105f0214953ccc67ed2055f725"
const BASE_URL = "https://api.themoviedb.org/3"

export function getTVs(){
    return fetch(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=KR&region=KR`)
            .then((res)=>res.json())
}
export function getTV(tvId?: string){
    return fetch(`${BASE_URL}/tv/${tvId}?api_key=${API_KEY}&language=KR`)
            .then((res) => res.json())
}
export function getPopularTV(){
    return fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=KR&page=2`)
            .then((res) => res.json()) 
}
export function getTOP10TV(){
    return fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=KR&page=1`)
            .then((res) => res.json())
}

export interface IresultsTV {
    'backdrop_path':string ;
    'first_air_date': string ;
    'genre_ids': number[];
    'id': number ;
    'name':  string;
    'original_language': string ;
    'original_name': string ;
    'overview': string ;
    'popularity': number ;
    'poster_path': string ;
    'vote_average': number ;
    'vote_count': number ;
}

export interface IdataTV{
'page': number;
'results': IresultsTV[]
}


export interface IdetailTVresults {
    'adult':boolean;
     'backdrop_path': string;
     'first_air_date': string;
     'genres': {
        "id": number;
        "name": string;
     }[];
     'homepage': string;
     'id': number;
     'in_production': boolean;
     'last_air_date': string;
    //  'last_episode_to_air': object;
     'name': string;
    //  'next_episode_to_air': object;
     'networks': object;
     'number_of_episodes': number;
     'number_of_seasons': number;
    //  'origin_country': object;
     'original_language': string;
     'original_name': string;
     'overview': string;
     'popularity': number;
     'poster_path': string;
    //  'seasons': object;
    //  'spoken_languages': object;
     'status': string;
     'tagline': string;
     'type': string;
     'vote_average': number;
     'vote_count': number;
}




export const genresTV = [
    {
    "id": 10759,
    "name": "액션 & 모험"
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
    "id": 10762,
    "name": "Kids"
    },
    {
    "id": 9648,
    "name": "미스터리"
    },
    {
    "id": 10763,
    "name": "News"
    },
    {
    "id": 10764,
    "name": "Reality"
    },
    {
    "id": 10765,
    "name": "Sci-Fi & Fantasy"
    },
    {
    "id": 10766,
    "name": "Soap"
    },
    {
    "id": 10767,
    "name": "Talk"
    },
    {
    "id": 10768,
    "name": "War & Politics"
    },
    {
    "id": 37,
    "name": "서부"
    }
    ]