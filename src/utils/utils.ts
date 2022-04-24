import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

export const getFolderName = (current: string): string => {
  let Folder = '';
  const currentDir: string[] = fs.readdirSync(current);
  const Target = 'oldimages';

  if (currentDir.includes(Target)) {
    Folder = path.join(current, Target);
  } else {
    const newCurrent: string = path.join(current, '..');
    Folder = getFolderName(newCurrent);
  }

  return Folder;
};

export const getFolderNameWithTarget = (
  current: string,
  Target: string
): string => {
  let Folder = '';
  const currentDir: string[] = fs.readdirSync(current);

  if (currentDir.includes(Target)) {
    Folder = path.join(current, Target);
  } else {
    const newCurrent: string = path.join(current, '..');
    Folder = getFolderNameWithTarget(newCurrent, Target);
  }

  return Folder;
};

export const getImages = (current: string): string[] => {
  const Folder = getFolderNameWithTarget(current, 'oldimages');
  const images = fs.readdirSync(Folder);

  return images;
};

export const FolderExist = (p: string, folder: string): void => {
  const dest: string = path.join(p, folder);

  if (!fs.existsSync(dest)) {
    console.log('Creating the ' + folder + ' Folder');
    fs.mkdirSync(dest);
  } else {
    console.log('Folder ' + folder + ' already exist');
  }
};

export const getImage = async (
  current: string,
  fname: string,
  W: number,
  H: number
): Promise<string> => {
  if (!(W || H)) {
    return path.join(current, fname);
  } else {
    FolderExist(getFolderNameWithTarget(__dirname, 'oldimages'), 'Resized');

    if (W && H) {
      const newfile: string =
        path.parse(fname).name + '-width' + W + '-height' + H + '.jpg';
      const newpath: string = path.join(current, 'Resized', newfile);

      if (isNaN(W) || isNaN(H)) {
        console.log('You entered invalid height or width');
        return 'Wrong Number';
      } else if (fs.existsSync(newpath)) {
        console.log('file already exists');
        return newpath;
      } else {
        console.log(' Creating the file ');
        await changeImageSize(path.join(current, fname), newpath, W, H);
        return newpath;
      }
    } else if (H) {
      //Height

      const newfile: string = path.parse(fname).name + '-height' + H + '.jpg';

      const newpath: string = path.join(current, 'Resized', newfile);
      if (fs.existsSync(newpath)) {
        return newpath;
      } else {
        await changeImageSize(path.join(current, fname), newpath, 0, H);
        return newpath;
      }
    } else {
      //Width
      const newfile: string = path.parse(fname).name + '-width' + W + '.jpg';

      const newpath: string = path.join(current, 'Resized', newfile);

      if (fs.existsSync(newpath)) {
        return newpath;
      } else {
        await changeImageSize(path.join(current, fname), newpath, W, 0);
        return newpath;
      }
    }
  }

  return current;
};

export const changeImageSize = async (
  current: string,
  newcurrent: string,
  w: number,
  h: number
): Promise<void> => {
  if (w && h) {
    await sharp(current).resize({ width: w, height: h }).toFile(newcurrent);
  } else if (h) {
    const realImage = await sharp(current).metadata();

    await sharp(current)
      .resize({ width: realImage.width, height: h })
      .toFile(newcurrent);
  } else if (w) {
    const realImage = await sharp(current).metadata();

    await sharp(current)
      .resize({ width: w, height: realImage.height })
      .toFile(newcurrent);
  }
};

//export default getFolderName
