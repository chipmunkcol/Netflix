const API_KEY = "a96ecb105f0214953ccc67ed2055f725"
const BASE_URL = "https://api.themoviedb.org/3"

export function getTv(){
    return fetch(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=ko&page=1`)
            .then((res)=>res.json())
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


