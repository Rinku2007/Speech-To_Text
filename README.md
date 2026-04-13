# 🎤 AI Speech-to-Text Web App

A simple and efficient **Speech-to-Text web application** that converts audio into text using a lightweight Whisper model. The app supports both file upload and live speech input.

---

## 🚀 Features

* 🎧 Upload audio files and convert to text
* 🎤 Live speech recognition (microphone)
* ⚡ Optimized for faster processing
* 📄 Download transcribed text
* 🌐 Deployed on Render

---

## 🧠 How It Works

1. User uploads an audio file
2. Audio is compressed and trimmed using FFmpeg
3. Whisper model processes the audio
4. Text output is displayed

---

## ⏱️ Performance

* Converts speech to text in approx **1–1.5 minutes**
* Depends on:

  * Audio length
  * Server speed
  * Network

---

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** FastAPI
* **Model:** Faster-Whisper (`tiny.en`)
* **Deployment:** Render
* **Audio Processing:** FFmpeg

---

## 📂 Project Structure

```
project/
│── main.py
│── requirements.txt
│── ffmpeg/              # (optional for local / deployment support)
│── static/
│   ├── index.html
│   ├── script.js
│   ├── style.css
```

---

## 🎵 FFmpeg Requirement

This project uses **FFmpeg** for audio processing.

* Windows: Install FFmpeg and add it to PATH
* Render/Linux: Already available (`/usr/bin`)

Used for:

* Audio compression
* Format conversion
* Speed optimization

---

## ⚙️ Setup Instructions

### 1. Clone Repo

```
git clone <your-repo-link>
cd project
```

### 2. Install Dependencies

```
pip install -r requirements.txt
```

### 3. Run Server

```
uvicorn main:app --reload
```

### 4. Open Browser

```
http://127.0.0.1:8000
```

---

## 🌐 Deployment (Render)

* Build Command:

```
pip install -r requirements.txt
```

* Start Command:

```
uvicorn main:app --host 0.0.0.0 --port 10000
```

---

## ⚡ Optimizations Used

* Lightweight model (`tiny.en`)
* Audio compression + trimming
* Silence removal (VAD filter)
* CPU threading
* Limited audio duration (15 sec)

---

## ⚠️ Limitations

* Best for short audio
* Slower on free servers
* English optimized

---

## 📌 Future Improvements

* Real-time transcription
* Multi-language support
* Faster GPU processing
* UI improvements

---

## 👨‍💻 Author

Speech-to-Text project using AI + FastAPI 🚀
