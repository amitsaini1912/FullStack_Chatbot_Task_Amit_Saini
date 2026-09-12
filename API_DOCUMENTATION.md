# API Documentation

Base URL (local development): `http://localhost:5000/api`

All responses share a consistent shape:

```json
{
  "success": true,
  "data": {},
  "message": "Human readable message"
}
```

Validation errors additionally include an `errors` array of `{ field, message }` objects.

---

## GET /api/health

Health check for the API.

**Request:** none

**Response `200`**

```json
{
  "success": true,
  "data": { "status": "ok", "timestamp": "2026-01-15T10:20:30.000Z" },
  "message": "API is healthy"
}
```

---

## GET /api/enquiries

List enquiries with optional search, filters, and pagination.

**Query parameters** (all optional)

| Param      | Type   | Notes                                             |
|------------|--------|----------------------------------------------------|
| `search`   | string | Matches against name, email, or phone (case-insensitive) |
| `userType` | string | One of `Student`, `Customer`, `Other`               |
| `status`   | string | One of `New`, `Contacted`, `In Progress`, `Closed`    |
| `page`     | number | Default `1`                                          |
| `limit`    | number | Default `20`, max `100`                              |

**Request**

```
GET /api/enquiries?search=riya&userType=Student&status=New&page=1&limit=10
```

**Response `200`**

```json
{
  "success": true,
  "data": {
    "enquiries": [
      {
        "_id": "66f1a2b3c4d5e6f7a8b9c0d1",
        "name": "Riya Sharma",
        "email": "riya.sharma@example.com",
        "phone": "9876543210",
        "userType": "Student",
        "interest": "Drone Pilot Training Course",
        "message": "I would like to know the fee structure and duration of the course.",
        "status": "New",
        "createdAt": "2026-01-15T10:20:30.000Z",
        "updatedAt": "2026-01-15T10:20:30.000Z"
      }
    ],
    "pagination": { "total": 1, "page": 1, "limit": 10, "totalPages": 1 },
    "statusCounts": { "New": 5, "Contacted": 1, "In Progress": 1, "Closed": 1 },
    "totalEnquiries": 8
  },
  "message": "Enquiries fetched successfully"
}
```

---

## GET /api/enquiries/:id

Fetch a single enquiry by id.

**Response `200`**

```json
{
  "success": true,
  "data": {
    "_id": "66f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Riya Sharma",
    "email": "riya.sharma@example.com",
    "phone": "9876543210",
    "userType": "Student",
    "interest": "Drone Pilot Training Course",
    "message": "I would like to know the fee structure and duration of the course.",
    "status": "New",
    "createdAt": "2026-01-15T10:20:30.000Z",
    "updatedAt": "2026-01-15T10:20:30.000Z"
  },
  "message": "Enquiry fetched successfully"
}
```

**Response `404`** (invalid or non-existent id)

```json
{ "success": false, "data": null, "message": "Enquiry not found" }
```

---

## POST /api/enquiries

Create a new enquiry. Rate-limited (default: 20 requests / 15 minutes / IP).

**Request body**

```json
{
  "name": "Riya Sharma",
  "email": "riya.sharma@example.com",
  "phone": "9876543210",
  "userType": "Student",
  "interest": "Drone Pilot Training Course",
  "message": "I would like to know the fee structure and duration of the course."
}
```

**Response `201`**

```json
{
  "success": true,
  "data": {
    "_id": "66f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Riya Sharma",
    "email": "riya.sharma@example.com",
    "phone": "9876543210",
    "userType": "Student",
    "interest": "Drone Pilot Training Course",
    "message": "I would like to know the fee structure and duration of the course.",
    "status": "New",
    "createdAt": "2026-01-15T10:20:30.000Z",
    "updatedAt": "2026-01-15T10:20:30.000Z"
  },
  "message": "Enquiry submitted successfully"
}
```

**Response `400`** (validation failure)

```json
{
  "success": false,
  "data": null,
  "message": "Phone number must be exactly 10 digits",
  "errors": [{ "field": "phone", "message": "Phone number must be exactly 10 digits" }]
}
```

**Response `429`** (rate limit exceeded)

```json
{
  "success": false,
  "data": null,
  "message": "Too many requests from this IP. Please try again later."
}
```

---

## PUT /api/enquiries/:id

Update an existing enquiry's details. All fields are optional; only provided fields are updated.

**Request body**

```json
{ "message": "Updated message content." }
```

**Response `200`**

```json
{
  "success": true,
  "data": {
    "_id": "66f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Riya Sharma",
    "email": "riya.sharma@example.com",
    "phone": "9876543210",
    "userType": "Student",
    "interest": "Drone Pilot Training Course",
    "message": "Updated message content.",
    "status": "New",
    "createdAt": "2026-01-15T10:20:30.000Z",
    "updatedAt": "2026-01-15T11:00:00.000Z"
  },
  "message": "Enquiry updated successfully"
}
```

**Response `404`**

```json
{ "success": false, "data": null, "message": "Enquiry not found" }
```

---

## PATCH /api/enquiries/:id/status

Update only the status of an enquiry.

**Request body**

```json
{ "status": "Contacted" }
```

**Response `200`**

```json
{
  "success": true,
  "data": {
    "_id": "66f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Riya Sharma",
    "email": "riya.sharma@example.com",
    "phone": "9876543210",
    "userType": "Student",
    "interest": "Drone Pilot Training Course",
    "message": "I would like to know the fee structure and duration of the course.",
    "status": "Contacted",
    "createdAt": "2026-01-15T10:20:30.000Z",
    "updatedAt": "2026-01-15T11:05:00.000Z"
  },
  "message": "Enquiry status updated successfully"
}
```

**Response `400`** (invalid status value)

```json
{
  "success": false,
  "data": null,
  "message": "Status must be New, Contacted, In Progress, or Closed"
}
```

---

## DELETE /api/enquiries/:id

Delete an enquiry.

**Response `200`**

```json
{
  "success": true,
  "data": {
    "_id": "66f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Riya Sharma",
    "email": "riya.sharma@example.com",
    "phone": "9876543210",
    "userType": "Student",
    "interest": "Drone Pilot Training Course",
    "message": "I would like to know the fee structure and duration of the course.",
    "status": "Contacted",
    "createdAt": "2026-01-15T10:20:30.000Z",
    "updatedAt": "2026-01-15T11:05:00.000Z"
  },
  "message": "Enquiry deleted successfully"
}
```

**Response `404`**

```json
{ "success": false, "data": null, "message": "Enquiry not found" }
```

---

## Error responses

All errors follow the same `{ success: false, data: null, message }` shape. Internal server
errors and database failures are never surfaced with stack traces or driver-level details -
only a generic message is returned, while details are logged server-side in development mode.

| Status | Meaning                                    |
|--------|---------------------------------------------|
| 400    | Validation failure or malformed request       |
| 403    | Request blocked by CORS policy                |
| 404    | Route or resource not found                    |
| 409    | Duplicate resource conflict                    |
| 429    | Rate limit exceeded                            |
| 500    | Unexpected server/database error               |
