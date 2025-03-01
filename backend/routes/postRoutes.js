import express, { Router } from 'express'
import { isAuth } from '../middleware/isAuth.js';
import { deletePost, editCaption,getAllPost, newPost ,likeUnlikePost,commentonPost,deleteComment} from '../controllers/postController.js';
import uploadFile from '../middleware/multer.js';

const router =express.Router();

router.get("/all",isAuth,getAllPost)
router.post("/new",isAuth,uploadFile, newPost)
router.delete("/:id",isAuth,deletePost)
router.put("/:id", isAuth, editCaption);
router.post("/like/:id", isAuth, likeUnlikePost);
router.post("/comment/:id", isAuth, commentonPost);
router.delete("/comment/:id", isAuth, deleteComment);

export default router