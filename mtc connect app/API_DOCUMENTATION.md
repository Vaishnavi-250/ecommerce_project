# API Documentation

## Base URL
```
https://api.mtcconnect.com/v1
```

## Authentication
All API endpoints (except auth endpoints) require authentication via Bearer token.

```
Authorization: Bearer <token>
```

## Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": {}
  }
}
```

## Success Response Format
```json
{
  "success": true,
  "data": {},
  "meta": {
    "timestamp": "2024-01-28T10:00:00Z",
    "version": "1.0"
  }
}
```

---

## Authentication Endpoints

### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200)**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "fullName": "John Doe",
      "phone": "+91-98765-43210"
    },
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Sign Up
```
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "phone": "+91-98765-43210"
}
```

**Response (201)**
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "...",
    "refreshToken": "..."
  }
}
```

### Logout
```
POST /auth/logout
Authorization: Bearer <token>
```

**Response (200)**
```json
{
  "success": true,
  "data": {
    "message": "Logged out successfully"
  }
}
```

---

## Bus Management Endpoints

### Search Buses
```
GET /buses/search?pickupLocation=Central%20Station&dropLocation=Airport&date=2024-01-28
Authorization: Bearer <token>
```

**Response (200)**
```json
{
  "success": true,
  "data": {
    "buses": [
      {
        "id": "bus_001",
        "busNumber": "MTC-401",
        "operatorName": "MTC Express",
        "departureTime": "08:00",
        "arrivalTime": "10:30",
        "duration": "2h 30m",
        "fare": 45,
        "seatsAvailable": 12,
        "totalSeats": 50,
        "rating": 4.5,
        "amenities": ["AC", "WiFi", "USB Charging"]
      }
    ]
  }
}
```

### Get Bus Details
```
GET /buses/{busId}
Authorization: Bearer <token>
```

**Response (200)**
```json
{
  "success": true,
  "data": {
    "bus": {
      "id": "bus_001",
      "busNumber": "MTC-401",
      "operatorName": "MTC Express",
      "operator": { "id": "op_1", "name": "MTC Express", "rating": 4.7 },
      "capacity": 50,
      "seatsLayout": "2x2",
      "amenities": ["AC", "WiFi", "USB Charging"],
      "route": {
        "id": "route_1",
        "startPoint": "Central Station",
        "endPoint": "Airport",
        "distance": 25,
        "duration": "2h 30m"
      }
    }
  }
}
```

### Get Bus Route
```
GET /buses/{busId}/route
Authorization: Bearer <token>
```

**Response (200)**
```json
{
  "success": true,
  "data": {
    "route": {
      "id": "route_1",
      "busId": "bus_001",
      "coordinates": [
        { "latitude": 13.0827, "longitude": 80.2707 },
        { "latitude": 13.0856, "longitude": 80.2807 }
      ],
      "stops": [
        {
          "id": "stop_1",
          "name": "Central Station",
          "latitude": 13.0827,
          "longitude": 80.2707,
          "sequence": 1,
          "estimatedTime": "08:00"
        },
        {
          "id": "stop_2",
          "name": "Airport",
          "latitude": 13.1939,
          "longitude": 80.2739,
          "sequence": 15,
          "estimatedTime": "10:30"
        }
      ]
    }
  }
}
```

### Get Bus Real-Time Location
```
GET /buses/{busId}/location
Authorization: Bearer <token>
```

**Response (200)**
```json
{
  "success": true,
  "data": {
    "location": {
      "busId": "bus_001",
      "latitude": 13.0856,
      "longitude": 80.2807,
      "heading": 45,
      "speed": 60,
      "timestamp": "2024-01-28T10:15:00Z",
      "nextStop": "stop_5",
      "estimatedArrival": 5,
      "occupancy": 35
    }
  }
}
```

### Get Nearby Buses
```
GET /buses/nearby?latitude=13.0827&longitude=80.2707&radius=5
Authorization: Bearer <token>
```

