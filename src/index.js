const app = require("./app");
const port = 5000;
let server;

server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
