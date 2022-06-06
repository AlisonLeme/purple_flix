import { Formik } from "formik";
import axios from "axios";
import { useRouter } from "next/router";

import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Select,
  Typography,
  MenuItem,
  Input,
} from "@mui/material";

import TemplateDefault from "../../../src/templates/Default";
import FileUpload from "../../../src/components/fileUpload";
import { initialValues, validationSchema } from "./formValues";
import useSnackBar from "../../../src/contexts/SnackBar";
import dbConnect from "../../../src/utils/dbConnect";
import MoviesModel from "../../../src/models/movies";

import styles from "./edit.module.css";

const Edit = ({ movie }) => {
  const router = useRouter();
  console.log(movie);

  const { setSnackBar } = useSnackBar();

  const formValues = {
    ...initialValues,
    movieName: movie.movieName,
    url: movie.url,
    genero: movie.genero,
    description: movie.description,
    anoLancamento: movie.anoLancamento,
    files: movie.files,
  };

  const handleFormSubmit = (values) => {
    console.log(values);
    const formData = new FormData();

    for (let i in values) {
      if (i === "files") {
        values.files.forEach((file) => {
          formData.append("files", file);
        });
      } else {
        formData.append(i, values[i]);
      }
    }

    axios
      .post(`/api/movies/edit?id=${movie._id}`, formData)
      .then(handleSuccess)
      .catch(handleError);
  };

  const handleError = () => {
    setSnackBar({
      open: true,
      severity: "error",
      text: "Erro! Tente novamente",
    });
  };

  const handleSuccess = () => {
    setSnackBar({
      open: true,
      severity: "success",
      text: "Filme Editado com sucesso!",
    });

    router.push("/user/myAccount");
  };

  return (
    <TemplateDefault>
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          touched,
          values,
          errors,
          handleChange,
          handleSubmit,
          setFieldValue,
          isSubmitting,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Container
                component="section"
                maxWidth="lg"
                className={styles.containerTitle}
              >
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  gutterBottom
                  color={"primary"}
                  className={styles.titleFilmes}
                >
                  Editar Filme
                </Typography>
                <Typography
                  component="h5"
                  variant="h5"
                  align="center"
                  color={"primary"}
                >
                  Quanto mais detalhes do filme melhor
                </Typography>
              </Container>

              <Container maxWidth="md" className={styles.boxContainer}>
                <Box className={styles.box}>
                  <Typography
                    component="h6"
                    variant="h6"
                    color="primary"
                    gutterBottom
                    className={styles.title}
                  >
                    Nome do filme
                  </Typography>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={errors.movieName && touched.movieName}
                  >
                    <InputLabel>Ex: Batman 2</InputLabel>
                    <OutlinedInput
                      name="movieName"
                      value={values.movieName}
                      onChange={handleChange}
                      label="Ex: Batman 2"
                    ></OutlinedInput>
                    <FormHelperText>
                      {errors.movieName && touched.movieName
                        ? errors.movieName
                        : null}
                    </FormHelperText>
                  </FormControl>

                  <Typography
                    component="h6"
                    variant="h6"
                    color="primary"
                    gutterBottom
                    className={styles.title}
                  >
                    Url do Filme
                  </Typography>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={errors.url && touched.url}
                  >
                    <InputLabel>
                      Ex: https://www.youtube.com/watch?v=XR6QPUw9n8c
                    </InputLabel>
                    <OutlinedInput
                      name="url"
                      value={values.url}
                      onChange={handleChange}
                      label="Ex: https://www.youtube.com/watch?v=XR6QPUw9n8c"
                    ></OutlinedInput>
                    <FormHelperText>
                      {errors.url && touched.url ? errors.url : null}
                    </FormHelperText>
                  </FormControl>

                  <Typography
                    component="h6"
                    variant="h6"
                    color="primary"
                    gutterBottom
                    className={styles.title}
                  >
                    Gênero
                  </Typography>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={errors.genero && touched.genero}
                  >
                    <InputLabel>Escolha o gênero do seu filme</InputLabel>
                    <Select
                      name="genero"
                      value={values.genero}
                      fullWidth
                      onChange={handleChange}
                      label="Escolha o gênero do seu filme"
                    >
                      <MenuItem value="Ação">Ação</MenuItem>
                      <MenuItem value="Terror">Terror</MenuItem>
                      <MenuItem value="Comedia">Comedia</MenuItem>
                      <MenuItem value="Suspense">Suspense</MenuItem>
                      <MenuItem value="Animação">Animação</MenuItem>
                      <MenuItem value="Ficção Científica">
                        Ficção Científica
                      </MenuItem>
                    </Select>
                    <FormHelperText>
                      {errors.genero && touched.genero ? errors.genero : null}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Container>

              <Container maxWidth="md" className={styles.boxContainer}>
                <Box className={styles.box}>
                  <FileUpload
                    files={values.files}
                    errors={errors.files}
                    touched={touched.files}
                    setFieldValue={setFieldValue}
                  />
                </Box>
              </Container>

              <Container maxWidth="md" className={styles.boxContainer}>
                <Box className={styles.box}>
                  <Typography
                    component="h6"
                    variant="h6"
                    color="primary"
                    gutterBottom
                    className={styles.title}
                  >
                    Descrição
                  </Typography>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={errors.description && touched.description}
                  >
                    <InputLabel>Escreva os detalhes do filme</InputLabel>
                    <OutlinedInput
                      name="description"
                      value={values.description}
                      multiline
                      rows={6}
                      onChange={handleChange}
                      variant="outlined"
                      label="Escreva os detalhes do filme"
                    />
                    <FormHelperText>
                      {errors.description && touched.description
                        ? errors.description
                        : null}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Container>

              <Container maxWidth="md" className={styles.boxContainer}>
                <Box className={styles.box}>
                  <Typography
                    component="h6"
                    variant="h6"
                    color="primary"
                    gutterBottom
                    className={styles.title}
                  >
                    Ano de lançamento
                  </Typography>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={errors.anoLancamento && touched.anoLancamento}
                  >
                    <InputLabel>Ex: 1997</InputLabel>
                    <OutlinedInput
                      name="anoLancamento"
                      value={values.anoLancamento}
                      onChange={handleChange}
                      variant="outlined"
                      label="Ex: 1997"
                    />
                    <FormHelperText>
                      {errors.anoLancamento && touched.anoLancamento
                        ? errors.anoLancamento
                        : null}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Container>

              <Container maxWidth="md">
                <Box textAlign="right">
                  <Button type="submit" variant="contained" color="primary">
                    Editar Filme
                  </Button>
                </Box>
              </Container>
            </form>
          );
        }}
      </Formik>
    </TemplateDefault>
  );
};

Edit.requireAuth = true;

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

export default Edit;
