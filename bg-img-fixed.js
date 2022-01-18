(function(){
	var height_client = 0, width_client = 0;
	var breakpoint_list = document.getElementsByClassName("bg-img-fixed-breakpoint");
	var breakpoint_list_length=breakpoint_list.length;
	var resize_wrapper_list = document.getElementsByClassName("resize-wrapper");
	if( resize_wrapper_list.length != 1+breakpoint_list_length ){
		console.error("Number of resize_wrapper != 1 + Number of bg-img-fixed-breakpoint");
	}
	var breakpoints_offsetTop = Array(breakpoint_list_length+1);
	breakpoints_offsetTop[0]=0;

	function update_height_width_offsetTop(){	
		if( document.documentElement.clientHeight != height_client || document.documentElement.clientWidth != width_client ){
			height_client = document.documentElement.clientHeight;
			width_client = document.documentElement.clientWidth;
			for (var i = 0; i < breakpoint_list_length; i++) {
				breakpoints_offsetTop[i+1] = breakpoint_list[i].offsetTop + breakpoint_list[i].clientHeight/2 ;
			}
		};
		return true;
	};

	function execute_resize_wrapper(){
		var scroll_y = window.scrollY;
		for (var i = 0; i < breakpoint_list_length; i++) {
			if( breakpoints_offsetTop[i] - height_client <= scroll_y && scroll_y <= breakpoints_offsetTop[i+1] ) {
				resize_wrapper_list[i].style.display = 'block';
				resize_wrapper_list[i].style.height = (breakpoints_offsetTop[i+1] - scroll_y) + 'px';
			} else {
				resize_wrapper_list[i].style.display = 'none';
			};
		}
		return true;
	};

	// call both functions once page is loaded
	update_height_width_offsetTop(); 
	execute_resize_wrapper();  
	// then listen to relevant events
	window.addEventListener('scroll', function(e) {
		execute_resize_wrapper();  
	}, true);
	window.addEventListener('touchmove', function(e) {
		execute_resize_wrapper();        
	}, true);
	window.addEventListener('resize', function(e) {
		update_height_width_offsetTop();
		execute_resize_wrapper();
	}, true);
})();
