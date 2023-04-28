const {APP} = require('./App/Constant/Global');

const app = require('./App/app');

app.listen(APP.PORT, () => {
  console.log(`Serveur démarré en http://localhost:${APP.PORT}`);
});