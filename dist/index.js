"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./src/routes/index"));
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
if (!process.env.DB_URL) {
    throw new Error("❌ DB_URL is not defined in environment variables.");
}
mongoose_1.default.connect(process.env.DB_URL);
mongoose_1.default.connection.on("connected", () => {
    console.log("✅ MongoDB is connected.");
});
app.get("/", (req, res) => {
    res.send("Hello");
});
app.use("/api", index_1.default);
app.listen(PORT, () => {
    console.log(`Server is running at PORT:${PORT}`);
});