**Response (200)**
```json
{
  "success": true,
  "data": {
    "buses": [
      {
        "id": "bus_001",
        "busNumber": "MTC-401",
        "distance": 2.3,
        "estimatedArrival": 5,
        "route": "Central Station - Airport"
      }
    ]
  }
}
```

### Get Available Seats
```
GET /buses/{busId}/seats?date=2024-01-28
Authorization: Bearer <token>
```

**Response (200)**
```json
{
  "success": true,
  "data": {
    "seats": [
      { "seatNumber": "1A", "isAvailable": true },
      { "seatNumber": "1B", "isAvailable": false },
      { "seatNumber": "2A", "isAvailable": true }
    ],
    "totalAvailable": 12,
    "totalOccupied": 38
  }
}
```

---

## Ticketing Endpoints

### Book Ticket
```
POST /tickets/book
Authorization: Bearer <token>
Content-Type: application/json

{
  "busId": "bus_001",
  "date": "2024-01-28",
  "selectedSeats": ["1A", "1B"],
  "pickupPoint": "Central Station",
  "dropPoint": "Airport",
  "passengers": [
    {
      "name": "John Doe",
      "age": 30,
      "gender": "M",
      "idType": "AADHAR",
      "idNumber": "1234567890123456"
    }
  ]
}
```

**Response (201)**
```json
{
  "success": true,
  "data": {
    "ticket": {
      "id": "ticket_001",
      "ticketNumber": "MTC-2024-001001",
      "busNumber": "MTC-401",
      "date": "2024-01-28",
      "time": "08:00",
      "pickupPoint": "Central Station",
      "dropPoint": "Airport",
      "seats": ["1A", "1B"],
      "fare": 90,
      "tax": 16,
      "totalAmount": 106,
      "status": "PENDING_PAYMENT",
      "qrCode": "iVBORw0KGgoAAAANSUhEUgAAAQAAAA...",
      "createdAt": "2024-01-28T09:00:00Z"
    },
    "paymentSession": {
      "id": "session_001",
      "amount": 106,
      "currency": "INR"
    }
  }
}
```

### Get My Tickets
```
GET /tickets/my-tickets?status=confirmed&limit=20&offset=0
Authorization: Bearer <token>
```

**Response (200)**
```json
{
  "success": true,
  "data": {
    "tickets": [
      {
        "id": "ticket_001",
        "ticketNumber": "MTC-2024-001001",
        "busNumber": "MTC-401",
        "date": "2024-01-28",
        "time": "08:00",
        "pickupPoint": "Central Station",
        "dropPoint": "Airport",
        "seats": ["1A", "1B"],
        "totalAmount": 106,
        "status": "CONFIRMED"
      }
    ],
    "pagination": {
      "total": 25,
      "limit": 20,
      "offset": 0
    }
  }
}
```

### Get Ticket Details
```
GET /tickets/{ticketId}
Authorization: Bearer <token>
```

**Response (200)**
```json
{
  "success": true,
  "data": {
    "ticket": { ... }
  }
}
```

### Cancel Ticket
```
POST /tickets/{ticketId}/cancel
Authorization: Bearer <token>
Content-Type: application/json

{
  "reason": "Change of plans"
}
```

**Response (200)**
```json
{
  "success": true,
  "data": {
    "ticket": {
      "id": "ticket_001",
      "status": "CANCELLED",
      "refundAmount": 100,
      "refundStatus": "PENDING"
    }
  }
}
```

---

## Autorickshaw Endpoints

### Get Nearby Autorickshaws
```
GET /autorickshaw/nearby?latitude=13.0827&longitude=80.2707&limit=10
Authorization: Bearer <token>
```

**Response (200)**
```json
{
  "success": true,
  "data": {
    "autorickshaws": [
      {
        "id": "auto_001",
        "driverName": "Raj Kumar",
        "rating": 4.8,
        "reviews": 245,
        "vehicleNumber": "TN-01-AA-1234",
        "vehicleType": "AUTO_RICKSHAW",
        "currentLocation": {
          "latitude": 13.0850,
          "longitude": 80.2750
        },
        "distance": 0.5,
        "isAvailable": true,
        "estimatedFare": 45
      }
    ]
  }
}
```

