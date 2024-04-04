const mongoose = require("mongoose");
const { string } = require("sharp/lib/is");

const devisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "devis must be belong to user"],
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
        },
        price: Number,
        quantity: Number,
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Completed", "Ordered"],
      default: "Pending",
    },
    CompletedAt: Date,

    taxPrice: {
      type: Number,
      default: 0,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
    shippingPrice: {
      type: Number,
      default: 0,
    },
    totalDevisPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

devisSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name profileImg email phone",
  }).populate({
    path: "cartItems.product",
    select: "title imageCover ",
  });

  next();
});

module.exports = mongoose.model("Devis", devisSchema);
