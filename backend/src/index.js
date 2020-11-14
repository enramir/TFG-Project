require('dotenv').config();

const express =  require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const multiparty = require("connect-multiparty");
const productAPI = require(path.join(__dirname,"/products-API"));

const app = express();

// settings
const port = process.env.PORT || 8080;
const BASE_PATH = "/api";

// middlewares
app.use(bodyParser.json());
app.use(cors());
var md_upload = multiparty({ uploadDir: "./upload/products" });

// database
const MongoClient = require('mongodb').MongoClient;

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

var products;

client.connect(err => {
  products = client.db("tfg").collection("products");
  // perform actions on the collection object
  console.log("Connected");

  // Call to product-API
  productAPI(app, BASE_PATH, products, md_upload);

  app.listen(port, () =>{
    console.log("Server ready on port: " + port);
  }).on("error", (e) => {
    console.log("Server not ready: " + e);
  });
  
});


