// namespace PUZZLE
var PUZZLE = (function (my) {


// class gui
my.gui = function () {

	this.items = [];					// array of all the items on the page (item objects)
	this.selectedItems = [];			// stored references to the selected items in GUI
	this.shiftDown = false;				// if the SHIFT key is down
	this.newPuzzleListShown = false;	// if the new puzzle list is shown

};


my.gui.prototype.initalise = function (a) {
	
	var gui = this;

	// ---------------------------------------------------
	// events
	// ---------------------------------------------------

	$("#cmbPageSize").change(function () {
		var s = this.options[this.selectedIndex].value;
		var o = $("#cmbPageOrientation")[0].options[$("#cmbPageOrientation")[0].selectedIndex].value;
		gui.setPageSize(s + o);
	});

	$('#cmbPageSize, #btnNewPuzzle, #cmbPageOrientation').mousedown(function () {
		Tipped.hideAll();
	});


	$("#cmbPageOrientation").change(function () {
		var s = $("#cmbPageSize")[0].options[$("#cmbPageSize")[0].selectedIndex].value;
		var o = this.options[this.selectedIndex].value;
		gui.setPageSize(s + o);
	});

	$("#btnRefresh").mousedown(function () {
		// regenerate whatever is currently selected

		for (var i = 0; i < gui.selectedItems.length; i++) {
			if (gui.selectedItems[i].generate === undefined) return false; // check if item has generate() method
			gui.selectedItems[i].generate();
		}

	});

	$("#btnShowSolution").mousedown(function () {
		// toggle solution visibility for selected items

		var show = !($(this).hasClass('checked'));

		for (i = 0; i < u.selectedItems.length; i++) {
			var si = u.selectedItems[i]
			si.solution_visible = show;
			si.gui_showHideSolution();
		}

		//console.log('visibility: ' + u.items[0].solution_visible + ',' + u.items[1].solution_visible );

		if(show) {
			$("#btnShowSolution").addClass('checked');
			$('#btnShowSolution span img').attr("src","img/btn_tick_on.svg");
		} else {
			$("#btnShowSolution").removeClass('checked');
			$('#btnShowSolution span img').attr("src","img/btn_tick_off.svg");
		}

	});


	$("#btnDelete").mousedown(function () {
		for (var i = 0; i < gui.selectedItems.length; i++) {
			gui.deleteItem(gui.selectedItems[i]);
		}
	});

	$("#btnPrint").mousedown(function () {
		window.print();
	});


	// unselect all items when click on page
	$("#print_div, #page_wrapper").mousedown(function () {
		if (!gui.shiftDown) { gui.unSelectAllItems(); }
	});


	// unselect all items when click on page
	$("#btnNewPuzzle").mousedown(function () {
		if (!gui.newPuzzleListShown) {
			gui.showNewPuzzlePopdown();
		} else {
			gui.hideNewPuzzlePopdown();
		}
		event.stopPropagation(); 	// prevent a click event here from firing the global html click event
	});

	// hide the popdown when clicking on an item
	$("#newPuzzleList a").click(function () {
		gui.hideNewPuzzlePopdown();
	});

	$('#newPuzzlePopDown').mousedown(function(event){
	    event.stopPropagation(); 	// prevent a click event here from firing the global html click event
	});

	// global click events
	$('html').mousedown(function() {

		// hide new puzzle list if shown
		if (gui.newPuzzleListShown) {
			gui.hideNewPuzzlePopdown();
		}

	});


	// initalise tooltips
	// see: http://www.tippedjs.com/documentation/usage
	var tooltip_options = {size: 'x-small', hideOthers: true, fixed: true, target: 'mouse', position: 'bottomleft', stem: false, behavior: 'hide', hideDelay: 0, hideAfter: 0 }
	Tipped.create('.btn', null, tooltip_options);
	
	Tipped.hideAll = function (){
		$('.tpd-tooltip').css({display:'none'}); // hide any tooltips
	}

	// global key down events 
	$(document).on('keydown', function(e){
		
		// ESCAPE
		if (e.keyCode == 27) {
			// hide new puzzle list if shown
			if (gui.newPuzzleListShown) {
				gui.hideNewPuzzlePopdown();
			
			} else {
				gui.unSelectAllItems();
			}
		}

		// DEL
		if (e.keyCode == 46) {
			// get selected elements

			for (var i = 0; i < gui.selectedItems.length; i++) {
				gui.deleteItem(gui.selectedItems[i]);
			}

		}

	});

	// store the state of the SHIFT key
	$(document).on('keyup keydown', function(e){
		gui.shiftDown = e.shiftKey;
	});


	/*$("#chkSnapToGrid").click(function () {
		// toggle snap to grid
		if ( $(this).is(':checked') ) {
			$(".ctrl").draggable( "option", "grid", [5, 5]);
		} else {
			$(".ctrl").draggable( "option", "grid", false);
		}
	});*/


	// copyright
	$('#copyright').html('\u00A9 ' + new Date().getFullYear() + ' PuzzlePad.io');


	// begin initial setup:

	gui.unSelectAllItems();

	gui.setPageSize("A4P");


	// temp: build a test wordsearch puzzle
	var properties = {
		words: "dogmatic,dogmatic,dogmatic,dogmatic",
		width: 8,
		height: 8,
		directions: [1,1,1,1,1,1,1,1],
		fillRatio: .85,
		letterCase: 0,
		showGridLines: false,
		allowOverlappingWords: false,
		solution_visible: true,
		showBorder: false
	}
	gui.addWordSearch(properties);


	// temp: build a test wordsearch puzzle
	var properties = {
		words: "book, story, tale, fable, parable, allegory, legend, fantasy, ficiton, adventure",
		width: 10,
		height: 10,
		directions: [1,1,1,1,1,1,1,1],
		fillRatio: 0.85,
		letterCase: 1
	}
	gui.addWordSearch(properties);


	// temp: build a test wordsearch puzzle
	var properties = {
		words: 'Amalickiah,Zarahemla,Gadianton,Bountiful,Zedekiah,Benjamin,Zeezrom,Teancum,Pahoran,Ishmael,Helaman,Corihor,Cezoram,Zenoch,Zeniff,Sariah,Moroni,Mormon,Lemuel,Joseph,Hagoth,Amaron,Zoram,Zenos,Sidom,Omner,Nephi,Mulek,Laman,Laban,Jarom,Jacob,Isaac,Ether,Ammon,Abish,Shiz,Shem,Enos',
		width: 10,
		height: 10,
		directions: [1,1,1,1,1,1,1,1],
		fillRatio: 0.85,
		letterCase: 1,
		showGridLines: true
	}
	gui.addWordSearch(properties);


	// bind slider value and label together
	$('.range_slider_wrapper input[type=range]').on('input', function(){
      $(this).prev().prev().html(this.value);
   });
   $('.range_slider_wrapper .range_label').each(function(){
      $(this).html($(this).next().next().val());
   });

   // initalise modal
	$("a[rel*=leanModal]").leanModal({
		top : 100, 
		overlay : 0, 
		closeButton: ".modal_close"
	});


	// initalise tags
	var taggle = new Taggle('word_list', {
		allowDuplicates: true,
    	placeholder: "Type a word and press enter...",
    	submitKeys: [188,9,13], // COMMA, TAB, ENTER, SPACE
    	saveOnBlur: true,

    	onBeforeTagAdd: function (event, s) {
    		// determine if word is valid before adding

    		// remove any character that is not a letter or number
			s = s.replace(/[^0-9a-zA-Z]+/g, "");

			if (s != "" && s.length < 3) {
				//alert("Words must be 3 or more characters.");
				return false;
			} else if (s == "") {
				//alert("This is not a valid word.");
				return false;
			} else if (PUZZLE.badwords.indexOf(s) > 0) {
				// bad word!
				return false;
			}

   	},

    	tagFormatter: function (li) {
    		// remove any invalid chars
    		// remove any dodgy words
    		var s = $(li).children('.taggle_text').html()

    		// remove any character that is not a word, number, comma, or new line
			s = s.replace(/[^0-9a-zA-Z\s]+/g, "");
			s = s.toLowerCase();

			$(li).children('.taggle_text').html(s);
   	}
	}); 

	taggle.add(['kangaroo', 'wallaby', 'dingo', 'possum', 'emu', 'koala']);

	$('#cmbAppearance').mousedown(function () {
		$(this).next().css({display:'block'});

		return false; // return false so the dropdown is not shown
	});
	
};

my.gui.prototype.deleteItem = function (item) {

	var gui = this;

	// remove item from page (DOM)
	$(item.div).remove();

	gui.items.splice(item.id, 1); // remove item from array

	gui.unSelectAllItems();

}


// set the page size 
// works by assigning the correct class, and the CSS does the rest.
my.gui.prototype.setPageSize = function (size) {
	console.log(size);

	$('#page_wrapper').removeClass(); // remove all classes
	$('#page_wrapper').addClass("noselect");

	if (size == "A4P") {
		$('#page_wrapper').addClass("pA4P");
		cssPagedMedia.size('portrait');
		$("#cmbPageOrientation").val("P");
		$("#cmbPageSize").val("A4");

	} else if (size == "A4L") {
		$('#page_wrapper').addClass("pA4L");
		cssPagedMedia.size('landscape');
		$("#cmbPageOrientation").val("L");
		$("#cmbPageSize").val("A4");
	
	} else if (size == "A5P") {
		$('#page_wrapper').addClass("pA5P");
		cssPagedMedia.size('portrait');
		$("#cmbPageOrientation").val("P");
		$("#cmbPageSize").val("A5");
	
	} else if (size == "A5L") {
		$('#page_wrapper').addClass("pA5L");
		cssPagedMedia.size('landscape');
		$("#cmbPageOrientation").val("L");
		$("#cmbPageSize").val("A5");
	}
}


my.gui.prototype.addWordSearch = function (a) {
	var gui = this;

	// create new wordsearch puzzle
	var p = new PUZZLE.wordSearch(this.items.length)

	// store ref to the puzzle
	gui.items.push(p);

	// set properties of the new puzzle
	p.setWords(a.words);
	p.setGrid(a.width, a.height, a.fillRatio);
	p.setAllowedDirections(a.directions)

	// assign the remainder properties to the new puzzle
	Object.keys(a).forEach(function(key,index) {    
		switch (key) {
			case 'showGridLines':
			case 'showBorder':
			case 'letterCase':
			case 'allowOffensiveWords':
			case 'allowOverlappingWords':
			case 'solution_visible':
				if (typeof a[key] !== 'undefined') {
					p[key] = a[key];
				}
		}
	});


	// generate puzzle
	p.generate();

	// set mouse down event
	$(p.div).mousedown(function () {
		//console.log(this);
		gui.item_mouseClick(this, p, event);
	});

	// set mouse down event
	$(p.div).dblclick(function () {
		//console.log(this);
		$("#btnSettings").click();
	});

	// allow to be dragged
	$(p.div).draggable({ containment: "#print_div", scroll: true, grid: [5,5] });

	// allow to be resized
	$(p.div).resizable({ containment: "#print_div", minWidth: 80, handles: "n, e, s, w", aspectRatio: true, grid: 5 });

	// select item
	gui.item_mouseClick(p.div, p, event)

	return p
}

my.gui.prototype.item_mouseClick = function (el, p, event) {
	var gui = this;

	// if not holding down shift, clear what was already selected
	if (!gui.shiftDown) { gui.unSelectAllItems(); }

	$(el).addClass("sel");

	gui.selectedItems.push(p);

	gui.displayMenu(p);

	gui.setCheck_btnShowSolution();

	event.stopPropagation();
}

my.gui.prototype.setCheck_btnShowSolution = function () {
	var gui = this;

	var c_on = false;
	var c_off = false;

	for (i = 0; i < gui.selectedItems.length; i++) {
		si = gui.selectedItems[i];
		
		if (si.solution_visible) {
			c_on = true;
		}
		if (!si.solution_visible) {
			c_off = true;
		}
	}

	if (c_on && c_off) {
		$('#btnShowSolution').addClass('checked');
		$('#btnShowSolution span img').attr("src","img/btn_tick_on.svg");
		console.log('multi');
	} else if (c_on) {
		$('#btnShowSolution').addClass('checked');
		$('#btnShowSolution span img').attr("src","img/btn_tick_on.svg");
		console.log('on');
	} else if (c_off) {
		$('#btnShowSolution').removeClass('checked');
		$('#btnShowSolution span img').attr("src","img/btn_tick_off.svg");
		console.log('off');
	}

}



my.gui.prototype.addText = function (text) {
	var i = new PUZZLE.text(this.items.length, text)
	this.items.push(i);
	return i
}

my.gui.prototype.showNewPuzzlePopdown = function (text) {
	$("#newPuzzlePopDown").css("top", "40px");
	$("#txtNewPuzzleSearch").focus();
	this.newPuzzleListShown = true;
}

my.gui.prototype.hideNewPuzzlePopdown = function (text) {
	$("#newPuzzlePopDown").css("top","-200px");
	this.newPuzzleListShown = false;
}

my.gui.prototype.unSelectAllItems = function () {
	var gui = this;

	// remove styling from selected items
	$(".sel").each(function () {
		$(this).removeClass("sel");
	});

	// clear selected items
	gui.selectedItems.length = 0;

	// select page
	$("#print_div").addClass("sel");
	gui.displayMenu($("#print_div")[0]);

}



// toggle menu items depending on what is selected
my.gui.prototype.displayMenu = function (el) {

	//console.log("display menu for: " + el.tagName);

	// hide everything
	$(".menuGroup").each(function () {
		$(this).css("display", "none");
	});

	// wordSearch
	if (el.tagName == "puzzle.ws") {
		$("#mg03").css("display", "inline-block");
		//$("#lblEditName").html("Word Search Puzzle Options:");
	}

	// wordSearch
	if (el.tagName == "DIV") {
		$("#mg02").css("display", "inline-block");
		//$("#lblEditName").html("Word Search Puzzle Options:");
	}

	$("#mg01").css("display", "inline-block");

}



return my;
}(PUZZLE || {}));