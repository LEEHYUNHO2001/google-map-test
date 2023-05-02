import styled from '@emotion/styled';
import type { NextPage } from 'next';

const HomePage: NextPage = () => <Container>Home</Container>;

const Container = styled.section`
  color: ${props => props.theme.black0};
`;

export default HomePage;
