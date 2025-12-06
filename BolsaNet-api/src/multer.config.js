import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadsFolder = path.join(process.cwd(), 'uploads');

// cria a pasta se não existir
if (!fs.existsSync(uploadsFolder)) {
  fs.mkdirSync(uploadsFolder, { recursive: true });
}

export const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadsFolder); 
  },
  filename: (req, file, callback) => {
    const time = Date.now();
    callback(null, `${time}_${file.originalname}`);
  }
});
