import { Router } from "express";
import { postMedia, getMedia, postPage, viewPost } from "../service/postService.js";
import { RetrieveFile } from "../service/fileMiddlewareService.js";

export const router = Router();

router.route('/post').get(postPage);

router.route('/view-post').get(viewPost);

router.route('/post').post(RetrieveFile, postMedia);

//Name to be change and moved.
router.route('/user/post/:id').get(getMedia);


