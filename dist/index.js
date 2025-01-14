"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mainApp_1 = require("./mainApp");
const dbConfig_1 = require("./utils/dbConfig");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, mainApp_1.mainApp)(app);
app.listen(parseInt(process.env.PORT), () => {
    (0, dbConfig_1.dbConfig)();
});
