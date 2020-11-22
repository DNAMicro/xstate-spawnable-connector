import { MachineOptions, sendParent } from "xstate";
import { Context, InitializedEvent, MachineType, SendEvent, MessageType, MessageEvent } from "./types";
import { encrypt, decrypt, log, deserializeFromJSON, serializeToJSON } from "./util";

const append = log("MachineName");


export const implementation: MachineOptions<Context,any> = {
  services: {
    initializeMachine: () => send => {
      try {

      } catch (error) {
        send({
          type: 'ERROR',
          error
        })
      }
    },
    listener: () => send => {
      try {

      } catch (error) {
        send({
          type: 'ERROR',
          error
        })
      }

      return () => {}
    },
  },
  actions: {
    logStart: () => console.log(append(),'Machine Started'),
    logReady: () => console.log(append(),'Machine Ready'),
    logError: (_,error) => console.error(append(),'Machine Error', error.message, '\n',error.stack),
    notifyParentOfInitialization: sendParent(
      (_,e:InitializedEvent<MachineType>):InitializedEvent<MachineType>=> e 
    ),
    sendMessage: (_, {payload}:SendEvent<MessageType<any>>):void => {
      const message = serializeToJSON(payload)
      message
      // sender?.send()
    },
    encryptedAndSendMessage: ({encryption:{encryption_iv,encryption_key}}, {payload}:SendEvent<MessageType<any>>):void => {
      const message = serializeToJSON(payload)
      const envelope = encrypt(message,encryption_key, encryption_iv)
      envelope
      // sender?.send()
    },
    sendMessageToParent: (_,{payload}:MessageEvent): MessageType<any>=> {
      const message = deserializeFromJSON(payload) as MessageType<any>
      return {
        //@ts-ignore
        type: "NOOP", // Guard against typeless messages to be send directy to parent machine
        ...message
      }
    },
    decryptAndSendMessageToParent: ({encryption: {encryption_key,encryption_iv}},{payload}:MessageEvent): MessageType<any>=> {
      const envelope = decrypt(payload,encryption_key, encryption_iv)
      const message = deserializeFromJSON(envelope) as MessageType<any>
      return {
        //@ts-ignore
        type: "NOOP", // Guard against typeless messages to be send directy to parent machine
        ...message
      }
    },
  },
  guards: {
    isEncrypted: ({encryption} )=>encryption ? true :false
  },
  activities: {},
  delays: {}
}