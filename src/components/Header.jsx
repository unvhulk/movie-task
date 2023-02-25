import styled from "styled-components";
const Heading = styled.header`
	display: flex;
	justify-content: center;
	font-size: 3.5rem;
	font-weight: 600;
	margin-bottom: 1rem;
`;
export const Header = () => {
	return <Heading>Movie Mania</Heading>;
};
