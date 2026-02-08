# Specification

## Summary
**Goal:** Ensure the Messages drawer is populated with at least one dummy conversation (and message) for every authenticated role, and never appears empty.

**Planned changes:**
- Normalize session role values (User, NGO, DeliveryPartner, Admin) to match the values expected by the existing chat seeding logic so dummy threads seed reliably for all roles.
- Ensure each role is seeded with at least one dummy thread containing at least one message, including at least one unread message so the badge count can be > 0 when applicable.
- Add a safe UI fallback in the Messages drawer: if the thread list is empty for any reason, show a dummy “welcome” conversation preview (participant name, last message, timestamp) instead of a blank/empty area.

**User-visible outcome:** When logged in as any role, opening the Messages drawer shows a non-empty conversation list (or a placeholder preview if something goes wrong), and the message icon always renders with an unread badge when unread seeded messages exist.
