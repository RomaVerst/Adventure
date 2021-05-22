new Swiper('.swiper-container', {
	loop: true,
	pagination: {
		el: '.swiper-pagination',
		clickable: true
	},
	keyboard: {
		enabled: true,
		onlyInViewport: true,
		pageUpDown: true
	},
	initialSlide: 1,
	autoplay: {
		delay: 3000,
		disableOnInteraction: true,
	},
	speed: 800,
});