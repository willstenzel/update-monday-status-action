const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');

try {
  const newStatus = core.getInput('merged') == 'false' ? core.getInput('submitted-status') : core.getInput('merged-status');
  
  const generateMutation = (boardId, pulseId) => `mutation { \
          change_column_value(board_id: ${core.getInput('BOARD_ID')},\
          column_id: "${core.getInput('COLUMN_ID')}", item_id: ${pulseId},\
          value: "{\\"label\\":\\"${newStatus}\\"}") \
          { id name column_values(ids: "status") { id text }}}`;

  const body = core.getInput('pull-request-body');
  const pulseId = body.substring(body.lastIndexOf('/') + 1, body.lastIndexOf('/') + 10)
  
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Token ${core.getInput('API_TOKEN')}` },
    body: JSON.stringify({ query: generateMutation(core.getInput('BOARD_ID'), pulseId) }),
  };
  fetch('https://api.monday.com/v2', options)
    .then((res) => res.json())
    .then((json) => { // logging response data 
      console.log(`    ID: ${json.data.change_column_value.id}`);
      console.log(`  Name: ${json.data.change_column_value.name}`);
      console.log(`Status: ${json.data.change_column_value.column_values[0].text}`);
    });
} catch (error) {
  core.setFailed(error.message);
}
