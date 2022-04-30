import {
  Grid,
  Typography,
  Box,
  Button
} from '@mui/material/';

import Modal from '@mui/material/Modal';

import FormCadastro from '../formCadastro/FormCadastro';

import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

import styles from './modalLogin.module.css'

const ModalLogin = ({ open, handleModalClose }) => {

  return (
    <div>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.box}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant='h2' component='h1' align='center'>
                <strong>Filmes, séries e muito mais. Sem limites.</strong>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} className={styles.gridForm}>
              <FormCadastro />
              <Button className={styles.btnClose} onClick={handleModalClose}>
                <CancelPresentationIcon fontSize='large'/>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalLogin
