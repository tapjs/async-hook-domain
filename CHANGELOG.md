# 4.0

- Port to TypeScript
- Replace default export with named `Domain` export
- Build hybrid esm/cjs module

# 3.0

- Port to new interfaces
- add types
- drop support for node less than 16

# 2.0

- Drop support for node less than 10
- Remove promiseExecutionId reset in `after` hook
- gracefully no-op things if `process` is not set

# 1.1

- expose type on `onerror` method
- add debug environment flag
- report TypeError from ctor more helpfully

# 1.0

- initial implementation
