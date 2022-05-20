import { Formik } from 'formik';

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
  CircularProgress
} from '@mui/material';

import TemplateDefault from '../../../src/templates/Default';
import FileUpload from '../../../src/components/fileUpload';
import { initialValues, validationSchema } from './formValues';

import styles from './publish.module.css';

const Publish = ({ userId, image }) => {

const formValues = {
    ...initialValues,
}

  const handleFormSubmit = () => {
      console.log('enviou o filme')
  }

  return (
    <TemplateDefault>
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={(handleFormSubmit)}
      >
        {
          ({
            touched,
            values,
            errors,
            handleChange,
            handleSubmit,
            setFieldValue,
            isSubmitting
          }) => {

            return (
              <form onSubmit={handleSubmit}>
                <Input type='hidden' name={userId} value={values.userId} />
                <Input type='hidden' name={image} value={values.image} />

                <Container component='section' maxWidth='lg' className={styles.containerTitle}>
                  <Typography component='h1' variant='h2' align='center' gutterBottom>
                    Publicar Filme
                  </Typography>
                  <Typography component='h5' variant='h5' align='center'>
                    Quanto mais detalhes do filme melhor
                  </Typography>
                </Container>

                <Container maxWidth='md' className={styles.boxContainer}>
                  <Box className={styles.box}>
                    <Typography component='h6' variant='h6' color='primary' gutterBottom className={styles.title}>
                      Nome do filme
                    </Typography>
                    <FormControl fullWidth variant='outlined' error={errors.name && touched.name}>
                      <InputLabel>
                        Ex: Batman 2
                      </InputLabel>
                      <OutlinedInput
                        name='name'
                        value={values.name}
                        onChange={handleChange}
                        label='Ex: Batman 2'
                      >
                      </OutlinedInput>
                      <FormHelperText>
                        {errors.name && touched.name ? errors.name : null}
                      </FormHelperText>
                    </FormControl>

                    <Typography component='h6' variant='h6' color='primary' gutterBottom className={styles.title}>
                      Url do Filme
                    </Typography>
                    <FormControl fullWidth variant='outlined' error={errors.url && touched.url}>
                      <InputLabel>
                         Ex: https://www.youtube.com/watch?v=XR6QPUw9n8c
                      </InputLabel>
                      <OutlinedInput
                        name='url'
                        value={values.url}
                        onChange={handleChange}
                        label='Ex: https://www.youtube.com/watch?v=XR6QPUw9n8c'
                      >
                      </OutlinedInput>
                      <FormHelperText>
                        {errors.url && touched.url ? errors.url : null}
                      </FormHelperText>
                    </FormControl>

                    <Typography component='h6' variant='h6' color='primary' gutterBottom className={styles.title}>
                      Gênero
                    </Typography>
                    <FormControl fullWidth variant='outlined' error={errors.genero && touched.genero}>
                      <InputLabel>
                        Escolha o gênero do seu filme
                      </InputLabel>
                      <Select
                        name='genero'
                        value={values.genero}
                        fullWidth
                        onChange={handleChange}
                        label='Escolha o gênero do seu filme'
                      >
                        <MenuItem value="Ação">Ação</MenuItem>
                        <MenuItem value="Terror">Terror</MenuItem>
                        <MenuItem value="Comedia">Comedia</MenuItem>
                        <MenuItem value="Suspense">Suspense</MenuItem>
                        <MenuItem value="Animação">Animação</MenuItem>
                        <MenuItem value="Ficção Científica">Ficção Científica</MenuItem>
                      </Select>
                      <FormHelperText>
                        {errors.genero && touched.genero ? errors.genero : null}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Container>

                <Container maxWidth='md' className={styles.boxContainer}>
                  <Box className={styles.box}>
                   <FileUpload
                    files={values.files}
                    errors={errors.files}
                    touched={touched.files}
                    setFieldValue={setFieldValue}
                   />
                  </Box>
                </Container>

                <Container maxWidth='md' className={styles.boxContainer}>
                  <Box className={styles.box}>
                    <Typography component='h6' variant='h6' color='primary' gutterBottom className={styles.title}>
                      Descrição
                    </Typography>
                    <FormControl fullWidth variant='outlined' error={errors.description && touched.description}>
                      <InputLabel>
                        Escreva os detalhes do filme
                      </InputLabel>
                      <OutlinedInput
                        name='description'
                        multiline
                        rows={6}
                        onChange={handleChange}
                        variant='outlined'
                        label='Escreva os detalhes do filme'
                      />
                      <FormHelperText>
                        {errors.description && touched.description ? errors.description : null}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Container>

                <Container maxWidth='md' className={styles.boxContainer}>
                  <Box className={styles.box}>
                    <Typography component='h6' variant='h6' color='primary' gutterBottom className={styles.title}>
                      Ano de lançamento
                    </Typography>
                    <FormControl fullWidth variant='outlined' error={errors.anoLancamento && touched.anoLancamento}>
                      <InputLabel>
                        Ex: 1997
                      </InputLabel>
                      <OutlinedInput
                        name='anoLancamento'
                        onChange={handleChange}
                        variant='outlined'
                        label='Ex: 1997'
                      />
                      <FormHelperText>
                        {errors.anoLancamento && touched.anoLancamento ? errors.anoLancamento : null}
                      </FormHelperText>
                    </FormControl>
                  </Box>
                </Container>

                <Container maxWidth='md'>
                  <Box textAlign='right'>
                    {
                      isSubmitting
                        ? <CircularProgress className={styles.loading} />
                        : <Button type='submit' variant='contained' color='primary'>Publicar Filme</Button>
                    }
                  </Box>
                </Container>
              </form>
            )
          }
        }
      </Formik>
    </TemplateDefault>
  );
}

export default Publish;