  function updateTime() {
    const now = new Date();
    const msValue = Date.now();

    const humanTimeEl = document.getElementById("human-time");
    const hiddenMsEl = document.getElementById("hidden-ms");
    const timeEl = document.getElementById("time-element");

    // Format readable time (e.g., "17 Oct 2025, 12:34 PM")
    const options = {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true
    };
    const humanTime = now.toLocaleString('en-GB', options).replace(',', '');

    // Update visible text and hidden timestamp
    humanTimeEl.textContent = humanTime;
    hiddenMsEl.textContent = msValue;

    // Update datetime attribute for accessibility
    timeEl.setAttribute("datetime", now.toISOString());
  }

  updateTime();
  setInterval(updateTime, 1000);s