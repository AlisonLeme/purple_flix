import { useState } from 'react';
import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
    TextField
} from '@mui/material';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import ModalLogin from '../modalLogin/ModalLogin';

import styles from './Card.module.css'

const CardLogin = ({ title }) => {
    const [open, setOpen] = useState(false);

    const handleModalOpen = () => {
        setOpen(true);
    }

    const handleModalClose = () => {
        setOpen(false);
    }
    
    return (
        <>
            <Card sx={{ maxWidth: 345 }} className={styles.card}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    { title }
                </Typography>
                <TextField id="standard-basic" label="Digite o seu e-mail" variant="standard" className={styles.textField}/>
            </CardContent>
            <CardActions>
                <Button 
                    variant='contained' 
                    size="large" 
                    className={styles.btn} 
                    endIcon={<ArrowForwardIcon />}
                    disabled={false}
                    onClick={handleModalOpen}
                >Continuar
                </Button>
            </CardActions>
            </Card>
            <ModalLogin open={open} handleModalClose={handleModalClose}/>
        </>
    );
}

export default CardLogin