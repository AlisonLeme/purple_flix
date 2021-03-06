import { useSession } from "next-auth/react";
import { Grid, Typography, Box } from "@mui/material/";
import slugify from "slugify";

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
            variant="body1"
            component="h1"
            align="center"
            gutterBottom
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            {session ? `Bem vindo(a) ${session.user.name} !` : null}
          </Typography>
          <Box className={styles.boxTitle}>
            <Typography
              variant="h2"
              component="h1"
              textAlign={"center"}
              className={styles.title}
            >
              Filmes, séries e muito mais. Sem limites.
            </Typography>
          </Box>
        </Grid>
        {session ? null : (
          <Grid item xs={12} md={4}>
            <CardLogin title="Se inscreva para fazer parte do nosso time, e incluir conteúdo." />
          </Grid>
        )}
      </Grid>
      <Box className={styles.boxDestaques}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          color={"primary"}
        >
          Destaques
        </Typography>
        <Grid container spacing={3}>
          {movies.map((movie) => {
            const genero = slugify(movie.genero).toLowerCase();
            const movieName = slugify(movie.movieName).toLowerCase();
            return (
              <Grid key={movie._id} item xs={12} md={6} lg={4} xl={3}>
                <CardMovie
                  url={
                    session ? `/user/${genero}/${movieName}/${movie._id}` : "#"
                  }
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
