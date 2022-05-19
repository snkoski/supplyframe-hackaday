module.exports = {
  'Check index page': function (client) {
    client
      .url('http://localhost:3000/')
      .waitForElementVisible('body', 1000)
      .assert.title('Hackaday')
      .assert.containsText('h1', 'Hackaday Projects Go Here')
      .end();
  },
  'Check projects page': function (client) {
    client
      .url('http://localhost:3000/projects')
      .waitForElementVisible('body', 15000)
      .assert.title('Hackaday')
      .assert.containsText('h1', 'Select a Project')
      .assert.containsText('h3', 'Hackaday.io Project')
      .end();
  }
};
