const albumData = {
  santri: {
    folder: "hari_santri",
    count: 5,
  },
  gacoan: {
    folder: "mie_gacoan",
    count: 7,
  },
  hari_guru: {
    folder: "hari_guru",
    count: 7,
  },
  ramadhan: {
    folder: "ramadhan",
    count: 7,
  },
};

function openAlbumModal(albumKey) {
  const data = albumData[albumKey];
  if (!data) return;

  const indicators = [];
  const slides = [];

  for (let i = 1; i <= data.count; i++) {
    const activeClass = i === 1 ? "active" : "";
    indicators.push(
      `<button type="button" data-bs-target="#albumCarousel" data-bs-slide-to="${
        i - 1
      }" class="${activeClass}" aria-label="Slide ${i}"></button>`
    );
    slides.push(`
      <div class="carousel-item ${activeClass}">
        <img src="assets/img/${data.folder}/gambar${i}.jpg" class="d-block mx-auto carousel-album-img" alt="Slide ${i}">
      </div>
    `);
  }

  document.getElementById("carouselIndicators").innerHTML = indicators.join("");
  document.getElementById("carouselInner").innerHTML = slides.join("");

  const modal = new bootstrap.Modal(document.getElementById("albumModal"));
  modal.show();
}

const teacherProfileModal = document.getElementById("teacherProfileModal");

teacherProfileModal.addEventListener("show.bs.modal", function (event) {
  const button = event.relatedTarget;
  const name = button.getAttribute("data-name");
  const quote = button.getAttribute("data-quote");
  const subject = button.getAttribute("data-subject");
  const experience = button.getAttribute("data-experience");
  const imgUrl = button.getAttribute("data-img-url");

  // Update konten Modal berdasarkan data yg diambil
  document.getElementById("modalName").textContent = name;
  document.getElementById("modalQuote").textContent = quote;
  document.getElementById("modalSubject").textContent = subject;
  document.getElementById("modalExperience").textContent = experience;
  document.getElementById("modalContact").textContent = contact;
  document.getElementById("modalProfileImg").src = imgUrl;
});

function showSection(sectionId) {
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.add("d-none");
  });
  const target = document.getElementById(sectionId);
  if (target) target.classList.remove("d-none");

  // Update navbar
  document.querySelectorAll(".navbr").forEach((link) => {
    link.classList.remove("fw-bold");
    const onclickVal = link.getAttribute("onclick");
    if (onclickVal && onclickVal.includes(`showSection('${sectionId}')`)) {
      link.classList.add("fw-bold");
    }
  });

  window.scrollTo(0, 0);
}

function showJadwalTab(tabId) {
  // Sembunyikan semua section
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.add("d-none");
  });

  // Tampilkan section jadwal
  const jadwalSection = document.getElementById("jadwal");
  if (jadwalSection) jadwalSection.classList.remove("d-none");

  // Nonaktifkan semua tab & pane
  ["harian-tab", "piket-tab", "guru-tab"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.remove("active");
  });
  ["harian", "piket", "guru"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.remove("show", "active");
  });

  // Aktifkan tab & pane yang diminta
  const activeTab = document.getElementById(`${tabId}-tab`);
  const activePane = document.getElementById(tabId);
  if (activeTab) activeTab.classList.add("active");
  if (activePane) activePane.classList.add("show", "active");

  // 🔥 UPDATE NAVBAR: hanya "Jadwal" yang bold
  document.querySelectorAll(".navbr").forEach((link) => {
    link.classList.remove("fw-bold");
    const onclickVal = link.getAttribute("onclick");
    if (onclickVal && onclickVal.includes("showSection('jadwal')")) {
      link.classList.add("fw-bold");
    }
    // TAPI karena navbar "Jadwal" pakai showJadwalTab, kita perlu cocokkan itu juga
    if (onclickVal && onclickVal.includes("showJadwalTab('")) {
      link.classList.add("fw-bold");
    }
  });

  window.scrollTo(0, 0);
}

