"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    id: 'machine-name',
    initial: "start",
    states: {
        start: {
            entry: ["logStart"],
            invoke: {
                src: "initializeMachine",
            },
            on: {
                ERROR: {
                    actions: ['logError']
                },
                INITIALIZED: {
                    actions: [
                        "logReady",
                        "notifyParentOfInitialization",
                    ],
                    target: 'active'
                },
            },
        },
        active: {
            invoke: {
                src: ""
            },
            on: {
                SEND: [
                    {
                        cond: 'isEncrypted',
                        actions: 'encryptedAndSendMessage'
                    },
                    {
                        actions: 'sendMessage'
                    }
                ],
                MESSAGE: [
                    {
                        cond: 'isEncrypted',
                        actions: 'decryptAndSendMessageToParent'
                    },
                    {
                        actions: 'sendMessageToParent'
                    }
                ]
            }
        }
    },
};
