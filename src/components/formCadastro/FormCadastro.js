import { useRouter } from 'next/router';
import axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup'

import {
    Button,
    Typography,
    FormControl,
    FormHelperText,
    InputLabel,
    Box,
    OutlinedInput
} from '@mui/material';

import styles from './FormCadastro.module.css'

const FormCadastro = ({ email }) => {
    const router = useRouter()

    const validationSchema = yup.object().shape({
        name: yup.string()
            .required('Campo obrigatório'),

        email: yup.string()
            .required('Campo obrigatório')
            .email('Digite um e-mail válido'),

        userName: yup.string()
            .required('Campo obrigatório')
            .min(4, "Seu nome de usuário deve conter no mínimo 4 caracteres")
            .max(15, "Seu nome de usuário deve conter no máximo 15 caracteres"),

        password: yup.string()
            .required('Campo obrigatório')
            .min(8, "Senha muito fraca"),

        confPassword: yup.string()
            .required('Campo obrigatório')
            .oneOf([yup.ref('password'), null], "As senhas não conferem")
    })

    const hanldeFormSubmit = async (values) => {
        const response = await axios.post('/api/users', values);

        if (response.data.success) {
            router.push('/user/dashboard')
        }
    }

    return (
        <Formik
            initialValues={{
                name: '',
                email: `${email}`,
                userName: '',
                password: '',
                confPassword: ''
            }}
            validationSchema={validationSchema}
            onSubmit={hanldeFormSubmit}
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
                        <Box className={styles.boxForm}>
                            <Typography gutterBottom variant="h3" component="h3" align='center'>
                                <strong>Faça seu cadastro</strong>
                            </Typography>

                            <Typography gutterBottom variant="body1" component="body1" align='center' className={styles.msgSpan}>
                                Acesse a plataforma para poder assistir e incluir conteúdos
                            </Typography>

                            <FormControl className={styles.formControlCadastro} error={errors.name && touched.name}>
                                <InputLabel>Nome</InputLabel>
                                <OutlinedInput 
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    label="name"
                                />
                                <FormHelperText>
                                    { errors.name && touched.name ? errors.name : null }
                                </FormHelperText>
                            </FormControl>

                            <FormControl className={styles.formControlCadastro} error={errors.email && touched.email}>
                                <InputLabel>Email</InputLabel>
                                <OutlinedInput 
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    label="Email"
                                />
                                <FormHelperText>
                                    { errors.email && touched.email ? errors.email : null }
                                </FormHelperText>
                            </FormControl>

                            <FormControl className={styles.formControlCadastro} error={errors.userName && touched.userName}>
                                <InputLabel>Usuário</InputLabel>
                                <OutlinedInput
                                    name="userName"
                                    value={values.userName}
                                    onChange={handleChange}
                                    label="Usuário"
                                />
                                <FormHelperText>
                                    { errors.userName && touched.userName ? errors.userName : null }
                                </FormHelperText>
                            </FormControl>

                            <FormControl className={styles.formControlCadastro} error={errors.password && touched.password}>
                                <InputLabel>Senha</InputLabel>
                                <OutlinedInput
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    type="password"
                                    label="Senha"
                                />
                                <FormHelperText>
                                    { errors.password && touched.password ? errors.password : null }
                                </FormHelperText>
                            </FormControl>
                            
                            <FormControl className={styles.formControlCadastro} error={errors.confPassword && touched.confPassword}>
                                <InputLabel>Confirmar senha</InputLabel>
                                <OutlinedInput
                                    name="confPassword"
                                    value={values.confPassword}
                                    onChange={handleChange}
                                    type="password"
                                    label="Confirmar senha"
                                />
                                <FormHelperText>
                                    { errors.confPassword && touched.confPassword ? errors.confPassword : null }
                                </FormHelperText>
                            </FormControl>

                            <Button 
                                type='submit'
                                variant='contained' 
                                size="large" 
                                endIcon={''}
                                className={styles.btnCadastrar}
                            >Cadastrar
                            </Button>
                        </Box>
                    </form>
                )
            }
        }
    </Formik>
    )
}

export default FormCadastro