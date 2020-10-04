const router = require('express').Router();

router.route('/')
  .get('/', function (_req, res) {
    // console.log(req);
    res.sendFile(path.join(__dirname, "public", "index.html"));
    res.send(JSON.parse(db));
  });

module.exports = router;
