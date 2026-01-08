/**
 * MORINGATEA.ID - OFFICIAL SCRIPT
 * Pastikan file ini dipanggil di akhir body: <script src="script.js"></script>
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. LOGIKA HAMBURGER MENU ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      // Memberi atau menghapus class 'active'
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Fitur: Tutup menu otomatis saat salah satu link diklik
    // Sangat penting agar menu tidak menutupi konten setelah berpindah section
    const menuItems = document.querySelectorAll('.nav-links a');
    menuItems.forEach(item => {
      item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }


  // --- 2. FITUR UPDATE PESANAN WHATSAPP (VARIAN LATTE) ---
  // Fungsi ini dipanggil setiap kali dropdown varian diubah (onchange)
  window.updateWaLatte = function () {
    const variantSelect = document.getElementById('variant-latte');
    const btnWa = document.getElementById('btn-wa-latte');
    const nomorWa = "62895429156677";

    if (variantSelect && btnWa) {
      const selectedVariant = variantSelect.value; // Ambil nilai Strong/Soft

      // Susun pesan otomatis
      const pesan = `Halo MoringaTea! Saya ingin pesan Moringa Tea Latte varian: ${selectedVariant}`;

      // Update link WhatsApp dengan teks yang sudah di-encode
      btnWa.href = `https://wa.me/${nomorWa}?text=${encodeURIComponent(pesan)}`;
    }
  };

  // Inisialisasi awal agar link WA sudah terisi saat halaman baru dibuka
  updateWaLatte();


  // --- 3. ANIMASI SCROLL (INTERSECTION OBSERVER) ---
  // Membuat section muncul perlahan saat di-scroll
  const sections = document.querySelectorAll('section');

  const observerOptions = {
    threshold: 0.15 // Animasi jalan saat 15% section terlihat
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        // Berhenti mengamati jika animasi sudah selesai
        sectionObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    // Setup gaya awal (tersembunyi)
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "all 0.8s ease-out";
    sectionObserver.observe(section);
  });

});