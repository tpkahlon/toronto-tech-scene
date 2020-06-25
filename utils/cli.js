const axios = require('axios');
const io = require('console-read-write');
const chalk = require('chalk');
const ora = require('ora');
const table = require('./table');
const cliTable = require('cli-table');
const mdParse = require('md-2-json');

const parseJSON = (content) => {
  let data = [];
  let keys = [
    'Toronto-based Tech Companies',
    'Tech Companies with an Office in Toronto',
    'Tech Companies who can Hire Remotely in Ontario',
  ];
  for (let i = 0; i < keys.length; i++) {
    const revisedText =
      content[keys[i]].raw && content[keys[i]].raw.replace(/→|->/gi, '');
    data.push({
      title: keys[i],
      text: revisedText || hasChildren(),
    });
  }
  return data;
};

module.exports = async () => {
  io.write(
    chalk.green(
      '\nA list of tech employers located in Toronto and the GTA or who hire remotely in Ontario.'
    )
  );
  const spinner = ora(' Fetching Location Information');
  try {
    io.write('');
    spinner.start();
    const { data } = await axios(
      `https://raw.githubusercontent.com/toriagibbs-zz/toronto-tech-scene/master/README.md`
    );
    const json = mdParse.parse(data);
    const result = parseJSON(json);
    spinner.stop();
    table(result);
  } catch (error) {
    spinner.stop();
    const errorTable = new cliTable();
    errorTable.push({ Error: 'Invalid IP Address' });
    console.log(errorTable.toString());
  }
};
