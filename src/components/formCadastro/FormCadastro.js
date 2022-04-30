import { Formik } from 'formik';
import * as yup from 'yup'

import {
    Button,
    Typography,
    FormControl,
    Input,
    FormHelperText,
    InputLabel
} from '@mui/material';

const FormCadastro = () => {

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
                        <Typography gutterBottom variant="h5" component="div">
                            Faça seu cadastro
                        </Typography>
                        <FormControl fullWidth error={errors.email}>
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

                        <Button 
                            type='submit'
                            variant='contained' 
                            size="large" 
                            endIcon={''}
                            disabled={ values.email == '' || errors.email ? true : false }
                        >Continuar
                        </Button>
                    </form>
                )
            }
        }
    </Formik>
    )
}

export default FormCadastro