/**
 * @author Bryan Salazar
 * @version 1.0.0
 * jQuery Form Plugin
 * TODO: This plugin have validation
 * @param {type} $
 * @returns {undefined}
 */
(function($){
	"use strict";	

	$.fn.jqForm = function(options) {

		var errorMessages = {};
		var isNumeric = false;

		var defaults = {
			rules:[],
			error:function(errorMessages){},
			success:function(formData){},
			validator:[],
			messages:[],
			wrapper:'<div class="error">:message</div>',
			showError:true,
			submitIfValid:false,
			errorClass:'error',
			depends:[],
		};

		var settings = $.extend(true, {}, defaults, options);

		var validators = {
			required:function(val){
				if($.trim(val.toString()) === '')
					return ' is required.';
				return true;
			},
			numeric:function(val){
				if(isNaN(val))
					return ' is not a number.';
				return true;
			},
			max:function(val,maxVal){
				if(isNumeric)
				{
					if(parseInt(val) > maxVal)
						return ' should less than or equal to ' + maxVal;
				}
				else
				{
					if($.trim(val).length > maxVal)
						return ' length should not greater than ' + maxVal;
				}

				return true;
			},
			min:function(val,minVal){
				if(isNumeric)
				{
					if(parseInt(val) < minVal)
						return ' should greater than or equal to ' + minVal;
				}
				else
				{
					if($.trim(val).length < minVal)
						return ' length should not less than ' + minVal;
				}

				return true;
			},
			regex:function(val,regex){},

			// field, operator
			compare:function(val,param){
				var val2 = $('#'+param[0]).val();
				var label2 = $('#'+param[0]).attr('data-label');

				if(label2 == undefined)
					label2 = param[0];

				switch(param[1])
				{
					case '==':
						if(val !== val2)
							return ' should equal to ' + label2;
						break;
					case '<=':
						if(val > val2)
							return ' should less than or equal to ' + label2;
						break;
					case '>=':
						if(val < val2)
							return ' should greater than or equal to ' + label2;
						break;
					case '>':
						if(val <= val2)
							return ' should greater than to ' + label2;
						break;
					case '<':
						if(val >= val2)
							return ' should less than to ' + label2;
						break;
				}
				return true;
			}
		};

		var errorContainer = [];

		function _mergeDefaultValidatorAndCustomValidator()
		{
			for(var i = 0; i < settings.validator.length; i++)
			{
				validators = $.extend({}, validators, settings.validator[i]);
			}
		}

		function _hasCustomMessage(field,validatorName)
		{
			var message = false;
			var keyCustomMessage = field + '.' + validatorName;

			for(var i = 0; i < settings.messages.length; i++ )
			{
				for(var k in settings.messages[i])
				{
					if(k === keyCustomMessage)
						message = settings.messages[i][k];
				}
			}
			return message;
		}

		function dd(obj)
		{
			console.log(obj);
		}

		function _callValidator(validatorName,fieldValue)
		{
			return validators[validatorName](fieldValue);
		}


		function _executeValidation()
		{
			errorMessages = {};

			// loop through all rules
			$.each(settings.rules,function(k,v){

				// loop through all field rules
				$.each(v,function(field,fieldValidations){
					var fieldValue = $('#'+field).val();
					$('#'+field).removeClass(settings.errorClass);
					var afieldValidations = fieldValidations.split("|");
					var isRequired = false;
					isNumeric = false;


					// check if there are numeric and required rules to be prioritize
					for(var i = 0; i < afieldValidations.length; i++)
					{
						if(afieldValidations[i] == 'numeric')
							isNumeric = true;
						if(afieldValidations[i] == 'required')
							isRequired = true;
					}

					// loop through all validator
					for(var i = 0; i < afieldValidations.length; i++)
					{
						var aValidator = afieldValidations[i].split(':');
						var validatorName = aValidator[0];

						// check if validator exist
						if(validators.hasOwnProperty(validatorName))
						{
							var message = true;
							// check if validator's argument is greater than one
							if(aValidator.length > 1)
							{
								// split argument by comma
								var params = aValidator[1].split(',');
								
								if(isRequired)
									message = validators['required'](fieldValue);

								if(isNumeric && message === true)
									message = validators['numeric'](fieldValue);

								if(message === true)
									message = validators[validatorName](fieldValue,params);
							}
							else
							{
								if(isRequired)
									message = validators['required'](fieldValue);

								if(isNumeric && message === true)
									message = validators['numeric'](fieldValue);

								if(message === true)									
									message = validators[validatorName](fieldValue);
							}

							if(message !== true)
							{
								$('#'+field).addClass(settings.errorClass);
								// check if has custom error message
								var customMessage = _hasCustomMessage(field,validatorName);
								if(customMessage !== false)
								{
									errorMessages[field] = customMessage;
								}
								else
								{
									var label = field;
									if($('#'+field).attr('data-label'))
									{
										label = $('#'+field).attr('data-label');
									}
									errorMessages[field] = label + message;
									break;
								}
							}							
						}
						else
						{
							alert(validatorName + ' validator is not exist.');
						}

					}
					return false;
				});
			});
		}

		function _displayErrorMessages()
		{
			// remove all previous error message
			for(var i = 0; i < errorContainer.length; i++)
			{
				errorContainer[i].remove();
			}
			errorContainer = [];

			$.each(errorMessages,function(field,errMsg){
				if(settings.wrapper != '')
				{
					var message = settings.wrapper.replace(':message',errMsg);
					var m = $(message);
					$('#'+field).before(m);
					errorContainer.push(m);
				}
			});
		}

		return this.each(function(){
			$(this).on('submit',function(){

				_mergeDefaultValidatorAndCustomValidator();
				_executeValidation();
				if(settings.showError)
				{
					_displayErrorMessages();
				}

				// valid
				if(Object.keys(errorMessages).length < 1)
				{
					settings.success($(this).serialize());
					return settings.submitIfValid;
				}
				else
				{
					// invalid
					settings.error(errorMessages);
					return false;
				}
			});
		});
	};
}(jQuery));