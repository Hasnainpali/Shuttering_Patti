// ======================================================
// SHUTTERING PATTI - PREMIUM WEBSITE JS
// ======================================================


// ======================================================
// MOBILE MENU
// ======================================================

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {

  menuBtn.addEventListener("click", () => {

    const isOpen = !mobileMenu.classList.contains("max-h-0");

    mobileMenu.classList.toggle("max-h-0", isOpen);
    mobileMenu.classList.toggle("max-h-96", !isOpen);

    menuBtn.textContent = isOpen ? "☰" : "×";

    menuBtn.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );

  });


  // Close mobile menu after clicking link

  const mobileLinks =
    document.querySelectorAll("#mobileMenu a");

  mobileLinks.forEach((link) => {

    link.addEventListener("click", () => {

      mobileMenu.classList.add("max-h-0");
      mobileMenu.classList.remove("max-h-96");

      menuBtn.textContent = "☰";

      menuBtn.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });

}


// ======================================================
// ACTIVE NAVIGATION
// ======================================================

const sections =
  document.querySelectorAll("section[id]");

const navLinks =
  document.querySelectorAll(".nav-link");


if (sections.length && navLinks.length) {

  const navObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            navLinks.forEach((link) => {

              link.classList.remove(
                "text-gold"
              );

              link.classList.add(
                "text-white/70"
              );


              if (
                link.getAttribute("href") ===
                `#${entry.target.id}`
              ) {

                link.classList.remove(
                  "text-white/70"
                );

                link.classList.add(
                  "text-gold"
                );

              }

            });

          }

        });

      },
      {
        rootMargin:
          "-25% 0px -60% 0px",

        threshold: 0
      }
    );


  sections.forEach((section) => {

    navObserver.observe(section);

  });

}


// ======================================================
// SCROLL REVEAL ANIMATION
// ======================================================

const revealElements =
  document.querySelectorAll(".reveal");


if (revealElements.length) {

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "show"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach((element) => {

    revealObserver.observe(element);

  });

}


// ======================================================
// SCROLL PROGRESS
// ======================================================

const scrollProgress =
  document.getElementById("scrollProgress");


function updateScrollProgress() {

  if (!scrollProgress) return;


  const scrollTop =
    window.scrollY;

  const documentHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;


  const progress =
    documentHeight > 0
      ? scrollTop / documentHeight
      : 0;


  scrollProgress.style.transform =
    `scaleX(${progress})`;

}


window.addEventListener(
  "scroll",
  updateScrollProgress,
  { passive: true }
);

updateScrollProgress();


// ======================================================
// NAVBAR BACKGROUND ON SCROLL
// ======================================================

const navbar =
  document.getElementById("navbar");


function updateNavbar() {

  if (!navbar) return;


  if (window.scrollY > 40) {

    navbar.classList.add(
      "shadow-2xl"
    );

    navbar.classList.remove(
      "bg-steel/75"
    );

    navbar.classList.add(
      "bg-steel/95"
    );

  } else {

    navbar.classList.remove(
      "shadow-2xl"
    );

    navbar.classList.remove(
      "bg-steel/95"
    );

    navbar.classList.add(
      "bg-steel/75"
    );

  }

}


window.addEventListener(
  "scroll",
  updateNavbar,
  { passive: true }
);

updateNavbar();


// ======================================================
// GALLERY MODAL
// ======================================================

const galleryImages =
  Array.from(
    document.querySelectorAll(".gallery-img")
  );


const imageModal =
  document.getElementById("imageModal");

const modalImg =
  document.getElementById("modalImg");

const closeModal =
  document.getElementById("closeModal");

const nextImage =
  document.getElementById("nextImage");

const prevImage =
  document.getElementById("prevImage");


let currentImageIndex = 0;


// OPEN MODAL

function openModal(index) {

  if (!galleryImages.length) return;


  currentImageIndex = index;


  modalImg.src =
    galleryImages[index].src;

  modalImg.alt =
    galleryImages[index].alt ||
    "Gallery image";


  imageModal.classList.remove(
    "hidden"
  );

  imageModal.classList.add(
    "flex"
  );


  document.body.classList.add(
    "overflow-hidden"
  );

}


