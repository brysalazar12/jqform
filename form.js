(function($){
	"use strict";

$.fn.vform = function(options) {

	return this.each(function(){

	});


};


$.fn.vform.defaults = {

};

// for localization
$.fn.vform.messages = {
	'required':':attribute is required.',
	'numeric':':attribute should be numeric.',
	'max.numeric':':attribute should less than or equal to :max',
	'max.string':':attribute length should less than or equal to :max',
	'min.numeric':':attribute should greater than or equal to :min',
	'min.string':':attribute length should greater than or equal to :min',
	'compare.equal':':attribute should equal to :compareAttribute',
	'compare.less':':attribute should less than to :compareAttribute',
	'compare.greater':':attribute should greater than to :compareAttribute',
	'compare.lessEqual':':attribute should less than or equal to :compareAttribute',
	'compare.greaterEqual':':attribute should greater than or equal to :compareAttribute',
	'regex':':attribute is not valid format',
};

$.fn.vform.mergeValidators = function() {
	for(var i = 0; i < settings.validator.length; i++)
	{
		validators = $.extend({}, validators, settings.validator[i]);
	}
	return validators;
};

$.fn.vform.Exception = function(message) {
	this.message = message;
};

$.fn.vform.Exception.prototype.toString = function() {
	return this.message;
};

$.fn.vform.validators = {
	required: function(val) {
		if($.trim(val) == '')
			throw new $.fn.vform.Exception($.fn.vform.messages['required']);
		return true;
	},
	numeric: function(val) {
		if(isNaN(val) == true)
			throw new $.fn.vform.Exception($.fn.vform.messages['numeric']);
		return true;
	},
	max: function(val,max,isNumeric) {
		if(isNumeric != undefined && isNumeric == true)
		{
			if(parseFloat(val) > max)
				throw new $.fn.vform.Exception($.fn.vform.messages['max.numeric']);
		}
		else
		{
			if($.trim(val).length > max)	
				throw new $.fn.vform.Exception($.fn.vform.messages['max.string']);
		}

		return true;
	},
	min: function(val,min,isNumeric) {
		if(isNumeric != undefined && isNumeric == true)
		{
			if(parseFloat(val) < min)
				throw new $.fn.vform.Exception($.fn.vform.messages['min.numeric']);
		}
		else
		{
			if($.trim(val).length < min)	
				throw new $.fn.vform.Exception($.fn.vform.messages['min.string']);
		}
		return true;	
	},
	regex: function(val,pattern) {
		if(pattern.test(val) == false)
			throw new $.fn.vform.Exception($.fn.vform.messages['regex']);
		return true;
	},
};


/*var VForm = function() {
	this.rules = [];
	this.validators = [];
	this.messages = [];
	this.wrapper = '';
	this.showError = true;
	this.submitIfValid = false;
	this.errorClass = 'error';
	this.depends = [];
};


VForm.prototype.error = function(errorMessages) {
	
};

VForm.prototype.success = function(formData) {

};

$.fn.vform = function() {

};

$.fn.vform.defaults = {
	rules:[],
};*/

}(jQuery));