//utils
const elementFactory = function(type, attributes, events, children) {
    const el = document.createElement(type)
    for (key in attributes) {
        el.setAttribute(key, attributes[key])
    }
    for (key in events) {
        el.addEventListener(key, events[key])
    }
    if (children) {
        for (var i = 0; i < children.length; i++) {
            if (typeof children[i] === 'string') {
                el.appendChild(document.createTextNode(children[i]))
            } else {
                el.appendChild(children[i])
            }
        }
    }
    
    return el
}

const setAttributes = function(element, attributes) {
    for (var key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

const EmailsInput = function(node, props) {
    const keyCodes = [ 44, 13 ]; // 44: comma, 13: enter

    const clickContainer = function(event) {
        event.currentTarget.querySelector('#input-email').focus();
    }

    const emailIsValid = function(email) {
        return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(email);
    }
    
    const SVGIconRemove = function() { 
        var icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        setAttributes(icon, { 'width': '8', 'height': '8', 'viewBox': '0 0 8 8' });
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        setAttributes(path, { 'd': 'M8 0.8L7.2 0L4 3.2L0.8 0L0 0.8L3.2 4L0 7.2L0.8 8L4 4.8L7.2 8L8 7.2L4.8 4L8 0.8Z', 'fill': '#050038' });
        icon.appendChild(path);
        return icon;
    }
    
    const randomEmail = function() {
        const names = ['ivan', 'max', 'tom', 'alex', 'tim', 'kim', 'oliver', 'william', 'paul', 'anna', 'mark', 'noah', 'liana'];
        return names[Math.floor(Math.random() * names.length)] + '@mail.ru';
    }

    const keyPressInput = function(e) {
        if (keyCodes.indexOf(e.keyCode) !== -1 && e.target.value !== '') {
            addEmailBlock(e);
            e.target.value = ''; // Clear the field
            e.preventDefault();
        }
    }

    const emailsPaste = function(e) {
        e.preventDefault();
        var clipboardDataPieces = window['clipboardData'].getData('text').split(',');
        for (var i = 0; i < clipboardDataPieces.length; i++) {
            e.currentTarget.parentElement.querySelector('#emails-container__list').appendChild(emailBlock(clipboardDataPieces[i]));
        }
        e.currentTarget.value = '';
    }

    const removeEmailBlock = function(e) { 
        var child = e.currentTarget.parentElement;
        child.parentNode.removeChild(child);
    }

    const emailBlock = function(email) {
        return elementFactory('span', {
            class: emailIsValid(email.trim()) ? 'emails-container__email-block' : 'emails-container__email-block--invalid'
        }, {}, [
            elementFactory('span', { class: 'emails-container__email-block__email-text-container' }, {}, email.trim()),
            elementFactory('span', { class: 'emails-container__email-block__email-remove' }, { click: removeEmailBlock }, [ SVGIconRemove() ])
        ]);
    }

    const addEmailBlock = function(event) {
        event.currentTarget.parentElement.querySelector('#emails-container__list').appendChild(emailBlock(event.target.value));
    }

    // initialize component
    node.appendChild(elementFactory('div', { class: 'emails-container' }, { click: clickContainer }, [
        elementFactory('span', { id: 'emails-container__list', }),
        elementFactory('input', { type: 'text', id: 'input-email', placeholder: 'add more people...' }, { keypress: keyPressInput, paste: emailsPaste })
    ]));

    // working with the props
    if (props.hasOwnProperty('addRandomEmail')) {
        const addRandomEmail = function(event) {
            event.target.parentElement.querySelector('#emails-container__list').appendChild(emailBlock(randomEmail()));
        }
        node.appendChild(
            elementFactory('input', { type: 'button', class: 'emails-container__button', value: 'Add Email' }, { click: addRandomEmail })
        );
    }

    if (props.hasOwnProperty('getEmailCount')) {
        const getEmailCount = function() {
            const validEmails = node.querySelectorAll('.emails-container__email-block').length;
            var plural = 's';
            if (validEmails === 1) {
                plural = '';
            }
            alert(node.querySelectorAll('.emails-container__email-block').length + ' valid email' + plural);
        }
        node.appendChild(
            elementFactory('input', { type: 'button', class: 'emails-container__button', value: 'Get emails count' }, { click: getEmailCount })
        );
    }

    return {
        emailIsValid: emailIsValid,
        randomEmail: randomEmail,
        emailBlock: emailBlock
    };
}
// Make library available on window 
window.EmailsInput = EmailsInput;

//export functions to jest test file
if (typeof module !== 'undefined') {
    module.exports = EmailsInput;
}

