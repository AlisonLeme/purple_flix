import nextConnect from "next-connect";
import { put } from "../../../src/controllers/movies";

const route = nextConnect();

route.post(put);

export default route;

export const config = {
  api: {
    bodyParser: false,
  },
};