### Book Autorickshaw
```
POST /autorickshaw/book
Authorization: Bearer <token>
Content-Type: application/json

{
  "autoId": "auto_001",
  "pickupLocation": {
    "latitude": 13.0827,
    "longitude": 80.2707,
    "address": "Central Station"
  },
  "dropLocation": {
    "latitude": 13.1939,
    "longitude": 80.2739,
    "address": "Airport"
  }
}
```

**Response (201)**
```json
{
  "success": true,
  "data": {
    "ride": {
      "id": "ride_001",
      "autoId": "auto_001",
      "driverName": "Raj Kumar",
      "driverPhone": "+91-98765-43210",
      "vehicleNumber": "TN-01-AA-1234",
      "pickupLocation": { ... },
      "dropLocation": { ... },
      "estimatedFare": 45,
      "estimatedDuration": 15,
      "status": "DRIVER_ASSIGNED",
      "driverLocation": { ... },
      "driverETA": 3
    }
  }
}
```

### Get Autorickshaw Details
```
GET /autorickshaw/{autoId}
Authorization: Bearer <token>
```

**Response (200)**
```json
{
  "success": true,
  "data": {
    "auto": { ... }
  }
}
```

### Update Autorickshaw Location (Driver only)
```
POST /autorickshaw/{rideId}/location
Authorization: Bearer <token>
Content-Type: application/json

{
  "latitude": 13.0860,
  "longitude": 80.2800,
  "heading": 45,
  "speed": 40
}
```

### End Autorickshaw Ride
```
POST /autorickshaw/{rideId}/end
Authorization: Bearer <token>
Content-Type: application/json

{
  "endLocation": {
    "latitude": 13.1939,
    "longitude": 80.2739
  },
  "rating": 5,
  "comment": "Great service!"
}
```

**Response (200)**
```json
{
  "success": true,
  "data": {
    "ride": {
      "id": "ride_001",
      "status": "COMPLETED",
      "finalFare": 45,
      "distance": 25,
      "duration": 18,
      "receipt": { ... }
    }
  }
}
```

---

## Payment Endpoints

### Initiate Payment
```
POST /payments/initiate
Authorization: Bearer <token>
Content-Type: application/json

{
  "bookingId": "ticket_001",
  "amount": 106,
  "paymentMethod": "UPI",
  "redirectUrl": "mtc-connect://payment-success"
}
```

### Verify Payment
```
POST /payments/verify
Authorization: Bearer <token>
Content-Type: application/json

{
  "paymentId": "pay_001",
  "transactionId": "txn_001",
  "signature": "signature_hash"
}
```

---

## User Profile Endpoints

### Get User Profile
```
GET /users/profile
Authorization: Bearer <token>
```

### Update User Profile
```
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "fullName": "John Doe",
  "phone": "+91-98765-43210",
  "profilePicture": "base64_image_data"
}
```

### Get Saved Places
```
GET /users/saved-places
Authorization: Bearer <token>
```

### Add Saved Place
```
POST /users/saved-places
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Home",
  "latitude": 13.0827,
  "longitude": 80.2707,
  "address": "123 Main Street"
}
```

---

## WebSocket Events (Real-Time Tracking)

### Connect
```
wss://ws.mtcconnect.com/tracking
Headers: { Authorization: Bearer <token> }
```

### Subscribe to Bus
```json
{
  "type": "subscribe",
  "busId": "bus_001"
}
```

### Bus Location Update
```json
{
  "type": "location_update",
  "busId": "bus_001",
  "payload": {
    "latitude": 13.0856,
    "longitude": 80.2807,
    "heading": 45,
    "speed": 60,
    "nextStop": "stop_5",
    "estimatedArrival": 5,
    "timestamp": "2024-01-28T10:15:00Z"
  }
}
```

### Unsubscribe from Bus
```json
{
  "type": "unsubscribe",
  "busId": "bus_001"
}
```

---

**API Version**: 1.0.0  
**Last Updated**: 2024-01-28
