const { cyan, dim } = require('chalk');
const io = require('console-read-write');

module.exports = () => {
  io.write(
    dim(
      cyan(
        '\nStar ⭐️  the repo: https://github.com/tpkahlon/toronto-tech-scene/'
      )
    )
  );
  io.write(dim(cyan('Connect with me: https://github.com/tpkahlon/\n')));
};
