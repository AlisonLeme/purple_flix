import { Grid, Typography, Box, Button } from "@mui/material/";

import Modal from "@mui/material/Modal";

import FormCadastro from "../formCadastro/FormCadastro";
import FormLogin from "../formLogin/FormLogin";

import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

import styles from "./modalCadastro.module.css";

const ModalLogin = ({ open, handleModalClose, email, isSuccess }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.box}>
          <Grid container spacing={2} className={styles.grid}>
            <Grid item xs={12} md={6} className={styles.gridInfo}>
              <Typography
                variant="h3"
                component="h3"
                align="center"
                color="secondary.light"
                sx={{ fontWeight: "bold" }}
              >
                Filmes, séries e muito mais. Sem limites. Acesse a plataforma
                para ter mais vantagens
              </Typography>
              <Box className={styles.boxImg}>
                <img src="/images/filmes.jpg" alt="filmes"></img>
              </Box>
            </Grid>

            <Grid item xs={12} md={6} className={styles.gridForm}>
              {isSuccess ? (
                <FormLogin email={email} />
              ) : (
                <FormCadastro email={email} />
              )}
              <Button className={styles.btnClose} onClick={handleModalClose}>
                <CancelPresentationIcon fontSize="large" />
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalLogin;
