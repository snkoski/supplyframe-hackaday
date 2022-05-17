const router = require('express').Router();
const fetch = require('node-fetch');

router.get('/', function (req, res) {
  res.render('pages/index');
});

router.get('/projects/:page', async function (req, res, next) {
  const perPage = 9;
  const page = req.params.page || 1;

  try {
    const uri = `http://api.hackaday.io/v1/projects?api_key=fFndNxfzWpFivelu&page=${page}&per_page=${perPage}`;

    const response = await fetch(uri, {
      method: 'GET',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => res.json());

    console.log('res', response);

    res.render('pages/projects', {
      current: response.page,
      pages: response.last_page,
      projects: response.projects
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
