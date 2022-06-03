import { Card, Box, CardMedia } from "@mui/material";
import Carousel from "react-material-ui-carousel";

import styles from "./carousel.module.css";

const carrosselImages = [
  {
    id: 2,
    name: "2.png",
  },
  {
    id: 3,
    name: "3.jpg",
  },
  {
    id: 4,
    name: "4.jpg",
  },
];

const Carrossel = () => {
  return (
    <Box className={styles.box}>
      <Carousel
        autoPlay={true}
        animation={"fade"}
        navButtonsAlwaysVisible={true}
        navButtonsProps={{
          style: {
            color: "white",
          },
        }}
      >
        {carrosselImages.map((image) => {
          return (
            <Card key={image.id} className={styles.card}>
              <CardMedia
                className={styles.cardMedia}
                image={`/images/carrossel/${image.name}`}
              />
            </Card>
          );
        })}
      </Carousel>
    </Box>
  );
};

export default Carrossel;
