# Database Schema

Database: MongoDB (Atlas), accessed via Mongoose.

## Collection: `enquiries`

| Field       | Type     | Required | Default | Notes                                                        |
|-------------|----------|----------|---------|---------------------------------------------------------------|
| `_id`       | ObjectId | auto     | -       | MongoDB document identifier                                   |
| `name`      | String   | yes      | -       | Trimmed, max 100 characters                                    |
| `email`     | String   | yes      | -       | Trimmed, lowercased, validated as an email address              |
| `phone`     | String   | yes      | -       | Exactly 10 digits                                              |
| `userType`  | String   | yes      | -       | One of `Student`, `Customer`, `Other`                           |
| `interest`  | String   | yes      | -       | Free text describing a service or course of interest, max 150 chars |
| `message`   | String   | yes      | -       | Free text, max 1000 characters                                 |
| `status`    | String   | no       | `New`   | One of `New`, `Contacted`, `In Progress`, `Closed`               |
| `createdAt` | Date     | auto     | now     | Managed by Mongoose timestamps                                  |
| `updatedAt` | Date     | auto     | now     | Managed by Mongoose timestamps                                  |

### Indexes

- `email` (ascending) — speeds up lookups/search by email
- `userType` (ascending) — speeds up filtering by user type
- `status` (ascending) — speeds up filtering by status

### Example document

```json
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
```

## Seeding

Run `npm run seed` inside `/backend` to populate the `enquiries` collection with
8 sample documents (see `backend/src/seed/seedEnquiries.ts`). The script
connects using `MONGODB_URI` from `.env`, clears the existing collection, and
inserts the sample data.
