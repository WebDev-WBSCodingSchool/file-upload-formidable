import type formidable from 'formidable';
import { File } from 'formidable';

declare global {
  namespace Express {
    export interface Request {
      file?: File;
    }
  }
}
