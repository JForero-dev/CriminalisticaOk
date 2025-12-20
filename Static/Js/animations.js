document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll("[data-aos]");

    function isInViewport(el) {
        const r = el.getBoundingClientRect();
        return r.top >= 0 && r.bottom <= window.innerHeight;
    }

    function check() {
        elements.forEach(el => {
            if (isInViewport(el) && !el.classList.contains("animated")) {
                const anim = el.dataset.aos;
                const delay = el.dataset.aosDelay || 0;

                setTimeout(() => {
                    el.style.animation = `${anim} 0.8s forwards`;
                    el.classList.add("animated");
                }, delay);

                el.removeAttribute("data-aos");
            }
        });
    }

    window.addEventListener("scroll", check);
    check();

    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
});
