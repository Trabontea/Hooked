//https://www.freecodecamp.org/news/how-to-build-a-movie-search-app-using-react-hooks-24eb72ddfaf7/
import React, { useReducer, useEffect } from "react";
import "../App.css";
import Header from "./Header/Header";
import Movie from "./Movie/Movie";
import Search from "./Search/Search";


const MOVIE_API_URL = "https://www.omdbapi.com/?s=galaxy&apikey=3110a35";


const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};


const App = () => {
  
  //The hook takes 3 arguments, but for our use case we will be using only 2. 
  //A typical useReducer hook will look like this:
  const [state, dispatch] = useReducer(reducer, initialState);

    
  //If you’re familiar with React class lifecycle methods, 
  // you can think of useEffect Hook as componentDidMount, 
  //componentDidUpdate, and componentWillUnmount combined.
  
  useEffect(() => {
        fetch(MOVIE_API_URL)
            .then(response => response.json())
            .then(jsonResponse => {
        
            dispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.Search
        	});
      	});
  	}, []);

    const search = searchValue => {
    	dispatch({
      	type: "SEARCH_MOVIES_REQUEST"
    	});
	
        fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=3110a35`)
      	.then(response => response.json())
      	.then(jsonResponse => {
        	if (jsonResponse.Response === "True") {
          	dispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.Search
          	});
        	} else {
          	dispatch({
                type: "SEARCH_MOVIES_FAILURE",
                error: jsonResponse.Error
          	});
          }
      	});
	  };

    //deconstruction
    const { movies, errorMessage, loading } = state;

    return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;