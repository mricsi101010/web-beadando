self.onmessage = function(e) {
  if (e.data === "start") {
    let total = 0;
    for (let i = 1; i <= 1_000_000; i++) {
      total += i;
    }
    self.postMessage(total);
  }
};