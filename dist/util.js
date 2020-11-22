"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = exports.deserializeFromJSON = exports.serializeToJSON = exports.log = void 0;
var crypto_1 = __importDefault(require("crypto"));
exports.log = function (module_name) { return function () {
    return "[" + new Date().toISOString() + "][" + module_name + "]:";
}; };
exports.serializeToJSON = function (literal) { return JSON.stringify(literal); };
exports.deserializeFromJSON = function (json_string) { return JSON.parse(json_string); };
exports.encrypt = function (val, encryption_key, encryption_iv) {
    var cipher = crypto_1.default.createCipheriv("aes-256-cbc", encryption_key, encryption_iv);
    var encrypted = cipher.update(val, "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
};
exports.decrypt = function (encrypted, encryption_key, encryption_iv) {
    var decipher = crypto_1.default.createDecipheriv("aes-256-cbc", encryption_key, encryption_iv);
    var decrypted = decipher.update(encrypted, "base64", "utf8");
    return decrypted + decipher.final("utf8");
};
