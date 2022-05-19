const router = require('express').Router();
const fetch = require('node-fetch');
require('dotenv').config();

router.get('/', function (req, res) {
  res.render('pages/index');
});

router.get('/projects/:page', async function (req, res, next) {
  const perPage = 9;
  const page = req.params.page || 1;
  const API_KEY = process.env.API_KEY;
  console.log('API_KEY', API_KEY);
  try {
    const uri = `http://api.hackaday.io/v1/projects?api_key=fFndNxfzWpFivelu&page=${page}&per_page=${perPage}`;

    const response = await fetch(uri, {
      method: 'GET',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => res.json());

    console.log('res', response);
    let owners = response.projects.map((project) => project.owner_id);

    res.render('pages/projects', {
      current: response.page,
      pages: response.last_page,
      owners: owners,
      projects: response.projects
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
