class ValidationForm {
	constructor(formId) {
		this.form = formId;
	}
	validationInput(e) {
		let self = this;
		$('#'+this.form+' :input').each(function(){
			if (!$(this).val()) {
				if($(this).is('input[type=file]')) return;
				e.preventDefault();
				self._addMessage($(this), 'Вы не заполнили поле');
			} else if ($(this).attr('type') === 'text') {
				if(!(/^[a-zа-яё]{2,30}$/i.test($(this).val()))) {
					e.preventDefault();
					self._addMessage($(this), 'Неправильно заполнено поле');
				} else {
					$(this).next('p.error').remove();
				}
			} else if ($(this).attr('type') === 'tel') {
				if(!(/^\+7 \(9\d{2}\) \d{3}-?\d{2}-?\d{2}$/.test($(this).val()))) {
					e.preventDefault();
					self._addMessage($(this), 'Введите корректный номер телефона');
				} else {
					$(this).next('p.error').remove();
				}
			} else if ($(this).attr('type') === 'email') {
				if(!(/^[a-z_\-\d]+@[a-z]{2,10}\.[a-z]{2,7}$/i.test($(this).val()))) {
					e.preventDefault();
					self._addMessage($(this), 'Введите корректный email');
				} else {
					$(this).next('p.error').remove();
				}
			}
		});
		if ($('textarea') && $('textarea').val() !== '') {
			$('textarea').next('p.error').remove();
		}
	}

	_addMessage(elem, message)  {
		if(elem.next().is('p.error')) {
			elem.next().text(message);
		} else {
			elem.after(() => {
				return '<p class="error">'+message+'</p>';
			});
		}
	}

}