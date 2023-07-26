import { Request, Response, NextFunction, response } from "express";
import { PostRepository } from "../../infrastructure/repositories/PostRepository.js";
import { ErrorHandler } from "../helpers/ErrorHandler.js";
import {convertDateToSqlDateTimeOffset} from "../helpers/DateFormatter.js"

import * as fs from "fs";

export const postPage = async (req: Request, res: Response) => {
    res.sendFile("post-picture.html", {
        root: "./frontend/src/",
    });
}

export const viewPost = async (req: Request, res: Response) => {
    res.sendFile("show-picture.html", {
        root: "./frontend/src/",
    });
}

export const postMedia = async (req: any, res: Response, next: NextFunction) => {
  if (req.body != null && req.file != null) {
    const image = req.file;

    const repository = new PostRepository();

    fs.readFile(image.path, async (err, data: Buffer) => {
    if (err) {
      console.error('Error reading file:', err.message);
      res.sendStatus(500);
    } else {
        //Need to add the image data to the request.
        let request = req.body;
        request.UserId = 1;
        request.Image = data;
        request.PostedAt = convertDateToSqlDateTimeOffset(new Date())
        
        const result = await repository.create(request);
        console.log(result);
        
        if (!result) {
            return next(new ErrorHandler('Failed to create post', 400));
        }

        res.status(200).json({
            success: true
        });
    }
  }); 
  }
}

export const getMedia = async (req: Request, res: Response, next: NextFunction) => {
    if (req.params != null) {
        const repository = new PostRepository();
        const id : any = req.params.id;
        const result = await repository.readByID(id);
        console.log(result);
        
        if (!result) {
            return next(new ErrorHandler('Post not found!', 404));
        }
        
        const image : string = (result.Image != null)?result.Image.toString('base64'):'N/A';

        delete result.Image;

        res.status(200).send({
            success: true,
            data: {
                Caption: result.Caption,
                Likes: result.Likes,
                PostedAt: result.PostedAt,
            },
            image: image
        });
      }
}



