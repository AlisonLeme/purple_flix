import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSession } from "next-auth/react";

import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  CardActions,
  Chip,
  Box,
} from "@mui/material";

import styles from "./cardMovie.module.css";

dayjs.extend(relativeTime);

const CardMovie = ({
  url,
  img,
  title,
  nome,
  data,
  actions,
  genero,
  updatedAt,
}) => {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <Card className={styles.card}>
          <Link href={url} passHref scroll={false}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                image={img}
                alt="green iguana"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h5"
                  color="primary"
                  className={styles.titleCard}
                >
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Publicado por: {nome}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ano lançamento: {data}
                </Typography>
                <Box className={styles.footerCard}>
                  <Typography variant="body2" color="text.secondary">
                    {dayjs(updatedAt).fromNow()}
                  </Typography>
                  <Chip label={genero} color="secondary" />
                </Box>
              </CardContent>
            </CardActionArea>
          </Link>
          {actions ? <CardActions>{actions}</CardActions> : null}
        </Card>
      ) : (
        <Card className={styles.card}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image={img}
              alt="green iguana"
              sx={{ cursor: "auto" }}
            />
            <CardContent sx={{ cursor: "auto" }}>
              <Typography
                gutterBottom
                variant="h5"
                component="h5"
                color="primary"
                className={styles.titleCard}
              >
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Publicado por: {nome}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ano lançamento: {data}
              </Typography>
              <Box className={styles.footerCard}>
                <Typography variant="body2" color="text.secondary">
                  {dayjs(updatedAt).fromNow()}
                </Typography>
                <Chip label={genero} color="secondary" />
              </Box>
            </CardContent>
          </CardActionArea>
          {actions ? <CardActions>{actions}</CardActions> : null}
        </Card>
      )}
    </>
  );
};

export default CardMovie;
