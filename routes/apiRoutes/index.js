const router = require('express').Router();
const userRoutes = require('./userRoutes');

// router.get('/', (_req, res) => {
//   res.send('Hello');
// });
router.use('/notes', userRoutes);

module.exports = router;
