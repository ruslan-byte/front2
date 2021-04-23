o2.slider =
{
	pos : 0,
	slider : $('._gallery_slider'),
	init()
	{
		let disablbutton = $('._button_left');
		let pos = 0;
		let slider = $('._gallery_slider');
		let $button_left = $('._gallery_control button:first-child');
		let $button_right = $('._gallery_control button:last-child');
		disablbutton.find('path').css({
			'fill' : '#2A3D48',
			'fill-opacity' : '0.5'
		});
		$('._site_1').css(
		{
			opacity: "1",
		});
		$('._site').on('click', function(){
			pos = $(this).data('num')-1;
			sliderMove(pos);
		})

		function sliderMove(pos,e)
		{
			slider.animate({
				'margin-left' : -pos * '750',
			}, 300);
			$('._site').css({
				opacity: "0.5",
			});
			$('._site_'+(pos+1)).css({
				opacity: "1",
			});
			if(pos == 0){
				disablbutton.removeAttr('disabled');
				buttunDisabledCss(false);
				$button_left.attr('disabled','disabled');
				disablbutton = $button_left;
				buttunDisabledCss(true);
			}
			else if(pos == 3){
				disablbutton.removeAttr('disabled');
				buttunDisabledCss(false);
				$button_right.attr('disabled','disabled');
				disablbutton = $button_right;
				buttunDisabledCss(true);
			}
			else if(!(disablbutton == undefined)){
				buttunDisabledCss(false);
				disablbutton.removeAttr('disabled');
			}
		}
		function buttunDisabledCss(add)
		{
			if(add){
				disablbutton.find('path').css({
				'fill' : '#2A3D48',
				'fill-opacity' : '0.5'
				});
			}
			else
			{
				disablbutton.find('path').css({
				'fill' : '#1C294D',
				'fill-opacity' : '1'
				});
			}
		}
	},

	button_click(button)
	{
		let nap = ~~($(button).data('route') == 'left') || -1;
		this.pos += -nap;
		console.log(this.pos);
		//sliderMove(this.pos);
	},
	sliderMove(pos,e)
	{
		this.slider.animate({
			'margin-left' : -pos * '750',
		}, 300);
		$('._site').css({
			opacity: "0.5",
		});
		$('._site_'+(pos+1)).css({
			opacity: "1",
		});
		if(pos == 0){
			disablbutton.removeAttr('disabled');
			buttunDisabledCss(false);
			$button_left.attr('disabled','disabled');
			disablbutton = $button_left;
			buttunDisabledCss(true);
		}
		else if(pos == 3){
			disablbutton.removeAttr('disabled');
			buttunDisabledCss(false);
			$button_right.attr('disabled','disabled');
			disablbutton = $button_right;
			buttunDisabledCss(true);
		}
		else if(!(disablbutton == undefined)){
			buttunDisabledCss(false);
			disablbutton.removeAttr('disabled');
		}
	},
}

