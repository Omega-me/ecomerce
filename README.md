# 📊 Prisma Schema Analysis

## This document provides a detailed analysis of the Prisma schema used in your project. It outlines the database design and relationships

## 🧱 Schema Overview

The schema is designed for a typical **e-commerce application** with the following entities:

- `User`: Stores authenticated users with role-based access.
- `Product`: Represents items available for sale.
- `Order`: Represents a customer's order.
- `OrderItem`: Join table for products in an order.
- `Payment`: Tracks payment for each order.
- `Shipment`: Handles shipping details for each order.

---

## 🔗 Entity Relationships

### User ↔️ Order

- **One-to-Many**: One user can place multiple orders.

### Order ↔️ OrderItem

- **One-to-Many**: One order contains multiple order items.

### Product ↔️ OrderItem

- **One-to-Many**: One product can appear in many order items.

### Order ↔️ Payment / Shipment

- **One-to-One**: Each order has one payment and one shipment record.

---

## 🔐 Authentication Support

- The `User` model includes a `clerkId` field to integrate with Clerk authentication.

---

## 📦 Models and Considerations

### `User`

- Includes roles: `ADMIN`, `FINANCE`, `WAREHOUSE`, `USER`.

### `Product`

- Tracks stock, active status, and is linked to multiple order items.
- Optional `description` for flexible product entries.

### `Order`

- Stores the status, total cost, and timestamps.
- Automatically updates `updatedAt` for tracking changes.
- Has nullable `payment` and `shipment`, which are added after order creation.

### `OrderItem`

- Denormalizes price to store snapshot at purchase time.
- Prevents price fluctuation issues post-order.

### `Payment`

- Enum for method and status to support multiple gateways.
- `transactionId` allows integration with Stripe.

### `Shipment`

- Stores address, city, zip, and status tracking.
- `shippedAt` and `deliveredAt` support logistics tracking.

---
