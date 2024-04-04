const asyncHandler = require("express-async-handler");
const factory = require("./handlersFactory");
const ApiError = require("../utils/apiError");

const Cart = require("../models/cartModel");
const Devis = require("../models/devisModel");

const calcTotalCartPrice = (devis) => {
  let totalPrice = 0;
  devis.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });
  devis.totalDevisPrice = totalPrice;
  return totalPrice;
};

// @desc    create devis
// @route   POST /api/v1/devis/cartId
// @access  Protected/User
exports.createDevis = asyncHandler(async (req, res, next) => {
  // app settings
  const taxPrice = 0;
  const shippingPrice = 0;

  // 1) Get cart depend on cartId
  const cart = await Cart.findById(req.params.cartId);
  if (!cart) {
    return next(
      new ApiError(`There is no such cart with id ${req.params.cartId}`, 404)
    );
  }

  const cartPrice = cart.totalCartPrice;

  const totalDevisPrice = cartPrice + taxPrice + shippingPrice;

  // 3) Create devis
  const devis = await Devis.create({
    user: req.user._id,
    cartItems: cart.cartItems,

    totalDevisPrice,
  });

  // 5) Clear cart depend on cartId
  await Cart.findByIdAndDelete(req.params.cartId);

  res.status(201).json({ status: "success", data: devis });
});

exports.filterOrderForLoggedUser = asyncHandler(async (req, res, next) => {
  if (req.user.role === "user") req.filterObj = { user: req.user._id };
  next();
});
// @desc    Get all devis
// @route   POST /api/v1/devis
// @access  Protected/User-Admin-Manager
exports.findAllDevis = factory.getAll(Devis);

// @desc    Get specific devis
// @route   POST /api/v1/devis/:id
// @access  Protected/User-Admin-Manager
exports.findSpecificDevis = factory.getOne(Devis);

// @desc    delete specific devis
// @route   delete /api/v1/devis/:id
// @access  Protected/User-Admin-Manager
exports.deleteSpecificDevis = factory.deleteOne(Devis);

// @desc    Update devis  status to Completed
// @route   PUT /api/v1/orders/:id/completed
// @access  Protected/Admin-Manager
exports.updateDevisToCompleted = asyncHandler(async (req, res, next) => {
  const devis = await Devis.findById(req.params.id);
  if (!devis) {
    return next(
      new ApiError(
        `There is no such a devis with this id:${req.params.id}`,
        404
      )
    );
  }

  // update order to paid
  devis.status = "Completed";
  devis.CompletedAt = Date.now();

  const updatedDevis = await devis.save();

  res.status(200).json({ status: "success", data: updatedDevis });
});

// @desc    Update specific devis item
// @route   PUT /api/v1/devis/:devisId/item/:itemId
// @access  Private/User
exports.updateDevisItem = asyncHandler(async (req, res, next) => {
  const { quantity, price } = req.body;

  const devis = await Devis.findById(req.params.devisId);
  if (!devis) {
    return next(
      new ApiError(`there is no devis for user ${req.params.devisId}`, 404)
    );
  }

  const itemIndex = devis.cartItems.findIndex(
    (item) => item._id.toString() === req.params.itemId
  );
  if (itemIndex > -1) {
    const cartItem = devis.cartItems[itemIndex];
    cartItem.quantity = quantity;
    cartItem.price = price;
    devis.cartItems[itemIndex] = cartItem;
  } else {
    return next(
      new ApiError(`there is no item for this id :${req.params.itemId}`, 404)
    );
  }
  calcTotalCartPrice(devis);
  console.log(calcTotalCartPrice(devis));
  await devis.save();

  res.status(200).json({
    status: "success",
    numOfCartItems: devis.cartItems.length,
    data: devis,
  });
});

// @desc    Remove specific devis item
// @route   DELETE /api/v1/devis/:devisId/item/:itemId
// @access  Private/User
exports.removeSpecificDevisItem = asyncHandler(async (req, res, next) => {
  const devis = await Devis.findByIdAndUpdate(
    req.params.devisId,
    {
      $pull: { cartItems: { _id: req.params.itemId } },
    },
    { new: true }
  );

  calcTotalCartPrice(devis);
  devis.save();

  res.status(200).json({
    status: "success",
    numOfCartItems: devis.cartItems.length,
    data: devis,
  });
});
