const cliTable = require('cli-table');
const colors = require('colors');
const wrap = require('word-wrap');

module.exports = (data) => {
  const table = new cliTable({
    head: ['Company'.yellow, 'Industry'.yellow, 'Website'.yellow],
  });

  data.forEach((i) => {
    const { title, text } = i;
    table.push([wrap(title, { width: 20, trim: true }).brightCyan, '', '']);
    text
      .split('\n')
      .filter((i) => i !== '')
      .filter((i) => i !== '|---|---|---|')
      .filter((i) => i !== '|---|---|---|---|')
      .filter(
        (i) =>
          i !== '| Company | Industry/product | HQ location | Learn more | '
      )
      .filter((i) => i !== '| Company | Industry/product | Learn more | ')
      .map((i) => {
        return i
          .split('|')
          .filter((j) => j !== '')
          .filter((j) => j !== ' ')
          .map((j) => j.trim());
      })
      .forEach((i) => {
        const company = i[0].split(']')[0].replace(/\[/gi, '');
        let url = i[2].includes('http') ? i[2] : i[3];
        url = `http${url.split('http')[1]}`;
        url = url.replace(/\)/gi, '');
        table.push([
          wrap(company, { width: 20, trim: true }),
          wrap(i[1], { width: 30, trim: true }),
          wrap(url, { width: 40, cut: true }),
        ]);
      });
  });

  console.log(table.toString());
};
