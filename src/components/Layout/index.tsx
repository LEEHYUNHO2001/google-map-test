import styled from '@emotion/styled';
import { ReactNode } from 'react';

import { Header } from './Header';

interface Children {
  children: ReactNode;
}

export const Layout = ({ children }: Children) => (
  <Container>
    <Header />
    <main>{children}</main>
  </Container>
);

const Container = styled.section``;
