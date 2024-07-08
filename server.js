const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json());

var port = 3000;

const users = [];

app.get("/users", (req, res) => {
  res.json(users);
});
app.get("/login", (req, res) => {
  res.render("login.ejs");
});
app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword);

    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send({ error: "500" });
  }
});

app.post("/users", async (req, res) => {
  const user = users.find((user) => users.name === req.body.name);
  if (user == null) return res.status(400).send("cannot find user");
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("not allowed");
    }
  } catch {
    res.status(500).send();
  }
});

app.listen(port);
