import Link from "next/link";
import { useSession } from "next-auth/react";

import { Container, Button, Grid, Typography, Box } from "@mui/material";

import TemplateDefault from "../../../src/templates/Default";

import CardMovie from "../../../src/components/cardMovie/CardMovie";

import styles from "./dashboard.module.css";

const Dashboard = () => {
  const { data: session } = useSession();

  console.log(session);

  return (
    <TemplateDefault>
      <Box className={styles.boxFilmes}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          className={styles.boxFilmes}
        >
          Assista filmes
        </Typography>
        <Link href="/user/publish" passHref>
          <Button variant="contained" color="primary" className={styles.boxBtn}>
            Publicar filme
          </Button>
        </Link>
      </Box>

      <Grid container spacing={3} className={styles.gridCard}>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <CardMovie
            url={""}
            img={"https://source.unsplash.com/random"}
            title="titulo"
            nome="Alison"
            data="13/05/2022"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4} xl={3}>
          <CardMovie
            url={""}
            img={"https://source.unsplash.com/random"}
            title="titulo"
            nome="Alison"
            data="13/05/2022"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4} xl={3}>
          <CardMovie
            url={""}
            img={"https://source.unsplash.com/random"}
            title="titulo"
            nome="Alison"
            data="13/05/2022"
          />
        </Grid>

        <Grid item xs={12} md={6} lg={4} xl={3}>
          <CardMovie
            url={""}
            img={"https://source.unsplash.com/random"}
            title="titulo"
            nome="Alison"
            data="13/05/2022"
          />
        </Grid>
      </Grid>
    </TemplateDefault>
  );
};

export default Dashboard;
