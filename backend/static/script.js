async function uploadAudio() {
  console.log("Button clicked");

  const fileInput = document.getElementById("audioFile");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please upload an audio file");
    return;
  }

  // 🔥 FILE SIZE LIMIT
  if (file.size > 3.5 * 1024 * 1024) {
    alert("File too large! Max 2MB");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  const output = document.getElementById("output");

  // 🔥 LOADING ANIMATION
  let dots = 0;
  const interval = setInterval(() => {
    dots = (dots + 1) % 4;
    output.value = "⏳ Processing" + ".".repeat(dots);
  }, 500);

  try {
    const response = await fetch("/transcribe", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    clearInterval(interval);

    if (data.error) {
      output.value = "ERROR: " + data.error;
    } else {
      output.value = data.text || "No text found";
    }

  } catch (error) {
    clearInterval(interval);
    output.value = "ERROR: " + error;
  }
}




let recognition;
let isListening = false;

function toggleMic() {
  const btn = document.getElementById("micBtn");
  const output = document.getElementById("output");

  if (!('webkitSpeechRecognition' in window)) {
    alert("Speech Recognition not supported");
    return;
  }

  // START
  if (!isListening) {
    recognition = new webkitSpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    output.value = "🎙️ Listening...\n";

    recognition.onresult = function (event) {
      let transcript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      output.value = transcript;
    };

    recognition.onerror = function (event) {
      output.value = "Error: " + event.error;
    };

    recognition.onend = function () {
      isListening = false;
      btn.innerText = "🎙️ Speak";
    };

    recognition.start();

    isListening = true;
    btn.innerText = "🛑 Stop";

  } 
  // STOP
  else {
    recognition.stop();
    isListening = false;
    btn.innerText = "🎙️ Speak";
    output.value += "\n\n🛑 Stopped.";
  }
}

function downloadText() {
  const text = document.getElementById("output").value;

  if (!text) {
    alert("No text to download!");
    return;
  }

  const blob = new Blob([text], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "transcription.txt";

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}