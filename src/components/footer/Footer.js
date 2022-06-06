import Link from "next/link"

import {
    Box,
    Container,
    Grid,
    IconButton,
    Typography,
} from "@mui/material"

import styles from './Footer.module.css'

const Footer = () => {
    return (
        <>
            <Box className={styles.orSeparator}></Box>
            <Container maxWidth="lg" component="footer" className={styles.container}>
                <Typography variant="h5" align="center" color={'primary'}>
                    Entre em contato: (15 99999-9999)
                </Typography>

                <Box className={styles.boxGrid}>
                    <Grid container spacing={3}>
                        <Grid item xs={6} sm={3}>
                            <Box>
                                <Link href={''}>
                                    <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
                                        <IconButton>
                                            <Typography variant="subtitle1" color={'primary'}>
                                                Youtube
                                            </Typography>
                                        </IconButton>
                                    </a>
                                </Link>
                            </Box>
                        </Grid>

                        <Grid item xs={6} sm={3}>
                            <Box>
                                <Link href={''}>
                                    <a href="https://alisonletos.github.io/SiteAlisonLetos/" target="_blank" rel="noreferrer">
                                        <IconButton>
                                            <Typography variant="subtitle1" color={'primary'}>
                                                Ajuda
                                            </Typography>
                                        </IconButton>
                                    </a>
                                </Link>
                            </Box>
                        </Grid>

                        <Grid item xs={6} sm={3}>
                            <Box>
                                <Link href={''}>
                                    <a href="https://alisonletos.github.io/SiteAlisonLetos/" target="_blank" rel="noreferrer">
                                        <IconButton>
                                            <Typography variant="subtitle1" color={'primary'}>
                                                Contatos
                                            </Typography>
                                        </IconButton>
                                    </a>
                                </Link>
                            </Box>
                        </Grid>

                        <Grid item xs={6} sm={3}>
                            <Box>
                                <Link href={''}>
                                    <a href="https://alisonletos.github.io/SiteAlisonLetos/" target="_blank" rel="noreferrer">
                                        <IconButton>
                                            <Typography variant="subtitle1" color={'primary'}>
                                                Site do desenvolvedor
                                            </Typography>
                                        </IconButton>
                                    </a>
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Typography variant="subtitle1" align="center" color={'primary'}>
                    &copy; Todos os direitos reservados 2022
                </Typography>
            </Container>
        </>

    )
}

export default Footer