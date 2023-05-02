import styled from '@emotion/styled';
import type { NextPage } from 'next';

const Home: NextPage = () => <Container>Home</Container>;

const Container = styled.section`
  color: ${props => props.theme.black0};
`;

export default Home;
