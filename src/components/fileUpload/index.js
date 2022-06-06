import { useDropzone } from "react-dropzone";

import { Box, Typography, IconButton } from "@mui/material";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import styles from "./fileUpload.module.css";

const FileUpload = ({ files, errors, touched, setFieldValue }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",

    onDrop: (acceptedFile) => {
      const newFiles = acceptedFile.map((file) => {
        return Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
      });

      setFieldValue("files", [...files, ...newFiles]);
    },
  });

  const handleRemoveFile = (filePath) => {
    const newFileState = files.filter((file) => {
      return file.name !== filePath && file.path !== filePath;
    });

    setFieldValue("files", newFileState);
  };

  return (
    <>
      <Typography
        component="h6"
        variant="h6"
        color="primary"
        gutterBottom
        className={styles.title}
      >
        Imagem
      </Typography>
      <Typography
        component="div"
        variant="body2"
        gutterBottom
        color={errors && touched ? "error" : "inherit"}
      >
        Essa imagem será a capa do seu filme
      </Typography>
      {errors && touched ? (
        <Typography variant="body2" color="error" gutterBottom>
          {errors}
        </Typography>
      ) : null}
      <Box className={styles.thumbsContainer}>
        <Box
          className={styles.dropzone}
          {...getRootProps()}
          style={{ display: files.length > 0 && "none" }}
        >
          <input name="files" {...getInputProps()} />
          <Typography
            className={styles.thumbsMsg}
            variant="body2"
            color={errors && touched ? "error" : "primary"}
          >
            Clique para adicionar ou arraste uma imagem
          </Typography>
        </Box>

        {files.map((file, index) => {
          return (
            <Box
              key={file.name}
              className={styles.thumb}
              style={{
                backgroundImage: `url(${
                  file.preview ? file.preview : `/uploads/${file.name}`
                })`,
              }}
            >
              <Box className={styles.mask}>
                <IconButton onClick={() => handleRemoveFile(file.path)}>
                  <DeleteForeverIcon fontSize="large" color="secondary" />
                </IconButton>
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default FileUpload;
