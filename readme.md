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