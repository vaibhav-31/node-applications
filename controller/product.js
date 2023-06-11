const model = require("../model/product");
const Product = model.Product;

exports.addProduct = (req, res) => {
  const product = new Product(req.body);
  product.save().then((result, err) => {
    console.log(result, err);
    if (result) {
      res.json(result);
    } else {
      res.json(err);
    }
  });
};

// atlas password Vaibhav31

exports.getProduct = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndDelete({ _id: id });
    res.status(201).json(doc);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
