class canvasEditor {
    constructor(canvasId) {
        var canvas = document.getElementById(canvasId)
        this.w = canvas.width;
        this.h = canvas.height;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas
        this.tool = "circle"
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

    drawCircle(x, y) {
        this.ctx.fillStyle = getRandomColor();
        this.ctx.beginPath();
        this.ctx.arc(x, y, getRandomInt(10,100), 0, 2 * Math.PI);
        this.ctx.fill();
    }
}

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

var canvasEditor_obj = new canvasEditor('canvas')
canvasEditor_obj.getMouseClick()