import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import slugify from "slugify";
import { getSession } from "next-auth/react";
import Router, { useRouter } from "next/router";

import { Button, Grid, Typography, Box } from "@mui/material";

import TemplateDefault from "../../../src/templates/Default";

import CardMovie from "../../../src/components/cardMovie/CardMovie";
import dbConnect from "../../../src/utils/dbConnect";
import MoviesModel from "../../../src/models/movies";
import ModalConfirm from "../../../src/components/modalConfirm/ModalConfirm";
import useSnackBar from "../../../src/contexts/SnackBar";

import styles from "./myAccount.module.css";

const MyAccount = ({ movies }) => {
  const router = useRouter();
  const [openModalRemove, setOpenModalRemove] = useState({
    open: false,
    title: "Deseja realmente remover este filme ?",
    content: "Ao confirmar a operação não será possivel voltar atrás",
  });
  const [openModalEdit, setOpenModalEdit] = useState({
    open: false,
    title: "Deseja realmente editar este filme ?",
    content: "Ao confirmar você será redirecionado para página de editar",
  });
  const [movieId, setMovieId] = useState();
  const [removeMovies, setRemoveMovies] = useState([]);
  const { setSnackBar } = useSnackBar();
  console.log(openModalRemove);

  const handleClickRemove = (movieId) => {
    setMovieId(movieId);
    setOpenModalRemove({ ...openModalRemove, open: true });
  };

  const handleClickEdit = (movieId) => {
    setMovieId(movieId);
    setOpenModalEdit({ ...openModalEdit, open: true });
  };

  const handleClose = () => {
    setOpenModalRemove({ ...openModalRemove, open: false });
    setOpenModalEdit({ ...openModalEdit, open: false });
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

  const handleConfirmEdit = () => {
    router.push(`/user/edit/${movieId}`);
  };

  const handleSuccess = () => {
    setSnackBar({
      open: true,
      severity: "success",
      text: "Filme removido com sucesso!",
    });
    handleClose();
    setRemoveMovies([...removeMovies, movieId]);
  };

  const handleError = () => {
    setSnackBar({
      open: true,
      severity: "error",
      text: "Erro! Tente novamente",
    });
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
          color="primary"
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
            <Grid key={movie._id} item xs={12} md={6} lg={4} xl={3}>
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
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => handleClickEdit(movie._id)}
                    >
                      Editar
                    </Button>
                  </>
                }
              />
            </Grid>
          );
        })}
      </Grid>
      <ModalConfirm
        title={openModalRemove.title}
        content={openModalRemove.content}
        handleConfirm={handleConfirmRemove}
        open={openModalRemove.open}
        handleClose={handleClose}
      />
      <ModalConfirm
        title={openModalEdit.title}
        content={openModalEdit.content}
        handleConfirm={handleConfirmEdit}
        open={openModalEdit.open}
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
