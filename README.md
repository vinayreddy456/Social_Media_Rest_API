
# Social_Media_Rest_API

# Description
This project is a RESTful API for a social media platform, providing endpoints for user authentication, user management, post creation, and interaction with posts.

# Installation
Prerequisites
Ensure the following are installed on your system:

   Node.js (version 10 or higher)
   npm (Node Package Manager)
   MongoDB
 # Installation Steps
  # Clone the repository:
      git clone https://github.com/vinayreddy456/Social_Media_Rest_API.git
    
 #  Install dependencies:
     npm install

# Set up environment variables:

    Create a .env file in the root directory.
    Define environment variables such as database connection details and secret keys. Example:
           PORT=5000
           DB_CONNECTION_STRING=mongodb://localhost:27017/social_media_db JWT_SECRET=your_secret_key

# Start the server:
       npm start
  # Access the API:
      Once the server is running, access the API at http://localhost:5000.
# Usage
Provide details on how to use each endpoint, including example requests and expected responses. Additionally, describe any required authentication steps.
Endpoints

# Endpoints
# Authentication
    Register: POST /api/auth/register
    Login: POST /api/auth/login
 
# User Management
    Update User: PUT /api/users/:id
    Delete User: DELETE /api/users/:id
    Get User: GET /api/users/:id
    Follow User: POST /api/users/follow/:id
    Unfollow User: POST /api/users/unfollow/:id

# Posts
    Create Post: POST /api/posts/
    Update Post: PUT /api/posts/:id
    Delete Post: DELETE /api/posts/:id
    Like Post: POST /api/posts/like/:id
    Dislike Post: POST /api/posts/dislike/:id


# Database Setup
 Start MongoDB:

Ensure your MongoDB server is running.
Use a MongoDB GUI or command line to create a database named social_media_db.
# Collections:
The API will automatically create necessary collections like users and posts when you interact with the endpoints.
