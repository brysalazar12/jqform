# jqForm
This jquery plugin has built-in validation for form

## Example:
**html**
```html
	<form id="registration_form">
		<input type="text" id="first_name" data-label="First Name" name="firstname" />
		<input type="text" id="last_name" data-label="Last Name" name="lastname" />
		<input type="submit" value="Register" />
	</form>
```
**javascript**
```javascript
	$('#registration_form').jqForm({
		rule:[
			{'first_name':'required|minLength:2|maxLength:30'},
			{'last_name':'required|minLength:2|maxLength:30'},
		],
		validCallback: function(dataForm) {
			// do some ajax or normal submit form
		}
	});
```
---

## Documentation
## Properties
---
### l. rules


Array of validation of field

* **required:** Value will be required and it will be trim
* **numeric:** This will check if the value is numeric
* **max:** This will check if the value is less than or equal to max value if **numeric** else it will check the number of character
* **min:** This will check if the value is greater than or equal to min value **numeric** else it will check the number of character
* **regex: TODO**
* **compare: TODO**  


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
			{'first_name':'required|min:2|max:30'},
			{'last_name':'required|min:2|max:30'},
			{'age':'required|numeric|max:60|min:18'}
		]
	});
```
---

### 2. invalid 


This function with argument errorMessages will be trigger when the form is submitted and if values did not passed the validation.


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
		rules:[{'amount':'required|numeric'}],
		invalid:function(errorMessages) {
			console.log(errorMessage);
		}
	});
```
---

### 3. valid


This function with argument formData will be trigger when the form is submitted and all field values are valid.
#### Example:
**javascript**
```javascript
	valid:function(formData) {
		console.log(formData);
	}
```
---

### 4. validator


This function is use to create custom validation
#### Ex.
**html**
```html
	<form id="myform">
		<input type="text" data-label="Gender" name="gender" id="gender" />
		<input type="text" name="test" data-label="My Test Field" id="testfield" />
		<input type="submit" value="Send" />
	</form>
```
**javascript**
```javascript
	$('#myform').jqForm({
		rules:[
			{'gender':'myGenderValidator:male,female'},
			{'testfield':'testingValidator:testing'}
		],
		validator:[
			{'myGenderValidator':function(val,param){
					if(val != param[0] && val != param[1])
						return ' invalid gender';
					return true;
				}
			},
			{'testingValidator':function(val,param){
					if(val !== param[0])
						return ' not equal to testing';
					return true;
				}
			}
		]
	});
```
---

### 5. showError


This property is boolean by default true, if false it will not display all error messages.

---

### 6. message


This list of message will be use instead the default error messages

**html**
```html
	<form id="thisform">
		<input type="text" name="first_name" id="first_name" />
		<input type="submit" value="Send" />
	</form>
```
**javascript**
```javascript
	$('#thisform').jqForm({
		rules:[
			{'first_name':'required'}
		],
		message:[
			{'first_name.required':'First Name is required.'},
		]
		
	});
```
---
