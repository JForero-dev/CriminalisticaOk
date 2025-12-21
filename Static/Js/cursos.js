const CARDS_PER_PAGE = 12;
const FILTERS_VISIBLE = 5;

const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search');
const allCards = Array.from(document.querySelectorAll('.course-card'));

const prevBtn = document.getElementById('prevPage');
const nextBtn = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');

const filtersTrack = document.getElementById('filtersTrack');
const filtersPrev = document.getElementById('filtersPrev');
const filtersNext = document.getElementById('filtersNext');

let currentPage = 1;
let filteredCards = [...allCards];

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentPage = 1;
        applyFilters();
    });
});

searchInput.addEventListener('input', () => {
    currentPage = 1;
    applyFilters();
});

function applyFilters() {
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    const term = searchInput.value.toLowerCase();

    filteredCards = allCards.filter(card => {
        const title = card.querySelector('h3').innerText.toLowerCase();
        const category = card.dataset.category;
        return (activeFilter === 'all' || category === activeFilter) && title.includes(term);
    });

    renderPage();
}

function renderPage() {
    allCards.forEach(card => card.style.display = 'none');

    const start = (currentPage - 1) * CARDS_PER_PAGE;
    const end = start + CARDS_PER_PAGE;

    filteredCards.slice(start, end).forEach(card => {
        card.style.display = 'flex';
    });

    const totalPages = Math.ceil(filteredCards.length / CARDS_PER_PAGE);

    if (totalPages <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        pageInfo.textContent = '';
        return;
    }

    prevBtn.style.display = 'inline-block';
    nextBtn.style.display = 'inline-block';
    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderPage();
        window.scrollTo({ top: 250, behavior: 'smooth' });
    }
});

nextBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(filteredCards.length / CARDS_PER_PAGE);
    if (currentPage < totalPages) {
        currentPage++;
        renderPage();
        window.scrollTo({ top: 250, behavior: 'smooth' });
    }
});

document.querySelectorAll('.carousel').forEach(carousel => {
    const images = carousel.querySelectorAll('img');
    const dotsContainer = carousel.querySelector('.dots');
    let index = 0;

    images[0].classList.add('active');

    if (images.length === 1) {
        if (dotsContainer) dotsContainer.style.display = 'none';
        return;
    }

    images.forEach((_, i) => {
        const dot = document.createElement('span');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => changeSlide(i));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('span');

    function changeSlide(i) {
        images[index].classList.remove('active');
        dots[index].classList.remove('active');
        index = i;
        images[index].classList.add('active');
        dots[index].classList.add('active');
    }

    setInterval(() => {
        changeSlide((index + 1) % images.length);
    }, 4000);
});

if (filtersTrack && filtersPrev && filtersNext) {
    const filterButtons = Array.from(filtersTrack.querySelectorAll('.filter-btn'));
    const viewport = document.querySelector('.filters-viewport');
    let filterPage = 0;

    function setViewportWidth() {
        let width = 0;
        for (let i = 0; i < FILTERS_VISIBLE; i++) {
            if (filterButtons[i]) {
                width += filterButtons[i].offsetWidth;
                if (i < FILTERS_VISIBLE - 1) width += 10;
            }
        }
        viewport.style.width = `${width}px`;
    }

    function updateFilters() {
        const start = filterPage * FILTERS_VISIBLE;
        const btn = filterButtons[start];
        filtersTrack.style.transform = `translateX(-${btn ? btn.offsetLeft : 0}px)`;
        filtersPrev.disabled = filterPage === 0;
        filtersNext.disabled = start + FILTERS_VISIBLE >= filterButtons.length;
    }

    filtersPrev.addEventListener('click', () => {
        filterPage = Math.max(0, filterPage - 1);
        updateFilters();
    });

    filtersNext.addEventListener('click', () => {
        const maxPage = Math.ceil(filterButtons.length / FILTERS_VISIBLE) - 1;
        filterPage = Math.min(maxPage, filterPage + 1);
        updateFilters();
    });

    window.addEventListener('load', () => {
        filterPage = 0;
        filterButtons.forEach(b => b.classList.remove('active'));
        filterButtons[0]?.classList.add('active');
        filtersTrack.style.transform = 'translateX(0px)';
        setViewportWidth();
        updateFilters();
    });

    window.addEventListener('resize', () => {
        setViewportWidth();
        updateFilters();
    });
}


applyFilters();
