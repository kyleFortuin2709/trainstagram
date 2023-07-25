import { Router, Request, Response, response} from "express";

import multer, { FileFilterCallback } from 'multer';

import path from 'path';

import {request} from '../../../../db';

import {ResultSetHeader} from 'mysql2/promise';


const routes = Router();

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null,'uploads/' )
  },
  filename: function (req: Request, file: Express.Multer.File, cb: any) {
    
    const uniqueSuffix = new Date().getDate() + '-' + '01';
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
});

// const upload = multer({ dest: 'uploads/', })
const upload = multer({ 
    storage: storage,
    dest: 'uploads/',
    limits: {fileSize: 1000000},
    fileFilter: (req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (allowedMimeTypes.includes(file.mimetype)) {
        // Accept the file
        callback(null, true);
      } else {
        // Reject the file
        callback(new Error('Invalid file type. Only JPEG, PNG, and GIF images are allowed.'));
      }
    },
})
// const upload = multer({ 
//   storage: storage,
//   limits: {fileSize: 1000000},
//   fileFilter: function (req: Request, file: any, cb: any){
//     checkFileType(file, cb);
//   }
// }).single('picture');

routes.get("/post", (_, res: Response) => {
  res.sendFile("post-picture.html", {
    root: "./frontend/src/",
  });
});

routes.post("/post", upload.single('picture'), (req: Request, res: Response) => {
  console.log(req.body);
  console.log(req.file);
  if (req.body != null && req.file != null) {
    request(req.file.filename, req.body.tagline)
    .then(response => {
      console.log(dbResult.affectedRows);
    })
    .catch(err => {
      console.log(err);
    });
  }

});

routes.get("*", (_, res: Response) => {
  res.redirect("/post");
});
export default routes;


