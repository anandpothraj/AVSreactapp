import React , {useState, useEffect} from 'react' ;
import Movie from './components/Movie';

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1da65723b2764bbb257611a20829c74f&page=1";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=1da65723b2764bbb257611a20829c74f&query=";

function App (){
    const [ movies , setMovies ] = useState([]);
    const [ searchTerm , setSearchTerm ] = useState("");

    useEffect(() => {
        getMovies(FEATURED_API);
    },[]);

    const getMovies = (API) => {
        fetch(API)
            .then((res) => res.json())
            .then((data) => {
                setMovies(data.results);
            });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if(searchTerm) {
            getMovies(SEARCH_API + searchTerm);

            setSearchTerm("");
        }
    };

    const handleOnChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const url = "";


    return(
        <>
        <header>
            <h3 className="title"><a href={url}>AVS</a></h3>
            <form onSubmit={handleOnSubmit}>
                <input type="search" placeholder="Search..." value={searchTerm} className="search" onChange={handleOnChange}/>
            </form>
        </header>
        <div className="movie-container">
            {movies.length > 0 &&  
                movies.map((movie) => <Movie key=
                {movie.id} {...movie}/> )}
        </div>
        </>
    );
};

export default App;