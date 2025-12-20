document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("keydown", e => {
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I") || (e.ctrlKey && e.key === "U")) {
        e.preventDefault();
    }
});
document.querySelectorAll("img").forEach(img => img.draggable = false);
