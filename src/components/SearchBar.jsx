import styled from "styled-components";

const SearchForm = styled.form`
	display: grid;
`;
const SearchInput = styled.input`
	display: flex;
	justify-self: center;
	width: 60vw;
	height: 2.5rem;
	padding: 5px 10px;
	font-size: 1rem;
	background-color: white;
	border-radius: 5px;
	border: 1px solid white;
`;

export const SearchBar = ({ query, setQuery, onSearch }) => {
	return (
		<SearchForm onSubmit={(e) => onSearch(query, e)}>
			<SearchInput
				id='query'
				type='text'
				placeholder='Search for a Movie...'
				value={query}
				onChange={(event) => setQuery(event.target.value)}
			/>
		</SearchForm>
	);
};
