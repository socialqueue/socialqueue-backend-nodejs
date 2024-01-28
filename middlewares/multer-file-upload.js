import multer from 'multer'


const uploadDir = path.join(__dirname, "..", "uploads")


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UploadDest)
    },
    filename: (req, file, cb) => {
        len = file.originalname.length
        cb(null, file.originalname)
    }
})


const fileFilter = (_req, file, cb) => {
    const isJPEG = file.mimetype === 'image/jpeg'
    const isPNG = file.mimetype === 'image/png'
    const isSVG_XML = file.mimetype === 'image/svg+xml'

    if (isJPEG || isPNG || isSVG_XML)
        cb(null, true)
    else
        cb(new Error('Only JPEG and PNG image formats allowed'), false)
}


const fileUpload = multer({ storage: storage, fileFilter: fileFilter })


export default fileUpload