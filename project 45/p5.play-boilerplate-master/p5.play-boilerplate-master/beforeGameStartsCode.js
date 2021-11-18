class Buttons {
    
    constructor(){
        this.access1 = createInput("")
        this.access1.position(300,350);
        this.access1.style('background', 'white');  

        this.button1 = createButton('play');
        this.button1.position(360,380);
        this.button1.style('background', 'lightgrey');    
    }

    display(){

        this.button1.mousePressed(() => {
            level = 1;
            this.button1.hide();
            this.access1.hide();
        });
        
    }
}