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
		rules:[
			{'first_name':'required|min:2|max:30'},
			{'last_name':'required|min:2|max:30'},
		],
		valid: function(dataForm) {
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

### 2. error 


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
		error:function(errorMessages) {
			console.log(errorMessage);
		}
	});
```
---

### 3. success


This function with argument formData will be trigger when the form is submitted and all field values are valid.
#### Example:
**javascript**
```javascript
	success:function(formData) {
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

### 5. messages


This list of messages will be use instead the default error messages. The format is field id **.** validator name.

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
			{'first_name':'required|max:30'}
		],
		messages:[
			{'first_name.required':'First Name is required.'},
			{'first_name.max':'Maximum length of First Name is ' + 30},
		]
		
	});
```
---

### 6. wrapper

This property is string and use for wrapping error messages. The important is **:message**, it will be replace by real error message

```javascript
	$('#selector').jqForm({
		wrapper:'<span>:message</span>',
	});
```

### 7. showError


This property is boolean by default true, if false it will not display all error messages.

```javascript
	$('#selector').jqForm({
		showError:false,
	});
```

### 8. submitIfValid


This property is boolean by default false, if true and all field passed the validation it will submit the form

```javascript
	$('#selector').jqForm({
		submitIfValid:true,
	});
```
---

### 9. errorClass


This property is use to set the error class of error field. Default is **error** class

```javascript
	$('#selector').jqForm({
		errorClass:'my_error',
	});
```
---

### 10. depends TODO


Validation will have dependencies to be fire.

---


### 11. trigger TODO 



Validation will trigger on event of field

---

### TODO


Should able to get the value of select, textarea,checkbox,radio button
