import multer from "multer";

//configuration for multer
// diskstorage is used for storage
// code is copied form multer github
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    //   cb(null, '/tmp/my-uploads')
        //    '/tmp/my-uplaods' is the destination of the folder
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
export  const upload = multer({ storage, })
