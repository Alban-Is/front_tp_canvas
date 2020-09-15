class circle{
    constructor(x,y,r,color){
        this.x = x
        this.y = y
        this.r = r
        this.color = color
    }
}
class canvasEditor {
    constructor(canvasId) {
        var canvas = document.getElementById(canvasId)
        this.w = canvas.width;
        this.h = canvas.height;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas
        this.tool = "circle"
        this.save_btn = document.getElementById('btn_save')
        this.delete_btn = document.getElementById('btn_delete')
        this.load_btn = document.getElementById('btn_load')
        this.saveData = []
    }

    getMouseClick() {
        //console.dir(this.canvas)
        this.initialH = this.canvas.offsetTop
        this.initialW = this.canvas.offsetLeft

        var current = this
        this.canvas.addEventListener('click', event => {
            let pos = current.showCoords(event, this.initialW, this.initialH)
            console.log(pos)
            if (current.tool == "circle") {
                current.drawCircle(pos.x, pos.y)
            }
        })
    }
    showCoords(event, ix, iy) {
        var x = event.clientX;
        var y = event.clientY;
        var pos = {
            'x': x - ix,
            'y': y - iy
        }
        return (pos)
    }

    drawCircle(x, y,r = null,color = null) {

        //set var
        if(!r) var r = getRandomInt(10,100);
        if(!color) var color = getRandomColor();
        //draw the circle
        this.ctx.fillStyle = color
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.fill();
        //save data
        var currentCircle = new circle(x,y,r,color)
        this.saveData.push(currentCircle)
        console.log(this.saveData)

    }

    clearCanvas(){
        this.ctx.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
    }

    save(){
        this.save_btn.addEventListener('click',event=>{
            console.log('save')
            sessionStorage.setItem('data',JSON.stringify(this.saveData));
        })
    }
    load(){
        this.load_btn.addEventListener('click',event=>{
            console.log('load')
            const loadData = JSON.parse(sessionStorage.getItem('data'));
            console.log(loadData)
            this.clearCanvas()
            for (const key in loadData) {
                if (loadData.hasOwnProperty(key)) {
                    const element = loadData[key];
                    console.log(element)
                    this.drawCircle(element.x,element.y,element.r,element.color)
                }
            }
        })
    }

    hud(){
        canvasEditor_obj.save()
        canvasEditor_obj.delete()
        canvasEditor_obj.load()
    }

    delete(){
        this.delete_btn.addEventListener('click',event=>{
            console.log('delete')
            this.saveData = []
            this.clearCanvas()
        })
    }
}


//----------------------------------------------------------------------------------
//----- GENERAL FUNCTION -----------------------------------------------------------
//----------------------------------------------------------------------------------

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function getRandomInt(min,max) {
    return Math.floor(Math.random() * Math.floor(max)) + min;
}

//----------------------------------------------------------------------------------
//----- USE ------------------------------------------------------------------------
//----------------------------------------------------------------------------------

var canvasEditor_obj = new canvasEditor('canvas')
canvasEditor_obj.getMouseClick()
canvasEditor_obj.hud()
