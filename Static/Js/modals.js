document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("modalOverlay");
    const cards = document.querySelectorAll(".service-card");
    const closeBtns = document.querySelectorAll(".close-modal");

    cards.forEach(card => {
        card.querySelector(".btn-more")?.addEventListener("click", () => {
            const modal = document.getElementById(`modal-${card.dataset.service}`);
            overlay.style.display = "flex";
            modal.style.display = "block";
        });
    });

    function closeAll() {
        overlay.style.display = "none";
        document.querySelectorAll(".modal").forEach(m => m.style.display = "none");
    }

    closeBtns.forEach(btn => btn.addEventListener("click", closeAll));
    overlay?.addEventListener("click", e => e.target === overlay && closeAll());
});
