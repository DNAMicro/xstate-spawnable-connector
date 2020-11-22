# XState Connector Machine

## Description

A spawnable connector machine that enables inter-xstate-machine communication between diferrent host over various transmission protocols.

This is meant to act as a framework for sending "xstate-events" over the network by building a communication layer over the a specified protocol. (e.g. tcp, grpc, http, websocket, apache-kafka, zeromq/axon, redis-pub-sub)

Encrypted by default. (AES-256-CBC)

## Context

Keys of the context of this state machine.

```typescript
interface Context {
  encryption: {
    encryption_key: ""; // Encryption Key (Min: 32 bytes string)
    encryption_iv: ""; // Encryption Vector (Min: 32 bytes string)
  }
}
```

## Events

### Machine To Parent

**INITIALIZED** - Sent to Parent when machine is ready to publish/listen.

```typescript
interface InitializedEvent {
  type: "INITIALIZED";
}
```

**MESSAGE** - Sent to Parent when machine got message from another host. Extend this definition for strictly typed events

```typescript
interface MessageType<TPayload> extends AnyEventObject {
  type: string,
  payload: TPayload
}

```

### Parent To Machine

**SendEvent** - Send this event to this machine to send "event" to anotherHost

```typescript
interface SendEvent<MessageType>{
  type: "SEND",
  payload: MessageType,
}

```

## States

List of States of this state machines

- **start**
  Started State of the machine, invokes setup of the communication layer.


- **active**
  State where the machine can actively send/recieve messages over specified protocol.