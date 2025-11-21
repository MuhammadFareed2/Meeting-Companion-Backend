# Meeting Companion Backend 

<img width="1364" height="235" alt="Screenshot 2025-11-21 014117" src="https://github.com/user-attachments/assets/29133f79-e127-4c8a-b6a4-a128d6f3c57f" />

[Live Demo](https://meeting-companion.vercel.app/)
[FRONTEND_REPO](https://github.com/MuhammadFareed2/Meeting-Companion-Frontend)
[BACKEND REPO](https://github.com/MuhammadFareed2/Meeting-Companion-Backend)

**Deployment:** Hosted on **Railway**


Backend for **Meeting Companion**, a meeting management system that allows users to upload meeting videos, generate transcripts, and automatically create structured **Minutes of Meeting (MoM)**. Built on the **MERN stack** with **TypeScript** and integrates with **Cloudinary**, **AssemblyAI**, and **OpenRouter/DeepSeek AI**.

---

## **Features**

- User authentication with **OTP** and **JWT**.
- Secure signup and login with password hashing (`bcrypt`).
- Upload meeting videos, convert to MP3, and store in **Cloudinary**.
- Generate meeting transcripts using **AssemblyAI**.
- Edit transcripts manually if needed.
- Automatically generate structured **Minutes of Meeting (MoM)** with AI (DeepSeek API).
- Store all data in **MongoDB**.

---

## **Technologies Used**

- **Node.js** & **Express** – Backend server
- **TypeScript** – Type-safe development
- **MongoDB** – Database
- **bcrypt** – Password hashing
- **jsonwebtoken** – JWT authentication
- **nodemailer** – OTP email service
- **crypto** – OTP generation
- **multer** – File upload handling
- **cloudinary** – Cloud file storage
- **fluent-ffmpeg** & **@ffmpeg-installer/ffmpeg** – Video to audio conversion
- **AssemblyAI** – Speech-to-text transcription
- **OpenRouter/DeepSeek** – AI-generated structured meeting summaries
- **axios** – API requests

---

## **API Endpoints**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/signup-otp/` | POST | Send OTP to email for signup |
| `/api/auth/signup/` | POST | Sign up new user, returns JWT |
| `/api/auth/signin/` | POST | Sign in user, returns JWT |
| `/api/meeting/upload/` | POST | Upload video, convert to MP3, store in Cloudinary |
| `/api/transcript/create/` | POST | Generate transcript via AssemblyAI |
| `/api/transcript/edit/` | PATCH/PUT | Edit an existing transcript |
| `/api/mom/generate/` | POST | Generate Minutes of Meeting from transcript via DeepSeek AI |

---

## **Environment Variables**

Create a `.env` file at the root of the project:

```env
PORT=                 # Backend server port
DB_URL=               # MongoDB connection URI
JWT_SECRET=           # Secret key for JWT

OTP_EMAIL=            # Email for sending OTP
OTP_PASSWORD=         # Password for OTP email account

ASSEMBLYAI_API_KEY=   # API key for AssemblyAI transcription

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

OPENROUTER_DEEPSEEK_API_KEY=  # API key for DeepSeek AI

```
## **Clone the repository**
GIT_CLONE=https://github.com/MuhammadFareed2/Meeting-Companion-Backend

## **Install dependencies*
NPM_INSTALL=npm install

## **For development with live reload**
DEV_NODEMON=nodemon index.ts

# Usage Workflow

## **Signup Flow**
- **Send OTP:** `/api/auth/signup-otp/`
- **Verify OTP and signup:** `/api/auth/signup/`
- **Receive JWT token** for authentication

## **Meeting Upload**
- **Upload video:** `/api/meeting/upload/`
- **Process:** Video is converted to MP3 and stored on Cloudinary

## **Transcription**
- **Create transcript:** `/api/transcript/create/`
- **Polling:** Polls AssemblyAI API until transcription is completed
- **Edit transcript:** `/api/transcript/edit/` if required

## **Minutes of Meeting (MoM)**
- **Generate MoM:** `/api/mom/generate/` using AI
- **Store MoM:** Summarized chunks with title, time range, summary, tags, and highlights


