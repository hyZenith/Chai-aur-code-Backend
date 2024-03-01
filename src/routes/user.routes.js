import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"



const router = Router()

router.route("/register").post(
    // for sending images
    upload.fields([
        {
            name:"avatar",
            maxCount: 1
        },
        {
            name:"converImage",
            maxCount:1
        }
    ]),
    registerUser
    );



export default router;