function showSectionToShowGuru() {
  // 1. Sembunyikan semua section
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.add("d-none");
  });

  // 2. Tampilkan section jadwal
  const jadwalSection = document.getElementById("jadwal");
  if (jadwalSection) jadwalSection.classList.remove("d-none");

  // 3. Aktifkan tab "Guru", nonaktifkan yang lain
  const guruTab = document.getElementById("guru-tab");
  const harianTab = document.getElementById("harian-tab");
  const piketTab = document.getElementById("piket-tab");

  const guruPane = document.getElementById("guru");
  const harianPane = document.getElementById("harian");
  const piketPane = document.getElementById("piket");

  // Nonaktifkan tab & pane lain
  [harianTab, piketTab].forEach((tab) => tab.classList.remove("active"));
  [harianPane, piketPane].forEach((pane) => {
    pane.classList.remove("show", "active");
  });

  // Aktifkan tab & pane "Guru"
  guruTab.classList.add("active");
  guruPane.classList.add("show", "active");

  // 4. Update navbar: hanya "Jadwal" yang bold
  document.querySelectorAll(".navbr").forEach((link) => {
    link.classList.remove("fw-bold");
    const onclickVal = link.getAttribute("onclick");
    // Cek apakah link ini menuju section 'jadwal'
    if (onclickVal && onclickVal.includes("showSection('jadwal')")) {
      link.classList.add("fw-bold");
    }
  });

  // 5. Scroll ke atas
  window.scrollTo(0, 0);
}

function showContent(id) {
  // Sembunyikan semua section
  document.querySelectorAll(".content-section").forEach((section) => {
    section.classList.add("d-none");
  });

  // Tampilkan section yang dipilih
  document.getElementById(id).classList.remove("d-none");
  document.querySelectorAll("#album .btn").forEach((btn) => {
    btn.classList.remove("btn-purp");
    btn.classList.add("btn-outline-purp");
  });
  const activeBtn = document.querySelector(`[onclick="showContent('${id}')"]`);
  if (activeBtn) {
    activeBtn.classList.remove("btn-outline-purp");
    activeBtn.classList.add("btn-purp");
  }
}

