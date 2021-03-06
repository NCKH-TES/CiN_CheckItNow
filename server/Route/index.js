const AppError = require('../utils/AppError');
const userRouter = require('./userRoutes');
const taskRouter = require('./taskRoutes');
const authRouter = require('./authRoutes');
const errorController = require('../Controller/errorController');
module.exports = (app) => {
  app.use('/api/user', userRouter);
  app.use('/api/task', taskRouter);
  app.use('/api/auth', authRouter);
  // app.all('/*', (req, res, next) => {
  //   next(new AppError('Page not found', 404));
  // });
  app.use(errorController);
};
