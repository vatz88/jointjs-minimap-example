var scale = 0.2;

// hard coded for the purpose of example
var minimapNavigatorPosition = {
  minX: 66,
  minY: 587,
  maxX: 149,
  maxY: 670,
};

var minimapPaper = new joint.dia.Paper({
  el: document.getElementById('minimap-paper'),
  model: graph,
  width: config.paeprWidth * scale,
  height: config.paperHeight * scale,
  gridSize: 1
});

minimapPaper.scale(scale);

// Add elements to graph
rect.addTo(graph);
rect2.addTo(graph);
link.addTo(graph);
rect3.addTo(graph);
rect4.addTo(graph);
link2.addTo(graph);

$('#minimap-container').height(config.paeprWidth * scale);
$('#minimap-container').width(config.paperHeight * scale);

// Set minimap navigator width, height
var containerWidthHeight = $('#container').width(); // height, width both are set to same in css
$('#minimap-navigator').width(containerWidthHeight * scale);
$('#minimap-navigator').height(containerWidthHeight * scale);

// Bind container scrolling
$('#container').scroll(function (e) {
  $('#minimap-navigator').css('top', minimapNavigatorPosition.minY + e.target.scrollTop * scale);
  $('#minimap-navigator').css('left', minimapNavigatorPosition.minX + e.target.scrollLeft * scale);
});

// Bind minimap navigator drag
var dragFlag = false;
var x = 0;
var y = 0;
$('#minimap-navigator').mousedown(function (e) {
  dragFlag = true;
  x = $(this).offset().left - e.clientX;
  y = $(this).offset().top - e.clientY;
});
$('#minimap-navigator').mouseup(function () {
  dragFlag = false;
});
$('#minimap-container').mouseleave(function () {
  dragFlag = false;
});
$('#minimap-navigator').mousemove(function (e) {
  if (dragFlag) {
    var newY = e.clientY + y;
    var newX = e.clientX + x;
    if (minimapNavigatorPosition.minY > newY) {
      newY = minimapNavigatorPosition.minY;
    }
    if (minimapNavigatorPosition.minX > newX) {
      newX = minimapNavigatorPosition.minX;
    }
    if (minimapNavigatorPosition.maxY < newY) {
      newY = minimapNavigatorPosition.maxY;
    }
    if (minimapNavigatorPosition.maxX < newX) {
      newX = minimapNavigatorPosition.maxX;
    }
    $('#minimap-navigator').css('top', newY);
    $('#minimap-navigator').css('left', newX);

    $('#container').scrollLeft((newX - minimapNavigatorPosition.minX) / scale);
    $('#container').scrollTop((newY - minimapNavigatorPosition.minY) / scale);
  }
});
