// namespace PUZZLE
var PUZZLE = (function (my) {

// class wordsearch
my.text = function (id, t) {

	this.words = [];						// array of words
	this.grid = [];							// array of arrays
	this.grid_w = 0;						// width of square grid
	this.grid_h = 0;						// height of square grid
	this.offensiveWords = [];				// array of strings

	// settings:
	this.letterCase = 0;					// 0 = UPPERCASE, 1 = lowercase
			
	this.fillPercentage = 0.2;				// percent of grid that must contain random characters not from the words array
	
	this.allowOffensiveWords = true;			// prevent the creation of offensive words when filling the grid with random characters
	
	this.allowOverlappingWords = true;
	
	this.allowedDirections = new Array(8);	

	// appearence
	this.gridCellPadding = 10;				// pixels
	this.gridBorder = 1;
	this.gridLines = 0;

	// ----------------------------------------------------------

	// GUI properties
	this.div = document.createElement("div");
	this.sel = false;						// wether or not this item is selected

	// create the html wrapper in the gui
	var d = this.div;
	d.id = 'txt_' + id;
	d.style.fontSize = my.FontSize + "px";
	d.style.fontFamily = my.FontFamily + "px";
	d.innerHTML = t;
	document.getElementById("print_div").appendChild(d);

	// ---------------------------------------------------
	// events
	// ---------------------------------------------------

	// todo...
	// click (select)
	// resize (drag)

};

/*// return a random index from an array
my.text.prototype.setText = function (t) {
	return this.div.innerHTML = t;
}
*/


return my;
}(PUZZLE || {}));