# ⚡ KAIRO Super App

Welcome to **KAIRO**, a production-grade, highly scalable Super App platform. KAIRO combines a real-time messaging engine, encrypted communication channels, high-fidelity WebRTC calling, and multi-service modules (like Payments) into a single unified mobile experience. 

The application features a striking **Neo-Brutalist Design Language** utilizing bold borders, high-contrast flat backgrounds, and premium micro-interactions.

---

## 🏗️ Architecture & Technology Stack

The KAIRO platform is split into a **cross-platform mobile client** and a **containerized backend server**:

### 📱 Frontend (Mobile Client)
* **Framework**: React Native with **Expo SDK 54** (Versioned docs: `https://docs.expo.dev/versions/v54.0.0/`)
* **Navigation**: React Navigation (Stack + Bottom Tabs) with a custom Neo-Brutalist navigation bar.
* **Real-time Networking**: Socket.IO Client for instant events (typing indicator, receipts, messaging, calling signals).
* **Native Audio & Media**: `react-native-webrtc` for real-time peer-to-peer calling, and `react-native-incall-manager` for hardware audio routing.
* **Security & Auth**: Secure storage using `expo-secure-store` and token-based state handlers.
* **Animation Engine**: React Native Reanimated for premium fluid UI transitions.

### ⚙️ Backend (API Server)
* **Runtime & Framework**: Node.js, Express, and Socket.IO for real-time WebSockets.
* **Database & ORM**: **MySQL 8.0** managed via **Prisma ORM** with automated indexing on primary search filters (`email`, `phone`, `username`).
* **Security Layer**: 
  * Helmet headers, custom CORS controls, API rate limiters.
  * Input sanitization and format validation via **Zod**.
  * Password hashing via `bcrypt` (12 salt rounds).
  * **Refresh Token Rotation (RTR)**: Used refresh tokens are immediately revoked to protect against session Hijacking.
* **Virtualization**: Docker Compose environment mapping services into a local virtual network.

---

## 📂 Repository Structure

```
kairo/
 ├── backend/                   # Node.js API + Socket.IO server
 │    ├── prisma/               # Schema configuration & seed scripts
 │    ├── src/
 │    │    ├── config/          # CORS, Rate Limiting, Env Setup
 │    │    ├── controllers/     # Auth & Route request handlers
 │    │    ├── middleware/      # JWT guards, Error handler, Zod validators
 │    │    ├── routes/          # REST Endpoint declarations
 │    │    ├── services/        # Business logic & Token life-cycle management
 │    │    ├── socket/          # WebSocket connection authentication & signaling
 │    │    └── utils/           # Logger, Custom exceptions & API envelopes
 │    ├── Dockerfile
 │    └── package.json
 ├── screens/                   # React Native Screens (Neo-Brutalist UI)
 │    ├── LoginScreen.jsx       # Custom animated registration & authentication
 │    ├── SignupScreen.jsx
 │    ├── HomeScreen.jsx        # User Feed & Quick Action Dashboard
 │    ├── ChatListScreen.jsx    # Live list of ongoing conversations
 │    ├── ChatWindowScreen.jsx  # Interactive chat canvas with typing indicator
 │    ├── IncomingCallScreen.jsx# Fullscreen call invitation modal
 │    └── ActiveCallScreen.jsx  # Active WebRTC audio streaming & mute controls
 ├── src/                       # Client source utilities
 │    ├── components/           # Neo-brutalist buttons, inputs & modals
 │    ├── config/               # Network endpoints & tunnel mapping
 │    ├── context/              # Context Providers (Auth, Socket, Chat)
 │    └── services/             # Native API layer, upload & notifications
 ├── docker-compose.yml         # MySQL + Backend docker configuration
 ├── App.js                     # Metro bundler entry point and Navigators
 ├── app.json                   # Expo build config & native plugins list
 ├── eas.json                   # Expo Application Services configuration
 └── KAIRO_SETUP_GUIDE.md       # In-depth infrastructure development guide
```

---

## 🗄️ Database Schema (Prisma / MySQL)

Below is an overview of the relational database structure configured in `backend/prisma/schema.prisma`:

* **`User`**: Core account information. Stores emails, phones, encrypted passwords, public keys (for E2EE), online status, and session refresh tokens. Indexed on `username`, `email`, and `phone` for fast lookup queries.
* **`Conversation`**: Repositories for messaging. Handles both 1-to-1 direct messaging and group chats.
* **`ConversationParticipant`**: Junction table mapping users to conversations with dynamic timestamps of when they joined and when they last read the chat.
* **`Message`**: E2EE encrypted message payloads (Base64), including IV (Initialization Vector), signature validations, and attachments (images/videos/docs).
* **`MessageReceipt`**: Tracks delivery logs (`DELIVERED`, `SEEN`) per user for each message.

