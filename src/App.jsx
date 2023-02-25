import React, { useState } from "react";
import { Header, SearchBar, MovieDetails, MoviesList } from "./components";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
	const [query, setQuery] = useState("");
	const [movies, setMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);

	const navigate = useNavigate();

	const searchMovies = async (searchTerm, e) => {
		e.preventDefault();
		const url = `https://api.themoviedb.org/3/search/movie?api_key=b56058299cbea0093f5ccfb9e43c52a4&language=en-US&query=${searchTerm}}&page=1&include_adult=false`;
		const response = await fetch(url);
		const data = await response.json();
		if (data.results) {
			setMovies(data.results);
			setSelectedMovie(null);
		} else {
			setMovies([]);
			setSelectedMovie(null);
			alert("No movie Found!!");
		}
	};

	const onMovieClick = async (movie) => {
		navigate(`${movie.id}`);
		setSelectedMovie(movie);
	};

	const clearSelectedMovie = () => {
		setSelectedMovie(null);
	};

	return (
		<div className='App'>
			<Routes>
				<Route
					path='/'
					element={
						<>
							<Header />
							<SearchBar
								onSearch={searchMovies}
								query={query}
								setQuery={setQuery}
							/>

							<MoviesList movies={movies} onMovieClick={onMovieClick} />
						</>
					}
				/>
				<Route
					path=':movieId'
					element={
						<MovieDetails
							selectedMovie={selectedMovie}
							onBackClick={clearSelectedMovie}
						/>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
