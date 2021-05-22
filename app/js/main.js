$(document).ready(()=>{
	// include "swiper_slider.js"
	// include "validation.js"
	// include "preview_img.js"
	$('#phone_callback').mask('+7 (999) 999-99-99', {placeholder: " "});

	function hideModal() {
		$('[data-modal-callback]').fadeOut('slow');
		$('body').css('overflow','auto');
	}

	$('[data-callback-btn]').on('click', () => {
		$('[data-modal-callback]').show();
		$('body').css('overflow','hidden');
		$('p.error').text('');
	});

	$('[data-modal-close]').on('click', hideModal);

	$('[data-modal-callback]').on('click', (e) => {
		if ($(e.target).closest('.bcgr_call_back').length) return;
		hideModal();
	});
	$('[data-send-form-callback], [data-send-personal-info]').on('click', (e) => {
		let formValid = new ValidationForm($(e.target).closest('form').attr('id'));
		formValid.validationInput(e);
	});
	$('[data-menu-open]').on('click', (e) => {
		$(e.target).toggleClass('active');
		if ($('[data-menu]').css('display') === 'none') {
			$('[data-menu]').css('display', 'block');
		} else {
			$('[data-menu]').css('display', 'none');
		}
	});
	$('[data-callback-mobile]').on('click', ()=>{
		$('[data-callback-btn]').click();
	});
	$('[data-btn]').on('click', (e) => {
		$('.tab_content').css('display', 'none');
		$('.tab_btn').removeClass('active');
		$(e.target).addClass('active');
		$('.' + $(e.target).attr('data-btn')).css('display', 'block');
	});
	$('[ data-load-img]').on('click', () => {
		$('#img_user').click();
	});
	$('#phone_user').mask('+7 (999) 999-99-99', {placeholder: " "});
	$('#img_user').change((e) => {
		if ($(e.target.files[0].type.match('image.*'))) {
			let prev_reader = new Preview_img(e.target.files[0]);
			prev_reader.showImg();
		}
	});
})