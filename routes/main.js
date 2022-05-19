const router = require('express').Router();
const fetch = require('node-fetch');
require('dotenv').config();

router.get('/', function (req, res) {
  res.render('pages/index');
});

router.get('/projects', async function (req, res, next) {
  const perPage = req.query.per_page || 9;
  const page = req.query.page || 1;
  const API_KEY = process.env.API_KEY;

  try {
    const uri = `http://api.hackaday.io/v1/projects?api_key=${API_KEY}&page=${page}&per_page=${perPage}`;

    const response = await fetch(uri, {
      method: 'GET',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => res.json());

    let owners = response.projects.map((project) => project.owner_id);

    res.render('pages/home', {
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

router.get('/projects/:id', async function (req, res) {
  const id = req.params.id;
  const API_KEY = process.env.API_KEY;
  try {
    const uri = `http://api.hackaday.io/v1/projects/${id}?api_key=${API_KEY}`;

    const response = await fetch(uri, {
      method: 'GET',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => res.json());

    res.render('pages/projects', {
      project: response
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
