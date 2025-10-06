// Navigation Toggle
const hamburger = document.getElementById("hamburger")
const nav = document.getElementById("nav")

if (hamburger && nav) {
  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active")

    const spans = hamburger.querySelectorAll("span")
    if (nav.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
      spans[1].style.opacity = "0"
      spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
    } else {
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    }
  })

  // Close menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active")
      const spans = hamburger.querySelectorAll("span")
      spans[0].style.transform = "none"
      spans[1].style.opacity = "1"
      spans[2].style.transform = "none"
    })
  })
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".menu-item, .gallery-item, .info-card").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Contact Form Submission
const contactForm = document.getElementById("contactForm")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()
    alert("Merci pour votre message! Nous vous contacterons bientôt.")
    contactForm.reset()
  })
}

// Reservation Modal Functionality
const reservationBtn = document.getElementById("reservationBtn")
const reservationModal = document.getElementById("reservationModal")
const closeModal = document.querySelector(".close-modal")
const reservationForm = document.getElementById("reservationForm")

if (reservationBtn && reservationModal) {
  reservationBtn.addEventListener("click", () => {
    reservationModal.classList.add("active")
    document.body.style.overflow = "hidden"
  })

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      reservationModal.classList.remove("active")
      document.body.style.overflow = "auto"
    })
  }

  window.addEventListener("click", (e) => {
    if (e.target === reservationModal) {
      reservationModal.classList.remove("active")
      document.body.style.overflow = "auto"
    }
  })

  if (reservationForm) {
    reservationForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("resName").value
      const phone = document.getElementById("resPhone").value
      const date = document.getElementById("resDate").value
      const time = document.getElementById("resTime").value
      const guests = document.getElementById("resGuests").value

      alert(
        `Merci ${name}! Votre réservation pour ${guests} personne(s) le ${date} à ${time} a été enregistrée. Nous vous contacterons au ${phone} pour confirmer.`,
      )

      reservationModal.classList.remove("active")
      document.body.style.overflow = "auto"
      reservationForm.reset()
    })
  }
}

// Menu Search Filter Functionality
const menuSearch = document.getElementById("menuSearch")
if (menuSearch) {
  menuSearch.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase()
    const menuItems = document.querySelectorAll(".menu-item")
    const menuSections = document.querySelectorAll(".menu-category-section")

    menuItems.forEach((item) => {
      const itemName = item.querySelector(".menu-item-name").textContent.toLowerCase()
      const itemDescription = item.querySelector(".menu-item-description").textContent.toLowerCase()

      if (itemName.includes(searchTerm) || itemDescription.includes(searchTerm)) {
        item.style.display = "block"
        item.style.animation = "fadeIn 0.3s ease"
      } else {
        item.style.display = "none"
      }
    })

    // Hide sections with no visible items
    menuSections.forEach((section) => {
      const visibleItems = section.querySelectorAll(
        ".menu-item[style*='display: block'], .menu-item:not([style*='display: none'])",
      )
      if (visibleItems.length === 0 && searchTerm !== "") {
        section.style.display = "none"
      } else {
        section.style.display = "block"
      }
    })
  })
}

// Map Button Functionality
const mapBtn = document.getElementById("mapBtn")
if (mapBtn) {
  mapBtn.addEventListener("click", () => {
    // Coordinates for Gabès, Tunisia - Avenue Habib Bourguiba
    const address = "Sunset Coffee Lounge, Avenue Habib Bourguiba, Gabès 6000, Tunisia"
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, "_blank")
  })
}

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroContent = document.querySelector(".hero-content")
  if (heroContent && scrolled < 600) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})

// Gallery item click effect
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", function () {
    this.style.transform = "scale(0.95)"
    setTimeout(() => {
      this.style.transform = "scale(1)"
    }, 200)
  })
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease"
    document.body.style.opacity = "1"
  }, 100)
})

// Dynamic year in footer
const currentYear = new Date().getFullYear()
const footerText = document.querySelector(".footer p")
if (footerText) {
  footerText.innerHTML = `&copy; ${currentYear} Sunset Coffee-Lounge. Tous droits réservés.`
}

// Set minimum date for reservation (today)
const resDateInput = document.getElementById("resDate")
if (resDateInput) {
  const today = new Date().toISOString().split("T")[0]
  resDateInput.setAttribute("min", today)
}
