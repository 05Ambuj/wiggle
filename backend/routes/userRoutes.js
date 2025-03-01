import express from 'express'
import { isAuth } from '../middleware/isAuth.js';
import { followAndUnfollowUser, getAllUsers, myProfile, updatePassword, updateProfile, userFollowerAndFollowingData, userProfile } from '../controllers/userController.js';
import uploadFile from '../middleware/multer.js';

const router =express.Router();

router.get("/me", isAuth, myProfile);
router.get("/all",isAuth,getAllUsers);
router.get("/:id",isAuth, userProfile);
router.post("/:id",isAuth, updatePassword);
router.put("/:id",isAuth, uploadFile, updateProfile);
router.post("/follow/:id",isAuth, followAndUnfollowUser) 
router.get("/followdata/:id",isAuth, userFollowerAndFollowingData) 

export default router;