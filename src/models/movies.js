import mongoose from "mongoose";
const { Schema } = mongoose;

const filesSchema = Schema({
  name: String,
  path: String,
});

const schema = new mongoose.Schema({
  movieName: {
    type: String,
    required: [true, 'O campo "Nome" é obrigatorio.'],
  },
  url: {
    type: String,
    required: [true, 'O campo "URL" é obrigatorio.'],
  },
  genero: {
    type: String,
    required: [true, 'O campo "Gênero" é obrigatorio.'],
  },
  description: {
    type: String,
    required: [true, 'O campo "Descrição" é obrigatorio.'],
  },
  anoLancamento: {
    type: Number,
    required: [true, 'O campo "Ano de Lançamento" é obrigatorio.'],
  },
  user: {
    id: String,
    name: String,
    email: String,
  },
  files: {
    type: [filesSchema],
    default: undefined,
  },
  updatedAt: {
    type: Date,
    required: [true, 'O campo "UpdateAt" é obrigatorio.'],
  },
});

export default mongoose.models.movies || mongoose.model("movies", schema);
