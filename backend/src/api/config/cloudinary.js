import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { fetchProductByID } from '../models/products.model.js';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'products',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    public_id: (req, file) => `product-${Date.now()}`
  }
});

export const deleteImage = async(id) => {
    const [product] = await fetchProductByID(id);
    console.log(product.url_image);

    const filename = product.url_image.split('/').slice(-2).join('/');
    const publicId = filename.split('.').slice(0, -1).join('.');

    if (publicId) {
        await cloudinary.uploader.destroy(publicId);
    }
}
