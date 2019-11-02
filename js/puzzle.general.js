// ---------------------------------------------------
// function to round a number, since Javascript doesnt have this out of the box
// ---------------------------------------------------
Number.prototype.round = function(decimals = 0) {
    return +((this).toFixed(2));
}


// ---------------------------------------------------
// function to set the page media:
// source: http://stackoverflow.com/questions/11160260/can-javascript-change-the-value-of-page-css
// usage: cssPagedMedia.size('landscape');
// ---------------------------------------------------
var cssPagedMedia = (function () {
    var style = document.createElement('style');
    document.head.appendChild(style);
    return function (rule) {
        style.innerHTML = rule;
    };
}());

cssPagedMedia.size = function (size) {
    cssPagedMedia('@page {size: ' + size + '}');
};
