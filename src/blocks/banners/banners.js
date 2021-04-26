o2.slider =
{
	pos : 0,
	slider : $('._gallery_slider'),
	disablbutton : $('._button_left'),
	$button_left : $('._gallery_control button:first-child'),
	$button_right : $('._gallery_control button:last-child'),
	$widthphoto : parseFloat($('._photo').css("width")),
	site_click(site){
	this.pos = $(site).data('num')-1;
	this.sliderMove();
	},

	button_click(button)
	{
		let nap = ~~($(button).data('route') == 'left') || -1;
		this.pos += -nap;
		this.sliderMove();
	},

	sliderMove()
	{
		this.slider.animate({
			'margin-left' : -this.pos * this.$widthphoto,
		}, 300);

		$('._site').css({
			opacity: "0.5",
		});

		$('._site_'+(this.pos+1)).css({
			opacity: "1",
		});

		if(this.pos == 0){
			this.disablbutton.removeAttr('disabled');
			this.buttunDisabledCss(false);
			this.$button_left.attr('disabled','disabled');
			this.disablbutton = this.$button_left;
			this.buttunDisabledCss(true);
		}
		else if(this.pos == 3){
			this.disablbutton.removeAttr('disabled');
			this.buttunDisabledCss(false);
			this.$button_right.attr('disabled','disabled');
			this.disablbutton = this.$button_right;
			this.buttunDisabledCss(true);
		}
		else if(!(this.disablbutton == undefined)){
			this.buttunDisabledCss(false);
			this.disablbutton.removeAttr('disabled');
		}
	},

	buttunDisabledCss(add)
	{
		if(add){
			this.disablbutton.find('path').css({
			'fill' : '#2A3D48',
			'fill-opacity' : '0.5'
			});
		}
		else
		{
			this.disablbutton.find('path').css({
			'fill' : '#1C294D',
			'fill-opacity' : '1'
			});
		}
	},
}