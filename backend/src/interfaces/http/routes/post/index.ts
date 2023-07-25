import { Router, Request, Response, response} from "express";

import multer, { FileFilterCallback } from 'multer';

import path from 'path';

import {storePost, getImage} from '../../../../db';

import * as fs from 'fs';

const routes = Router();

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb: any) {
    cb(null,'uploads/' )
  },
  filename: function (req: Request, file: Express.Multer.File, cb: any) {
    
    const uniqueSuffix = new Date().getUTCFullYear() + '-' + '01';
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

routes.get("/post", (_, res: Response) => {
  res.sendFile("post-picture.html", {
    root: "./frontend/src/",
  });
});

routes.post("/post", upload.single('picture'), (req: Request, res: Response) => {
  console.log(req.body);
  console.log(req.file);
  
  
  if (req.body != null && req.file != null) {
    const image = req.file;

    fs.readFile(image.path, (err, data) => {
    if (err) {
      console.error('Error reading file:', err.message);
      res.sendStatus(500);
    } else {
      console.log(data);
      storePost(data, req.body.tagline)
      .then(response => {
        console.log(response);
        if (response > 0 && response <= 1) {
          res.status(200).json({succeeded: true});
        }
      })
      .catch(err => {
        console.log(err);
        res.statusMessage = err;
        res.status(400).json({succeeded: false});
      });
    }
  }); 
  }
});

routes.get("/image/:id", async (req: Request, res: Response) => {
  
  if (req.params != null) {
    getImage(req.params.id).then(response => {
      if (response != null) {
        console.log(response);
        
        const image = response[0].PostImage as Buffer;
        const tagline = response[0].Caption;

        res.status(200).json({image: image.toString('base64'), tagline: tagline});
      }
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
  }
});

routes.get("/image-view", (_, res: Response) => {
  res.sendFile("show-picture.html", {
    root: "./frontend/src/",
  });
});

export default routes;


