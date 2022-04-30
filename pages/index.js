import {
  Grid,
  Typography
} from '@mui/material/';

import TemplateDefault from '../src/templates/Default'
import CardLogin from '../src/components/cardLogin/CardLogin';

const Home = () => {
  return (
    <TemplateDefault>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography variant='h2' component='h1' align='center'>
            <strong>Filmes, séries e muito mais. Sem limites.</strong>
          </Typography>
          <Typography variant='h4' component='h4' align='center'>
            Assista onde quiser. Sem pagar nada!
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <CardLogin title="Se increva para fazer parte do nosso time, e incluir conteúdo."/>
        </Grid>
      </Grid>
    </TemplateDefault>
  )
}

export default Home
