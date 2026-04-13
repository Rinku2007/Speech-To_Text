import os
import platform
import shutil
from fastapi import FastAPI, File, UploadFile
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from faster_whisper import WhisperModel

app = FastAPI()

# static files
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def home():
    return FileResponse("static/index.html")

# 🔥 FFmpeg setup (Render fix)
if platform.system() != "Windows":
    os.environ["PATH"] = os.environ["PATH"] + ":/usr/bin"

# 🚀 MODEL LOAD AT STARTUP (BIG SPEED BOOST)
model = WhisperModel(
    "tiny.en",
    device="cpu",
    compute_type="int8"
)

@app.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    try:
        # ✅ unique filename (important)
        file_path = f"temp_{file.filename}"

        print("📥 File received:", file.filename)

        # save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        print("💾 File saved:", file_path)

        # 🚀 FAST TRANSCRIPTION
        segments, _ = model.transcribe(
            file_path,
            beam_size=1   # ⚡ speed boost
        )

        text = "".join([segment.text for segment in segments])

        # delete temp file
        os.remove(file_path)

        print("✅ Done!")

        return {"text": text}

    except Exception as e:
        print("❌ ERROR:", e)
        return {"error": str(e)}