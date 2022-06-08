(function() {
    // создаем элемент
    let canvas = document.createElement('canvas'),
    contex = canvas.getContext('2d'),
    // получаем ширину экрана
    w = canvas.width = innerWidth,
    // получаем высот экрана
    h = canvas.height = innerHeight,
    // инициализируем массив
    particles = [],
    // х-ки свойств частиц
    properties = {
        bgColor             : 'rgba(17, 17, 19, 1)', // черный
        particleColor       : 'rgba(170, 0, 255, 1)', // фиолетовый цвет частиц
        particleRadius      : 3, // радиус оурцжности частицы
        particleCount       : 60, // кличество частиц
        particleMaxVelocity : 0.5, // скорость частиц
        lineLength          : 150, // длина линии соеденияющая две частицы
        particleLife        : 6 // продолжительность жизни частицы

    };
    // добавляем в тэг <body> тэг <canvas>
    document.querySelector('body').appendChild(canvas);
    // получение длины и ширины экрана user
    window.onresize = function() {
        w = canvas.width = innerWidth,
        h = canvas.height = innerHeight;
    }
    // определения класса частиц и их характеристик
    class Particle{
        constructor(){
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            // скорость по Х 
            this.velocityX = Math.random() *(properties.particleMaxVelocity * 2 ) - properties.particleMaxVelocity;
            // скорость по Y
            this.velocityY = Math.random() *(properties.particleMaxVelocity * 2 ) - properties.particleMaxVelocity;
            // время жизни частицы = рандомн * время 6 сек * частоту кадров 60 
            this.life = Math.random() * properties.particleLife * 60;
        }   
        // положение частицы
        position() {
            // изменение направления движения частицы при достижении края экрана
            this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX <  0? this.velocityX *= -1 : this.velocityX;
            this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY <  0? this.velocityY *= -1 : this.velocityY;
        
            this.x += this.velocityX;
            this.y += this.velocityY;
        }
        // отрисовывает чстицы на canvas
        reDraw() {
            // начинаем рисование
            contex.beginPath();
            contex.arc(this.x, this.y, properties.particleRadius, 0, Math.PI*2);
            contex.closePath();
            // присваеваем цвет частицам
            contex.fillStyle = properties.particleColor;
            // заливаем
            contex.fill();
        }
        // отнимаем жизнь у частицы
        reCalculateLife() {
            if(this.life < 1) {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            // скорость по Х 
            this.velocityX = Math.random() *(properties.particleMaxVelocity * 2 ) - properties.particleMaxVelocity;
            // скорость по Y
            this.velocityY = Math.random() *(properties.particleMaxVelocity * 2 ) - properties.particleMaxVelocity;
            // время жизни частицы = рандомн * время 6 сек * частоту кадров 60 
            this.life = Math.random() * properties.particleLife * 60;
            }
            this.life--;
        }
    }

    // ф-я заливки фона
    function reDrawBackground() {
        // передаем цвет фона
        contex.fillStyle = properties.bgColor;
        // заливка прямоугольного окна
        contex.fillRect(0, 0, w, h);
    }

    // ф-я соединяющая частицы линиями
    function drawLines() {
        let x1, y1, x2, y2, length, opacity;
        // проверяем растояние до всех частиц в цикле
        for(let i in particles) {
            for(let j in particles) {
                // координаты первой частицы
                x1 = particles[i].x;
                y1 = particles[i].y;
                // координаты второй частицы
                x2 = particles[j].x;
                y2 = particles[j].y;
                // находим растояние по формуле диагонали  
                length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))

                if(length < properties.lineLength) { // если длина между двумя частицами меньше
                    // непрозрачность
                    // растояние делим на длину линии
                    // чем короче растояние, тем меньше значение opacity
                    opacity = 1 - length / properties.lineLength; 
                    // ширина линии
                    contex.lineWidth = '0.5';
                    // цвет линии
                    contex.strokeStyle = 'rgba(255, 0, 204, '+opacity+')';
                    // начинаемм контур
                    contex.beginPath();
                    // пердвигаем точку в координату 1
                    contex.moveTo(x1, y1);
                    // предвигаем точку в координату 2
                    contex.lineTo(x2, y2);
                    // закрываем контур
                    contex.closePath();
                    // рисуем
                    contex.stroke();

                }

            }
        }
    }

    function reDrawParticles() {
        // проходимся в цикле по частицам
        for(let i in particles){
            // отнимаем жизнь у частиц
            particles[i].reCalculateLife();
            // позиция частиц
            particles[i].position()
            // рисуем частицы
            particles[i].reDraw();
        }
    }
    // ф-я цикл 
    function loop(){
        reDrawBackground();
        reDrawParticles();
        drawLines();
        requestAnimationFrame(loop);
    }

    function init() {
        // наполнение массива particles частицами 
        for (let i = 0; i < properties.particleCount; i++) {
            // доваление частицы в массив
            particles.push(new Particle);
        }
        loop(); // вызываем цикл
    }

    init();

}());