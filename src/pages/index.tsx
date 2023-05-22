import styled from '@emotion/styled';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { dehydrate, useQuery } from '@tanstack/react-query';
import type { GetStaticProps, NextPage } from 'next';
import { ChangeEvent, useState } from 'react';

import { MoviesResponseModel } from '@/types/moviesResponseModel';
import { fetchMovies } from '@/utils/fetch/fetchMovies';
import { queryClient } from '@/utils/query';

const HomePage: NextPage = () => {
  const [search, setSearch] = useState('');

  const { isLoaded, loadError } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });

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

  if (isFetching || !isLoaded) {
    return <div>Loading...</div>;
  }

  if (loadError) return <div>Error loading maps</div>;

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredMovies = data?.results.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <h1>Movie App</h1>
      <SearchInput value={search} onChange={handleSearch} />
      <MovieList>
        {filteredMovies?.map(movie => (
          <MovieItem key={movie.id}>
            <h2>{movie.title}</h2>
            {/* <p>{movie.overview}</p> */}
          </MovieItem>
        ))}
      </MovieList>

      <GoogleMap
        mapContainerStyle={{ height: '400px', width: '100%' }}
        zoom={5}
        center={{ lat: 37.5665, lng: 126.978 }}
      >
        <Marker position={{ lat: 37.5665, lng: 126.978 }} />
      </GoogleMap>
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
  width: 100%;
  color: ${props => props.theme.black0};
`;
const SearchInput = styled.input`
  width: 100%;
  height: 30px;
  border: 1px solid #000000;
`;
const MovieList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  /* gap: 20px; */
`;
const MovieItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 40px;
  border: 1px solid #000000;
`;

export default HomePage;
