# KuvakaChat - Multi-User Chat Application

A real-time chat application built using Node.js, WebSocket, and Vanilla JavaScript, deployed on both local and remote servers. The application supports multiple users with concurrency and provides a seamless chatting experience.

---

## Features
- **Real-time Communication:** Enables users to chat in real-time using WebSocket.
- **Concurrency Handling:** Supports multiple users concurrently through WebSocket connections.
- **User Management:** Tracks users joining, leaving, and sending messages.
- **Responsive Design:** Built with Bootstrap for a responsive and user-friendly interface.
- **Deployment:** Ready for local and Glitch deployment.

---

## Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- A package manager like `npm` (bundled with Node.js).
- Git for version control.

---

## Getting Started

### Running Locally
1. **Clone the repository:**
    ```bash
    git clone https://github.com/Anushreesharma23/KuvakaChat.git
    cd yourrepository
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Start the HTTP and WebSocket servers:**
    ```bash
    node server.js
    ```

4. **Access the application:**
   - Open your browser and navigate to `http://localhost:8000`.

### Running on Glitch

I have deployed the application on Glitch, and you can access the live version here: **[https://relic-perfect-sneeze.glitch.me/login.html](#)**.

To run it on Glitch yourself:

1. Copy the code from the desired branch in this repository.
2. Make changes to the WebSocket URL in the code to match your Glitch project name.
3. Install the required dependencies (`ws` and `express`) in your `package.json` file:
    ```json
    {
      "dependencies": {
        "ws": "^8.13.0",
        "express": "^4.18.2"
      }
    }
    ```
4. Start the project in Glitch, and it should work seamlessly.

## Application Architecture

### Overview
- **Server:** Built using Node.js and WebSocket to handle HTTP requests and WebSocket connections.
  - Serves static files (`chat.html`, `login.html`, CSS) using the `http` module.
  - Manages WebSocket communication for real-time messaging.
  
- **Client:** Built using HTML, CSS (Bootstrap), and JavaScript.
  - `login.html`: Facilitates user login and stores the username in localStorage.
  - `chat.html`: Enables real-time communication and displays messages dynamically.

### Concurrency Handling
- **WebSocket Server:**
  - A WebSocket server (`ws`) is set up to manage multiple client connections.
  - Each client connection is assigned a unique WebSocket instance.
  - Broadcasts messages to all connected clients using `wss.clients`.

- **Asynchronous Patterns:**
  - The WebSocket `onmessage` event ensures asynchronous processing of incoming messages.
  - The `onclose` event handles client disconnections gracefully.

---

## Assumptions and Design Choices

1. **LocalStorage for Username Persistence:**
   - The username is stored in the browser's `localStorage` for simplicity. This ensures a seamless experience across page reloads without implementing backend storage.

2. **WebSocket for Real-Time Messaging:**
   - WebSocket was chosen for its low latency and ability to handle bi-directional communication efficiently.

3. **Message Handling:**
   - All messages, including "entered" and "left" notifications, are timestamped and styled differently to enhance readability.

4. **Error Handling:**
   - Graceful handling of file not found (404) and internal server errors (500).
   - Error parsing WebSocket messages is logged without crashing the server.

---

## Usage

1. **Login Page (`login.html`):**
   - Enter a username to join the chat.
   - Redirects to the chat page upon successful login.

2. **Chat Page (`chat.html`):**
   - Real-time updates as users join or leave the chat.
   - Send and receive messages displayed in a scrollable container.
   - Logout button to clear the session and redirect to the login page.

---

## Example Interaction Flow
1. User enters a username in `login.html`.
2. The user is redirected to `chat.html`, where:
   - They see a welcome message.
   - They can send messages to the group.
   - They receive notifications when users join or leave the chat.

---

## Future Enhancements
- Add private messaging between users.
- Implement backend authentication for better security.
- Store chat history in a database for persistence.
- Integrate typing indicators.

---

## Contributions
Contributions are welcome! Fork the repository, create a branch, and submit a pull request.

---

## License
This project is licensed under the [MIT License](LICENSE).
