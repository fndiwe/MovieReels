import axios from 'axios'
const URL = 'https://api.themoviedb.org/3/';
const API_KEY = "8d5fbc35563d3cb422cae3e81f8ef001";
export const fetchMovieData=async(props)=>{
    const response= await axios.get(`${URL}${props.type}/${props.category}?api_key=${API_KEY}`);
    if(response.status==200){
        return response.data.results;
     }   
    return null;
    }
    export const fetchMovieData1=async(props)=>{
        const response= await axios.get(`${URL}${props.category}/${props.media_type}/${props.time_window}?api_key=${API_KEY}`);
        if(response.status==200){
            return response.data.results;
         }   
        return null;
        }
        export const genreFetch=async(props)=>{
            const response= await axios.get(`${URL}discover/${props.media_type}?api_key=${API_KEY}&with_genres=${props.genre_id}&sort_by=release_date.desc`);
            if(response.status==200){
                return response.data.results;
             }   
            return null;
            }
            export const kidsFetch=async(props)=>{
                const response= await axios.get(`${URL}discover/${props.type}?api_key=${API_KEY}&with_genres=16&language=en-US&certification.lte=G`);
                if(response.status==200){
                    return response.data.results;
                }
                return null;
                }
                export const fetchMovieDatatv=async(props)=>{
                    const response= await axios.get(`${URL}tv/${props.category}?api_key=${API_KEY}`);
                    if(response.status==200){
                        return response.data.results;
                    }
                    return null;
                    }
                    export const fetchNewMovies=async(props)=>{
                        const response= await axios.get(`${URL}discover/${props.type}?api_key=${API_KEY}&sort_by=release_date.desc.desc&primary_release_year=${new Date().getFullYear().toString()}`);
                        if(response.status==200){
                            return response.data.results;
                        }
                        return null;
                        }