import multer, { MulterError } from "multer";
import moment from "moment";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname , "public"));
  },
  filename(req, file, cb) {
    // const fileName = `${req.user.id}_${moment().toISOString()}_${
    // file.fieldname
    // }.${file.mimetype.substring(file.mimetype.indexOf("/")+1)}`;

     const fileName =  file.originalname 
     
    cb(null, fileName);
  },
});

export const upload = multer({
  storage: storage,
  // fileFilter: (req, file, cb) => {
  //   let regex = /image\/(jpg|jpeg|png)$/g;
  //   if (!regex.test(file.mimetype)) {
  //     return cb(new MulterError("LIMIT_UNEXPECTED_FILE", "wrong file type"));
  //   }

  //   cb(null, true);
  // },
  // limits: {
  //   files: 10,
  //   fileSize: 5000000,
  // },
});
