
$(document).ready(function() {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
  });

	if(window.location.href.indexOf('manager/create') >= 0) {
		$('#create').addClass('active');
	}
	if(window.location.href.indexOf('manager/list') >= 0 || window.location.href.indexOf('manager/history') >= 0) {
		$('#manager').addClass('active');
	}
	if(window.location.href.indexOf('treatment') >= 0) {
		$('#treatment').addClass('active');
	}
})