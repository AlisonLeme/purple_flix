import {
  Grid,
  Box,
  Typography,
  Chip,
  Card,
  CardHeader,
  CardMedia,
  Avatar,
} from "@mui/material";

import TemplateDefault from "../../../../src/templates/Default";
import dbConnect from "../../../../src/utils/dbConnect";
import MoviesModel from "../../../../src/models/movies";

import styles from "./movie.module.css";

const Movie = ({ movie }) => {
  const url = movie.url;
  const urlCorreta = url.replace("watch?v=", "embed/");

  return (
    <TemplateDefault>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        className={styles.title}
        color="primary"
      >
        {` Filme de ${movie.genero} `}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={9}>
          <Box className={styles.box}>
            <Typography
              component={"h4"}
              variant={"h4"}
              color="secondary.light"
              align="center"
              sx={{ mb: 2 }}
            >
              {movie.movieName}
            </Typography>
            <iframe
              width="100%"
              height={"500px"}
              src={urlCorreta}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            ></iframe>
          </Box>
          <Box className={styles.box}>
            <Typography
              component={"span"}
              variant={"caption"}
              className={styles.ano}
              color="secondary.light"
            >
              {`Ano Lançamento: ${movie.anoLancamento}`}
            </Typography>
            <Typography
              component={"h6"}
              variant={"h6"}
              color="secondary.light"
              className={styles.titleDescription}
            >
              Descrição
            </Typography>
            <Typography
              component={"p"}
              variant={"body2"}
              className={styles.description}
              color="secondary.light"
            >
              {movie.description}
            </Typography>
            <Chip
              label={movie.genero}
              className={styles.chip}
              color="secondary"
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={3}>
          <Box className={styles.box}>
            <Typography
              component={"h4"}
              variant={"h4"}
              color="secondary.light"
              align="center"
              sx={{ mb: 2 }}
            >
              Publicado por:
            </Typography>
            <Card className={styles.card}>
              <CardHeader
                avatar={<Avatar>{movie.user.name[0]}</Avatar>}
                title={movie.user.name}
                subheader={movie.user.email}
                className={styles.cardHeader}
              />
              <CardMedia
                image={<Avatar>{movie.user.name[0]}</Avatar>}
                title={movie.user.name}
                className={styles.cardMedia}
              />
            </Card>
          </Box>
        </Grid>
      </Grid>
    </TemplateDefault>
  );
};

Movie.requireAuth = true;

export async function getServerSideProps({ query }) {
  const { id } = query;

  await dbConnect();

  const movie = await MoviesModel.findOne({ _id: id });

  return {
    props: {
      movie: JSON.parse(JSON.stringify(movie)),
    },
  };
}

export default Movie;
