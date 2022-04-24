//your tests

import path from 'path';
import supertest from 'supertest';
import app from '..';
import { getFolderNameWithTarget, getImage } from '../utils/utils';

const test = supertest(app);

describe('Testing Enviroment', () => {
  //Testing Root
  it('Test Root ', async () => {
    const res = await test.get('/');
    expect(res.text).toContain('html');
  });

  //Testing Images
  it('Test Images with no queries', async () => {
    const res = await test.get('/images');
    expect(res.status).toBe(400);
    expect(res.text).toBe('Must include a filename');
  });

  it('Test Images queries with incorrect filename ', async () => {
    const res = await test.get('/images?filename=invalid');
    expect(res.status).toBe(404);
    expect(res.text).toBe('Filename is incorrect');
  });

  it('Test Images queries with correct filename ', async () => {
    const res = await test.get('/images?filename=computer.jpg');
    expect(res.status).toBe(200);
  });

  it('Test Images queries with correct filename and change Width only', async () => {
    const res = await test.get('/images?filename=computer.jpg&width=100');
    expect(res.status).toBe(200);
  });

  it('Test Images queries with correct filename and change Height only', async () => {
    const res = await test.get('/images?filename=computer.jpg&height=100');
    expect(res.status).toBe(200);
  });

  it('Test Images queries with correct filename and change Height & Width', async () => {
    const res = await test.get(
      '/images?filename=computer.jpg&height=100&width=100'
    );
    expect(res.status).toBe(200);
  });

  it('Test Images queries with correct filename and change Height & Width with negative numbers', async () => {
    const res = await test.get(
      '/images?filename=computer.jpg&height=-100&width=-100'
    );
    expect(res.status).toBe(200);
  });

  //Testing Functions
  it('Test Get image function that produces the images with width and height', async () => {
    const fname = 'computer.jpg',
      W = 120,
      H = 120;
    const current = getFolderNameWithTarget(__dirname, 'oldimages');
    const newfile: string =
      path.parse(fname).name + '-width' + W + '-height' + H + '.jpg';
    const Newpath = path.join(current, 'Resized', newfile);

    expect(await getImage(current, fname, W, H)).toBe(Newpath);
  });
});
