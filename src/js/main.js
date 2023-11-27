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

  debugger;

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

document.addEventListener("DOMContentLoaded", () => {
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

  document.getElementById("contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    // Form will be submitted by ReCAPTCHA's callback (fn onRecaptchaSuccess)
    grecaptcha.execute();
  });
});