// CLOSE MODAL

function closeImageModal() {

  imageModal.classList.add(
    "hidden"
  );

  imageModal.classList.remove(
    "flex"
  );


  document.body.classList.remove(
    "overflow-hidden"
  );

}


// GALLERY CLICK

galleryImages.forEach(
  (image, index) => {

    image.addEventListener(
      "click",
      () => {

        openModal(index);

      }
    );

  }
);


// CLOSE BUTTON

if (closeModal) {

  closeModal.addEventListener(
    "click",
    closeImageModal
  );

}


// NEXT IMAGE

function showNextImage() {

  if (!galleryImages.length) return;


  currentImageIndex =
    (currentImageIndex + 1) %
    galleryImages.length;


  modalImg.src =
    galleryImages[currentImageIndex].src;

  modalImg.alt =
    galleryImages[currentImageIndex].alt ||
    "Gallery image";

}


// PREVIOUS IMAGE

function showPreviousImage() {

  if (!galleryImages.length) return;


  currentImageIndex =
    (
      currentImageIndex -
      1 +
      galleryImages.length
    ) %
    galleryImages.length;


  modalImg.src =
    galleryImages[currentImageIndex].src;

  modalImg.alt =
    galleryImages[currentImageIndex].alt ||
    "Gallery image";

}


if (nextImage) {

  nextImage.addEventListener(
    "click",
    showNextImage
  );

}


if (prevImage) {

  prevImage.addEventListener(
    "click",
    showPreviousImage
  );

}


// CLOSE WHEN CLICKING BACKDROP

if (imageModal) {

  imageModal.addEventListener(
    "click",
    (event) => {

      if (
        event.target === imageModal
      ) {

        closeImageModal();

      }

    }
  );

}


// KEYBOARD CONTROLS

document.addEventListener(
  "keydown",
  (event) => {

    if (
      !imageModal ||
      imageModal.classList.contains("hidden")
    ) {
      return;
    }


    if (event.key === "Escape") {

      closeImageModal();

    }


    if (event.key === "ArrowRight") {

      showNextImage();

    }


    if (event.key === "ArrowLeft") {

      showPreviousImage();

    }

  }
);


// ======================================================
// BACK TO TOP
// ======================================================

const backToTop =
  document.getElementById("backToTop");


function updateBackToTop() {

  if (!backToTop) return;


  if (window.scrollY > 600) {

    backToTop.classList.remove(
      "hidden"
    );

    backToTop.classList.add(
      "flex"
    );

  } else {

    backToTop.classList.add(
      "hidden"
    );

    backToTop.classList.remove(
      "flex"
    );

  }

}


window.addEventListener(
  "scroll",
  updateBackToTop,
  { passive: true }
);


if (backToTop) {

  backToTop.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );

}


updateBackToTop();


// ======================================================
// SMOOTH ANCHOR SCROLL
// ======================================================

document
  .querySelectorAll('a[href^="#"]')
  .forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const targetId =
          link.getAttribute("href");


        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }


        const target =
          document.querySelector(targetId);


        if (!target) return;


        event.preventDefault();


        const headerOffset = 80;

        const targetPosition =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerOffset;


        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });

      }
    );

  });


// ======================================================
// WHATSAPP PRODUCT QUOTE
// ======================================================

const whatsappLinks =
  document.querySelectorAll(
    'a[href*="wa.me"]'
  );


whatsappLinks.forEach((link) => {

  link.addEventListener(
    "click",
    () => {

      // Analytics / tracking can be added here later.

      console.log(
        "WhatsApp inquiry started"
      );

    }
  );

});


// ======================================================
// PREVENT IMAGE DRAG
// ======================================================

document
  .querySelectorAll("img")
  .forEach((img) => {

    img.addEventListener(
      "dragstart",
      (event) => {

        event.preventDefault();

      }
    );

  });


// ======================================================
// PAGE LOAD
// ======================================================

window.addEventListener(
  "load",
  () => {

    document.body.classList.add(
      "page-loaded"
    );

  }
);