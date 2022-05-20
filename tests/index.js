module.exports = {
  'Check index page': function (client) {
    client
      .url('http://localhost:3000/')
      .waitForElementVisible('body', 1000)
      .assert.title('Hackaday')
      .assert.containsText('h1', 'Go to projects page')
      .end();
  },
  'Check projects page': function (client) {
    client
      .url('http://localhost:3000/projects')
      .waitForElementVisible('body', 15000)
      .assert.title('Hackaday')
      .assert.containsText('h1', 'Select a Project')
      .assert.containsText('h2', 'Hackaday.io Project')
      .end();
  },
  'Check 2nd projects page': function (client) {
    client
      .url('http://localhost:3000/projects?page=2')
      .waitForElementVisible('body', 15000)
      .assert.title('Hackaday')
      .assert.containsText('h1', 'Select a Project')
      .assert.containsText('h2', 'ramanPi - Raman Spectrometer')
      .end();
  },
  'Check project #46 page': function (client) {
    client
      .url('http://localhost:3000/projects/46')
      .waitForElementVisible('body', 15000)
      .assert.title('Hackaday')
      .assert.containsText('h1', 'Hackaday.io Project')
      .assert.containsText('p', 'Summary:')
      .end();
  }
};
