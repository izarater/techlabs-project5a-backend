const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const ROLES = require("./utils/roles");
const User = require( "./models/Users" );
const Beneficiary = require( "./models/Beneficiary" );
const City = require( "./models/City" );
const Client = require( "./models/Client" );
const Country = require( "./models/Country" );
const Donation = require( "./models/Donation" );
const Establishment = require( "./models/Establishment" );
//const Order = require( "./models/Order" );
//const Product = require( "./models/Product" );


const app = express();

function main(){
  //body parser
  app.use(express.json()); 
  app.use(morgan('tiny'))
  // app.use(ROLES);
  //
  const username = 'izar';
  const password = 'nS7Nk1MldNdcd1YM';
  const database = 'TechLabs-Project';
  const uri = `mongodb+srv://${username}:${password}@cluster0.d3bkk.mongodb.net/${database}?retryWrites=true&w=majority`;
  const options = { useNewUrlParser: true, useUnifiedTopology: true }

  mongoose.connect(uri, options).then(
    () => { 
      console.log('Conectado a DB') 
      // User.create({
      //   // document: 1000831234,
      //   username: 'Lalo',
      //   password: 'lambda',
      // })
      /*
         City.create({
           code: 1,
           name: 'Bogotá',
           country_code: 57,
           country_id: "61792b8553a58b2c8357fe4f"
         })
         Country.create({
          code: 57,
          name: 'Colombia',
          country_code: 57,
        })*/
    },
    err => { console.log(err) }
  )
  
  // console.log('hola mundo')

  app.set('puerto', process.env.PORT || 3000)

  app.listen(app.get('puerto'), () => {
    console.log(`Listening http://localhost:${app.get('puerto')}`);
  });
  
}

main();