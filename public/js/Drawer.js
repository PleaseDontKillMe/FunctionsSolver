
function Drawer() {

    this.draw = drawGraphAndAxes;
    this.useCanvas = useCanvas;

    var
        offset = {x: 0, y: 0},
        scale,  // number of pixels from x=0 to x=1
        showAxis = true,
        center = {x: 0, y:0},
        canvas = null,
        ctx = null
    ;

    function useCanvas(canvasId) {
        canvas = document.getElementById(canvasId);
        ctx = canvas.getContext("2d");

        offset.x = center.x = .5 + .5 * canvas.width;
        offset.y = center.y = .5 + .5 * canvas.height;
    }

    function drawGraphAndAxes(func) {

        clearCanvas();
        autoAdjustScale(func);
        showAxis && drawAxes();
        drawGraph(func, "rgb(11,153,11)", 1);
    }

    function clearCanvas() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function autoAdjustScale(func) {

        var q = -func.b/(2*func.a),
            p = func.valueOf(q);

        var length = new Vector(q, p).length();

        scale =  80/length;
    }


    function move(x, y) {
        ctx.moveTo(x, y);
    }
    function line(x, y) {
        ctx.lineTo(x , y);
    }
    function drawAxes() {
        var arrowLength = 7;

        ctx.beginPath();
        ctx.strokeStyle = "rgb(128,128,128)";

        move(0, offset.y);
        line(canvas.width, offset.y);  // X axis
        move(offset.x, 0);
        line(offset.x, canvas.height );  // Y axis

        // draw up headed arrow
        move(offset.x - arrowLength,  arrowLength);
        line(offset.x, 0);
        line(offset.x + arrowLength,  arrowLength);

        // draw right headed arrow
        move(canvas.width - arrowLength, offset.y - arrowLength);
        line(canvas.width, offset.y);
        line(canvas.width - arrowLength, offset.y + arrowLength);


        var tickWidth = 3;
        var inc = 20;

       // console.log(scale + "/" + 20/scale + " = " + inc);
        for (var i = 0; i < center.x*2; i += inc)
        {
            move(offset.x + i, offset.y - tickWidth);
            line(offset.x + i, offset.y + tickWidth);

            move(offset.x - i, offset.y - tickWidth);
            line(offset.x - i, offset.y + tickWidth);
        }

        for (var j = 0; j < center.y*2 - scale; j += inc)
        {
            move(offset.x + tickWidth, offset.y - j);
            line(offset.x - tickWidth, offset.y - j);

            move(offset.x + tickWidth, offset.y + j);
            line(offset.x - tickWidth, offset.y + j);
        }

        ctx.stroke();
    }

    function drawGraph(func, color, thick) {
        var horizontalStep = 4;
        var range = {
            min: Math.round((-offset.x) / horizontalStep),
            max: Math.round((ctx.canvas.width - offset.x) / horizontalStep)
        };

        ctx.beginPath();
        ctx.lineWidth = thick;
        ctx.strokeStyle = color;

        for (var i = range.min; i <= range.max; i++) {
            var x = i * horizontalStep;
            var y = scale * func.valueOf(x / scale);

            if (i == range.min) {
                move(offset.x + x, offset.y - y);
                continue;
            }
            line(offset.x + x, offset.y - y);
        }
        ctx.stroke();
    }

}
