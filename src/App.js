import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavourites from './components/RemoveFavourites';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue,setSearchValue]=useState('');
  const [favourites,setFavourites]=useState([]);

  const getMovieRequest= async()=>{
    const url=`http://www.omdbapi.com/?s=${searchValue}&apikey=bcfd5eb8`;

    const response= await fetch(url);
    const responseJson= await response.json();
    
    if(responseJson.Search){

      setMovies(responseJson.Search);
    }
  }

  useEffect(()=>{
    getMovieRequest();
  },[searchValue]);

  useEffect(()=>{
    const movieFavourites= JSON.parse(localStorage.getItem('react-movie-app-favourites'));

    setFavourites(movieFavourites);
  },[])

  const saveToLocalStorage=(items)=>{
        localStorage.setItem('react-movie-app-favourites',JSON.stringify(items));
  }

  const addFavouriteMovie=(movie)=>{
    let newFavouriteList =[movie];
      if(favourites && favourites.includes(movie))return;
      else
       newFavouriteList=[...favourites,movie];
     
      setFavourites(newFavouriteList);
      console.log(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
  }

  const removeFavouriteMovie=(movie)=>{
    const newFavouriteList= favourites.filter(
      (favourite)=>favourite.imdbID !== movie.imdbID 
    )

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  return (
    <>
     
    <div className='container-fluid movie-app'>
        <div className='c1'>
            <div className='movie'>
              <MovieListHeading heading='Movies'/>
              <img src="https://i.pinimg.com/564x/45/b3/9b/45b39ba5710e0cb1659956267d124d9c.jpg" className='logo' alt="movie logo"/>
            </div>
            
            
            <div className='search'>
              <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div>

        </div>
        <div className='row list-container'>
            <MovieList movies={movies} handleFavouritesClick={addFavouriteMovie} favouriteComponent= { AddFavorites }/>  
        </div>

        <div className=' d-flex align-items-center mt-4 mb-4'>
            <MovieListHeading heading='Favourites'/>
        </div>
        <div className='row list-container'>
            <MovieList movies={favourites} handleFavouritesClick={removeFavouriteMovie} favouriteComponent= { RemoveFavourites }/>  
        </div>
    </div>
    <div  className='container-fluid movie-app'>
        
    </div>
    </>
  );
}

export default App;
