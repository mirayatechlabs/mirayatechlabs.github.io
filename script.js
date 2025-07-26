
window.addEventListener("load", () => {
  setTimeout(() => {
    document.querySelector(".loader").style.display = "none";
    document.querySelector(".content").classList.remove("hidden");

    gsap.from(".main-logo", { duration: 1, y: -100, opacity: 0 });
    gsap.from(".hero-title", { duration: 1.2, x: -200, opacity: 0 });
    gsap.from(".hero-subtitle", { duration: 1.2, x: 200, opacity: 0 });
    gsap.from(".cta-button", { duration: 1.2, y: 100, opacity: 0 });
  }, 2500);
});
