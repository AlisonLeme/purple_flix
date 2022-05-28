import TemplateDefault from "../../../src/templates/Default";

const Movie = () => {
  const url = `https://www.youtube.com/watch?v=91yQXVF7Olk`;
  const urlCorreta = url.replace("watch?v=", "embed/");

  console.log(urlCorreta);
  return (
    <TemplateDefault>
      <iframe
        width="560"
        height="315"
        src={urlCorreta}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allow="fullscreen;"
        disable
      ></iframe>

      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/91yQXVF7Olk"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </TemplateDefault>
  );
};

Movie.requireAuth = true;

export default Movie;
