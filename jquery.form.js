/**
 * jQuery Form Plugin
 * TODO: This plugin have validation
 * @param {type} $
 * @returns {undefined}
 */
(function($){
	"use strict";	

	$.fn.jqForm = function(options) {

		var errorMessages = {

		};

		var defaults = {
			validation:[],
			invalidCallback:function(errorMessages){},
			validCallback:function(formData){},
			addCustomValidator:[],
			showErrorMessages:true,
			customMessage:[],
			messageWrapper:'',
			isDisplayError:true,
		};

		var isValid = false;

		var settings = $.extend(true, {}, defaults, options);

		var validators = {
			required:function(val){
				if($.trim(val.toString()) === '')
					return ' is required.';
				return true;
			},
			minLength:function(val,args){
				var len = args[0];
				if($.trim(val).length < len)
					return ' length should not less than ' + len;
				return true;
			},
			maxLength:function(val,len){
				if($.trim(val).length > len)
					return ' length should not greater than ' + len;
				return true;
			},
			int:function(val){
				if(isNaN(val))
					return ' is not a number.';
				return true;
			},
			max:function(val,maxVal){
				if(val > maxVal)
					return ' should less than or equal to ' + maxVal;
				return true;
			},
			min:function(val,minVal){
				if(val < minVal)
					return ' should greater than or equal to ' + minVal;
				return true;
			},
			regex:function(val,regex){},
			compare:function(val,field,operator){}
		};

		var errorContainer = [];

		function _mergeDefaultValidatorAndCustomValidator()
		{
			for(var i = 0; i < settings.addCustomValidator.length; i++)
			{
				validators = $.extend({}, validators, settings.addCustomValidator[i]);
			}
		}

		function _hasCustomMessage(field,validatorName)
		{
			var message = false;
			var keyCustomMessage = field + '.' + validatorName;

			for(var i = 0; i < settings.customMessage.length; i++ )
			{
				for(var k in settings.customMessage[i])
				{
					if(k === keyCustomMessage)
						message = settings.customMessage[i][k];
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
			$.each(settings.validation,function(k,v){
				$.each(v,function(field,fieldValidations){
					var fieldValue = $('#'+field).val();
					var afieldValidations = fieldValidations.split("|");
					for(var i = 0; i < afieldValidations.length; i++)
					{
						var aValidator = afieldValidations[i].split(':');
						var validatorName = aValidator[0];

						// check if validator exist
						if(validators.hasOwnProperty(validatorName))
						{
							var message = true;
							if(aValidator.length > 1)
							{
								var params = aValidator[1].split(',');
								message = validators[validatorName](fieldValue,params);
							}
							else
							{
								message = validators[validatorName](fieldValue);
							}
								if(message !== true)
								{
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
				if(settings.messageWrapper != '')
				{
					var message = settings.messageWrapper.replace(':message',errMsg);
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
				if(settings.isDisplayError)
				{
					_displayErrorMessages();
				}

				// valid
				if(isValid)
				{
					settings.validCallback($(this).serialize());
				}
				else
				{
					// invalid
					settings.invalidCallback(errorMessages);
					return false;
				}
			});
		});
	};
}(jQuery));
/*

<form id="myform">
	<input type="text" name="first_name" id="first_name" />
	<input type="text" name="last_name" id="last_name" />
	<input type="text" name="age" id="age" />
</form>

				$('#myform').jqForm({
					invalidCallback:function(errorMessages){
//						alert('invalid');
					},
					validation:[
						{'first_name':'required|minLength:2|maxLength:10|myvalidator:20'},
//						{'password':'compare:confirmpassword,=|minLength:7'},
//						{'last_name':'required|minLength:2|maxLength:10'}
					],
					// customMessage:[
						// {'first_name.required':'First Name is required.'}
					// ],
					addCustomValidator:[
						{
							'myvalidator':function(val,param){
								if(val != param)
									return ' should equal to ' + param;
								return true;
							}
						}
					],
					messageWrapper:'<div class="error">:message</div>'
				});

*/