// Check if an 'a' element links to the same page
const isAnchor = (element) => {
  return (
    element.hash &&
    window.location.origin === element.origin &&
    window.location.pathname === element.pathname
  );
};

const submitContactForm = (recaptchaToken) => {
  const form = document.querySelector("#contact-form");
  const fd = new FormData(form);
  const payload = {
    person: {
      firstName: fd.get("fname"),
      lastName: fd.get("lname"),
    },
    email: fd.get("email"),
    phone: fd.get("phone"),
    city: fd.get("city"),
    hearAbout: fd.get("hearAbout"),
    areYouRealtor: fd.get("areYouRealtor"),
    contactMethod: fd.getAll("contact-method"),
    agreeToConsent: fd.get("agreeToConsent"),
    ReCAPTCHA: recaptchaToken,
  };

  debugger; // FIXME: remove

  fetch(form.action, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      console.log("Resposta do servidor:", response);
      if (!response.ok) {
        // TODO: user feedback
        throw new Error("Erro ao enviar o formulário");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Resposta do servidor:", data);
      // TODO: user feedback
      alert("Sent!");
      // exibirModalSucesso();
    })
    .catch((error) => {
      // TODO: user feedback
      console.error("Erro:", error);
    });
};

window.onRecaptchaSuccess = function (token) {
  submitContactForm(token);
};

// Enable smooth scrolling for same-page links
document.addEventListener("click", (e) => {
  if ((a = e.target.closest("a")) && isAnchor(a)) {
    e.preventDefault();

    document.querySelector(a.hash).scrollIntoView({
      behavior: "smooth",
    });
  }
});

let header;

const handleScroll = (_e) => {
  if (!header) return;

  header.style.backgroundColor =
    window.scrollY > 100 ? "#0b1b30" : "transparent";
};
document.addEventListener("scroll", handleScroll);

document.addEventListener("DOMContentLoaded", () => {
  header = document.querySelector("header");

  const menuToggler = document.getElementById("menu-toggler");
  const menu = document.getElementById("menu");
  const contactForm = document.getElementById("contact-form");

  const toggleMenu = () => {
    menuToggler.classList.toggle("tham-active");
    menu.classList.toggle("is-active");
  };

  menuToggler.addEventListener("click", toggleMenu);

  // Close menu after clicking a link
  menu.addEventListener(
    "click",
    (e) => {
      if (e.target.tagName === "A") toggleMenu();
    },
    true
  );

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Form will be submitted by ReCAPTCHA's callback (fn onRecaptchaSuccess)
    grecaptcha.execute();
  });

  // Show/Hide ReCAPTCHA's badge if form is in viewport
  const handleIntersection = (entries, _observer) => {
    const recaptchaBadge = document.querySelector(".grecaptcha-badge");
    if (!recaptchaBadge) return;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Form is visible, display badge
        recaptchaBadge.style.visibility = "visible";
      } else {
        recaptchaBadge.style.visibility = "hidden";
      }
    });
  };

  const observerOptions = {
    root: null, // Use the viewport as the root
    rootMargin: "0px", // No margin around the root
    threshold: 0.2, // Trigger when 20% of the element is in the viewport
  };
  const observer = new IntersectionObserver(
    handleIntersection,
    observerOptions
  );
  observer.observe(contactForm);
});
