import { useRouter } from "next/router";
import { Formik } from "formik";
import * as yup from "yup";
import { signIn } from "next-auth/react";

import useSnackBar from "../../contexts/SnackBar";

import {
  Button,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  Box,
  OutlinedInput,
} from "@mui/material";

import styles from "./formLogin.module.css";

const FormLogin = ({ email }) => {
  const router = useRouter();

  const { setSnackBar } = useSnackBar();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Campo obrigatório")
      .email("Digite um e-mail válido"),

    password: yup.string().required("Campo obrigatório"),
  });

  const hanldeFormSubmit = async (values) => {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    }).then(async ({ error }) => {
      if (error) {
        handleError();
      } else {
        handleSuccess();
      }
    });
  };

  const handleError = () => {
    setSnackBar({
      open: true,
      severity: "error",
      text: "Email ou senha inválidos",
    });
  };

  const handleSuccess = () => {
    setSnackBar({
      open: true,
      severity: "success",
      text: "Login realizado com sucesso!",
    });

    router.push("/user/myAccount");
  };

  return (
    <Formik
      initialValues={{
        email: `${email}`,
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={hanldeFormSubmit}
    >
      {({ touched, values, errors, handleChange, handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Box className={styles.boxForm}>
              <Typography
                gutterBottom
                variant="h3"
                component="h3"
                align="center"
                color={'primary'}
              >
                <strong>Fazer Login</strong>
              </Typography>

              <Typography
                gutterBottom
                variant="body1"
                component="body1"
                align="center"
                className={styles.msgSpan}
                color='primary'
              >
                Acesse a plataforma para poder assistir e incluir conteúdos
              </Typography>

              <FormControl
                className={styles.formControlCadastro}
                error={errors.email && touched.email}
              >
                <InputLabel>Email</InputLabel>
                <OutlinedInput
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  label="Email"
                />
                <FormHelperText>
                  {errors.email && touched.email ? errors.email : null}
                </FormHelperText>
              </FormControl>

              <FormControl
                className={styles.formControlCadastro}
                error={errors.password && touched.password}
              >
                <InputLabel>Senha</InputLabel>
                <OutlinedInput
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  type="password"
                  label="Senha"
                />
                <FormHelperText>
                  {errors.password && touched.password ? errors.password : null}
                </FormHelperText>
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                size="large"
                endIcon={""}
                className={styles.btnCadastrar}
              >
                Entrar
              </Button>
            </Box>
          </form>
        );
      }}
    </Formik>
  );
};

export default FormLogin;
