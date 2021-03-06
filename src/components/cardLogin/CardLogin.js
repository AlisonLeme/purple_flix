import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  FormControl,
  Input,
  FormHelperText,
  InputLabel,
  formLabelClasses,
} from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import ModalCadastro from "../modalCadastro/ModalCadastro";

import styles from "./Card.module.css";

const CardLogin = ({ title }) => {
  const [open, setOpen] = useState(false);
  const [isSuccess, SetIsSuccess] = useState()

  const handleModalOpen = async (values) => {
    const res = await axios.post("/api/userVerify", values);

    if (res.data.success) {
      SetIsSuccess(true)
    } else {
      SetIsSuccess(false)
    }

    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Campo obrigatório")
      .email("Digite um e-mail válido"),
  });

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleModalOpen}
    >
      {({ touched, values, errors, handleChange, handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Card sx={{ maxWidth: 345 }} className={styles.card}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" color={'primary'}>
                  {title}
                </Typography>
                <FormControl
                  fullWidth
                  className={styles.formEmail}
                  error={errors.email}
                >
                  <InputLabel>Email</InputLabel>
                  <Input
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  <FormHelperText>{errors.email}</FormHelperText>
                </FormControl>
              </CardContent>
              <CardActions>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  className={styles.btn}
                  endIcon={<ArrowForwardIcon />}
                  disabled={values.email == "" || errors.email ? true : false}
                >
                  Continuar
                </Button>
              </CardActions>
            </Card>
            <ModalCadastro
              open={open}
              handleModalClose={handleModalClose}
              email={values.email}
              isSuccess={isSuccess}
            />
          </form>
        );
      }}
    </Formik>
  );
};

export default CardLogin;
