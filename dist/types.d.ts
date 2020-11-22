import { AnyEventObject } from 'xstate';
export interface AES_256_CBC_CIPHER_PARAMS {
    encryption_key: string;
    encryption_iv: string;
}
export declare type MachineType = any;
export interface MessageType<TPayload> extends AnyEventObject {
    type: string;
    payload: TPayload;
}
export interface Context {
    encryption: AES_256_CBC_CIPHER_PARAMS;
}
export interface InitializedEvent<TPayload> {
    type: "INITIALIZED";
    payload: TPayload;
}
export interface SendEvent<TPayload> {
    type: "Send";
    payload: TPayload;
}
export interface MessageEvent {
    type: "MESSAGE";
    payload: string;
}
export interface ErrorEvent {
    type: "ERROR";
    error: Error;
}
