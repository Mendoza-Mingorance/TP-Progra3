// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'src/public/uploads/');
//     },
//     filename: (req, file, cb) => {
//         const nameImgFile = Date.now() + path.extname(file.originalname);
//         cb(null, 'product-' + nameImgFile);
//     },
// });

// const fileFormat = (req, file, cb) => {
//     const typesAllows = ['.jpeg', '.jpg', '.png', '.webp'];
//     const ext = path.extname(file.originalname).toLowerCase();
//     const mime = file.mimetype;

//     if (typesAllows.includes(ext) && typesAllows.includes(mime)) {
//         cb(null, true);
//     } else {
//         cb(new Error('Solo se aceptan imagenes jpeg, jpg, png y webp'));
//     }
// };

// export const uploadFile = multer({
//     storage,
//     fileFormat,
//     limits: { fileSize: 5 * 1024 * 1024 },
// });

// export const checkUploadDir =(dirPath) => {
//     return (req, res, next) => {
//         if (!fs.existsSync(dirPath)) {
//             fs.mkdirSync(dirPath, { recursive: true });
//             console.log(`Carpeta creada: ${dirPath}`);
//         }
//         next();
//     };
// }


import multer from 'multer';
import { storage } from '../config/cloudinary.js';

export const uploadFile = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

