# AI Usage Notes -- ideal

## Backend Architecture
Used ChatGPT to discuss whether to implement RBAC with ADMIN/CUSTOMER roles or keep single-admin architecture.

Final decision:
Implemented lightweight RBAC because it aligned better with real laundry business workflows while still remaining manageable within assignment scope.

---

## Prisma Schema
Used AI to scaffold initial Prisma schema relationships between User, Order, and OrderItem.

Issue:
Initial schema suggested unnecessary normalization for garment pricing.

Improvement:
Simplified pricing model by storing unitPrice directly in OrderItem to preserve historical order pricing.

---

## Auth Middleware
Used AI to generate JWT middleware boilerplate.

Issue:
Generated middleware lacked proper TypeScript typing for Express Request extensions.

Fix:
Added custom request interface and improved token validation handling.

---

## Dashboard Logic
Used AI to brainstorm aggregation queries for revenue and order status counts.

Improvement:
Optimized queries using Prisma groupBy instead of multiple sequential database calls.

--------------------------------------------------------------------------------------------------------------------------

# Actual notes: -------------------------

## Requirement & Schema Design
Used AI to discuss tradeoffs between normalized vs simplified schema design for garments and orders.

Discussed:
- whether garments should be stored in separate tables
- whether pricing should be dynamically calculated or stored historically
- how much normalization was appropriate for a short assignment

Final decision:
Kept schema relational but simplified enough to avoid overengineering while still supporting realistic business workflows.

---

## Data Modeling Decisions
Used AI discussions to refine entity relationships for handling multi-item laundry orders.

Initial approach:
Stored garment and quantity directly on the Order table.

Issue identified:
This design only supported one garment per order.

Improvement:
Refactored schema using Order + OrderItem relationship to support multiple garment types per order in a normalized and scalable way.

---

## API Contract Refinement
Used AI to review API consistency, HTTP status code correctness, and REST naming conventions.

Issues identified and corrected:
- Incorrect use of 404 for authentication failures
- Enum inconsistencies (`PROCESSED` vs `PROCESSING`)
- Order schema initially mismatched with API response structures

Improvements focused on maintaining clean and predictable API behavior.

---

## Prisma & Database Setup
Used AI assistance to scaffold Prisma schema models, indexes, and entity relationships for the laundry management system.

AI also helped review:
- normalized Order/OrderItem design
- indexing strategy for filtering/searching
- practical tradeoffs between scalability and simplicity

---

## Prisma Configuration
Used AI assistance to compare Prisma's standard client setup with the newer driver adapter approach using `pg` and `@prisma/adapter-pg`.

Final decision:
Used the standard `PrismaClient()` configuration to keep the backend simpler and reduce unnecessary infrastructure complexity for the assignment scope.

---

## Prisma Client Configuration
Initially attempted to use Prisma's standard `PrismaClient()` setup for simplicity.

Issue:
Encountered runtime initialization/configuration issues with Prisma v7 and `prisma.config.ts`.

Resolution:
Switched to the previously tested `pg` + `@prisma/adapter-pg` configuration approach, which provided stable connection handling and aligned with prior project experience.

---

## TypeScript + JWT Typing
Encountered a type mismatch between decoded JWT payloads and Prisma Role enums.

Issue:
JWT payload role was inferred as a generic string while Express request typing expected Prisma's `Role` enum.

Fix:
Aligned JWT payload typing with Prisma enum types to maintain end-to-end type safety.

---

## Authentication System
Used AI assistance to scaffold JWT authentication flow, middleware structure, and request validation setup.

AI accelerated:
- JWT middleware creation
- Zod schema generation
- controller/service separation
- Prisma auth queries

Manual improvements:
- fixed enum typing issues between JWT payloads and Prisma Role types
- refined middleware structure for cleaner authorization handling

---

## API Response Refinement
AI initially returned complete Prisma user objects directly in authentication responses.

Improvement:
Refined responses manually to expose only required public user fields and avoid leaking sensitive data such as password hashes.

---

