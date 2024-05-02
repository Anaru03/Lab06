import { body } from 'express-validator';

const postContentValidation = {
  PostNew: [
    body('title').isString().notEmpty(),
    body('content').isString().notEmpty(),
    body('images_content')
      .optional()
      .isArray({ max: 3 }) // Suponiendo que como máximo se permiten 3 imágenes
      .custom((value) => {
        if (!Array.isArray(value)) {
          return false;
        }
        for (const imageUrl of value) {
          if (typeof imageUrl !== 'string' || !imageUrl.match(/^https?:\/\/.*\.(png|jpg|jpeg|gif)$/i)) {
            return false;
          }
        }
        return true;
      })
      .withMessage('images_content must be an array of valid image URLs (png, jpg, jpeg, gif)'),
      body('author_name').isString().notEmpty(),
  ],
  PostUp: [
    body('title').isString().notEmpty(),
    body('content').isString().notEmpty(),
    body('images_content')
      .optional()
      .isArray({ max: 3 }) // Suponiendo que como máximo se permiten 3 imágenes
      .custom((value) => {
        if (!Array.isArray(value)) {
          return false;
        }
        for (const imageUrl of value) {
          if (typeof imageUrl !== 'string' || !imageUrl.match(/^https?:\/\/.*\.(png|jpg|jpeg|gif)$/i)) {
            return false;
          }
        }
        return true;
      })
      .withMessage('images_content must be an array of valid image URLs (png, jpg, jpeg, gif)'),
      body('author_name').isString().notEmpty(),
  ],
};

export default postContentValidation;
