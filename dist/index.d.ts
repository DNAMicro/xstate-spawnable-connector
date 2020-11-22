import { Context } from "./types";
export declare const spawn: (context: Context) => import("xstate").StateMachine<Context, any, any, {
    value: any;
    context: Context;
}>;
export declare const Interpret: (context: Context) => import("xstate").Interpreter<Context, any, any, {
    value: any;
    context: Context;
}>;
