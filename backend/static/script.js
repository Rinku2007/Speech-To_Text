async function uploadAudio() {
  console.log("Button clicked");

  const fileInput = document.getElementById("audioFile");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please upload an audio file");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  document.getElementById("output").value = "⏳ Processing audio...";

  try {
    const response = await fetch("/transcribe/", {
      method: "POST",
      body: formData
    });

    console.log("Status:", response.status);

    let data;

    try {
      data = await response.json();
    } catch (e) {
      const text = await response.text();
      document.getElementById("output").value = "SERVER ERROR: " + text;
      return;
    }

    console.log("Data:", data);

    if (data.error) {
      document.getElementById("output").value = "ERROR: " + data.error;
    } else {
      document.getElementById("output").value = data.text || "No text found";
    }

  } catch (error) {
    console.error("FULL ERROR:", error);
    document.getElementById("output").value = "ERROR: " + error;
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