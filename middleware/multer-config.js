import multer from "multer";

const MIME_Types = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_Types[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
})

export default multer({storage:storage}).single("image")
