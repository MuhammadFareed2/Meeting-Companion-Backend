"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = __importDefault(require("../modules/auth/routes"));
const routes_2 = __importDefault(require("../modules/transcript/routes"));
const index_1 = __importDefault(require("../modules/meeting/index"));
const index_2 = __importDefault(require("../modules/mom/index"));
const router = (0, express_1.Router)();
router.use("/auth", routes_1.default);
router.use("/transcript", routes_2.default);
router.use("/meeting", index_1.default);
router.use("/mom", index_2.default);
exports.default = router;
