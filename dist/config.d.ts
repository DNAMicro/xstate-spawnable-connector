export declare const config: {
    id: string;
    initial: string;
    states: {
        start: {
            entry: string[];
            invoke: {
                src: string;
            };
            on: {
                ERROR: {
                    actions: string[];
                };
                INITIALIZED: {
                    actions: string[];
                    target: string;
                };
            };
        };
        active: {
            invoke: {
                src: string;
            };
            on: {
                SEND: ({
                    cond: string;
                    actions: string;
                } | {
                    actions: string;
                    cond?: undefined;
                })[];
                MESSAGE: ({
                    cond: string;
                    actions: string;
                } | {
                    actions: string;
                    cond?: undefined;
                })[];
            };
        };
    };
};
