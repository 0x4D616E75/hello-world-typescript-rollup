import expressJs from 'express';

class App {
  public express;

  constructor () {
    this.express = expressJs();
    this.mountRoutes();
  }

  private mountRoutes (): void {
    const router = expressJs.Router();
    router.get('/', (req, res) => {
      res.json({
        message: 'Hello World!'
      })
    });
    this.express.use('/', router);
  }
}

export default new App().express