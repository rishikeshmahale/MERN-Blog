const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const port = process.env.DB_PORT || 9000;
const Connection = require("./database/db.js");

const userRoute = require("./routes/userRoutes.js");
const postRoute = require("./routes/postRoutes.js");


app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something went wrong!";

  return res.status(errStatus).json({ message: errMessage });
});

app.use("/", userRoute);
app.use("/", postRoute);

Connection(process.env.DB_USERNAME, process.env.DB_PASSWORD);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});