// === DATA JADWAL HARIAN & MINGGUAN (TETAP) ===
const scheduleData = {
  monday: [
    {
      time: "07:00-07:25",
      subject: "Upacara Bendera",
      teacher: "Seluruh Siswa/i",
      type: "subject",
    },
    {
      time: "07:25-07:50",
      subject: "DPK",
      teacher: "Bu Senja",
      type: "subject",
    },
    {
      time: "07:50-08:15",
      subject: "DPK",
      teacher: "Bu Senja",
      type: "subject",
    },
    {
      time: "08:15-08:40",
      subject: "DPK",
      teacher: "Bu Senja",
      type: "subject",
    },
    {
      time: "08:40-09:05",
      subject: "DPK",
      teacher: "Bu Senja",
      type: "subject",
    },
    {
      time: "09:05-09:30",
      subject: "DPK",
      teacher: "Bu Senja",
      type: "subject",
    },
    {
      time: "09:30-10:00",
      subject: "ISTIRAHAT",
      teacher: "",
      type: "break",
    },
    {
      time: "10:00-10:25",
      subject: "DPK",
      teacher: "Pak Maulana",
      type: "subject",
    },
    {
      time: "10:25-10:50",
      subject: "DPK",
      teacher: "Pak Maulana",
      type: "subject",
    },
    {
      time: "10:50-11:15",
      subject: "DPK",
      teacher: "Pak Maulana",
      type: "subject",
    },
    {
      time: "11:15-11:40",
      subject: "DPK",
      teacher: "Pak Maulana",
      type: "subject",
    },
  ],

  tuesday: [
    {
      time: "07:00-07:25",
      subject: "Pembiasaan Pagi Tadarus",
      teacher: "Seluruh Siswa/i",
      type: "subject",
    },
    {
      time: "07:25-07:50",
      subject: "SB",
      teacher: "Pak Sajali",
      type: "subject",
    },
    {
      time: "07:50-08:15",
      subject: "SB",
      teacher: "Pak Sajali",
      type: "subject",
    },
    {
      time: "08:15-08:40",
      subject: "Matematika",
      teacher: "Bu Rina",
      type: "subject",
    },
    {
      time: "08:40-09:05",
      subject: "Matematika",
      teacher: "Bu Rina",
      type: "subject",
    },
    {
      time: "09:05-09:30",
      subject: "IPAS",
      teacher: "Bu Muthia",
      type: "subject",
    },
    {
      time: "09:30-10:00",
      subject: "ISTIRAHAT",
      teacher: "",
      type: "break",
    },
    {
      time: "10:00-10:25",
      subject: "MPP",
      teacher: "Pak Habib",
      type: "subject",
    },
    {
      time: "10:25-10:50",
      subject: "MPP",
      teacher: "Pak Habib",
      type: "subject",
    },
    {
      time: "10:50-11:15",
      subject: "MPP",
      teacher: "Pak Habib",
      type: "subject",
    },
    {
      time: "11:15-11:40",
      subject: "Bahasa Indonesia",
      teacher: "Pak Panjalu",
      type: "subject",
    },
  ],

  wednesday: [
    {
      time: "07:00-07:25",
      subject: "Apel Pagi",
      teacher: "Seluruh Siswa/i",
      type: "subject",
    },
    {
      time: "07:25-07:50",
      subject: "PPKn",
      teacher: "Pak Ucu",
      type: "subject",
    },
    {
      time: "07:50-08:15",
      subject: "PPKn",
      teacher: "Pak Ucu",
      type: "subject",
    },
    {
      time: "08:15-08:40",
      subject: "Bahasa Inggris",
      teacher: "Mrs. Kartika",
      type: "subject",
    },
    {
      time: "08:40-09:05",
      subject: "Bahasa Inggris",
      teacher: "Mrs. Kartika",
      type: "subject",
    },
    {
      time: "09:05-09:30",
      subject: "DPK",
      teacher: "Bu Senja",
      type: "subject",
    },
    {
      time: "09:30-10:00",
      subject: "ISTIRAHAT",
      teacher: "",
      type: "break",
    },
    {
      time: "10:00-10:25",
      subject: "Informatika",
      teacher: "Pak Hari",
      type: "subject",
    },
    {
      time: "10:25-10:50",
      subject: "Informatika",
      teacher: "Pak Hari",
      type: "subject",
    },
    {
      time: "10:50-11:15",
      subject: "Informatika",
      teacher: "Pak Hari",
      type: "subject",
    },
    {
      time: "11:15-11:40",
      subject: "Informatika",
      teacher: "Pak Hari",
      type: "subject",
    },
  ],

  thursday: [
    {
      time: "07:00-07:25",
      subject: "Pembiasaan Pagi Senam",
      teacher: "Seluruh Siswa/i",
      type: "subject",
    },
    {
      time: "07:25-07:50",
      subject: "PJOK",
      teacher: "Pak Mustopa",
      type: "subject",
    },
    {
      time: "07:50-08:15",
      subject: "PJOK",
      teacher: "Pak Mustopa",
      type: "subject",
    },
    {
      time: "08:15-08:40",
      subject: "PJOK",
      teacher: "Pak Mustopa",
      type: "subject",
    },
    {
      time: "08:40-09:05",
      subject: "PABP",
      teacher: "Pak Padli",
      type: "subject",
    },
    {
      time: "09:05-09:30",
      subject: "PABP",
      teacher: "Pak Padli",
      type: "subject",
    },
    {
      time: "09:30-10:00",
      subject: "ISTIRAHAT",
      teacher: "",
      type: "break",
    },
    {
      time: "10:00-10:25",
      subject: "IPAS",
      teacher: "Bu Muthia",
      type: "subject",
    },
    {
      time: "10:25-10:50",
      subject: "IPAS",
      teacher: "Bu Muthia",
      type: "subject",
    },
    {
      time: "10:50-11:15",
      subject: "IPAS",
      teacher: "Bu Muthia",
      type: "subject",
    },
    {
      time: "11:15-11:40",
      subject: "IPAS",
      teacher: "Bu Muthia",
      type: "subject",
    },
  ],

  friday: [
    {
      time: "07:00-07:25",
      subject: "Pembiasaan Pagi Yasinan",
      teacher: "Seluruh Siswa/i",
      type: "subject",
    },
    {
      time: "07:25-07:50",
      subject: "Sejarah",
      teacher: "Bu Ratminah",
      type: "subject",
    },
    {
      time: "07:50-08:15",
      subject: "Sejarah",
      teacher: "Bu Ratminah",
      type: "subject",
    },
    {
      time: "08:15-08:40",
      subject: "Bahasa Indonesia",
      teacher: "Pak Panjalu",
      type: "subject",
    },
    {
      time: "08:40-09:05",
      subject: "Bahasa Indonesia",
      teacher: "Pak Panjalu",
      type: "subject",
    },
    {
      time: "09:05-09:30",
      subject: "Matematika",
      teacher: "Bu Rina",
      type: "subject",
    },
    {
      time: "09:30-10:00",
      subject: "ISTIRAHAT",
      teacher: "",
      type: "break",
    },
    {
      time: "10:00-10:25",
      subject: "Bahasa Inggris",
      teacher: "Mrs. Kartika",
      type: "subject",
    },
    {
      time: "10:25-10:50",
      subject: "Bahasa Inggris",
      teacher: "Mrs. Kartika",
      type: "subject",
    },
    {
      time: "10:50-11:15",
      subject: "Bahasa Inggris",
      teacher: "Mrs. Kartika",
      type: "subject",
    },
    {
      time: "11:15-11:40",
      subject: "Bahasa Inggris",
      teacher: "Mrs. Kartika",
      type: "subject",
    },
  ],
};

