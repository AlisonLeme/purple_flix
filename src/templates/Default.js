import Container from '@mui/material/Container';

import Header from '../components/header/Header'

const Default = ({ children }) => {
    return (
        <>
            <Header />
            <Container maxWidth="xl" sx={{mt: 10, mb: 10}}>
                { children }
            </Container>
            <h1>aqui ficara o footer</h1>
        </>
    )
}

export default Default