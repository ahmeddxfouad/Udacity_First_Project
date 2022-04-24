import express, { Response, Request } from 'express';
import path from 'path';
import fs from 'fs';
import { getFolderNameWithTarget, getImage } from '../utils/utils';

const images = express.Router();

images.get('/', async (req: Request, res: Response): Promise<void> => {
  const { filename, height, width } = req.query;

  if (filename) {
    let fullpath: string = path.join(
      getFolderNameWithTarget(__dirname, 'oldimages'),
      filename as string
    );

    if (fs.existsSync(fullpath)) {
      const newWidth: number = Math.abs(parseInt(width as string));
      const newHeight: number = Math.abs(parseInt(height as string));

      const imagesDirectory = getFolderNameWithTarget(__dirname, 'oldimages');

      fullpath = await getImage(
        imagesDirectory,
        filename as string,
        newWidth,
        newHeight
      );

      if (fullpath == 'Wrong Number') {
        res.status(400).send('You entered invalid height or width');
      } else {
        res.status(200).sendFile(fullpath);
      }
    } else {
      console.log('Filename is wrong');
      res.status(404).send('Filename is incorrect');
    }
  } else {
    console.log('No filename Entered');
    res.status(400).send('Must include a filename');
  }
});

export default images;
