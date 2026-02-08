import formidable, { type Part } from 'formidable';

import { type RequestHandler } from 'express';

const maxFileSize = 6 * 1024 * 1024;
const filter = ({ mimetype }: Part) => {
  // keep only images
  if (!mimetype || !mimetype.includes('image'))
    throw new Error('onlyImages are allowed', { cause: { status: 400 } });
  return true;
};

const ProcessFile: RequestHandler = (req, res, next) => {
  const form = formidable({ filter, maxFileSize });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    console.log(files.image);

    if (!files || !files.image) throw new Error('Please upload a file', { cause: { status: 400 } });

    req.body = fields;

    req.file = files.image[0];
    next();
  });
};

// const uploadFile: RequestHandler = (req: UploadRequest, res, next) => {
//   const form = formidable({
//     maxFileSize: 2 * 1024 * 1024,
//     keepExtensions: true,
//     filename: (name: string, ext: string, part: any) => `user-${req.params.id}-${Date.now()}${ext}`,
//     filter: ({ mimetype }: part) => mimetype.startsWith('image/')
//   });

//   form.parse(req, (err, fields, files) => {
//     if (err) return next(err);

//     req.fields = fields;
//     req.files = files;

//     next();
//   });
// };
export default ProcessFile;
