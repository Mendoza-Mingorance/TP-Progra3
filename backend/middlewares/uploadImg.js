import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const nameImgFile = Date.now() + path.extname(file.originalname);
        cb(null, 'pproduct-' + nameImgFile);
    },
});

const fileFormat = (req, file, cb) => {
    const typesAllows = ['.jpeg', '.jpg', '.png', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;
    if (typesAllows.includes(ext) && typesAllows.includes(mime)) {
        cb(null, true);
    } else {
        cb(new Error('Solo se aceptan imagenes jpeg, jpg, png y webp'));
    }
};

export const upload = multer({
    storage,
    fileFormat,
    limits: { fileSize: 5 * 1024 * 1024 },
});