---

## 🚀 Step-by-Step Setup Guide

Follow this exact sequence to deploy KAIRO on your local machine:

### Prerequisites
Make sure you have **Node.js v20+**, **Docker Desktop**, **JDK 17**, and **Android Studio (SDK 34/35)** installed and configured on your environment path.

### 1. Install Dependencies
Install packages for both client and backend workspaces.
```bash
# Install mobile client dependencies (ignore peer warnings for Expo 54)
npm install --legacy-peer-deps

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Configure Environment Files
Setup `.env` files:
1. **Root Directory (`.env`)**: Setup MySQL credentials.
2. **Backend Directory (`backend/.env`)**: Copy from `backend/.env.example` and generate your JWT keys:
```env
DATABASE_URL="mysql://root:aokiro@localhost:3307/kairo_db"
JWT_ACCESS_SECRET="your_strong_64_byte_access_key"
JWT_REFRESH_SECRET="your_strong_64_byte_refresh_key"
COOKIE_SECRET="your_secure_cookie_signing_key"
```
> [!IMPORTANT]
> **Local Port Gotcha**: Inside Docker Compose, MySQL runs on port `3306`. For local host processes running outside Docker (like `npm run dev` in the backend), access the database via port **`3307`** (which is mapped to host).

### 3. Initialize Database
Initialize the database tables and apply seed records:
```bash
cd backend
npx prisma db push
npm run db:seed
cd ..
```

### 4. Boot Up Backend Services
Start the MySQL database and backend app container using Docker:
```bash
docker compose up -d --build
```
Verify they are running by checking `docker compose ps` or viewing server logs:
```bash
docker compose logs -f backend
```

### 5. Establish Cloudflare Tunnel (Optional / Recommended for Mobile testing)
To allow real mobile devices or remote testers to connect to your local backend server without configuring routers, use a Cloudflare Tunnel:
```bash
# Log in and authorize your domain (e.g., kairo.bond)
cloudflared tunnel login

# Route DNS for endpoints
cloudflared tunnel route dns kairo-local api.kairo.bond
cloudflared tunnel route dns kairo-local socket.kairo.bond

# Start the tunnel utilizing your configuration file
cloudflared tunnel --config C:\Kairo\backend\cloudflare-tunnel\config.yml run
```

### 6. Build the Expo Native App
> [!WARNING]
> **Expo Go Limitation**: The Expo Go sandbox cannot run custom native libraries. Because KAIRO implements native libraries for real-time WebRTC and hardware audio controls (`react-native-webrtc` and `react-native-incall-manager`), you **must** build a custom development client.
```bash
# Eject and generate native android/ios folders
npx expo prebuild --clean

# Compile and install custom debug app on emulator/connected phone
npx expo run:android
# Or for iOS (Mac required)
npx expo run:ios
```

---

## 🧪 Interactive Testing Workflows

Once all systems are running, you can test the primary real-time communication modules:

### Real-Time Messaging & Chat Receipts
1. Launch the app on two different emulators or physical test devices.
2. Sign up with two different accounts (e.g., `alice` and `bob`).
3. Tap **"+"** on Alice's screen and search for `bob`. Click **"Start Chat"**.
4. Inside the chat window, type a message. Bob's screen will instantly display a **typing status** indicator ("alice is typing...").
5. Send the message. It will display a **single checkmark** (Delivered).
6. When Bob opens the window, Alice's message status will instantly update to a **double checkmark** (Seen).

### Real-Time WebRTC Calling
1. Tap the phone/call icon from a chat window.
2. Alice's device will show the "Calling..." state and emit a `call_initiate` WebSocket signal with the SDP offer.
3. Bob's device will receive the event and display the **Incoming Call overlay** (accept/reject controls).
4. Tapping "Accept Call" exchanges candidate coordinates (ICE) and hooks up audio streams.
5. In simulators (where microphones cannot be acquired), the system automatically uses a **state simulation fallback** to test the screen transitions and call lifecycle.

---

## 🎨 Neo-Brutalist Palette Tokens
The design style is defined in `App.js` and applies globally across screens:
* **Ink Black (`#09090A`)**: Strong structural borders (2.5px+) and typography.
* **Vibrant Purple (`#AC5FDB`)**: Highlight color, active tab indicators, and button overlays.
* **Warm Pink (`#E3A2EE`)**: User profiles, avatars, and visual cards.
* **Soft Lavender (`#F5EEF9`)**: Screen backgrounds, giving a clean paper-like appearance.
* **Crisp White (`#FFFFFF`)**: Core container boxes.
#   P o r t f o l i o  
 