// === REALTIME WAKTU JADWAL (TETAP) ===
function getCurrentTime() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}
function isCurrentTime(range) {
  const [start, end] = range.split("-");
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const now = getCurrentTime();
  return now >= sh * 60 + sm && now < eh * 60 + em;
}

// === JADWAL HARIAN (Diperbarui untuk menambahkan ikon break) ===
function displayTodaySchedule() {
  const now = new Date();
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const daysID = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const today = days[now.getDay()];
  const todayID = daysID[now.getDay()];
  const dateText = `${now.getDate()} ${
    months[now.getMonth()]
  } ${now.getFullYear()}`;
  document.getElementById("dayName").textContent = todayID;
  document.getElementById("dateInfo").textContent = dateText;
  const todaySchedule = document.getElementById("todaySchedule");

  if (today === "saturday" || today === "sunday" || !scheduleData[today]) {
    todaySchedule.innerHTML = `<div class='text-center text-muted p-5'><h5 class="fw-bold"><i class="bi bi-emoji-laughing"></i> Akhir Pekan!</h5><p class='mb-0'><i>Nikmati hari liburmu, jangan nikmati luka yang sama lagi.</i></p></div>`;
    return;
  }

  const schedule = scheduleData[today];
  todaySchedule.innerHTML = schedule
    .map((item) => {
      const active = isCurrentTime(item.time);
      const cls =
        item.type === "break"
          ? "break"
          : item.type === "empty"
          ? "empty"
          : active
          ? "active"
          : "";
      const [start, end] = item.time.split("-");
      return `
          <div class="schedule-card ${cls} shadow-sm">
            <div class="time-section">
              <div class="time">${start}</div>
              <div class="time-range">${end}</div>
            </div>
            <div class="subject-section">
              <div class="subject-name">
                ${
                  item.type === "break"
                    ? '<i class="bi bi-cup-fill me-2"></i>'
                    : ""
                }${item.subject}
              </div>
              ${
                item.teacher && item.type !== "break" // Jangan tampilkan guru saat istirahat
                  ? `<div class="subject-info fw-normal">${item.teacher}</div>`
                  : ""
              }
            </div>
          </div>`;
    })
    .join("");
}

