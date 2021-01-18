"use strict";
var $j=jQuery.noConflict();
var toggle_sidebar = false,
	toggle_quick_sidebar = false,
	toggle_topbar = false,
	minimize_sidebar = false,
	toggle_page_sidebar = false,
	toggle_overlay_sidebar = false,
	nav_open = 0,
	quick_sidebar_open = 0,
	topbar_open = 0,
	mini_sidebar = 0,
	page_sidebar_open = 0,
    overlay_sidebar_open = 0;
    
$j(document).ready(function(){
    var scrollbarDashboard = $j('.sidebar .scrollbar');
	if (scrollbarDashboard.length > 0) {
		scrollbarDashboard.scrollbar();
    }
    

    if(!toggle_sidebar) {
		var toggle = $j('.sidenav-toggler');

		toggle.on('click', function(){
			if (nav_open == 1){
				$j('html').removeClass('nav_open');
				toggle.removeClass('toggled');
				nav_open = 0;
			}  else {
				$j('html').addClass('nav_open');
				toggle.addClass('toggled');
				nav_open = 1;
			}
		});
		toggle_sidebar = true;
	}
});