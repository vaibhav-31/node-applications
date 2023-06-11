const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const model = require("../model/user");
const User = model.User;

exports.addUser = (req, res) => {
  const user = new User(req.body);

  var token = jwt.sign({ email: req.body.email }, process.env.SECRET);
  const hash = bcrypt.hashSync(req.body.password, 10);

  user.token = token;
  user.password = hash;

  user.save().then((result, err) => {
    console.log(result, err);
    if (result) {
      res.json(result);
    } else {
      res.json(err);
    }
  });
};

exports.login = async (req, res) => {
  try {
    const doc = await User.findOne({ email: req.body.email });
    const isAuth = bcrypt.compareSync(req.body.password, doc.password);
    if (isAuth) {
      var token = jwt.sign({ email: req.body.email }, process.env.SECRET);
      res.json({ token });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.status(401).json(err);
  }
};
