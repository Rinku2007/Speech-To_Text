# import os

# os.environ["PATH"] = r"C:\Users\Rinku\Downloads\ffmpeg-2026-04-09-git-d3d0b7a5ee-essentials_build\bin;" + os.environ["PATH"]

# from fastapi import FastAPI, File, UploadFile
# from fastapi.staticfiles import StaticFiles
# from fastapi.responses import FileResponse
# import whisper
# import shutil

# app = FastAPI()

# app.mount("/static", StaticFiles(directory="static"), name="static")

# @app.get("/")
# def home():
#     return FileResponse("static/index.html")

# model = whisper.load_model("tiny")

# @app.post("/transcribe/")
# async def transcribe_audio(file: UploadFile = File(...)):
#     try:
#         file_path = f"temp_{file.filename}"

#         with open(file_path, "wb") as buffer:
#             shutil.copyfileobj(file.file, buffer)

#         print("Saved file:", file_path)

#         result = model.transcribe(file_path)

#         os.remove(file_path)

#         return {"text": result["text"]}

#     except Exception as e:
#         print("ERROR:", e)
#         return {"error": str(e)}


import os
import platform
from fastapi import FastAPI, File, UploadFile
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from faster_whisper import WhisperModel
import shutil

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def home():
    return FileResponse("static/index.html")

# 🔥 OS detect (IMPORTANT)
if platform.system() == "Windows":
    print("Running on Windows")
    # assume ffmpeg already installed in system PATH
else:
    print("Running on Linux (Render)")
    os.environ["PATH"] = os.path.abspath("ffmpeg") + ":" + os.environ["PATH"]

# ✅ lightweight + fast model
model = None

def get_model():
    global model
    if model is None:
        model = WhisperModel(
            "tiny",
            device="cpu",
            compute_type="int8"
        )
    return model

@app.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    try:
        file_path = f"temp_{file.filename}"

        print("File received:", file.filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        print("File saved:", file_path)

        model = get_model()

        print("Transcribing...")
        segments, _ = model.transcribe(file_path)

        text = ""
        for segment in segments:
            text += segment.text

        os.remove(file_path)

        print("Done!")

        return {"text": text}

    except Exception as e:
        print("ERROR:", e)
        return {"error": str(e)}