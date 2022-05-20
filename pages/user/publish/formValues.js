import * as yup from 'yup';

const initialValues = {
  name: '',
  url: '',
  genero: '',
  description: '',
  anoLancamento: '',
  files: [],
}

const validationSchema = yup.object().shape({
  name: yup.string()
    .min(6, 'Escreva um nome maior')
    .max(50, 'Nome muito grande')
    .required('Campo obrigatório'),

  url: yup.string()
    .min(40, 'Escreva uma url maior')
    .max(100, 'Url muito grande')
    .required('Campo obrigatório'),

  genero: yup.string()
    .required('Campo obrigatório'),

  description: yup.string()
    .min(50, 'Escreva uma descrição maior com mais detalhes')
    .max(1000, 'Descrição muito grande')
    .required('Campo obrigatório'),

  anoLancamento: yup.number()
    .required('Campo obrigatório'),

  files: yup.array()
    .required('Campo obrigatório'),
})

export {
  initialValues,
  validationSchema,
}