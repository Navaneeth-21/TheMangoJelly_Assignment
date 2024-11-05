const express = require("express");
const comicbookapi = require('./routers/bookRouters');
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/v1' , comicbookapi);

app.get("/", (req, res) => {
  res.send("hello .........");
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
