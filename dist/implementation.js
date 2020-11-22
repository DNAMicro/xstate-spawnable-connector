"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.implementation = void 0;
var xstate_1 = require("xstate");
var util_1 = require("./util");
var append = util_1.log("MachineName");
exports.implementation = {
    services: {
        initializeMachine: function () { return function (send) {
            try {
            }
            catch (error) {
                send({
                    type: 'ERROR',
                    error: error
                });
            }
        }; },
        listener: function () { return function (send) {
            try {
            }
            catch (error) {
                send({
                    type: 'ERROR',
                    error: error
                });
            }
            return function () { };
        }; },
    },
    actions: {
        logStart: function () { return console.log(append(), 'Machine Started'); },
        logReady: function () { return console.log(append(), 'Machine Ready'); },
        logError: function (_, error) { return console.error(append(), 'Machine Error', error.message, '\n', error.stack); },
        notifyParentOfInitialization: xstate_1.sendParent(function (_, e) { return e; }),
        sendMessage: function (_, _a) {
            var payload = _a.payload;
            var message = util_1.serializeToJSON(payload);
            message;
        },
        encryptedAndSendMessage: function (_a, _b) {
            var _c = _a.encryption, encryption_iv = _c.encryption_iv, encryption_key = _c.encryption_key;
            var payload = _b.payload;
            var message = util_1.serializeToJSON(payload);
            var envelope = util_1.encrypt(message, encryption_key, encryption_iv);
            envelope;
        },
        sendMessageToParent: function (_, _a) {
            var payload = _a.payload;
            var message = util_1.deserializeFromJSON(payload);
            return __assign({ type: "NOOP" }, message);
        },
        decryptAndSendMessageToParent: function (_a, _b) {
            var _c = _a.encryption, encryption_key = _c.encryption_key, encryption_iv = _c.encryption_iv;
            var payload = _b.payload;
            var envelope = util_1.decrypt(payload, encryption_key, encryption_iv);
            var message = util_1.deserializeFromJSON(envelope);
            return __assign({ type: "NOOP" }, message);
        },
    },
    guards: {
        isEncrypted: function (_a) {
            var encryption = _a.encryption;
            return encryption ? true : false;
        }
    },
    activities: {},
    delays: {}
};
