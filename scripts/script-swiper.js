


// определяем элемент, который будем двигать
const swiperContent = document.querySelector(".swiper-content");
// определяем кнопки для сдвига
const swiperLArrow = document.querySelector(".swiper-l-arrow");
const swiperRArrow = document.querySelector(".swiper-r-arrow");
// опредяем список элементов, которые будут сдвигаться
const swiperItems = document.querySelectorAll(".swiper-item");

// ширина элемента
const widthItem = () => swiperItems[0].clientWidth;
// активный индекс элемента
let activeInd = 0;
// общее число ширины сдвига
let scrollHorizontalWidth = 0;


// обработчик для левой кнопки сдвига
function handleLeftArrow() {
    if (activeInd <= 0) return;

    // изменяем ширину сдвига
    scrollHorizontalWidth+=widthItem();
    swiperContent.style.transform = `translateX(${scrollHorizontalWidth}px)`;

    activeInd--;
}

// обработчик для правой кнопки сдвига
function handleRightArrow() {
    if (activeInd >= swiperItems.length-1) return;

    // изменяем ширину сдвига
    scrollHorizontalWidth-=widthItem();
    swiperContent.style.transform = `translateX(${scrollHorizontalWidth}px)`

    activeInd++;
}


swiperLArrow.addEventListener("click", handleLeftArrow);
swiperRArrow.addEventListener("click", handleRightArrow);


console.log('скрипт "script-swiper.js" отработал');