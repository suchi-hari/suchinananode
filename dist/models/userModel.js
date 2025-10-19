"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersCollection = exports.initUserModel = void 0;
const dbconnection_1 = require("../dbconnection");
let Users;
const initUserModel = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, dbconnection_1.connectDB)();
    Users = db.collection("users");
});
exports.initUserModel = initUserModel;
/**
 * Get the Users collection after initialization
 */
const getUsersCollection = () => {
    if (!Users) {
        throw new Error("Users collection is not initialized. Call initUserModel() first.");
    }
    return Users;
};
exports.getUsersCollection = getUsersCollection;
