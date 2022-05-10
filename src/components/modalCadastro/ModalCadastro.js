
import {
  Grid,
  Typography,
  Box,
  Button,
  Card,
  CardMedia
} from '@mui/material/';

import Modal from '@mui/material/Modal';

import FormCadastro from '../formCadastro/FormCadastro';

import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

import styles from './modalCadastro.module.css'

const ModalLogin = ({ open, handleModalClose, email }) => {

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
              <Typography variant='h3' component='h3' align='center'>
                <strong>Filmes, séries e muito mais. Sem limites. Acesse a plataforma para ter mais vantagens</strong>
              </Typography>
              <Box className={styles.boxImg}>
                <img src='/images/filmes.jpg' alt='filmes'></img>
              </Box>
            </Grid>

            <Grid item xs={12} md={6} className={styles.gridForm}>
              <FormCadastro email={email}/>
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
