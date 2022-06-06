import path from "path";
import fs from "fs";
import MoviesModel from "../models/movies";
import dbConnect from "../utils/dbConnect";
import formidable from "formidable-serverless";

const post = async (req, res) => {
  await dbConnect();

  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir: "public/uploads",
    keepExtensions: true,
  });

  form.parse(req, async (error, fields, data) => {
    if (error) {
      return res.status(500).json({ success: false });
    }

    const { files } = data;

    // renomeando os arquivos
    const filesToRename = files instanceof Array ? files : [files];

    const filesToSave = [];

    filesToRename.forEach((file) => {
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 9999999) + 1;
      const extension = path.extname(file.name);

      const filename = `${timestamp}_${random}${extension}`;

      const oldpath = path.join(__dirname, `../../../../../${file.path}`);
      const newpath = path.join(
        __dirname,
        `../../../../../${form.uploadDir}/${filename}`
      );

      filesToSave.push({
        name: filename,
        path: newpath,
      });

      fs.rename(oldpath, newpath, (error) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ success: false });
        }
      });
    });

    const {
      movieName,
      url,
      genero,
      description,
      anoLancamento,
      userId,
      name,
      email,
    } = fields;

    const movie = new MoviesModel({
      movieName,
      url,
      genero,
      description,
      anoLancamento,
      user: {
        id: userId,
        name,
        email,
      },
      files: filesToSave,
      updatedAt: new Date(),
    });

    const register = await movie.save();

    if (register) {
      res.status(201).json({ success: true });
    } else {
      res.status(201).json({ success: false });
    }
  });
};

const remove = async (req, res) => {
  await dbConnect();

  const id = req.body.id;

  const deleted = await MoviesModel.findOneAndRemove({ _id: id });

  if (deleted) {
    return res.status(200).json({ success: true });
  }

  return res.status(500).json({ success: false });
};

const put = async (req, res) => {
  await dbConnect();

  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir: "public/uploads",
    keepExtensions: true,
  });

  form.parse(req, async (error, fields, data) => {
    if (error) {
      return res.status(500).json({ success: false });
    }

    const { files } = data;
    console.log(files);

    // renomeando os arquivos
    const filesToRename = files instanceof Array ? files : [files];

    const filesToSave = [];

    filesToRename.forEach((file) => {
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 9999999) + 1;
      const extension = path.extname(file.name) || null;

      const filename = `${timestamp}_${random}${extension}`;

      const oldpath = path.join(__dirname, `../../../../../${file.path}`);
      const newpath = path.join(
        __dirname,
        `../../../../../${form.uploadDir}/${filename}`
      );

      filesToSave.push({
        name: filename,
        path: newpath,
      });

      fs.rename(oldpath, newpath, (error) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ success: false });
        }
      });
    });

    const { id } = req.query;

    const movie = await MoviesModel.findById(id);

    const { movieName, url, genero, description, anoLancamento } = fields;

    movie.movieName = movieName;
    movie.url = url;
    movie.genero = genero;
    movie.description = description;
    movie.anoLancamento = anoLancamento;
    movie.files = filesToSave;

    const update = await movie.save();

    if (update) {
      res.status(201).json({ success: true });
    } else {
      res.status(201).json({ success: false });
    }
  });
};

export { post, remove, put };
