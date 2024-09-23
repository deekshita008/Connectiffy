# Connectiffy

Connectiffy is a social media platform where users can post, like posts, explore others' content, add friends, and enjoy a seamless user authentication experience. It's designed to foster social interaction through a user-friendly interface and a robust set of features.

## Features

- **User Authentication**: Users can securely sign up, log in, and log out.
- **Create Posts**: Users can create new posts with content that others can view.
- **Like Posts**: Engage with other users by liking their posts.
- **View Posts**: Browse through posts from other users.
- **Add Friends**: Connect with others by sending and accepting friend requests.
- **Friendship Management**: View and manage your list of friends.

## Installation

To run Connectiffy locally, follow these steps:

### Prerequisites

- Node.js
- MongoDB (or another database of your choice)

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Nisarg-P27/Connectiffy.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd Connectiffy
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Set Up the Environment Variables**

   Create a `.env` file in the root directory and add your environment variables. For example:

   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

5. **Run the Application**

   ```bash
   npm start
   ```

   The app will be running at `http://localhost:3000`.

## Usage

1. **Sign Up or Log In**: Start by creating an account or logging in with your existing credentials.
2. **Create a Post**: Use the post creation tool to share your thoughts or media.
3. **Explore Posts**: Scroll through the feed to view posts from other users.
4. **Like Posts**: Show appreciation by liking posts you enjoy.
5. **Add Friends**: Search for users, send friend requests, and grow your network.
6. **Manage Friends**: Accept, reject, or view your friends in the 'Friends' section.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Contributing

We welcome contributions from the community! If you'd like to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a pull request.

Please make sure your code follows the project's style guide and is well-documented.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Acknowledgements

- Thanks to all the open-source libraries and tools that made this project possible.

---
