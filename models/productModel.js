const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Too short product title"],
      maxlength: [100, "Too long product title"],
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      minlength: [10, "Too short product description"],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      trim: true,
      max: [200000, "Too long product price"],
    },
    priceAfterDiscount: {
      type: Number,
    },

    imageCover: {
      type: String,
      required: [true, "Product Image cover is required"],
    },
    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Product must be belong to category"],
    },
    subcategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "SubCategory",
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
  },
  {
    timestamps: true,
    // // to enable virtual populate
    // toJSON: { virtuals: true },
    // toObject: { virtuals: true },
  }
);

// Mongoose query middleware
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name ",
  });
  this.populate({
    path: "subcategories",
    select: "name ",
  });
  this.populate({
    path: "brand",
    select: "name ",
  });
  next();
});

// const setImageURL = (doc) => {
//   if (doc.imageCover) {
//     const imageUrl = `/products/${doc.imageCover}`;
//     doc.imageCover = imageUrl;
//   }
//   if (doc.images) {
//     const imagesList = [];
//     doc.images.forEach((image) => {
//       const imageUrl = `/products/${image}`;
//       imagesList.push(imageUrl);
//     });
//     doc.images = imagesList;
//   }
// };
// findOne, findAll and update
// productSchema.post("init", (doc) => {
//   setImageURL(doc);
// });

// // create
// productSchema.post("save", (doc) => {
//   setImageURL(doc);
// });

module.exports = mongoose.model("Product", productSchema);
