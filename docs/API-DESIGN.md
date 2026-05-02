# Laundry Ordering System API

## BASE URL

`/api/v1`

---

# Authentication

## POST /auth/register

Register a new customer.

**Auth Required:**: No

### Request

```json
{
    "name": "Chai Tzu",
    "phone": "+7345678987",
    "email": "chai@gmail.com",
    "password": "password123"
}
```

### Response

```json
{
    "success": true,
    "data": {
        "token": "token",
        "user": {
            "id": "id",
            "name": "Chai Tzu",
            "phone": "+7345678987",
            "email": "chai@gmail.com",
            "role": "CUSTOMER"
        }
    }
}
```

### Status Codes

* 201 OK
* 400 Bad Request

---

## POST /auth/login

Login for registered customers and seeded admin.

**Auth Required:**: No

### Request

```json
{
    "email": "chai@gmail.com",
    "password": "password123"
}
```

### Response

```json
{
    "success": true,
    "data": {
        "token": "token",
        "user": {
            "id": "id",
            "name": "Chai Tzu",
            "phone": "+7345678987",
            "email": "chai@gmail.com",
            "role": "CUSTOMER"
        }
    }
}
```
### Status Codes

* 200 OK
* 400 Bad Request
* 401 Unauthorized

---

## GET /auth/me

Get current user details.

**Auth Required:** Yes 

### Headers

```
Authorization: Bearer <token>
```

### Response
```json
{
    "success": true,
    "data": {
        "id": "id",
        "name": "Chai Tzu",
        "phone": "+7345678987",
        "email": "chai@gmail.com",
        "role": "CUSTOMER",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
    }
}
```
### Status Codes

* 200 OK
* 401 Unauthorized

---

# Garments

## GET /garment-types

Retrieve a list of all available garment types.

**Auth Required:** Yes

### Headers
```
Authorization: Bearer <token>
```

### Query params
* search
* minPrice
* maxPrice

### Response
```json
{
    "success": true,
    "data": [
        {
            "id": "uuid",
            "name": "Blazer",
            "basePrice": 150,
            "createdAt": "timestamp",
            "updatedAt": "timestamp"
        },
        {
            "id": "uuid",
            "name": "Pants",
            "basePrice": 80,
            "createdAt": "timestamp",
            "updatedAt": "timestamp"
        },
    ]
}
```

### Status Codes

* 200 OK
* 401 Unauthorized

---

# Orders

## POST /orders

Create a new order.

**Auth Required:** Yes

### Headers
```
Authorization: Bearer <token>
```

### Request
```json
{
    "orderItems": [
        { "garmentTypeId": "1", "quantity": 2 },
        { "garmentTypeId": "2", "quantity": 1 }
    ]
}
```

### Response
```json
{
    "status": true,
    "data": {
        "id": "uuid",
        "userId": "uuid",
        "totalAmount": 50.00,
        "status": "RECEIVED",
        "estimatedDeliveryDate": "date",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
        }
}
```

### Status Codes

* 201 OK
* 400 Bad Request
* 401 Unauthorized

---

## PATCH /orders/:id/status

Update status of existing orders.

**Auth Required:** Yes
**Allowed Roles:** ADMIN

### Headers
```
Authorization: Bearer <token>
```

### Request
```json
{
    "status": "PROCESSING"
}
```

### Response
```json
{
    "id": "uuid",
    "userId": "uuid",
    "totalAmount": 50.00,
    "status": "PROCESSING",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
}
```

### Status Codes

* 200 OK
* 400 Bad Request
* 403 Forbidden
* 401 Unauthorized

## GET /orders

Get list of all orders.

**Auth Required:** Yes

### Headers
```
Authorization: Bearer <token>
```

### Query params:
* status
* userPhone
* userName
* garment

### Response
```json
[
    {
        "id": "uuid",
        "user": {
            "id": "uuid",
            "name": "Kei Izumi",
            "phone": "+918765456789"
        },
        "garments":[
            {
                "id": "id",
                "name": "Cotton Pants",
                "quantity": 2
            },
            {
                "id": "id",
                "name": "Whites",
                "quantity": 1
            }
        ],
        "totalAmount": 50.00,
        "status": "PROCESSING",
        "estimatedDeliveryDate": "date",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
    }
]
```

### Status Codes
* 200 - OK
* 403 - Forbidden
* 401 Unauthorized

---

## GET /orders/:id

Get order details by order Id. Admin can access all orders, customer can access their own orders.

**Auth Required:** Yes

### Headers
```
Authorization: Bearer <token>
```

### Response
```json
{
    "id": "uuid",
    "user": {
        "id": "uuid",
        "name": "name",
        "phone": "+917678987654",
        "role": "CUSTOMER"
    },
    "totalAmount": 50.00,
    "status": "PROCESSING",
    "estimatedDeliveryDate": "date",
    "orderItems": [
        {
            "id": "uuid", 
            "garmentTypeId": "1", 
            "quantity": 2, 
            "unitPrice": 20.0, 
            "subTotal": 40.0
        },
        {
            "id": "uuid", 
            "garmentTypeId": "2", 
            "quantity": 1, 
            "unitPrice": 10.0, 
            "subTotal": 10.0
        },
    ],
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
}
```

### Status Codes
* 200 OK
* 403 FORBIDDEN
* 404 NOT FOUND
* 401 Unauthorized

---

# Dashboard

## GET /dashboard/summary

**Auth Required:** Yes

### Headers
```
Authorization: Bearer <token>
```

### Response
```json
{
    "success": true,
    "data": {
        "totalOrders": 2,
        "totalRevenue": 760,
        "ordersByStatus": {
            "RECEIVED": 1,
            "PROCESSING": 1,
            "READY": 0,
            "DELIVERED": 0
        }
    }
}
```

### Status Codes
* 200 OK
* 401 unauthorized

---