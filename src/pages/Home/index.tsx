import Button from '@mui/material/Button';
import React from 'react';
import Section from '../../components/Section';
import '../../theme/home.css';

const Home: React.FunctionComponent = () => (
  <body>
    <Section>
      <Button variant="contained">Criar novo usuário</Button>
      <Button variant="contained">Listar usuários</Button>
    </Section>
  </body>
);

export default Home;
