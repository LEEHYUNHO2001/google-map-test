import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import axios, { Method } from 'axios';
import type { NextPage } from 'next';
import { useEffect } from 'react';

type MovieResponseModel = {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
};

const HomePage: NextPage = () => {
  const fetchMovies = async (): Promise<MovieResponseModel> => {
    const res = await axios({
      method: 'get' as Method,
      url: `api/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_APIKEY}`,
    });
    return res.data;
  };

  const { data } = useQuery<MovieResponseModel>({
    queryKey: ['movie'],
    queryFn: fetchMovies,
    onSuccess: () => {
      // 성공시 처리
    },
    onError: () => {
      // 실패시 처리
    },
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return <Container>Home</Container>;
};

const Container = styled.section`
  color: ${props => props.theme.black0};
`;

export default HomePage;
