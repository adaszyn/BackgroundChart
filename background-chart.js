function BackgroundChart(id, args) {
	var W3_SVG_URL = "http://www.w3.org/2000/svg",
		height,
		width,
		transFunction,
		transPoints,
		container,
		points;
	container = document.getElementById(id);
	if (!container) {
		throw new Error("Element does not exist");
		return;
	}
	height = container.offsetHeight;
	width = container.offsetWidth;
	transPoints = [];
	

	this.points = args.points || undefined;
	this.style = args.style || {type: "line", fill: "none", opacity: 0.5, size: "1px"};
	function recalculatePoints(points, fun) {
		var arr = []; 
		points.forEach(function(elem) {
			arr.push(fun(elem));
		});
		return arr;
	}
	function getChildFigures(points, type) {
		switch (type) {
			case "line":
				var pathString, path;
				pathString = "M";
				pathString += this.points[0].x + "," + this.points[0].y;
				for ( var i = 1; i < points.length; i++ ) {
					pathString += ("L" + points[i].x + "," + points[i].y);  
				}
				pathString += ("L" + this.points[0].x + "," + this.points[this.points.length - 1].y);
				pathString += ("Z");
				path = document.createElementNS(W3_SVG_URL, 'path'); 
				// setting path styles
				path.setAttributeNS(null, 'fill', 'black');
				path.setAttributeNS(null, 'fill-opacity', '0');
				path.setAttributeNS(null, 'stroke', 'black');
				path.setAttributeNS(null, 'd', pathString);
				return [path];
			break;
			case "dots":
				var circles = [], circle;
				points.forEach(function(point) {
					circle = document.createElementNS(W3_SVG_URL, 'circle');
					circle.setAttributeNS(null, 'cx', point.x);
					circle.setAttributeNS(null, 'cy', point.y);
					circle.setAttributeNS(null, 'r', 5);
					circle.setAttributeNS(null, 'stroke', 'black');
					circle.setAttributeNS(null, 'stroke-width', '1');
					circles.push(circle);
				});
				return circles;
			break;
		}
	}
	function drawChart(points, container, type) {
		var svg, tempDiv, childFigures; 
		if (container === null)
			return;

		svg = document.createElementNS(W3_SVG_URL, "svg");
		svg.setAttribute('xmlns', W3_SVG_URL);
		svg.setAttribute('width', '100%');
		svg.setAttribute('height', '100%');
		svg.setAttribute('preserveAspectRatio', 'none');
		svg.setAttribute('viewBox', '0 0 ' + width + " " + height);
		childFigures = getChildFigures(points, 'dots');
		console.log("childfigs", childFigures);
		childFigures.forEach(function(elem) {
			svg.appendChild(elem);			
		});
		
		// tempDiv is used to get svg string representation
		tempDiv = document.createElement('div');
		tempDiv.appendChild(svg);

		var svgString = tempDiv.innerHTML.replace(/"/g, '\\"');
		container.style.background = "url('data:image/svg+xml;utf8,"+ svgString +"')";
		container.style.backgroundSize = "100% 100%";
	}

	function getTransformFunction(arr, width, height) {
		var minHeight, maxHeight, startDomain, endDomain, xDelta, yDelta;
		maxValue = arr.reduce(function(p, v){
			return (p.y > v.y ? p : v);
		}).y;
		minValue = arr.reduce(function(p, v){
			return (p.y < v.y ? p : v);
		}).y;
		startDomain = arr.reduce(function(p, v){
			return (p.x < v.x ? p : v);
		}).x;
		endDomain = arr.reduce(function(p, v){
			return (p.x > v.x ? p : v);
		}).x;
		xDelta = endDomain - startDomain;
		yDelta = maxValue - minValue;

		return function(point){
			var xStep, yStep;
			xStep = width / xDelta;
			yStep = height / yDelta;
			return {
				x: (point.x - startDomain) * xStep,
				y: (point.y - minValue) * yStep
			}
		}	
	}
	this.render = function render() {
		this.transFunction = getTransformFunction(this.points, width, height);
		transPoints = recalculatePoints(this.points, this.transFunction);
		drawChart(transPoints, container);
	}

}