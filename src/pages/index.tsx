import styled from '@emotion/styled';
import { dehydrate, useQuery } from '@tanstack/react-query';
import type { GetStaticProps, NextPage } from 'next';

import { MoviesResponseModel } from '@/types/moviesResponseModel';
import { fetchMovies } from '@/utils/fetch/fetchMovies';
import { queryClient } from '@/utils/query';

const HomePage: NextPage = () => {
  const { data, isFetching } = useQuery<MoviesResponseModel>({
    queryKey: ['movies'],
    queryFn: fetchMovies,
    onSuccess: () => {
      // 성공시 처리
    },
    onError: error => {
      // 실패시 처리
      console.error(error);
    },
  });

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h1>Movie App</h1>
      {data?.results.map(movie => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
        </div>
      ))}
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  await queryClient.prefetchQuery<MoviesResponseModel>({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Container = styled.section`
  color: ${props => props.theme.black0};
`;

export default HomePage;
