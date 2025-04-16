document.addEventListener("DOMContentLoaded", () => {
  const storageOutput = document.getElementById("storage-output");
  const locationOutput = document.getElementById("location-output");
  const startWorkerBtn = document.getElementById("start-worker");
  const workerResult = document.getElementById("worker-result");

  if (storageOutput) {
    localStorage.setItem("webprog", "HTML5 példa");
    const stored = localStorage.getItem("webprog");
    storageOutput.textContent = `Tárolt érték: ${stored}`;
  }

  if (locationOutput && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      locationOutput.textContent = `Szélesség: ${latitude.toFixed(4)}, Hosszúság: ${longitude.toFixed(4)}`;
    }, () => {
      locationOutput.textContent = "Nem engedélyezett a helymeghatározás.";
    });
  }

  if (startWorkerBtn && window.Worker) {
    const worker = new Worker("worker.js");

    startWorkerBtn.addEventListener("click", () => {
      worker.postMessage("start");
      workerResult.textContent = "Számolás folyamatban...";
    });

    worker.onmessage = (e) => {
      workerResult.textContent = `A számolás eredménye: ${e.data}`;
    };
  }
});