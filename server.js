import express from "express";
import mongoose from "mongoose";
import users from "./user.js";
import bodyParser from "body-parser";
//app.use(express.json());

const app = express();
app.use(bodyParser.json());

const url =
  "mongodb+srv://user:12345@cluster0.yyzp3.mongodb.net/Userdb?retryWrites=true&w=majority";
const PORT = 5009;

mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("Connected to MongoDB");
    }
  }
);
mongoose.connection.on("connected", async () => {
  app.listen(PORT, console.log(`server is running in ${PORT}`));
  console.log("connected to db");
});

// app.use("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

app.post("/user", (req, res) => {
  console.log("hello");
  const dat = req.body;
  console.log(dat);
  users.create(dat, (error, result) => {
    if (error) res.send(error);
    else res.send(result);
  });
});

// app.get("/", (req, res) => {
//   console.log("Redirecting");
//   return res.redirect("https://www.google.com/");
// });
app.get("/user", async (req, res) => {
  const result = await users.find();
  console.log(result);
  res.json(result);
});

app.delete("/user", (req, res) => {
  console.log("delete");

  const id = req.body._id;
  users.deleteOne(id, (error, doc) => {
    if (error) res.send(error);
    else res.send(doc);
  });
});
app.put("/user", (req, res) => {
  console.log(req.body);
  // const name = req.body.name;
  // const age = req.body.age;
  users.updateOne({ age: 40 }, { name: "john" }, () => res.send("updated"));
});
