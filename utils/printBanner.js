const leeks = require('leeks.js');
const figlet = require('figlet');

const { version } = require('../package.json');

module.exports = () => {
    figlet(`RBot v${version}`, {font: "Small Keyboard"}, function (err, data) {
        if (err) {
          console.log("Something went wrong...");
          console.dir(err);
          return;
        }
        console.log(leeks.colours.cyan(data));
    });
};