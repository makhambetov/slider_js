//блок обертка
var wrapper = document.createElement('div');
wrapper.id = 'wrapper';
var body = document.getElementsByTagName('body')[0].appendChild(wrapper);

//количество картинок
var imgQty = 3;

//блок для слайдера
var slider = document.createElement('div');
slider.classList.add('slider');
wrapper.appendChild(slider);

//определяем координаты слайдера (функцию нашел в интернете)
function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}
var sliderCoords = getCoords(slider);

//прямоугольник
var rectangle = document.createElement('div');
rectangle.className = 'rectangle';
rectangle.style.width = (slider.clientWidth * imgQty) + 'px';
rectangle.style.height = slider.clientHeight + 'px';
console.log(slider.clientHeight);
slider.appendChild(rectangle);

//блок для селекторов
var selectorsBlock = document.createElement('div');
selectorsBlock.id = 'selectors_block';
selectorsBlock.style.left = sliderCoords.left + 'px';
selectorsBlock.style.top = sliderCoords.top + 420 + 'px';
wrapper.appendChild(selectorsBlock);


var selectorsArray = []; //массив для селекторов
var imgArray = [];       //массив для картинок
var imgLeftCoord = [];   //массив для координат картинок


//цикл создает картинки, селекторы под ними и вешает на селекторы обработчики
for(var i = 0; i < imgQty; i++) {

    //создаем массив картинок, присваиваем и добавляем в прямоугольник
    imgArray[i] = document.createElement('img');
    imgArray[i].setAttribute('src', 'img/img' + (i + 1) + '.jpg');
    imgArray[i].style.left = (slider.clientWidth*i) + 'px';
    imgLeftCoord[i] = sliderCoords.left + (slider.clientWidth*(i+1));
    imgArray[i].classList.add('img');
    rectangle.appendChild(imgArray[i]);

    //создаем массив селекторов
    selectorsArray[i] = document.createElement('div');
    selectorsArray[i].classList.add('selector');
    if (i == 0){
        selectorsArray[i].id = 'active';
    }
    selectorsBlock.appendChild(selectorsArray[i]);

    //обработчики на селекторы
    selectorsArray[i].onclick = function () {
        var indexOfClicked = selectorsArray.indexOf(this);

        for (var j = 0; j < imgQty; j++) {
            selectorsArray[j].id = '';
        }
        this.id = 'active';

        rectangle.style.left = -slider.clientWidth * indexOfClicked +'px';
        click = indexOfClicked;
    }
}

//для автоматического переключения каждые 2 секунды
var click = 0;
setInterval(function() {
    selectorsArray[click].click();
    click++;
    if(click == imgQty) click = 0;
}, 2000);

/*принудительный клик на первый элемент для устранения
глюка первого клика (не разобрался, почему так происходит)*/
selectorsArray[0].click();


