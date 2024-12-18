let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');
let carouselDom = document.querySelector('.carousel');
let listItemDom = document.querySelector('.carousel .list');
let thumbnailDom = document.querySelector('.carousel .thumbnail');

const colors = {
    pakhus77: '#FFB928',
    risskov: '#FF39B4',
    harbor: '#5FC4EC'
};

nextDom.onclick = function () {
    showSlider('next');
}

prevDom.onclick = function () {
    showSlider('prev');
}

function showSlider(type) {
    let itemSlider = document.querySelectorAll('.carousel .list .item');
    let itemThumbnail = document.querySelectorAll('.carousel .thumbnail .item');

    if (type === 'next') {
        listItemDom.appendChild(itemSlider[0]);
        thumbnailDom.appendChild(itemThumbnail[0]);
        carouselDom.classList.add('next');
        carouselDom.classList.remove('prev');
    } else {
        let positionLastItem = itemSlider.length - 1;
        listItemDom.prepend(itemSlider[positionLastItem]);
        thumbnailDom.prepend(itemThumbnail[positionLastItem]);
        carouselDom.classList.add('prev');
        carouselDom.classList.remove('next');
    }

    updateArrowColors();
}

function updateArrowColors() {
    let currentItem = document.querySelector('.carousel .list .item:nth-child(1) .title');
    let currentClass = currentItem.classList[1]; // Get the class name (pakhus77, risskov, harbor)
    let prevColor, nextColor;

    if (currentClass === 'pakhus77') {
        prevColor = colors.harbor;
        nextColor = colors.risskov;
    } else if (currentClass === 'risskov') {
        prevColor = colors.pakhus77;
        nextColor = colors.harbor;
    } else if (currentClass === 'harbor') {
        prevColor = colors.risskov;
        nextColor = colors.pakhus77;
    }

    prevDom.style.backgroundColor = prevColor;
    nextDom.style.backgroundColor = nextColor;
}

// Initial call to set arrow colors
updateArrowColors();

// Remove 'next' and 'prev' classes after animation ends
carouselDom.addEventListener('animationend', function () {
    carouselDom.classList.remove('next');
    carouselDom.classList.remove('prev');
});
