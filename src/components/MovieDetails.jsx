import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MovieDetailsWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	margin: 1rem;
	border: 1px solid gray;
	background-color: black;
`;

const MovieDetailsImg = styled.img`
	height: 20rem;
`;

const MovieDetailsInfo = styled.div`
	display: flex;
	flex-direction: column;
	margin: 1rem;
`;

const MovieDetailsTitle = styled.h2`
	font-size: 2rem;
	margin-bottom: 1rem;
`;

const MovieDetailsOverview = styled.p`
	font-size: 1.2rem;
	margin-bottom: 1rem;
`;

const MovieReleaseDate = styled.div``;

const MovieRatings = styled.div``;

const ViewCountWrapper = styled.div`
	margin-top: 1rem;
`;

const BottomWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
`;

const LikeButton = styled.button`
	margin-top: 1rem;
	background-color: ${(props) => (props.liked ? "red" : "green")};
	color: white;
	font-size: 1rem;
	padding: 0.5rem 1rem;
	border-radius: 5px;
	border: none;
	cursor: pointer;
`;

const CloseButton = styled.button`
	margin-top: 1rem;
	background-color: gray;
	color: white;
	font-size: 1rem;
	padding: 0.5rem 1rem;
	border-radius: 5px;
	border: none;
	cursor: pointer;
`;

export const MovieDetails = ({ selectedMovie }) => {
	const [movies, setMovies] = useState(
		() => JSON.parse(localStorage.getItem("likedMovies")) ?? []
	);
	const [liked, setLiked] = useState(() => {
		const likedMovies = JSON.parse(localStorage.getItem("likedMovies")) || [];
		return likedMovies.some((likedMovie) => likedMovie.id === selectedMovie.id);
	});
	const [viewCount, setViewCount] = useState(
		JSON.parse(localStorage.getItem("views")) || 0
	);
	const navigate = useNavigate();

	const handleViewCount = () => {
		setViewCount(viewCount + 1);
		const obj = localStorage.getItem("views") ?? {};
		console.log(obj);
		const newObj = { ...obj };
		console.log(newObj);
		newObj[selectedMovie.id] = viewCount + 1;
		localStorage.setItem("views", JSON.stringify(newObj));
	};

	const handleLikeButtonClick = () => {
		const index =
			movies?.findIndex((movie) => movie.id === selectedMovie.id) ?? -1;
		if (index > -1) {
			setLiked(false);
			setMovies((prev) => prev.splice(index, 1));
			localStorage.setItem(
				"likedMovies",
				JSON.stringify(movies.filter((movie) => movie.id !== selectedMovie.id))
			);
		} else {
			setLiked(true);
			localStorage.setItem(
				"likedMovies",
				JSON.stringify([].concat(movies, { id: selectedMovie.id }))
			);
			setMovies((movies) => [...movies, { id: selectedMovie.id }]);
		}
	};

	useEffect(() => {
		handleViewCount();
	}, []);

	return (
		<>
			<MovieDetailsWrapper>
				<MovieDetailsImg
					src={`https://image.tmdb.org/t/p/w300${selectedMovie.backdrop_path}`}
					alt={selectedMovie.title}
				/>
				<MovieDetailsInfo>
					<MovieDetailsTitle>{selectedMovie.title}</MovieDetailsTitle>
					<MovieDetailsOverview>{selectedMovie.overview}</MovieDetailsOverview>
					<MovieReleaseDate>{selectedMovie.release_date}</MovieReleaseDate>
					<MovieRatings></MovieRatings>
					<ViewCountWrapper>View Count: {viewCount}</ViewCountWrapper>
					<BottomWrapper>
						<LikeButton liked={liked} onClick={handleLikeButtonClick}>
							{liked ? "Unlike" : "Like"}
						</LikeButton>
						<CloseButton onClick={() => navigate("/")}>Close</CloseButton>
					</BottomWrapper>
				</MovieDetailsInfo>
			</MovieDetailsWrapper>
		</>
	);
};
