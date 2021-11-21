const { Router } = require('express');
const authRoute = require('./auth.routes');
const docsRoute = require('./docs.routes');
const userRoute = require('./user.routes');
const flashcardRoute = require('./flashcard.routes');

const router = Router();

const defaultRoutes = [
  {
    path: '/docs',
    route: docsRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/flashcard',
    route: flashcardRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
