const mongoose = require("mongoose");
// 1- Create Schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category required"],
      unique: [true, "Category must be unique"],
      minlength: [3, "Too short category name"],
      maxlength: [32, "Too long category name"],
    },
    // A and B => shopping.com/a-and-b
    slug: {
      type: String,
      lowercase: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    image: String,
  },
  { timestamps: true }
);

// const setImageURL = (doc) => {
//   if (doc.image) {
//     const imageUrl = `/categories/${doc.image}`;
//     doc.image = imageUrl;
//   }
// };
// // findOne, findAll and update
// categorySchema.post("find", (doc) => {
//   setImageURL(doc);
// });

// create
// categorySchema.post("save", (doc) => {
//   setImageURL(doc);
// });


// 2- Create model
module.exports = mongoose.model("Category", categorySchema);
