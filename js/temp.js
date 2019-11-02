var cell_w = 50;
var cell_h = 40;
var w = 8; // number of cells wide

var c = 16; // cell index (0-based)


var y = Math.floor(c/w) * cell_h;
var x = (c%w) * cell_w;
document.getElementById("demo").innerHTML = "[" + x + "," + y + "]";


https://www.w3schools.com/js/tryit.asp?filename=tryjs_oper_mod