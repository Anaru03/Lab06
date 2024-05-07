import { body } from 'express-validator';

const postContentValidation = {
  PostNew: [
    body('title').isString().notEmpty(),
    body('content').isString().notEmpty(),
    body('images_content')
      .optional()
      .isString() 
      .if(body('images_content').exists()) 
      .matches(/^https?:\/\/.*\.(png|jpg|jpeg|gif)$/i) 
      .withMessage('images_content debe ser una URL de imagen válida (png, jpg, jpeg, gif)'),
    body('author_name').isString().notEmpty(),
  ],
  PostUp: [
    body('title').isString().notEmpty(),
    body('content').isString().notEmpty(),
    body('images_content')
      .optional()
      .isString() 
      .if(body('images_content').exists()) 
      .matches(/^https?:\/\/.*\.(png|jpg|jpeg|gif)$/i)
      .withMessage('images_content debe ser una URL de imagen válida (png, jpg, jpeg, gif)'),
    body('author_name').isString().notEmpty(),
  ],
};

export default postContentValidation;
