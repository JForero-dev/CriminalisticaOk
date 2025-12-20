const track = document.querySelector('.convenios-slider-track');
if (track) {
    const clone = track.innerHTML;
    for (let i = 0; i < 6; i++) track.innerHTML += clone;
}
