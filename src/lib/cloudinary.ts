// src/lib/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";
import { Readable } from 'stream';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});



// ✅ Cloudinary config (ensure you set env vars)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// src/lib/cloudinary.ts





/**
 * Uploads a PDF buffer to Cloudinary using base64 encoding.
 * This method is more reliable for binary file uploads like PDFs.
 *
 * @param buffer - The PDF buffer to upload
 * @param publicId - The desired Cloudinary public ID (e.g. 'offer-letter-student123')
 * @returns Cloudinary upload result
 */
export async function uploadFileToCloudinaryBase64(
  buffer: Buffer,
  publicId: string
): Promise<any> {
  try {
    const base64String = `data:application/pdf;base64,${buffer.toString('base64')}`;

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        base64String,
        {
          resource_type: 'raw', // Use 'raw' for PDF files
          public_id: publicId,
          folder: 'offer_letters',
          use_filename: true,
          unique_filename: false,
          overwrite: true,
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return reject(error);
          }
          resolve(result);
        }
      );
    });

    return result;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
}



export default cloudinary;
