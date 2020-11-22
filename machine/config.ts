export const config = {
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
            // assignSender,
            // assignListener
          ],
          target: 'active'
        },
      },
    },
    active: {
      invoke: {
        src: "" //PushService || Listening Service
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
