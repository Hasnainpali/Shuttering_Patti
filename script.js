 // MOBILE MENU
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  menuBtn.addEventListener("click", () => {
    if (mobileMenu.classList.contains("max-h-0")) {
      mobileMenu.classList.remove("max-h-0");
      mobileMenu.classList.add("max-h-96");
    } else {
      mobileMenu.classList.add("max-h-0");
      mobileMenu.classList.remove("max-h-96");
    }
  });

  // MOBILE MENU LINKS AUTO CLOSE
const mobileLinks = document.querySelectorAll("#mobileMenu a");

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("max-h-0");
    mobileMenu.classList.remove("max-h-96");
  });
});

  // ACTIVE NAV LINK
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });


  // IMAGE POPUP
  const galleryImages = document.querySelectorAll(".gallery-img");
  const imageModal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const closeModal = document.getElementById("closeModal");

  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      imageModal.classList.remove("hidden");
      imageModal.classList.add("flex");
      modalImg.src = img.src;
    });
  });

  closeModal.addEventListener("click", () => {
    imageModal.classList.add("hidden");
  });
