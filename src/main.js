var Pixi = require ("pixi.js");

var w = 500;
var h = 500;

var lines = [];

function init ()
{
    console.log ("hello world");

    this._renderer = new Pixi.WebGLRenderer (w, h);
    
    document.body.appendChild (this._renderer.view);
    this._stage = new Pixi.Container ();

    for(var i = 0; i<w; ++i)
    {
        var line = new Pixi.Graphics ();
        line.lineStyle (1, 0x00ff00, 0.1 + (i/w) );
        line.moveTo (0, h);
        line.lineTo (0,h - i * (h / w));
        line.x = i;
        lines.push (line);
    }
    
    shuffle.call (this);

    bubbleSort.call (this);
}

function bubbleSort ()
{
    var sorted = true;

    for(var i = 0; i<w-1; ++i)
    {
        if (lines[i].height > lines[i+1].height)
        {
            t = lines [i];
            lines[i] = lines [i+1];
            lines[i].x = i;
            lines[i+1] = t;
            lines[i+1].x = i+1;

            sorted = false;
        }
    }
    
    if(!sorted){
        setTimeout (bubbleSort.bind (this), 10);
    }
    else{
        console.log ("done!");
    }
}

function shuffle ()
{
    var shuffled = [];
    while (lines.length)
    {
        var l = lines.splice (Math.floor (Math.random() * lines.length), 1) [0];
        shuffled.push (l);
        this._stage.addChild (l);
        l.x = shuffled.length - 1;
    }    

    lines = shuffled;
    shuffled = null; 
}

window.onload = function ()
{
    init ();

    requestAnimationFrame (update);
};

function update ()
{
    

    this._renderer.render (this._stage);

    requestAnimationFrame (update);
}