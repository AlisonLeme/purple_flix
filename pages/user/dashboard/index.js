import Link from "next/link";
import { useSession } from "next-auth/react";
import slugify from "slugify";

import { Button, Grid, Typography, Box } from "@mui/material";

import TemplateDefault from "../../../src/templates/Default";

import CardMovie from "../../../src/components/cardMovie/CardMovie";
import dbConnect from "../../../src/utils/dbConnect";
import MoviesModel from "../../../src/models/movies";

import styles from "./dashboard.module.css";

const Dashboard = ({ movies }) => {
  const { data: session } = useSession();
  console.log(movies);

  return (
    <TemplateDefault>
      <Box className={styles.boxFilmes}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          className={styles.boxFilmes}
        >
          Assista filmes
        </Typography>
        <Link href="/user/publish" passHref>
          <Button variant="contained" color="primary" className={styles.boxBtn}>
            Publicar filme
          </Button>
        </Link>
      </Box>

      <Grid container spacing={3} className={styles.gridCard}>
        {movies.map((movie) => {
          const genero = slugify(movie.genero).toLowerCase();
          const movieName = slugify(movie.movieName).toLowerCase();
          return (
            <Grid key={movie._id} item xs={12} md={6} lg={4} xl={3}>
              <CardMovie
                url={`/user/${genero}/${movieName}/${movie._id}`}
                img={`/uploads/${movie.files[0].name}`}
                title={movie.movieName}
                nome={movie.user.name}
                data="13/05/2022"
              />
            </Grid>
          );
        })}
      </Grid>
    </TemplateDefault>
  );
};

Dashboard.requireAuth = true;

export async function getServerSideProps({ req }) {
  await dbConnect();

  const movies = await MoviesModel.aggregate([
    {
      $sample: { size: 20 },
    },
  ]);

  return {
    props: {
      movies: JSON.parse(JSON.stringify(movies)),
    },
  };
}

export default Dashboard;
