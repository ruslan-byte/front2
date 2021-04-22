function sliderInit()
{
	let disablbutton = $('._button_left').attr('disabled','disabled');
	let pos = 0;
	let slider = $('._gallery_slider');
	let $button_left = $('._gallery_control button:first-child');
	let $button_right = $('._gallery_control button:last-child');
	$('._site_1').css(
	{
		opacity: "1",
	})
	$('._gallery_control').find('button').on('click', function()
	{
		let nap = ~~($(this).data('button') == 'left') || -1;
		pos += -nap;
		sliderMove(slider,pos);
	});
	$('._site').on('click', function(){
		pos = $(this).data('num')-1;
		sliderMove(slider,pos);
	})

	function sliderMove(slider, pos,e)
	{
		slider.animate({

			'margin-left' : -pos * '750',
		});
		$('._site').css({
			opacity: "0.5",
		});
		$('._site_'+(pos+1)).css({
			opacity: "1",
		});
		if(pos == 0){
			disablbutton.removeAttr('disabled');
			$button_left.attr('disabled','disabled');
			disablbutton = $button_left;
		}
		else if(pos == 3){
			disablbutton.removeAttr('disabled');
			$button_right.attr('disabled','disabled');
			disablbutton = $button_right;
		}
		else if(!(disablbutton == undefined)){
			disablbutton.removeAttr('disabled');
		}

	}
}

