const paymentService = require("../services/paymentService");

const makePayment = async (req, res, next) => {
  try {
    const payment = await paymentService.processPayment(
      req.params.bookingId,
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      data: payment
    });
  } catch (error) {
    next(error);
  }
};

const submitManualPayment = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Please upload a receipt image" });
    }

    const payment = await paymentService.processManualPayment(
      req.params.bookingId,
      req.user.id,
      req.body.method,
      req.file
    );

    res.status(201).json({
      success: true,
      data: payment
    });
  } catch (error) {
    next(error);
  }
};

const adminApprovePayment = async (req, res, next) => {
  try {
    const payment = await paymentService.approvePayment(req.params.paymentId);
    res.status(200).json({
      success: true,
      data: payment
    });
  } catch (error) {
    next(error);
  }
};

const getMyPayments = async (req, res, next) => {
  try {
    const payments = await paymentService.getPaymentsByUser(req.user.id);
    res.status(200).json({
      success: true,
      data: payments
    });
  } catch (error) {
    next(error);
  }
};

const getAllPayments = async (req, res, next) => {
  try {
    const payments = await paymentService.getAllPayments();
    res.status(200).json({
      success: true,
      data: payments
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  makePayment,
  submitManualPayment,
  adminApprovePayment,
  getMyPayments,
  getAllPayments
};
