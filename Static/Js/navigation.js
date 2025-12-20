const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(sec => {
        const top = sec.offsetTop - 100;
        if (scrollY >= top && scrollY < top + sec.offsetHeight) {
            current = sec.id;
        }
    });

    links.forEach(link => {
        link.classList.toggle("active", link.href.includes(current));
    });
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
        e.preventDefault();
        const t = document.querySelector(a.getAttribute("href"));
        window.scrollTo({ top: t.offsetTop - 80, behavior: "smooth" });
    });
});
