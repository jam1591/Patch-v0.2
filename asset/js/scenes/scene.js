class Scene{
    constructor(data, members){
        this.size = {
            width: data.size.width,
            height: data.size.height
        };
        this.frames = 0;
        this.member = members;
        this.name = data.name;
        this.buffer = {
            top: data.buffer.top,
            sides: data.buffer.sides,
        }
        this.img = data.img;
    }

    setup()
    {
        this.addEventListeners();
        this.setup_variables();
        this.setup_members();
    }

    setup_variables() {
        this.frames = 0;
    }
    
    reset()
    {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.removeEventListeners();
    }
}