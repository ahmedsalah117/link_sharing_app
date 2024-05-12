import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}



/**
 * A function to generate a preview image link from an image file
 * @param {*} imageFile 
 * @returns a promise that resolves to the image url or rejects with an error
 */
  export async function generatePreviewImgLink(imageFile) {
    if (!imageFile) {
      return;
    }
    return new Promise((resolve, reject) => {
      // Create a FileReader object
      const reader = new FileReader();

      reader.readAsDataURL(imageFile);
      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  }