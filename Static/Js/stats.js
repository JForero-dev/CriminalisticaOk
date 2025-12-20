document.addEventListener("DOMContentLoaded", () => {
    const stats = document.querySelectorAll(".stat-number");
    const section = document.querySelector(".stats-container");
    let animated = false;

    function isInViewport(el) {
        const r = el.getBoundingClientRect();
        return r.top >= 0 && r.bottom <= window.innerHeight;
    }

    function animate() {
        if (animated) return;
        stats.forEach(stat => {
            const target = +stat.dataset.count;
            let count = 0;
            const inc = Math.ceil(target / 100);

            const update = () => {
                count += inc;
                if (count > target) count = target;
                stat.textContent = count;
                if (count < target) requestAnimationFrame(update);
            };
            update();
        });
        animated = true;
    }

    window.addEventListener("scroll", () => {
        if (section && isInViewport(section)) animate();
    });
});