// === CARD HARI (TETAP) ===
function renderDayCards() {
  const dayGrid = document.getElementById("daysGrid");
  const dayNamesFull = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
  const todayIndex = new Date().getDay() - 1;
  let html = "";
  dayNamesFull.forEach((name, i) => {
    const dayKey = Object.keys(scheduleData)[i];
    const subjects = scheduleData[dayKey]
      .filter((s) => s.type === "subject")
      .slice(0, 3);
    const total = scheduleData[dayKey].filter(
      (s) => s.type === "subject"
    ).length;
    html += `
          <div class="day-card ${todayIndex === i ? "active" : ""} shadow-sm">
            <strong>${name}</strong>
            ${subjects
              .map((s) => `<div class="text-truncate">${s.subject}</div>`)
              .join("")}
            ${
              total > 3
                ? `<small class="fw-bold">+${total - 3} lainnya</small>`
                : ""
            }
          </div>`;
  });
  dayGrid.innerHTML = html;
}

// === JADWAL MINGGUAN (Dikonfirmasi ikon sudah benar) ===
function displayWeeklySchedule() {
  const daysOrder = ["monday", "tuesday", "wednesday", "thursday", "friday"];
  const dayNames = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
  const allTimes = new Set();
  daysOrder.forEach((d) =>
    scheduleData[d].forEach((i) => allTimes.add(i.time))
  );
  const sortedTimes = [...allTimes].sort();
  const todayIndex = new Date().getDay() - 1;

  let html = `<thead><tr><th>JAM</th>${dayNames
    .map((n) => `<th>${n}</th>`)
    .join("")}</tr></thead><tbody>`;
  sortedTimes.forEach((time) => {
    const isBreak = scheduleData.monday.find(
      (i) => i.time === time && i.type === "break"
    );
    if (isBreak) {
      // Ikon bel sudah ditambahkan di sini
      html += `<tr><th>${time}</th><td colspan="${daysOrder.length}" class="break-cell"><i class="bi bi-bell-fill me-2"></i>${isBreak.subject}</td></tr>`;
    } else {
      html += `<tr><th>${time}</th>`;
      daysOrder.forEach((day, i) => {
        const c = scheduleData[day].find((j) => j.time === time);
        if (c) {
          let cls = "";
          if (i === todayIndex && c.type === "subject") cls = "today-lesson";
          if (c.type === "empty") cls = "empty-cell";
          html += `<td class="${cls}">${
            c.teacher
              ? `${c.subject}<br><small class="text-muted">${c.teacher}</small>`
              : c.subject
          }</td>`;
        } else html += "<td>-</td>";
      });
      html += "</tr>";
    }
  });
  html += "</tbody>";
  document.getElementById("weeklyTable").innerHTML = html;
}

// === INISIALISASI ===
document.addEventListener("DOMContentLoaded", () => {
  // showSection("home");
  renderDayCards();
  displayTodaySchedule();
  displayWeeklySchedule();
  setInterval(displayTodaySchedule, 1000);

  // Set initial active state for Album
  showContent("sepuluh");

  const imageGalleryModal = document.getElementById("imageGalleryModal");

  if (imageGalleryModal) {
    imageGalleryModal.addEventListener("show.bs.modal", function (event) {
      const button = event.relatedTarget;
      const slideIndex = button.getAttribute("data-bs-slide-to");

      const imageCarouselEl = document.getElementById("imageCarousel");

      let carousel = bootstrap.Carousel.getInstance(imageCarouselEl);
      if (!carousel) {
        carousel = new bootstrap.Carousel(imageCarouselEl, {
          interval: false,
        });
      }

      if (slideIndex !== null) {
        carousel.to(parseInt(slideIndex));
      }
    });
  }
});

window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const mainContent = document.getElementById("main-content");

  loadingScreen.style.opacity = "0";
  loadingScreen.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    loadingScreen.style.display = "none";
    mainContent.style.display = "block";
  }, 500);
});
