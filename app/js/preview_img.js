class Preview_img {

	constructor(file) {
		this.img = file;
	}

	showImg() {
		let reader = new FileReader();
		if (this.img) {
			reader.readAsDataURL(this.img);
		}

		reader.onloadend = function(e) {
			$('.preview_img').css('background', 'url('+reader.result+') 0% 0% / 100%');
		}
	}
}