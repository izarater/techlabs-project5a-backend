const express = require("express");
const auth = require('./routes/auth');
const user = require('./routes/user');
const app = express();

async function main(){
  //body parser
  app.use(express.json()); 
  auth(app);
  user(app);

  await app.listen(4000);
  console.log(`Listening http://localhost:${4000}`);
}

main();