describe("BackgroundChart", function() {
	beforeEach(function() {
    	var container = document.createElement("div");
    	container.id = "container";
    	container.offsetHeight = 400;
    	container.offsetWidth = 200;
    	document.getElementById = function(id) {
    		switch (id) {
    			case "container":
    				return container;
    			default:
    				return null;
    		}
    	}
  	});

 	it("Throws exception when element is not present in the document.", function() {
 		expect(function() {
	 		var bc = new BackgroundChart('containerrrr', {points: [{x:1, y:2}]});	
 		}).toThrow(new Error("Element does not exist"));
 		
 	});
 });