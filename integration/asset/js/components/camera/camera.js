class Camera{
    constructor(player, canavsSize)
    {
        this.player = player;
        this.canvas = {
            width: canavsSize.width,
            height: canavsSize.height
        }
        this.imgSrc = "asset/img/field.png"
        this.img = new Image();
        
        this.x = 0;
        this.y = 0;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.scaleFactor = 2;
        this.offsetX = -(CANVAS_SIZE.width / 4);
        this.offsetY = -(CANVAS_SIZE.height / 4);
    };

    setup(img){
        this.img.src = img;
    }

    draw(mapSize){
        CTX.scale(this.scaleFactor, this.scaleFactor);
        CTX.translate(this.offsetX, this.offsetY);
        CTX.translate(-this.x, -this.y);
        CTX.drawImage(this.img, 0,0, mapSize.width, mapSize.height);
    }

    update(){
        this.x = this.player.x - this.centerX;
        this.y = this.player.y - this.centerY;  
    }
}
