import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError, Method } from 'axios';
import type { NextPage } from 'next';
import { useEffect } from 'react';

const HomePage: NextPage = () => {
  const fetchMovies = async () => {
    try {
      const res = await axios({
        method: 'get' as Method,
        url: `api/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_APIKEY}`,
      });
      return res;
    } catch (error) {
      const err = error as AxiosError;
      return err;
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ['movie'],
    queryFn: fetchMovies,
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [isLoading]);

  return <Container>Home</Container>;
};

const Container = styled.section`
  color: ${props => props.theme.black0};
`;

export default HomePage;
