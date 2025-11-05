// Animasi masuk seluruh konten saat reload
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");

  const tabs = document.querySelectorAll(".tab");

  // === TAB SWITCHING DENGAN ANIMASI ===
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.tab;
      const targetGallery = document.getElementById(targetId);
      const activeGallery = document.querySelector(".gallery.active");

      // jika tab yang diklik sudah aktif → abaikan
      if (tab.classList.contains("active")) return;

      // ubah tab aktif
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      // animasi fade-out pada gallery aktif
      if (activeGallery) {
        activeGallery.classList.add("fade-out");
        setTimeout(() => {
          activeGallery.classList.remove("active", "fade-out");
          activeGallery.style.display = "none";

          // tampilkan gallery baru dengan animasi fade-in
          targetGallery.style.display = "grid";
          setTimeout(() => {
            targetGallery.classList.add("active");
          }, 50);
        }, 300);
      } else {
        targetGallery.classList.add("active");
      }
    });
  });

  // === ANIMASI SKILL BAR ===
  const fills = document.querySelectorAll(".fill");
  fills.forEach(fill => {
    const finalWidth = fill.getAttribute("style").match(/width:\s*([\d.]+%)/)[1];
    fill.style.width = "0";
    setTimeout(() => {
      fill.style.width = finalWidth;
    }, 300);
  });
});

// === PORTFOLIO POPUP ===
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupTitle = document.getElementById("popup-title");
const popupText = document.getElementById("popup-text");
const popupList = document.getElementById("popup-list");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img").src;
    const title = item.dataset.title;
    const desc = item.dataset.desc;
    const list = item.dataset.list ? item.dataset.list.split(",") : [];

    popupImg.src = img;
    popupTitle.textContent = title || "";
    popupText.textContent = desc || "";
    popupList.innerHTML = list.map((i) => `<li>${i.trim()}</li>`).join("");
    popup.style.display = "flex";
  });
});

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });
}

window.addEventListener("click", (e) => {
  if (e.target === popup) popup.style.display = "none";
});
