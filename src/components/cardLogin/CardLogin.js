import { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup'

import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
    FormControl,
    Input,
    FormHelperText,
    InputLabel
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

    const validationSchema = yup.object().shape({
        email: yup.string()
            .required('Campo obrigatório')
            .email('Digite um e-mail válido')
    })
    
    return (
        <Formik
            initialValues={{
                email: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log('enviado', values)
                handleModalOpen()
            }}
        >
            {
                ({
                    touched,
                    values,
                    errors,
                    handleChange,
                    handleSubmit,
                }) => {

                    return (
                        <form onSubmit={handleSubmit}>
                            <Card sx={{ maxWidth: 345 }} className={styles.card}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        { title }
                                    </Typography>
                                    <FormControl fullWidth className={styles.formEmail} error={errors.email}>
                                        <InputLabel>Email</InputLabel>
                                        <Input 
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                        />
                                        <FormHelperText>
                                            { errors.email }
                                        </FormHelperText>
                                    </FormControl>

                                </CardContent>
                                <CardActions>
                                    <Button 
                                        type='submit'
                                        variant='contained' 
                                        size="large" 
                                        className={styles.btn} 
                                        endIcon={<ArrowForwardIcon />}
                                        disabled={ values.email == '' || errors.email ? true : false }
                                    >Continuar
                                    </Button>
                                </CardActions>
                            </Card>
                            <ModalLogin open={open} handleModalClose={handleModalClose}/>
                        </form>
                    )
                }
            }
        </Formik>
    );
}

export default CardLogin