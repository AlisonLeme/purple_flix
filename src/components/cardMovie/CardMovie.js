import Link from "next/link";

import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  CardActions,
} from "@mui/material";

import styles from "./cardMovie.module.css";

const CardMovie = ({ url, img, title, nome, data, actions }) => {
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
              {nome}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      {actions ? <CardActions>{actions}</CardActions> : null}
    </Card>
  );
};

export default CardMovie;
