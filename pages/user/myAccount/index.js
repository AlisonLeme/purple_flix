import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import slugify from "slugify";
import { getSession } from "next-auth/react";

import { Button, Grid, Typography, Box } from "@mui/material";

import TemplateDefault from "../../../src/templates/Default";

import CardMovie from "../../../src/components/cardMovie/CardMovie";
import dbConnect from "../../../src/utils/dbConnect";
import MoviesModel from "../../../src/models/movies";
import ModalConfirm from "../../../src/components/modalConfirm/ModalConfirm";

import styles from "./myAccount.module.css";

const MyAccount = ({ movies }) => {
  const [openModal, setOpenModal] = useState(false);
  const [movieId, setMovieId] = useState();
  const [removeMovies, setRemoveMovies] = useState([]);

  const handleClickRemove = (movieId) => {
    setMovieId(movieId);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleConfirmRemove = () => {
    axios
      .delete("/api/movies/delete", {
        data: {
          id: movieId,
        },
      })
      .then(handleSuccess)
      .catch(handleError);
  };

  const handleSuccess = () => {
    handleClose();
    setRemoveMovies([...removeMovies, movieId]);
  };

  const handleError = () => {
    handleClose();
  };

  return (
    <TemplateDefault>
      <Box className={styles.boxFilmes}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          className={styles.titleFilmes}
        >
          Meus Filmes
        </Typography>
        <Link href="/user/publish" passHref>
          <Button variant="contained" color="primary" className={styles.boxBtn}>
            Publicar filme
          </Button>
        </Link>
      </Box>

      <Grid container spacing={3} className={styles.gridCard}>
        {movies.lennth === 0 && (
          <Typography
            component="div"
            variant="body1"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Nenhum filme publicado
          </Typography>
        )}
        {movies.map((movie) => {
          if (removeMovies.includes(movie._id)) {
            return null;
          }
          const genero = slugify(movie.genero).toLowerCase();
          const movieName = slugify(movie.movieName).toLowerCase();
          return (
            <Link
              key={movie._id}
              href={`/user/${genero}/${movieName}/${movie._id}`}
              passHref
            >
              <Grid item xs={12} md={6} lg={4} xl={3}>
                <CardMovie
                  url={`/user/${genero}/${movieName}/${movie._id}`}
                  img={`/uploads/${movie.files[0].name}`}
                  title={movie.movieName}
                  nome={movie.user.name}
                  data={movie.anoLancamento}
                  genero={movie.genero}
                  updatedAt={movie.updatedAt}
                  actions={
                    <>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleClickRemove(movie._id)}
                      >
                        Remover
                      </Button>
                    </>
                  }
                />
              </Grid>
            </Link>
          );
        })}
      </Grid>
      <ModalConfirm
        title="Deseja realmente remover este filme ?"
        content="Ao confirmar a operação não será possivel voltar atrás"
        handleConfirm={handleConfirmRemove}
        open={openModal}
        handleClose={handleClose}
      />
    </TemplateDefault>
  );
};

MyAccount.requireAuth = true;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  await dbConnect();
  let movies = [];

  if (session) {
    movies = await MoviesModel.find({ "user.id": session.userId });
  }

  return {
    props: {
      movies: JSON.parse(JSON.stringify(movies)),
    },
  };
}

export default MyAccount;
