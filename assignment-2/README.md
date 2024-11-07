# E-Agency platform API

### Backend

- **Nest.js**
- **MongoDB**

## Setup for admin and gallery API

Below are the commands to clone the project repository, install dependencies, and start the backend API.

```bash
# Clone the Repository
git clone https://github.com/erpr2001/E-Agency.git
cd 
npm install
npm run start

```

## Setup for users and bookings API

Below are the commands to clone the project repository, install dependencies, and start the backend API.

```bash
# Clone the Repository
git clone https://github.com/erpr2001/E-Agency.git
cd e-agency-platform
npm install
npm run start

```

# E-Agency Backend

This backend service is built for managing Admins and Gallery Items with core functionalities like CRUD operations, pagination, soft deletion, and field limiting. The project leverages MongoDB Atlas as a cloud database, with secure access using environment variables for sensitive data.
Table of Contents

    Features
    Technologies Used
    Installation
    Environment Variables
    API Endpoints
    Data Models
    Error Handling
    Usage

Features

    Admin Management: Register, login, update, read, and soft-delete admin accounts.
    Gallery Management: Create, update, read, and soft-delete gallery items with image uploads.
    Pagination: Control the number of results per request using query parameters.
    Field Limiting: Customize API responses to return specific fields for more efficient data retrieval.
    Soft Deletion: Exclude soft-deleted records from active results without permanent deletion.

Technologies Used

    Node.js: Server-side JavaScript runtime
    Express.js: Web application framework for Node.js
    MongoDB Atlas: Cloud database service for MongoDB
    Mongoose: MongoDB object modeling for Node.js
    JWT: For secure admin authentication
    Multer: Middleware for handling file uploads
    Bcrypt: For password hashing

Install and clone and then set up environment variables: Create a .env file in the root directory with the following variables (see Environment Variables for details).

Run the server:

```bash

    npm start

    The server should now be running on http://localhost:3000
```

Environment Variables

Configure the following environment variables in your .env file:



MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
PORT=3000

    MONGODB_URI: URI for your MongoDB Atlas database.
    JWT_SECRET: Secret key for signing JWT tokens.
    PORT: Port on which the server will run (default: 3000).

## API Endpoints
## Admin Routes

    Register Admin: POST /api/admin/register
    Login Admin: POST /api/admin/login
    Get All Admins (with pagination and field limiting): GET /api/admin
    Get Admin by ID: GET /api/admin/:id
    Update Admin: PUT /api/admin/:id
    Soft Delete Admin: DELETE /api/admin/:id

## Gallery Routes

    Create Gallery Item: POST /api/gallery
    Get All Gallery Items (with pagination and field limiting): GET /api/gallery
    Get Gallery Item by ID: GET /api/gallery/:id
    Update Gallery Item: PUT /api/gallery/:id
    Soft Delete Gallery Item: DELETE /api/gallery/:id

## Data Models
## Admin Model

## Attributes:
username: Unique identifier for the admin.
password: Hashed password for secure authentication.
isDeleted: Boolean flag for soft deletion.
createdAt: Timestamp of creation.
updatedAt: Timestamp of last update.

## Gallery Model

## Attributes:

title: Title of the gallery item.
description: Description of the gallery item.
imageUrl: Path of the uploaded image.
createdBy: Reference to the admin who created it.
isDeleted: Boolean flag for soft deletion.
createdAt: Timestamp of creation.
updatedAt: Timestamp of last update.

## Error Handling
400 Bad Request: For invalid data submissions.
404 Not Found: For non-existing records.
500 Server Error: For unexpected server issues.

## Usage
 Soft Deletion: Records are "soft deleted" using the isDeleted flag. This keeps the data but excludes it from active queries.
 Pagination and Field Limiting: Use page, limit, and fields query parameters for paginated and optimized data retrieval.
Example: GET /api/admin?page=1&limit=5&fields=username,createdAt


## Contact Information

If you have any questions or need further information, feel free to reach out to us.

**Prachi Engineer**  
Email: [prachigauravbhaiengi@cmail.carleton.ca](mailto:prachigauravbhaiengi@cmail.carleton.ca)

**Letha Wang**  
Email: [lethawang@cmail.carleton.ca](mailto:lethawang@cmail.carleton.ca)
