const multer = require("multer");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const imageStorage = multer.diskStorage({
  destination: "file",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
  limits: {
    fileSize: 1000000,
  },
});

const upload = multer({
  storage: imageStorage,
}).any(); // Supporting multiple files named image0 and image1

exports.postFile = async (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      console.log("Error uploading files", err);
      return next(err);
    }

    const files = [];
    for (const key in req.files) {
      let exist = req?.files[key];
      if (exist) {
        const fileObj = req.files[key];
        const filePath = path.join(__dirname, "..", "file", fileObj.filename);
        files.push({ fieldName: key, path: filePath });
        // fileArray.forEach((file) => {
        //   const filePath = path.join(__dirname, "..", "file", file.filename);
        //   files.push({ fieldName: key, path: filePath });
        // });
      }
    }

    if (files.length === 0) {
      req.noFilesWereAdded = true;
      console.log("No files uploaded");
      return next();
    }

    const apiUrl =
      "https://arihantchemical.in/upload-service/upload_service.php";

    let count = 0;
    let fileNames = [];
    const uploadNextFile = () => {
      if (count < files.length) {
        const file = files[count];
        console.log("file", file);
        const formData = new FormData();
        formData.append(
          "file",
          fs.createReadStream("./file/" + file.path.split("/").pop())
        );
        count++;
        console.log("count", count);
        axios
          .post(apiUrl, formData, {
            headers: formData.getHeaders(),
          })
          .then((response) => {
            fileNames.push(file.path.split("/").pop());
            console.log("Success", response.data);
            uploadNextFile(); // Move to the next file
          })
          .catch((error) => {
            console.error("Error", error);
            next(error);
          });
      } else {
        //
        req.body.images = JSON.stringify(fileNames);
        console.log("JSON.stringify(fileNames)", JSON.stringify(fileNames));
        next(); // All files uploaded, proceed
      }
    };

    uploadNextFile(); // Start uploading the first file
  });
};
