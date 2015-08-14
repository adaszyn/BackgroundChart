# BackgroundChart
Small library generating svg-based background for elements
##Installation
This small library comes in two versions. 
* Angularjs directive
	To be implemented.
* standalone library

	Add javascript file "background-chart.js" into your document. It does not require jQuery nor any other dependency.
	You can download it directly from this repository by:
	```bash
git clone https://github.com/wojciechAdaszynski/BackgroundChart.git
	```

	or with bower: 
	```bash
bower install https://github.com/wojciechAdaszynski/BackgroundChart.git --save
	```
	

## Usage

Create **BackgroundChart** object in your code:

	```javascript
	var bc = new BackgroundChart("container_id", args);
	```

	where:

	*args* - configuration for chart

	*container_id* - id of the element to be modified

## Contribution