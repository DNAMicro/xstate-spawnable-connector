# XState Connector Machine

## Description

XState machine wrapper for Connector Machine. 
A spawnable/invokable implementation for easy usage. 
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

**MESSAGE** - Sent to Parent when machine got message from another host.

```typescript
interface MessageType {
  type: "NOOP" || string;
  [ key: string] : 
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

- **Running**
  Initializes ZeroMQ Process.


- **Running**
  Initializes ZeroMQ Process.
