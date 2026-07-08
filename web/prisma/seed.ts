import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/** Serialize a bilingual object / array into a JSON string column. */
const J = (v: unknown) => JSON.stringify(v);

// Default admin — CHANGE the password after first login (or via env).
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "endarmuhammad38@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "changeme123";

async function main() {
  // ---------------- admin ----------------
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: { passwordHash },
    create: { email: ADMIN_EMAIL, passwordHash },
  });

  // ---------------- profile ----------------
  await prisma.profile.deleteMany();
  await prisma.profile.create({
    data: {
      name: "Muhammad Endar Darmawan",
      initials: "MED",
      photoUrl: "/uploads/profile.png",
      cvUrl: "/uploads/CV_Muhammad_Endar_Darmawan_ENG.pdf",
      roles: J({
        en: ["Software Engineer", "Web Developer", "UI/UX Designer", "Data Enthusiast"],
        id: ["Software Engineer", "Web Developer", "Desainer UI/UX", "Data Enthusiast"],
      }),
      eyebrow: J({ en: "Software Engineer & Data Enthusiast", id: "Software Engineer & Data Enthusiast" }),
      intro: J({
        en: "I build reliable web applications with Laravel — and I've shipped 14+ medical modules used every day by doctors, nurses, and pharmacists at Indonesia's Pertamina Central Hospital.",
        id: "Saya membangun aplikasi web yang andal dengan Laravel — dan telah mengembangkan 14+ modul medis yang dipakai setiap hari oleh dokter, perawat, dan apoteker di Rumah Sakit Pusat Pertamina.",
      }),
      location: J({ en: "Jakarta · Bandung, Indonesia", id: "Jakarta · Bandung, Indonesia" }),
      availability: J({ en: "Open to opportunities", id: "Terbuka untuk peluang" }),
      email: "endarmuhammad38@gmail.com",
      phone: "+62 895-1682-4205",
      linkedin: "linkedin.com/in/muhendar",
      showPhone: true,
      aboutParas: J([
        {
          en: "I'm a D4 Informatics Engineering graduate (GPA 3.70) and a Software Engineer with a year of professional experience turning complex, real-world requirements into production software.",
          id: "Saya lulusan D4 Teknik Informatika (IPK 3.70) dan Software Engineer dengan pengalaman profesional satu tahun mengubah kebutuhan dunia nyata yang kompleks menjadi perangkat lunak produksi.",
        },
        {
          en: "My core stack is Laravel, but I move comfortably across the whole product — from database and backend architecture to thoughtful UI/UX and the data and machine-learning layer underneath. I also value clean collaboration: zero merge conflicts and code that works as intended in both development and production.",
          id: "Fondasi utama saya adalah Laravel, tapi saya nyaman bergerak di seluruh produk — dari arsitektur basis data dan backend, desain UI/UX yang matang, hingga lapisan data dan machine learning di baliknya. Saya juga menjunjung kolaborasi yang rapi: nol konflik merge dan kode yang berjalan sesuai rencana di development maupun production.",
        },
        {
          en: "High dedication and hard work are the two values I bring to every project and every new technology I take on.",
          id: "Dedikasi tinggi dan kerja keras adalah dua nilai yang saya bawa ke setiap proyek dan setiap teknologi baru yang saya pelajari.",
        },
      ]),
      facts: J([
        { k: { en: "Based", id: "Lokasi" }, v: { en: "Jakarta / Bandung, Indonesia", id: "Jakarta / Bandung, Indonesia" } },
        { k: { en: "Focus", id: "Fokus" }, v: { en: "Web · UI/UX · Data", id: "Web · UI/UX · Data" } },
        { k: { en: "Stack", id: "Stack" }, v: { en: "Laravel · PHP · JS · Python", id: "Laravel · PHP · JS · Python" } },
        { k: { en: "Langs", id: "Bahasa" }, v: { en: "Indonesian (native) · English (TOEIC)", id: "Indonesia (asli) · Inggris (TOEIC)" } },
        { k: { en: "Status", id: "Status" }, v: { en: "Open to opportunities", id: "Terbuka untuk peluang" } },
      ]),
      stats: J([
        { n: 1, dec: 0, suf: "+", lbl: { en: "Year of experience", id: "Tahun pengalaman" } },
        { n: 14, dec: 0, suf: "+", lbl: { en: "Medical modules shipped", id: "Modul medis dikembangkan" } },
        { n: 5, dec: 0, suf: "+", lbl: { en: "Projects delivered", id: "Proyek diselesaikan" } },
        { n: 3.7, dec: 2, suf: "", lbl: { en: "GPA out of 4.00", id: "IPK dari 4.00" } },
      ]),
      contactH: J({ en: "Let's build something reliable together.", id: "Ayo bangun sesuatu yang andal bersama." }),
      contactP: J({
        en: "I'm open to software engineering, web, UI/UX, and data roles. The fastest way to reach me is email or LinkedIn.",
        id: "Saya terbuka untuk peran software engineering, web, UI/UX, dan data. Cara tercepat menghubungi saya lewat email atau LinkedIn.",
      }),
      openTo: J(["Web Developer", "Frontend Developer", "Fullstack Developer", "UI/UX Designer", "Software Developer", "Quality Assurance", "Data Analyst", "Data Engineer"]),
    },
  });

  // ---------------- experience ----------------
  await prisma.experience.deleteMany();
  await prisma.experience.createMany({
    data: [
      {
        org: "Rumah Sakit Pusat Pertamina", loc: "Jakarta Selatan", current: true, order: 0,
        role: J({ en: "Software Engineer", id: "Software Engineer" }),
        type: J({ en: "Full-time", id: "Penuh Waktu" }),
        period: J({ en: "Apr 2025 – Present", id: "Apr 2025 – Sekarang" }),
        bullets: J({
          en: [
            "Shipped 14+ medical modules — hemodialysis, pediatrics, vital signs, neonatal intensive care, anesthesia, nutritional care, transfusion, blood glucose, and pre/post-operative care — built end-to-end in Laravel.",
            "Collaborated through GitLab with a workflow tuned for zero merge conflicts and features that work as intended across development and production.",
            "Partnered directly with 3 user groups — doctors, nurses, and pharmacists — running discussions and requirement sessions to translate clinical needs into software.",
            "Strengthened 5 professional soft skills on the job: critical thinking, adaptability, time management, and project management.",
          ],
          id: [
            "Mengembangkan 14+ modul medis — hemodialisis, pediatri, vital sign, NICU, anestesi, asuhan gizi, transfusi, gula darah, serta perawatan pra/pasca-operasi — dibangun end-to-end dengan Laravel.",
            "Berkolaborasi lewat GitLab dengan alur kerja nol konflik merge dan fitur yang berjalan sesuai rencana di development maupun production.",
            "Bekerja langsung dengan 3 kelompok pengguna — dokter, perawat, dan apoteker — melalui diskusi dan sesi kebutuhan untuk menerjemahkan kebutuhan klinis menjadi perangkat lunak.",
            "Mengasah 5 soft skill profesional: berpikir kritis, adaptabilitas, manajemen waktu, dan manajemen proyek.",
          ],
        }),
        tags: J(["Laravel", "PHP", "GitLab", "Oracle", "Docker"]),
      },
      {
        org: "Lintang Utama Infotek", loc: "Jakarta Timur", current: false, order: 1,
        role: J({ en: "Software Engineer Intern", id: "Magang Software Engineer" }),
        type: J({ en: "Internship", id: "Magang" }),
        period: J({ en: "Feb 2024 – Jan 2025", id: "Feb 2024 – Jan 2025" }),
        bullets: J({
          en: [
            "Built a digital-library information system on Odoo, focusing on database and backend concepts to reach 100% intended functionality.",
            "Formulated the data model and backend logic that powered streamlined library operations and management.",
            "Applied a growth mindset and computational thinking to master a new platform quickly and overcome delivery challenges.",
          ],
          id: [
            "Membangun sistem informasi perpustakaan digital di atas Odoo, berfokus pada konsep basis data dan backend hingga fungsionalitas 100% sesuai rencana.",
            "Merumuskan model data dan logika backend yang menjalankan operasional dan manajemen perpustakaan.",
            "Menerapkan growth mindset dan computational thinking untuk cepat menguasai platform baru dan mengatasi tantangan pengerjaan.",
          ],
        }),
        tags: J(["Odoo", "Python", "PostgreSQL", "Backend"]),
      },
      {
        org: "Rumah Sakit Pusat Pertamina", loc: "Jakarta Selatan", current: false, order: 2,
        role: J({ en: "Software Engineer", id: "Software Engineer" }),
        type: J({ en: "Part-time", id: "Paruh Waktu" }),
        period: J({ en: "Feb 2024 – Aug 2024", id: "Feb 2024 – Aug 2024" }),
        bullets: J({
          en: [
            "Delivered 5 medical modules — hemodialysis, neonatal intensive care, nutritional care, transfusion, and blood glucose — using Laravel.",
            "Used GitLab for version control with zero merge conflicts across development and production.",
            "Conceptualized requirements with doctors, nurses, and pharmacists through structured discussions and meetings.",
          ],
          id: [
            "Menyelesaikan 5 modul medis — hemodialisis, NICU, asuhan gizi, transfusi, dan gula darah — menggunakan Laravel.",
            "Menggunakan GitLab untuk version control dengan nol konflik merge di development maupun production.",
            "Mengonseptualisasikan kebutuhan bersama dokter, perawat, dan apoteker lewat diskusi dan rapat terstruktur.",
          ],
        }),
        tags: J(["Laravel", "PHP", "GitLab"]),
      },
    ],
  });

  // ---------------- projects ----------------
  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: [
      {
        name: "ARAS Decision Support System", category: "web", order: 0,
        role: J({ en: "Project Manager & Web Developer", id: "Project Manager & Web Developer" }),
        period: J({ en: "Nov – Dec 2023", id: "Nov – Des 2023" }),
        desc: J({
          en: "A decision-support web app that ranks the best teacher candidate for a school against 5 weighted qualifications using the ARAS (Additive Ratio Assessment) method.",
          id: "Aplikasi web pendukung keputusan yang memeringkat kandidat guru terbaik untuk sekolah berdasarkan 5 kualifikasi berbobot menggunakan metode ARAS (Additive Ratio Assessment).",
        }),
        tags: J(["Laravel", "MySQL", "GitHub", "DSS"]),
      },
      {
        name: "KSnap — ID Card OCR", category: "mobile", order: 1,
        role: J({ en: "Mobile & ML Developer", id: "Mobile & ML Developer" }),
        period: J({ en: "Nov – Dec 2023", id: "Nov – Des 2023" }),
        desc: J({
          en: "An Android app that validates Indonesian ID cards (KTP) by recognizing and extracting text with OCR, reaching 89% extraction accuracy on a custom CNN model.",
          id: "Aplikasi Android yang memvalidasi KTP dengan mengenali dan mengekstraksi teks lewat OCR, mencapai akurasi ekstraksi 89% pada model CNN buatan sendiri.",
        }),
        tags: J(["Flutter", "OpenCV", "TensorFlow", "OCR", "CNN"]),
      },
      {
        name: "Sahabat Tani", category: "web", order: 2,
        role: J({ en: "Web Developer", id: "Web Developer" }),
        period: J({ en: "Mar – Jul 2023", id: "Mar – Jul 2023" }),
        desc: J({
          en: "A web platform that digitizes farmers' transactions and operations — recording harvest yields per period, equipment procurement, and finances.",
          id: "Platform web yang mendigitalisasi transaksi dan operasional petani — pencatatan hasil panen per periode, pengadaan alat, dan keuangan.",
        }),
        tags: J(["Laravel", "MySQL", "GitHub"]),
      },
    ],
  });

  // ---------------- skills ----------------
  await prisma.skillGroup.deleteMany();
  await prisma.skillGroup.createMany({
    data: [
      { order: 0, title: J({ en: "Engineering", id: "Rekayasa" }), items: J(["Logical Programming", "Data Structures & Algorithms", "Native Web Development", "Laravel", "Data Warehouse", "SQL Server", "Machine Learning", "Google Colab", "Tableau"]) },
      { order: 1, title: J({ en: "Languages", id: "Bahasa Pemrograman" }), items: J(["Java", "PHP", "JavaScript", "Python"]) },
      { order: 2, title: J({ en: "Tools", id: "Perangkat" }), items: J(["VS Code", "Flutter", "Git", "GitHub", "GitLab", "Figma", "Docker", "PuTTY", "Toad for Oracle", "Odoo"]) },
      { order: 3, title: J({ en: "Soft Skills", id: "Soft Skill" }), items: J(["Critical Thinking", "Problem Solving", "Team Management", "Adaptability", "Creativity"]) },
    ],
  });

  // ---------------- education ----------------
  await prisma.education.deleteMany();
  await prisma.education.createMany({
    data: [
      {
        school: "Politeknik Negeri Malang", order: 0,
        degree: J({ en: "D4 Informatics Engineering", id: "D4 Teknik Informatika" }),
        period: J({ en: "Sep 2021 – Jul 2025", id: "Sep 2021 – Jul 2025" }),
        detail: J({
          en: "GPA 3.70 / 4.00 — active in HMTI programs & competitions; built the Kost.In, Techlap, and Sahabat Tani projects.",
          id: "IPK 3.70 / 4.00 — aktif di program kerja & lomba HMTI; membangun proyek Kost.In, Techlap, dan Sahabat Tani.",
        }),
      },
      {
        school: "SMAN 1 Baleendah", order: 1,
        degree: J({ en: "Science Major (MIPA)", id: "Jurusan MIPA" }),
        period: J({ en: "Jul 2018 – Aug 2021", id: "Jul 2018 – Agu 2021" }),
        detail: J({
          en: "Diploma grade 91.0 — Leader of the KARBIT Baleendah student organization.",
          id: "Nilai Ijazah 91.0 — Ketua Organisasi KARBIT Baleendah.",
        }),
      },
    ],
  });

  // ---------------- organization ----------------
  await prisma.organization.deleteMany();
  await prisma.organization.createMany({
    data: [
      {
        org: "HMTI POLINEMA", order: 0,
        role: J({ en: "Head of Interest & Talent Staff", id: "Kepala Staf Minat & Bakat" }),
        period: J({ en: "Feb 2023 – Feb 2024", id: "Feb 2023 – Feb 2024" }),
        bullets: J({
          en: ["Directed HMTI's non-academic activities and events.", "Handled bureaucracy and liaison with lecturers and department directors.", "Facilitated workshops and seminars to grow members' skills."],
          id: ["Mengarahkan kegiatan dan acara nonakademik HMTI.", "Mengurus birokrasi dan perhubungan dengan dosen serta direksi jurusan.", "Memfasilitasi workshop dan seminar untuk mengembangkan skill anggota."],
        }),
      },
      {
        org: "HMTI POLINEMA", order: 1,
        role: J({ en: "Organizing Committee", id: "Organizing Committee" }),
        period: J({ en: "Feb 2022 – Feb 2023", id: "Feb 2022 – Feb 2023" }),
        bullets: J({
          en: ["Contributed to every work program the organization ran.", "Active in discussion, presentation, and idea conceptualization within the team."],
          id: ["Berkontribusi pada setiap program kerja organisasi.", "Aktif dalam diskusi, presentasi, dan konseptualisasi ide bersama tim."],
        }),
      },
    ],
  });

  // ---------------- certificates ----------------
  await prisma.certificate.deleteMany();
  await prisma.certificate.createMany({
    data: [
      { order: 0, name: "TOEIC", sub: J({ en: "English Proficiency", id: "Kemampuan Bahasa Inggris" }) },
      { order: 1, name: "D4 Informatics Engineering", sub: J({ en: "Politeknik Negeri Malang", id: "Politeknik Negeri Malang" }) },
    ],
  });

  console.log("✅ Seed complete. Admin login:", ADMIN_EMAIL);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
