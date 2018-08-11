/**
 * Ajax prototype.
 *
 * @Project : Facilogi
 * @File    : js/Ajax.js
 * @Version : 1.0
 * @Author  : BOULFROY Nicolas
 * @Create  : 2018/08/08
 * @Update  : 2018/08/10
 */

/**
 * @constructor
 * @param {Form} form         - Form object
 * @param {string} method     - AJAX request method (POST or GET)
 * @param {string} url        - where the query is send
 * @param {FormData} formData - data from form submitted
 */
function Ajax(form, method, url, formData) {
    Ajax.prototype.constructor(form, method, url, formData);
    this._query();
}

/**
 * Ajax's constructor.
 *
 * @param {Form} form         - Form object
 * @param {string} method     - AJAX request method (POST or GET)
 * @param {string} url        - where the query is send
 * @param {FormData} formData - data from form submitted
 */
Ajax.prototype.constructor = function(form, method, url, formData) {
    this._form = form;
    this._method = method;
    this._url = url;
    this._formData = formData;
};

/**
 * Gets form attribute.
 *
 * @returns {Form}
 */
Ajax.prototype.getForm = function() {
    return this._form;
};

/**
 * Gets method attribute.
 *
 * @returns {string}
 */
Ajax.prototype.getMethod = function() {
    return this._method;
};

/**
 * Gets method attribute.
 *
 * @returns {string}
 */
Ajax.prototype.getUrl = function() {
    return this._url;
};

/**
 * Gets formData attribute.
 *
 * @returns {FormData}
 */
Ajax.prototype.getFormData = function() {
    return this._formData();
};

/**
 * Creates an AJAX object.
 *
 * @returns {XMLHttpRequest|ActiveXObject}
 * @private
 */
Ajax.prototype._createRequest = function() {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    } else {
        if (window.ActiveXObject('Msxm12.XMLHTTP')) {
            return new ActiveXObject('Msxml2.XMLHTTP');
        } else {
            return new ActiveXObject('Microsoft.XMLHTTP');
        }
    }
};

/**
 * Displays an error message.
 *
 * @param {string} message             - message from the AJAX response
 * @param {ActiveX.IXMLDOMElement} div - message container
 * @private
 */
Ajax.prototype._displayError = function(message, div) {
    let error = document.createElement('div');
    error.setAttribute('class', 'alert alert-dismissible alert-danger text-center fade show');
    error.setAttribute('role', 'alert');
    error.innerText = message + '.';

    let button = document.createElement('button');
    button.setAttribute('class', 'close');
    button.setAttribute('data-dismiss', 'alert');
    button.setAttribute('aria-label', 'Close');

    let span = document.createElement('span');
    span.setAttribute('aria-hidden', 'true');
    span.innerHTML = '&times;';

    button.appendChild(span);
    error.append(button);
    div.appendChild(error);
};

/**
 * Displays a success message.
 *
 * @param {string} message             - message from the AJAX response
 * @param {ActiveX.IXMLDOMElement} div - message container
 * @private
 */
Ajax.prototype._displaySuccess = function(message, div) {
    let success = document.createElement('div');
    success.setAttribute('class', 'alert alert-dismissible alert-success text-center fade show');
    success.setAttribute('role', 'alert');
    success.innerText = message + '.';

    let button = document.createElement('button');
    button.setAttribute('class', 'close');
    button.setAttribute('data-dismiss', 'alert');
    button.setAttribute('aria-label', 'Close');

    let span = document.createElement('span');
    span.setAttribute('aria-hidden', 'true');
    span.innerHTML = '&times;';

    button.appendChild(span);
    success.appendChild(button);
    div.appendChild(success);
};

/**
 * AJAX request senders.
 *
 * @private
 */
Ajax.prototype._query = function() {
    let request = this._createRequest();

    // Opens a connection.
    request.open(Ajax.prototype._method, Ajax.prototype._url);
    // Sets a header to the AJAX request.
    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    // Sends the data to the url.
    request.send(Ajax.prototype._formData);

    request.onload = function() {
        // Clear response div.
        document.getElementById('response').innerHTML = '';

        if (request.status === 200) {
            let response = JSON.parse(request.responseText);

            switch(response.status) {
                default:
                    Ajax.prototype._displayError(response.message, document.getElementById('response'));
                    break;
                case 'error':
                    Ajax.prototype._displayError(response.message, document.getElementById('response'));
                    break;
                case 'success':
                    Ajax.prototype._displaySuccess(response.message, document.getElementById('response'));
                    break;
            }
        } else {
            Ajax.prototype._displayError(
                'An error is occurred during the process.',
                document.getElementById('response')
            );
        }
    };

    request.onerror = function() {
        Ajax.prototype._displayError('An error is occurred during the process.', document.getElementById('response'));
    };

    Ajax.prototype._form.prototype._reset();
};
