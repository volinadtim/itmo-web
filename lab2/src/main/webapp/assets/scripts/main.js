'use strict';

let isError = false;

const form = document.getElementsByTagName('form')[0];

function hasOnlyDigits(value) {
	return value.match(/^([0-9\-]*|[0-9\-]*\.[0-9\-]*)$/);
}

function makesSense(value) {
	if (value === '0') return true;
	return value.match(/^\-?([1-9][0-9]*|0)(\.[0-9\-]*)?$/);
}

function validateFloat(value, min = null, max = null) {
    if (value === null) return 'Введите не нул';
	if (!hasOnlyDigits(value)) {
		return 'Введите число';
	}
	if (!makesSense(value)) {
		return 'Нет, введите число';
	}
	const floatValue = parseFloat(value);
	if (min !== null) {
		if (floatValue <= min) return `Число должно быть больше, чем ${min}`
	}
	if (max !== null) {
		if (floatValue >= max) return `Число должно быть меньше, чем ${max}`
	}
	return null;
}

const submitEl = document.getElementById(`submitBtn`);
const coordinateXField = new CheckboxField(`coordinateX`, -50, 50, [-4, -3, -2, -1, 0, 1, 2, 3, 4], `coordinateXCheckboxes`, `coordinateXCont`);
const coordinateYField = new TextField(`coordinateY`, -5, 5, `coordinateY`, `coordinateYCont`);
const radiusField = new SelectField(`radius`, 0, 10, [1, 2, 3, 4, 5], `radius`, `radiusCont`);

coordinateXField.changed = () => {
	this.checkIsError();
};
coordinateYField.changed = () => {
	this.checkIsError();
};
radiusField.changed = () => {
	this.checkIsError();
};

function checkIsError() {
	const valid = coordinateXField.valid && coordinateYField.valid && radiusField.valid;
	isError = !valid;
	submitEl.disabled = isError;
}

function newShot({x, y}) {
	if (!radiusField.value) {
	    alert('Определите радиус сперва.');
	    return;
	}

	coordinateXField.onChange(x.toString());
	coordinateYField.onChange(y.toString());

	checkIsError();

	if (!isError) {
          form.submit();
	}
}

setTimeout(() => {
    checkIsError();
});