const Path = require('path');
const Fs = require('fs');
const Handlebars = require('handlebars');

module.exports = (partial, data) => {
  // read hbs partial into a variable
  const path = Path.join(__dirname, 'handlebars', 'partials', `${partial}.hbs`);
  const hbs = Fs.readFileSync(path, 'utf8');

  // create and return html string using handlebars
  const template = Handlebars.compile(hbs);
  const context = { data };
  const html = template(context);

  return html;
};
