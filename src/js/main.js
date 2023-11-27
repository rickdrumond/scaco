window.toggleMenu = (button) => {
  button.classList.toggle("tham-active");
  document.getElementById("menu").classList.toggle("is-active");
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("menu").addEventListener(
    "click",
    (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault();

        let menuToggler = document.getElementById("menu-toggler");
        if (menuToggler.classList.contains("tham-active")) {
          toggleMenu(menuToggler);
        }

        document.querySelector(e.target.hash).scrollIntoView({
          behavior: "smooth",
        });
      }
    },
    true
  );
});
