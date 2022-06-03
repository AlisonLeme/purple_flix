import { useSession } from "next-auth/react";
import { Grid, Typography, Box } from "@mui/material/";

import TemplateDefault from "../src/templates/Default";
import CardLogin from "../src/components/cardLogin/CardLogin";
import dbConnect from "../src/utils/dbConnect";
import MoviesModel from "../src/models/movies";
import CardMovie from "../src/components/cardMovie/CardMovie";
import Carrossel from "../src/components/carousel";

import styles from "../styles/index.module.css";

const Home = ({ movies }) => {
  const { data: session } = useSession();

  return (
    <TemplateDefault>
      <Grid container spacing={2}>
        <Grid item xs={12} md={session ? 12 : 8}>
          <Typography
            variant="h2"
            component="h1"
            align="center"
            gutterBottom
            color="primary"
          >
            {session ? (
              <strong>Bem vindo(a) {session.user.name} !</strong>
            ) : null}
          </Typography>
          <Typography variant="h2" component="h1" align="center">
            <strong>Filmes, séries e muito mais. Sem limites.</strong>
          </Typography>
          <Typography variant="h4" component="h4" align="center">
            Assista onde quiser. Sem pagar nada!
          </Typography>
        </Grid>
        {session ? null : (
          <Grid item xs={12} md={4}>
            <CardLogin title="Se increva para fazer parte do nosso time, e incluir conteúdo." />
          </Grid>
        )}
      </Grid>
      <Box className={styles.boxDestaques}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          <strong>Destaques</strong>
        </Typography>
        <Grid container spacing={3}>
          {movies.map((movie) => {
            return (
              <Grid key={movie._id} item xs={12} md={6} lg={4} xl={3}>
                <CardMovie
                  img={`/uploads/${movie.files[0].name}`}
                  title={movie.movieName}
                  nome={movie.user.name}
                  data={movie.anoLancamento}
                  genero={movie.genero}
                  updatedAt={movie.updatedAt}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Box className={styles.boxCarrossel}>
        <Carrossel />
      </Box>
    </TemplateDefault>
  );
};

export async function getServerSideProps({ req }) {
  await dbConnect();

  const movies = await MoviesModel.aggregate([
    {
      $sample: { size: 8 },
    },
  ]);

  return {
    props: {
      movies: JSON.parse(JSON.stringify(movies)),
    },
  };
}

export default Home;
