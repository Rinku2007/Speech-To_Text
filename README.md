# 🎤 AI Speech-to-Text Web App (Whisper)

A modern full-stack web application that converts audio or live speech into text using **OpenAI Whisper**.

---

## 🚀 Features

* 🎧 Upload audio files and convert to text
* 🎙️ Live microphone speech-to-text
* 📄 Download transcription as `.txt`
* ⚡ Fast processing with Whisper model
* 🌐 Single server (FastAPI serves frontend + backend)
* 🎨 Modern glassmorphism UI

---

## 🧠 Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** FastAPI (Python)
* **AI Model:** OpenAI Whisper
* **Audio Processing:** FFmpeg

---

## 📂 Project Structure

```
speech-to-text/
│
├── backend/
│   ├── main.py
│   ├── static/
│   │   ├── index.html
│   │   ├── style.css
│   │   ├── script.js
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/speech-to-text.git
cd speech-to-text/backend
```

---

### 2️⃣ Create virtual environment

```bash
python -m venv venv
venv\Scripts\activate   # Windows
```

---

### 3️⃣ Install dependencies

```bash
pip install fastapi uvicorn openai-whisper python-multipart torch
```

---

### 4️⃣ Install FFmpeg

* Download from: https://www.gyan.dev/ffmpeg/builds/
* Extract and add `bin` folder to PATH

Example:

```
C:\ffmpeg\bin
```

---

### 5️⃣ Run the server

```bash
uvicorn main:app --reload
```

---

## 🌐 Open in Browser

```
http://127.0.0.1:8000
```

---

## 🎯 Usage

### 🎧 Upload Audio

* Click "Choose File"
* Select audio file
* Click **Convert**

---

### 🎙️ Live Speech

* Click **🎙️ Speak**
* Start speaking
* Click **🛑 Stop** to end

---

### 📄 Download Text

* Click **Download Text**
* File will save as `transcription.txt`

---

## ⚠️ Notes

* Works best on **Google Chrome**
* Microphone feature requires internet
* FFmpeg must be installed properly

---

## 🚀 Future Improvements

* 🌍 Multi-language support
* 🎬 Subtitle (.srt) generation
* 🎧 Audio preview player
* ☁️ Deployment (Render / Railway)
* 🎨 Advanced UI animations

---

## 👨‍💻 Author

**Rinku**
💻 Developer | AI Enthusiast

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
