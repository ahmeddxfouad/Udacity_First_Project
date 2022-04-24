import express, { Request, Response } from 'express';
import images from './routes';

const app = express();
app.use('/images', images);

const port = 3000;

app.get('/', (__req: Request, res: Response): void => {
  console.log("You're in the root route");
  res.status(200).sendFile(__dirname + '/index.html');
});

// start the Express server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export default app;
