import multer from "multer";
import path from "path";

const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination,
  //   filename: (req, file, cb) => {
  //     const uniquePreffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
  //     const filename = `${uniquePreffix}_${file.originalname}`;

  //     cb(null, filename);
  //   },
});

const limits = {
  fileSize: 5 * 1024 * 1024,
};

// const fileFIlter = (req, file, cb) => {
//   if (file.originalname.split(".").pop() === "exe") {
//     cb(new Error("File extention is not allowed"));
//   }
//   cb(null, true);
// };

const upload = multer({
  storage,
  limits,
  // fileFilter,
});

export default upload;
