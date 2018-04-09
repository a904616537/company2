var floating = $('.floating');
var settime;
var time = function() {
	settime = setTimeout(function() {
		$('.floating .show').click();
		clearTimeout(settime)	
	}, 10000);
}

$(function() {
	$('.floating .show').click(function() {
		var show = $('.floating .show>i');
		show.toggleClass('fa-angle-double-right');
		show.toggleClass('fa-angle-double-left');
		if(show.hasClass('fa-angle-double-left')) {
			floating.animate({left:'0px'});
			time();
		} else {
			floating.animate({left:'-208px'});
			clearTimeout(settime)
		}
	})
	time();
})