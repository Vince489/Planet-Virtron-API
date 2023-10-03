const express = require("express");
const router = express.Router();

const gamerRoutes = require("./../domains/gamer")
const OTPRoutes = require("./../domains/otp");
const EmailVerificationRoutes = require("./../domains/email_verification");
const ForgotPasswordRoutes = require("./../domains/forgot_password");
const AccountRoutes = require("./../domains/account");
const TokenRoutes = require("./../domains/token");
const VRTRoutes = require("./../domains/VRT");
const BlockRoutes = require("./../domains/block");

router.use("/gamer", gamerRoutes)
router.use("/otp", OTPRoutes);
router.use("/email_verification", EmailVerificationRoutes);
router.use("/forgot_password", ForgotPasswordRoutes);
router.use("/account", AccountRoutes);
router.use("/token", TokenRoutes);
router.use("/VRT", VRTRoutes);
router.use("/block", BlockRoutes);

module.exports = router;
