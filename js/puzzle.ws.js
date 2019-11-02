// namespace PUZZLE
var PUZZLE = (function (my) {

var gui = my.gui; // currently unused, but might need to refer to it??


// class wordsearch
my.wordSearch = function (id) {
	
	this.tagName = "puzzle.ws";
	this.id = id;							
	this.words = [];						// list of words
	this.words_pos = [];					// start and finish cell for each word
	this.grid = [];						// array of rows, each row being an array of cells
	this.grid_w = 0;						// width of square grid
	this.grid_h = 0;						// height of square grid


	// settings:
	this.letterCase = 0;								// 0 = UPPERCASE, 1 = lowercase
	this.fillPercentage = 0.2;						// percent of grid that must contain random characters not from the words array
	this.allowOffensiveWords = false;			// prevent the creation of offensive words when filling the grid with random characters
	this.allowOverlappingWords = true;
	this.allowedDirections = new Array(8);		
	this.solution_visible = false;				// indicates if the solution for this puzzle is visible

	// appearence
	this.cellPadding = 1;								// setting between 1-10
	this.showBorder = true;								// setting
	this.showGridLines = false;						// setting
	this.fontFamily = "Roboto Slab,sans-serif";	// setting
	this.cellWidth = 30;									// non-setting, pixels

	/*
		note: 
		
		change appearance like this:
		u.items[0].showBorder = true
		u.items[0].displaySVG()
	*/

	// ----------------------------------------------------------

	this.div = document.createElement("div");
	this.sel = false;									// indicates if this item selected

	// create the html wrapper in the gui
	var d = this.div;
	d.id = 'ws_' + id;
	d.setAttribute("class","ctrl resizeAspect"); 
	document.getElementById("print_div").appendChild(d);

	// create sel box inside div
	var selbox = document.createElement("div");
	selbox.setAttribute("class","selbox");
	d.appendChild(selbox);

	// create svg drawing inside div wrapper
	this.svg = SVG(d.id).size(0, 0);
	
};

// return a random index from an array
my.wordSearch.prototype.attr = function (s) {
	return "wordSearch";
}

// return a random index from an array
my.wordSearch.prototype.pickRanIndex = function (a) {
	return Math.floor(Math.random()*a.length);
}

// return True if the passed array is full
my.wordSearch.prototype.isArrayFull = function (a) {
	for (var i = 0; i < a.length; i++) {
		if (a[i] === undefined) return false;
	}
	return true;
}

my.wordSearch.prototype.setAllowedDirections = function (a) {
	for (var i = 0; i < a.length; i++) {
		if (a[i] != 1) {
			this.allowedDirections[i] = "^";
		} 
	}
}

my.wordSearch.prototype.setWords = function (s) {
	/*
		in: "SDssFs\ndf234#$_,,sds,"
		out: ["SDSSFS", "DF234", "SDS"]
	*/

	var a = this.words;

	// remove any character that is not a word, number, comma, or new line
	s = s.replace(/[^0-9a-zA-Z,\n]+/g, "");

	// replace new lines with commas
	s = s.replace(/\n/g, ",");

	// set letter case
	if (this.letterCase == 0) {
		s = s.toUpperCase();
	} else {
		s = s.toLowerCase();
	}

	// split string into array
	a = s.split(',');

	// trim spaces
	for (var i in a) {
		a[i] = a[i].trim();
	}

	// remove empty words
	var na = new Array();
	for (var i = 0; i < a.length; i++) {
		if (a[i] != ""){
			na.push(a[i]);
		}
	}
	a = na;

	// sort words from largest to smallest
	a.sort(function(a,b) {return b.length - a.length});

	this.words = a;

	// save the start and end positions of words to use when drawing svg
	for (i = 0; i < a.length; i++) {
		this.words_pos.push({word:a[i], start:0,end:0});
	}

	return a;
}

// initalise the grid array, auto resize if nessecary to contain words
my.wordSearch.prototype.setGrid = function (w = 0, h = 0, fillRatio = 0.85) {
	
	// nb: 0.85 is a nice fill ratio

	console.log({"call": "setGrid", "width": w, "height": h, "fillRatio": fillRatio});

	var lw = this.words[0].length; // get length of largest word
	var cc = this.getWordsCharCount();

	if (w < lw && h < lw) {
		// at least one word is too big to fit in grid dimensions
		// resize height to fit
		h = lw;
	
		console.log({"info": "gridresize - longest word won't fit", "newWidth": w, "newHeight": h});
	} 

	// disabled 11/2/2017 - no need to check this, as this would be corrected in fillratio step below 
	/*if (cc > w * h) {
		// total characters won't fit in grid
		// resize to fit
		var d = Math.ceil(Math.sqrt(cc))
		w = d;
		h = d;

		console.log({"info": "gridresize - number of characters won't fit", "newWidth": w, "newHeight": h});
	} */

	var currentFillRatio = this.getFillRatio(w, h);
	if (currentFillRatio > fillRatio) {
		// fill ratio is too high (too many words crammed in grid)
		// enlarge grid to roughly 85% fill ratio (or less)
		var d = Math.ceil(Math.sqrt(cc / (fillRatio * 100) * 100));

		// if one of the sides is already larger than d, then we need to calc the min length of other side
		if (w > d || h > d) {
			if (w > d) {
				h = Math.ceil((d*d) / w);
			} else {
				w = Math.ceil((d*d) / h);
			}

		} else {
			// make the new grid a square size that will satisfy fillRatio
			w = d;
			h = d;
		}

		console.log({"info": "gridresize - fill ratio too small", "oldFillRatio": currentFillRatio.round(2), "newFillRatio": fillRatio, "newWidth": w, "newHeight": h});
	}

	this.grid_w = w;
	this.grid_h = h;

	return {"width": w, "height": h};

}

// return the sum of all characters in the word list. The auto grid size is constrained by this.
my.wordSearch.prototype.getWordsCharCount = function () {
	var a = this.words;
	var cc = 0;
	for (var i = 0; i < a.length; i++) {
		cc += a[i].length;
	}
	return cc;
}

// calculate fill percentage
// nb: 50-85% is a good ratio
my.wordSearch.prototype.getFillRatio = function (w, h) {
	return this.getWordsCharCount() / (w * h);
}

my.wordSearch.prototype.fillEmptyCellsDot = function () {
	var a = this.grid;
	for (var i = 0; i < a.length; i++) {
		if( a[i] === undefined) {
			a[i] = ".";
		}
	}
}

my.wordSearch.prototype.fillEmptyCells = function () {
	var a = this.grid;
	for (var i = 0; i < a.length; i++) {
		if( a[i] === undefined) {

			if (this.letterCase == 0) {
				a[i] = this.getRandomWeightedCharacter_eng().toUpperCase();
			} else {
				a[i] = this.getRandomWeightedCharacter_eng().toLowerCase();
			}
		}
	}
}

// return one random character. Some characters have a higher chance.
my.wordSearch.prototype.getRandomWeightedCharacter_eng = function () {
	// data: http://norvig.com/mayzner.html
	// code: http://stackoverflow.com/a/11872928/737393
	
	var l = {};
	l["e"] = 12.49;
	l["t"] = 9.28;
	l["a"] = 8.04;
	l["o"] = 7.64;
	l["i"] = 7.57;
	l["n"] = 7.23;
	l["s"] = 6.51;
	l["r"] = 6.28;
	l["h"] = 5.05;
	l['l'] = 4.07;
	l["d"] = 3.82;
	l["c"] = 3.34;
	l["u"] = 2.73;
	l["m"] = 2.51;
	l["f"] = 2.40;
	l["p"] = 2.14;
	l["g"] = 1.87;
	l["w"] = 1.68;
	l["y"] = 1.66;
	l["b"] = 1.48;
	l["v"] = 1.05;
	l["k"] = 0.54;
	l["x"] = 0.23;
	l["j"] = 0.16;
	l["q"] = 0.12;
	l["z"] = 0.09;

	var s = 0;  // sum weight of all values
	for (var key in l) {
	    s += l[key];  
	}

	// gen random % ()
	var r = Math.floor(Math.random()*10000) / s;

	for (var key in l) {
		if (l.hasOwnProperty(key)) {
			r -= l[key];
			if (r <= 0) {
				return key;
			}
		}
	}
}


/*
======================================================================================
TEST RUNS:

// test
f = new wordsearch;
f.setWords("SDssFs\ndf234#$_,,sds,");
f.setGrid(1,1);

// test fill ratio resize:
f.setWords("ren,ben,fen")
f.setGrid(3,3);


// test 2
f = new wordsearch;
f.setWords("door,house,apartment,window");
f.setGrid(10,10);
f.generate();

======================================================================================
*/


my.wordSearch.prototype.generate = function () {
	console.log('generate:' + this.id);

	var w = this;
	var g;							// final grid
	var attempts = 0;				// number of brute force attempts to fit all words in the grid
	var gw = this.grid_w;
	var gh = this.grid_h;
	
	
	// ---------------------------------------------------------------------------
	// LOOP TRY CREATE PUZZLE:
	// loop up to 50 times trying to place the words randomly inside the grid, until they all fit.
	// ---------------------------------------------------------------------------
	while (attempts < 50) {
		
		attempts += 1;

		// initalise a blank grid
		g = new Array(gw * gh);
		
		var currentWordIndex = 0	// index of the current word we are trying to place
		var wordsPlaced = false;
		var directionTry;							// Holds markers ("^") that indicate if a direction has been tried for placement 
		var gridTry = new Array(gw * gh);			// Holds markers ("^") that indicate if a cell has been tried for placement 
		var mainLoopCount = 0; 						// LCV for main loop
		var ranDirection = 0;
		var badTryList = [];									// here we store the cells that we tried unsucessfully to place the word in		

		// ---------------------------------------------------------------------------
		// LOOP PLACE WORDS:
		// ---------------------------------------------------------------------------
		while (!w.isArrayFull(gridTry) && currentWordIndex < w.words.length ) {	 // loop while array is not full or there are still words left to place
			
			var wordTry = w.words[currentWordIndex];		// this is the current word we are trying to place
			
			var wordPlaced = false;								// indicates if we have successfuly place the word

			directionTry = new Array(8);		// reset

			// choose a random cell
			var randomCellTry = w.pickRanIndex(gridTry); 
			
			// check if cell has already been tried
			if (gridTry[randomCellTry] == '^') continue; // re-loop - pick another cell 
		
			// initially block out unusable directions
			for (var i = 0; i < w.allowedDirections.length; i++) {
				directionTry[i] = this.allowedDirections[i];
			}

			nextdir = true;

			// ---------------------------------------------------------------------------
			// LOOP TRY DIRECTION:
			// ---------------------------------------------------------------------------
			while (!w.isArrayFull(directionTry)) {
			//while (nextdir) {

				// choose a random direction
				ranDirection = w.pickRanIndex(directionTry);
	
				// check if direction has already been tried
				if (directionTry[ranDirection] == "^") continue;  //re-loop - pick another direction

				// ------------------------------------------------
				// Try to place the first letter of the current word, starting  at randomCellTry...
				// ------------------------------------------------

				// if the cell already has a character in it, check to see if we can place it 
				if (g[randomCellTry] !== undefined && (w.allowOverlappingWords && g[randomCellTry] != wordTry[0])) {
					// cannot be placed here - try another cell
					//wordPlaced = false;
					break;	
				}

				// ------------------------------------------------
				// First letter can be placed here, 
				// now see if the remaining letters can be placed from here going in ranDirection...
				// ------------------------------------------------
				
				var allCharsPlaced = true;

				var newCellIndex = randomCellTry;

				// record start cell
				w.words_pos[currentWordIndex].start = newCellIndex;
				//console.log('new cell index: ' + newCellIndex);

				// ---------------------------------------------------------------------------
				// LOOP TRY PLACING EACH CHARACTER:
				// ---------------------------------------------------------------------------
				for (var i = 1; i < wordTry.length; i++) {
				
					// ------------------------------------------------
					// Check to see if lastCellIndex is still inside the grid boundires
					//   - ie: Ensure the level word is to be placed on is the intended level
					//   - if level is wrong, letter has strayed off the edge of grid
					// ------------------------------------------------
					
					var lastCellIndex = newCellIndex

					// DETERMINE THE NEXT CELL TO PLACE LETTER IN, ACCORDING TO RANDIRECTION
					switch (ranDirection) {
						
						case 0: // Up
							newCellIndex = lastCellIndex - gw;
							break;
						
						case 1: // down
							newCellIndex = lastCellIndex + gw;
							break;
							
						case 2: // right
							newCellIndex = lastCellIndex + 1;
							break;
							
						case 3: // left
							newCellIndex = lastCellIndex - 1;
							break;
							
						case 4: // diagonal right up
							newCellIndex = (lastCellIndex - gw) + 1;
							break;
							
						case 5: // diagonal right down
							newCellIndex = (lastCellIndex + gw) + 1;
							break;
							
						case 6: // diagonal left up
							newCellIndex = (lastCellIndex - gw) - 1;
							break;
							
						case 7: // diagonal left down
							newCellIndex = (lastCellIndex + gw) - 1;
							break;
					}

					// ---------------------------------------------------------------------------
					// CALCULATE IF CHARACTER WILL FIT IN GRID:
					// ---------------------------------------------------------------------------

					// calc the row of the new cell
					var currentCellRow = Math.ceil((lastCellIndex+1) / gw );
					var currentAboveCellRow = Math.ceil((lastCellIndex+1) / gw ) - 1;
					var currentBelowCellRow = Math.ceil((lastCellIndex+1) / gw ) + 1;
					var NewCellRow = Math.ceil((newCellIndex+1) / gw );
					
					if (ranDirection == 0 || ranDirection == 4 || ranDirection == 6) { 			
						// next character will be going up a row

						if (currentAboveCellRow != NewCellRow || NewCellRow == 0) {
							// word ran off the top of grid
							allCharsPlaced = false;
							break;   
						}
						
					} else if (ranDirection == 1 || ranDirection == 5 || ranDirection == 7) {  
						// next character will be going down a row

						if (currentBelowCellRow != NewCellRow || NewCellRow > gh) {
							// word ran off the bottom of grid
							allCharsPlaced = false;
							break;  
						}
						
					} else { 																			
						// next character will be on the same row

						if (currentCellRow != NewCellRow) {
							// word ran off side of grid
							allCharsPlaced = false;
							break;
						}
					}
					
					// ------------------------------------------------
					// ------------------------------------------------
					
					// CHECK IF CHARACTER CANT BE PLACED 
					if (g[newCellIndex] !== undefined && g[newCellIndex] != wordTry[i]) {
						// cannot be placed here
						allCharsPlaced = false;
						break;
					}
					
					// if we reach here without breaking then this character can be placed!

					//if (i == wordTry.length - 1) {
						w.words_pos[currentWordIndex].end = newCellIndex;
					//}

				} // LOOP TRY PLACING NEXT LETTER
				

				if (allCharsPlaced) { 
					// Check if there is an identical word in this exact same spot
					for (var i = 0; i < w.words_pos.length; i++) {
						if (currentWordIndex != i) {
							if (wordTry == w.words_pos[i].word && 
								w.words_pos[currentWordIndex].end == w.words_pos[i].end && 
								w.words_pos[currentWordIndex].start == w.words_pos[i].start) {
								allCharsPlaced = false;
								break;
							}
						}
					}
				}

				// check result of try placement
				if (allCharsPlaced) { 

					// ---------------------------------------
					// ACTUALLY PLACE THE WORD IN THE GRID NOW
					// ---------------------------------------
					
					newCellIndex = randomCellTry;
					
					for (var i = 0; i < wordTry.length; i++) {
						
						// place letter
						g[newCellIndex] = wordTry[i]
						
						

						// Determine the next cell to place letter in, according to ranDirection
						switch (ranDirection) {
							
							case 0: // Up
								newCellIndex = newCellIndex - gw;
								break;
							
							case 1: // down
								newCellIndex = newCellIndex + gw;
								break;
								
							case 2: // right
								newCellIndex = newCellIndex + 1;
								break;
								
							case 3: // left
								newCellIndex = newCellIndex - 1;
								break;
								
							case 4: // diagonal right up
								newCellIndex = (newCellIndex - gw) + 1;
								break;
								
							case 5: // diagonal right down
								newCellIndex = (newCellIndex + gw) + 1;
								break;
								
							case 6: // diagonal left up
								newCellIndex = (newCellIndex - gw) - 1;
								break;
								
							case 7: // diagonal left down
								newCellIndex = (newCellIndex + gw) - 1;
								break;
						}
					}
					
					// word was placed successfully
					console.log({"placed":  w.words[currentWordIndex], "badTryCells":badTryList, "cell": randomCellTry, "direction": ranDirection});

					// move onto next word
					currentWordIndex +=1;

					wordPlaced = true;				
					
					break;
					
				} else {
					// mark direction as being tried
					directionTry[ranDirection] = "^";
					//console.log("tried direction: " + ranDirection);
					
				}
			
				nextdir = false;

			} // LOOP TRY DIRECTION
			
			// check if word has NOT been placed
			if (!wordPlaced) {
				// mark cell as being tried
				gridTry[randomCellTry] = "^"  
				badTryList.push(randomCellTry);
				//console.log("tried cell: " + randomCellTry);
				w.words_pos[currentWordIndex].start = null;
				w.words_pos[currentWordIndex].end = null;

			} else {
				badTryList = []; // reset
			}

		} //LOOP PLACE WORDS

		// check all words have been placed
		if (currentWordIndex = w.words.length && wordPlaced) {
			
			wordsPlaced = true;

			this.grid = g;

			this.fillEmptyCellsDot();

			this.displaySVG()

			break;
		} else {

			// unsuccessful - try to create puzzle again
			console.log("try build puzzle again :(")
		}

		

	} // LOOP TRY CREATE PUZZLE
	
	console.log({"result": wordsPlaced, "attempts": attempts, "grid": g});
	return {"result": wordsPlaced, "attempts": attempts, "grid": g};

}


/*my.wordSearch.prototype.displayHTML = function () {
	
	p = document.getElementById("htmlgridwrapper");
	a = this.grid;
	var html = "";
	var c = 0;

	p.style.width = (32 * this.grid_w) + "px";
	p.style.height = (32 * this.grid_h) + "px";


	html += "<table class='table_grid noselect'>"
	for (var i = 0; i < this.grid_h; i++) {
		html += "<tr>";

		for (var j = 0; j < this.grid_w; j++) {
			html += "<td>" + this.grid[c] + "</td>"
			c +=1;
		}

		html += "</tr>";
	}
	html += "</table>"

	p.innerHTML = html;
}*/


my.wordSearch.prototype.displaySVG = function () {

	var w = this;
	var c_width = w.cellWidth;
	var c_grid_w = (c_width * w.grid_w) - 1;
	var c_grid_h = (c_width * w.grid_h) - 1;
	w.temp = c_grid_w;

	var draw = w.svg;

	var current_cell = 0;

	// initalise drawing
	draw.clear();
	draw.addClass("grid");
	draw.width('100%').height('100%');

	// set width for the first time
	if (w.div.style.width == "") {
		w.div.style.width = (c_grid_w + 1) + 'px';
		w.div.style.height = (c_grid_h + 1) + 'px';
	}

	//$(selbox).css({'width':})

	draw.viewbox(0, 0, c_grid_w + 1, c_grid_h + 1) ;

	// loop over rows
	for (var i = 0; i < w.grid_h; i++) {
		var y_pos = i * c_width;

		for (var j = 0; j < w.grid_w; j++) {
			var x_pos = j * c_width; 


			if (w.showGridLines) {
				// draw SVG
				var rect = draw.rect(c_width, c_width).attr({
					x: x_pos, 
					y: y_pos,
					fill: '#fff',
					stroke: '#000',
					'vector-effect': "non-scaling-stroke",
					'shape-rendering': "crispEdges",
					'stroke-width': 1});
			}



			var x_text_pos =  x_pos + (c_width / 2);
			var y_text_pos =  y_pos + (c_width / 2);

			var font_size = 15 + w.cellPadding;

			// draw character
			var text = draw.plain(w.grid[current_cell])
					.x(x_text_pos)
					.y(y_pos  + 1 +  (font_size * .47 ) ).attr('text-anchor','middle').attr('ty_t_pos',y_pos)

					.font({
						family: w.fontFamily,
						size: font_size
					});

			current_cell+=1;

		}

	}

	if (w.showBorder) {
		var rect = draw.rect(c_grid_w, c_grid_h).attr({
					x: 0, 
					y: 0,
					fill: 'transparent',
					stroke: '#000',
					'vector-effect': "non-scaling-stroke",
					'shape-rendering': "crispEdges",
					'stroke-width': 1});
	}

	
	// loop over each word and draw the solution
	for (i = 0; i < w.words_pos.length; i++) {
		var pos_start = w.calcCellXYPos(w.words_pos[i].start);
		var pos_end = w.calcCellXYPos(w.words_pos[i].end);

		// draw line
		var line = draw.line(
				pos_start['x'], 
				pos_start['y'], 
				pos_end['x'], 
				pos_end['y']
			).stroke({ width: 8, color:'#e06ebd', linecap:'round'}).style({opacity: 0.5}).addClass('solution');

		if (!w.solution_visible) {
			line.addClass('hide');
		}
	}

	//w.svg = draw; // store ref
}



// return a random index from an array
my.wordSearch.prototype.calcCellXYPos = function (cell_index) {
	var w = this;
	var c_width = w.cellWidth; // nb: atm cell width == cell height

	// calc y position
	var y = Math.floor(cell_index/w.grid_w) * w.cellWidth + (w.cellWidth / 2);

	// calc x position
	var x = (cell_index%w.grid_w) * w.cellWidth + (w.cellWidth / 2); 

	return {x: x, y: y};
}


// return a random index from an array
my.wordSearch.prototype.gui_showHideSolution = function () {
	var w = this;

	// show or hide all the solution lines
	if (w.solution_visible) {
		$('#' + w.div.id + ' .solution').each(function( ) {
			$(this).removeClass('hide');
			console.log('show');
		});
	} else {
		$('#' + w.div.id + ' .solution').each(function( ) {
			$(this).addClass('hide');
			console.log('hide');
		});
	}
}








return my;
}(PUZZLE || {}));