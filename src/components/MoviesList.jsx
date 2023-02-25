import styled from "styled-components";

const MoviesListContainer = styled.div`
	padding: 0 5rem;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
`;

const MovieItem = styled.div`
	display: grid;
	grid-template-rows: 85% 15%;
	align-items: center;
	justify-items: center;
	margin: 1.2rem;
	max-width: 15rem;
	max-height: 25rem;
	background-color: black;
	box-shadow: 0 0 1rem black;
	border-radius: 5px;
	&:hover {
		cursor: pointer;
		box-shadow: 0 0 1rem white;
	}
`;

const MoviePoster = styled.img`
	padding: 10px 1rem;
	max-width: 90%;
`;

const AboutMovie = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	border-radius: 0 0 5px 5px;
	background-color: rgb(50, 50, 50);
`;

const MovieTitle = styled.h3`
	padding: 0 1rem;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	font-size: 1.2rem;
	font-weight: bold;
	width: 100%;
`;

export const MoviesList = ({ movies, onMovieClick }) => {
	return (
		<MoviesListContainer>
			{movies.map((movie) => (
				<MovieItem key={movie.id} onClick={() => onMovieClick(movie)}>
					<MoviePoster
						src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
						alt={`${movie.title} poster`}
					/>
					<AboutMovie>
						<MovieTitle>{movie.title}</MovieTitle>
					</AboutMovie>
				</MovieItem>
			))}
		</MoviesListContainer>
	);
};
