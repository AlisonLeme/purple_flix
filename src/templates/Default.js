import Container from '@mui/material/Container';

import Header from '../components/header/Header'
import Footer from '../components/footer/Footer';

const Default = ({ children }) => {
    return (
        <>
            <Header />
            <Container maxWidth="xl" sx={{mt: 10, mb: 10}}>
                { children }
            </Container>
            <Footer />
        </>
    )
}

export default Default