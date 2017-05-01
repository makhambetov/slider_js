function SliderJS (data =  {elem:'sjs', imgQty:'3', imgDir: 'img' time:'2000'}){
    //блок обертка
    var wrapper = document.createElement('div');
    wrapper.id = 'sjs-wrapper';
    var body = document.getElementById(data.elem).appendChild(wrapper);

    //количество картинок
    var imgQty = data.imgQty;

    //блок для слайдера
    var slider = document.createElement('div');
    slider.classList.add('sjs-slider');
    wrapper.appendChild(slider);

    //определяем координаты слайдера
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
    rectangle.className = 'sjs-rectangle';
    rectangle.style.width = (slider.clientWidth * imgQty) + 'px';
    rectangle.style.height = slider.clientHeight + 'px';
    console.log(slider.clientHeight);
    slider.appendChild(rectangle);

    //блок для селекторов
    var selectorsBlock = document.createElement('div');
    selectorsBlock.id = 'sjs-selectors_block';
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
        imgArray[i].setAttribute('src', data.imgDir + '/img' + (i + 1) + '.jpg');
        imgArray[i].style.left = (slider.clientWidth*i) + 'px';
        //imgArray[i].style.position = 'absolute';
        imgLeftCoord[i] = sliderCoords.left + (slider.clientWidth*(i+1));
        imgArray[i].classList.add('sjs-simg');
        rectangle.appendChild(imgArray[i]);

        //создаем массив селекторов
        selectorsArray[i] = document.createElement('div');
        selectorsArray[i].classList.add('sjs-selector');
        if (i == 0){
            selectorsArray[i].id = 'sjs-active';
        }
        selectorsBlock.appendChild(selectorsArray[i]);

        //обработчики на селекторы
        selectorsArray[i].onclick = function () {
            var indexOfClicked = selectorsArray.indexOf(this);

            for (var j = 0; j < imgQty; j++) {
                selectorsArray[j].id = '';
            }
            this.id = 'sjs-active';

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
    }, data.time);

    /*принудительный клик на первый элемент для устранения
    глюка первого клика*/
    selectorsArray[0].click();

}