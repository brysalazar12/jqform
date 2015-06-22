# jqForm
This jquery plugin has built-in validation for form

# Documentation
**validation** array of validation of field
* required: value will be required and it will be trim
* minLength: this will check if the number of character greater than or equal to minLength value 
* maxLength: this will check if the number of character is less than or equal to maxLength value
* int: this will check if the value is numeric
* max: this will check if the value is less than or equal to max value
* min: this will check if the value is greater than or equal to min value
* regex ** TODO **
* compare ** TODO **

# Example:
```javascript
$('#myform').jqForm((){
	invalidCallback:function()
		{
			alert('invalid');
		}
});
```
