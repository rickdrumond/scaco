// Check if an 'a' element links to the same page
const isAnchor = (element) => {
  return (
    element.hash &&
    window.location.origin === element.origin &&
    window.location.pathname === element.pathname
  );
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
});
