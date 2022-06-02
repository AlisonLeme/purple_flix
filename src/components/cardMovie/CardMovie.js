import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

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

dayjs.extend(relativeTime)

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
  return (
    <Card>
      <Link href={url} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={img}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Publicado por: <strong>{nome}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ano lançamento: <strong>{data}</strong>
            </Typography>
            <Box className={styles.footerCard}>
              <Typography variant="body2" color="text.secondary">
                <i>{dayjs(updatedAt).fromNow()}</i>
              </Typography>
              <Chip label={genero} color="secondary" />
            </Box>
          </CardContent>
        </CardActionArea>
      </Link>
      {actions ? <CardActions>{actions}</CardActions> : null}
    </Card>
  );
};

export default CardMovie;
