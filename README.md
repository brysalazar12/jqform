# jqForm
This jquery plugin has built-in validation for form

## Example:
```html
	<form id="registration_form">
		<input type="text" id="first_name" data-label="First Name" name="firstname" />
		<input type="text" id="last_name" data-label="Last Name" name="lastname" />
		<input type="submit" value="Register" />
	</form>
```
```javascript
	$('#registration_form').jqForm({
		validation:[
			{'first_name':'required|minLength:2|maxLength:30'},
			{'last_name':'required|minLength:2|maxLength:30'},
		],
		validCallback: function(dataForm) {
			// do some ajax
		}
	});
```


## Documentation
## Properties
---
### l. validation


array of validation of field

* **required:** value will be required and it will be trim
* **minLength:** this will check if the number of character greater than or equal to minLength value
* **maxLength:** this will check if the number of character is less than or equal to maxLength value
* **int:** this will check if the value is numeric
* **max:** this will check if the value is less than or equal to max value
* **min:** this will check if the value is greater than or equal to min value
* **regex:**
* **compare:**  


#### Example:
**html**
```html
	<form id="myform">
		<input type="text" id="first_name" data-label="First Name" name="firstname" />
		<input type="text" id="last_name" data-label="Last Name" name="lastname" />
		<input type="text" id="age" data-label="Age" name="age" />
		<input type="submit" value="Send" />
	</form>
```
**javascript**
```javascript
	$('#myform').jqForm({
		validation:[
			{'first_name':'required|minLength:2|maxLength:30'},
			{'last_name':'required|minLength:2|maxLength:30'},
			{'age':'required|int|max:60|min:18'}
		]
	});
```
---

### 2. invalidCallback 


this function with argument errorMessages will be trigger when the form is submitted and if values did not passed the validation.


**errorMessages:** list of error messages

#### Example:
**html**
```html
	<form id="myform">
		<input type="text" name="amount" data-label="Amount" id="amount" />
		<input type="submit" value="Send" />
	</form>
```
**javascript**
```javascript
	$('#myform').jqForm({
		validation:[{'amount':'required|int'}],
		invalidCallback:function(errorMessages) {
			console.log(errorMessage);
		}
	});
```
---

### 3. validCallback


this function with argument formData will be trigger when the form is submitted and all field values are valid.
#### Example:
**javascript**
```javascript
	validCallback:function(formData) {
		console.log(formData);
	}
```
---

### 4. addCustomValidator


this function is use to create custom validation
#### Ex.
**html**
```html

```
**javascript**
```javascript

```
# Example:
```javascript
$('#myform').jqForm((){
	invalidCallback:function(errorMessages)
		{
			alert('invalid');
		}
});
```
