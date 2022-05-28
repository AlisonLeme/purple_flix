import TemplateDefault from "../../../../src/templates/Default";
import dbConnect from "../../../../src/utils/dbConnect";
import MoviesModel from "../../../../src/models/movies";

const Movie = ({ movie }) => {
  const url = movie.url;
  const urlCorreta = url.replace("watch?v=", "embed/");

  return (
    <TemplateDefault>
      <iframe
        width="560"
        height="315"
        src={urlCorreta}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      ></iframe>
    </TemplateDefault>
  );
};

Movie.requireAuth = true;

export async function getServerSideProps({ query }) {
  const { id } = query;

  await dbConnect();

  const movie = await MoviesModel.findOne({ _id: id });

  return {
    props: {
      movie: JSON.parse(JSON.stringify(movie)),
    },
  };
}

export default Movie;
