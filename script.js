// ========== Buy page fake purchase handler ==========
function fakeBuy() {
  const phone = document.getElementById("phone").value.trim();
  const result = document.getElementById("result");

  if (phone.length === 11 && /^[0-9]+$/.test(phone)) {
    result.innerHTML = `<p class='success'>⏳ Processing...</p>`;

    setTimeout(() => {
      result.innerHTML = `<p class='success'>✅ Fake purchase successful! Data will never arrive 😂</p>`;
      document.getElementById("phone").value = "";

      // update wallet balance if element exists
      const wallet = document.getElementById("walletBalance");
      if (wallet) {
        let current = parseInt(wallet.textContent.replace("₦", ""));
        let newBalance = current - 1000; // subtract fake cost
        if (newBalance < 0) newBalance = 0;
        wallet.textContent = `₦${newBalance}`;
      }
    }, 1200);
  } else {
    result.innerHTML = `<p class='error'>❌ Invalid phone number. Try again.</p>`;
  }
}

// ========== Referral copy handler ==========
function copyCode() {
  const code = document.getElementById("referral");
  code.select();
  code.setSelectionRange(0, 99999);
  document.execCommand("copy");

  const copied = document.createElement("div");
  copied.textContent = "✅ Referral code copied!";
  copied.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #004d40;
    color: white;
    padding: 12px 18px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    z-index: 9999;
    font-weight: bold;
  `;
  document.body.appendChild(copied);
  setTimeout(() => copied.remove(), 2000);
}

// ========== Dark Mode Toggle ==========
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
}

// Load saved theme on page load
window.addEventListener("DOMContentLoaded", () => {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
  }
});

// ========== Service Worker ==========
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("SW registered"))
    .catch(err => console.error("SW registration failed", err));
}

// ========== PWA Install Button ==========
let deferredPrompt;
const installBtn = document.getElementById('installBtn');

if (installBtn) {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'inline-block';

    installBtn.addEventListener('click', () => {
      installBtn.style.display = 'none';
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choice) => {
        const installMsg = document.createElement("div");
        installMsg.textContent = (choice.outcome === 'accepted')
          ? "✅ App installing..."
          : "❌ Install cancelled!";
        installMsg.style.cssText = `
          position: fixed;
          bottom: 20px;
          left: 20px;
          background-color: #00695c;
          color: white;
          padding: 12px 18px;
          border-radius: 10px;
          font-weight: bold;
          z-index: 1000;
        `;
        document.body.appendChild(installMsg);
        setTimeout(() => installMsg.remove(), 2000);
        deferredPrompt = null;
      });
    });
  });
}