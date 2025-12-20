document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
    const backToTop = document.getElementById("backToTop");
    const mobileMenu = document.getElementById("mobile-menu");
    const navMenu = document.querySelector(".nav-menu");
    const bars = document.querySelectorAll(".bar");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar?.classList.add("scrolled");
            backToTop?.classList.add("active");
        } else {
            navbar?.classList.remove("scrolled");
            backToTop?.classList.remove("active");
        }
    });

    mobileMenu?.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
        navMenu?.classList.toggle("active");

        if (mobileMenu.classList.contains("active")) {
            bars[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
            bars[1].style.opacity = "0";
            bars[2].style.transform = "rotate(45deg) translate(-5px, -6px)";
        } else resetBars();
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu?.classList.remove("active");
            mobileMenu?.classList.remove("active");
            resetBars();
        });
    });

    function resetBars() {
        bars[0].style.transform = "none";
        bars[1].style.opacity = "1";
        bars[2].style.transform = "none";
    }
});
