const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: [2, "To short SubCategory name"],
      maxlength: [32, "To long SubCategory name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "SubCategory must be belong to parent category"],
    },
    image: String,
  },
  { timestamps: true }
);


subCategorySchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name _id",
  });

  next();
});
// const setImageURL = (doc) => {
//   if (doc.image) {
//     const imageUrl = `/subCategories/${doc.image}`;
//     doc.image = imageUrl;
//   }
// };


// // findOne, findAll and update
// subCategorySchema.post("init", (doc) => {
//   setImageURL(doc);
// });

// // create
// subCategorySchema.post("save", (doc) => {
//   setImageURL(doc);
// });

module.exports = mongoose.model("SubCategory", subCategorySchema);
