const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const path=require('path')
const userroute=require('./Routes/user_routes');

const PORT = 4000;

app.use(express.json({ limit: "500mb" })); // Parse JSON bodies with increased limit
app.use(express.urlencoded({ extended: true, limit: "500mb" })); // Parse URL-encoded bodies with increased limit
app.use(cors());

app.use('/api',userroute);

app.use('/Images', express.static(path.join(__dirname, 'Images')));
const server=app.listen(PORT, () => {
  console.log(`Server Start at port No: ${PORT}`);
});
