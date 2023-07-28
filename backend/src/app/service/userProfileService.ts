import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { ErrorHandler } from "../helpers/ErrorHandler";
import * as fs from "fs";

export const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const repository = new UserRepository();
        console.log('req.body.id: ', req.body.id);
        const user = await repository.readByID(req.body.id);

        if(!user) {
            return next(new ErrorHandler('User Profile not found', 404));
        }

        user.profilePicture = (user.profilePicture != null)?user.profilePicture.toString('base64'):'N/A';

        res.status(200).send({
            success: true,
            user: user
        });
    } catch(error) {
        console.log('ERROR: ', error);
        return next(new ErrorHandler('Internal Server Error', 500));
    }
}

export const getUserByCreds = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        if(req.body != null)
        {
            const repository = new UserRepository();
            const username : string = req.body.username;
            const password : string = req.body.password;
            let body = {username, password};
            console.log(body);
            const result = await repository.readByOne(body);
            console.log(result);

            if(!result){
                return next(new ErrorHandler('User not found!', 404));
            }

            res.status(200).send({
                success: true,
                user: result
            });
        }
        
    }catch(err){
        console.log('ERROR:', err);
        return next(new ErrorHandler('Internal Server Error', 500));
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(req.body != null && req.file != null){

            const image = req.file;
            const repository = new UserRepository();
            console.log('req.body ', req.body);

            fs.readFile(image.path, async (err, data: Buffer)=>{
                if(err){
                    console.error('Error Reading File:', err.message);
                    res.sendStatus(500)
                }else{
                    let request = req.body;
                    request.profilePicture = data;

                    const result = await repository.create(request);
                    console.log(result);

                    if(!result){
                        return next(new ErrorHandler('Failed To Create User', 400));
                    }

                    res.status(200).json({
                        success:true
                    });

                    fs.unlink(image.path, (err)=>{
                        if(err){
                            console.error('Error encountered while deleting file:', err);
                        }else{
                            console.log('File deleted Successfully!');
                        }
                    });
                }
            });
        }
    } catch(error) {
        console.log('ERROR: ', error);
        return next(new ErrorHandler('Internal Server Error', 500));
    }
}
