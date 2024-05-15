class MovebaleObject {
    x = 120;
    y = 350;
    img;
    height = 150;
    width = 100;
    imageCache = {};

    loadeImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image"
        this.img.src = path;
    }

    loadeImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = path;
        });

    }

    moveRight() {
        console.log('Moving right')
    }

    moveLight() {

    }
}