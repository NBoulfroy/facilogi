/**
 * Form prototype.
 *
 * @Project : Facilogi
 * @File    : js/Form.js
 * @Version : 1.0
 * @Author  : BOULFROY Nicolas
 * @Create  : 2018/08/08
 * @Update  : 2018/08/10
 */

/**
 * @param {ActiveX.IXMLDOMElement} form   - HTML form DOM element
 * @param {string}                 method - Ajax request method (POST or GET)
 * @param {string}                 url    - where the query is send
 * @constructor
 */
function Form(form, method, url) {
    Form.prototype.constructor(form, method, url);
    Form.prototype._events();
}

/**
 * Form's constructor.
 *
 * @param {ActiveX.IXMLDOMElement} form   - HTML form DOM element
 * @param {string}                 method - Ajax request method (POST or GET)
 * @param {string}                 url    - where the query is send
 */
Form.prototype.constructor = function(form, method, url) {
    this._form = form;
    this._method = method;
    this._url = url;
    this._error = 0;
};

/**
 * Gets method attribute.
 *
 * @returns {ActiveX.IXMLDOMElement}
 */
Form.prototype.getForm = function() {
    return this._form;
};

/**
 * Gets method attribute.
 *
 * @returns {string}
 */
Form.prototype.getMethod = function() {
    return this._method;
};

/**
 * Gets url attribute.
 *
 * @returns {string}
 */
Form.prototype.getUrl = function() {
    return this._url;
};

/**
 * Gets error attribute.
 *
 * @returns {number}
 */
Form.prototype.getError = function() {
    return this._error;
};

/**
 * Prevents submit action on form.
 *
 * @private
 */
Form.prototype._prevent = function() {
    Form.prototype._form.getElementsByTagName('button')[0].addEventListener('click', function(e) {
        e.preventDefault();
    })
};

/**
 * Resets form.
 *
 * @private
 */
Form.prototype._reset = function() {
    for (let i = 0; i < Form.prototype._form.length - 1; i++) {
        Form.prototype._form[i].value = '';
    }

    let button = Form.prototype._form.getElementsByTagName('button')[0];

    button.setAttribute('disabled', 'disabled');
    button.classList.add('btn-danger');
    button.classList.remove('btn-success');
};

/**
 * Controls a value with last name pattern.
 *
 * @param {string} value
 * @returns {boolean}
 * @private
 */
Form.prototype._lastNameControl = function(value) {
    return /^[A-Z]{1,15}$/g.test(value);
};

/**
 * Controls a value with first name pattern.
 *
 * @param {string} value
 * @returns {boolean}
 * @private
 */
Form.prototype._firstNameControl = function(value) {
    return /^[A-z]{1,15}$/g.test(value);
};

/**
 * Controls a value with age pattern.
 *
 * @param {string} value
 * @returns {boolean}
 * @private
 */
Form.prototype._ageControl = function(value) {
    return /^[0-9]{1,2}$/g.test(value);
};

/**
 * Controls a value with email pattern.
 *
 * @param {string} value
 * @returns {boolean}
 * @private
 */
Form.prototype._emailControl = function(value) {
    return /^[0-9a-z]([-_.]?[0-9a-z])*@[0-9a-z]([-_.]?[0-9a-z])*\.[a-z]{2,4}$/g.test(value);
};

/**
 * Controls data input passed into parameter.
 *
 * @param {ActiveX.IXMLDOMElement} input
 * @return {number}
 * @private
 */
Form.prototype._controlInput = function(input) {
    switch(input.getAttribute('data-variety')) {
        case 'lastName':
            (!Form.prototype._lastNameControl(input.value)) ? Form.prototype._error += 1 : (Form.prototype._error);
            break;
        case 'firstName':
            (!Form.prototype._firstNameControl(input.value)) ? Form.prototype._error += 1 : Form.prototype._error;
            break;
        case 'age':
            (!Form.prototype._ageControl(input.value)) ? Form.prototype._error += 1 : Form.prototype._error;
            break;
        case 'email':
            (!Form.prototype._emailControl(input.value)) ? Form.prototype._error += 1 : Form.prototype._error;
            break;
    }
};

/**
 * Events listener added for all inputs into the form HTML element;
 *
 * @private
 */
Form.prototype._events  = function() {
    Form.prototype._prevent();

    let inputs = Form.prototype._form.getElementsByTagName('input');

    for (let i = 0; i < inputs.length - 1; i++) {
        // Sets "change" event on all inputs (not the token input).
        inputs[i].addEventListener('change', function() {
            Form.prototype._error = 0;

            for (let j = 0; j < inputs.length - 1; j++) {
                Form.prototype._controlInput(inputs[j]);
            }

            // Sets button DOM element.
            let button = Form.prototype._form.getElementsByTagName('button')[0];

            // Enables or disabled the submit button.
            if (Form.prototype._error > 0) {
                button.setAttribute('disabled', 'disabled');
                button.classList.remove('btn-success');
                button.classList.add('btn-danger');
            } else {
                button.removeAttribute('disabled');
                button.classList.remove('btn-danger');
                button.classList.add('btn-success');
            }
        });
    }

    Form.prototype._form.getElementsByTagName('button')[0].addEventListener('click', function() {
        let formData = new FormData();

        for (let i = 0; i < Form.prototype._form.length - 1; i++) {
            formData.append(Form.prototype._form[i].getAttribute('name'), Form.prototype._form[i].value)
        }

        new Ajax(Form, Form.prototype._method, Form.prototype._url, formData);
    });
};
