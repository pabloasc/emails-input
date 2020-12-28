//utils
const elementFactory = (type, attributes, events, ...children) => {
    const el = document.createElement(type)
    for (key in attributes) {
        el.setAttribute(key, attributes[key])
    }
    for (key in events) {
        el.addEventListener(key, events[key])
    }
    children.forEach(child => {
        if (typeof child === 'string') {
            el.appendChild(document.createTextNode(child))
        } else {
            el.appendChild(child)
        }
    })
    return el
}

const emailIsValid = (email) => {
    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(email);
}

const SVGIconRemove = () => { 
    var icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('width', '8');
    icon.setAttribute('height', '8');
    icon.setAttribute('viewBox', '0 0 8 8');
    
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M8 0.8L7.2 0L4 3.2L0.8 0L0 0.8L3.2 4L0 7.2L0.8 8L4 4.8L7.2 8L8 7.2L4.8 4L8 0.8Z');
    path.setAttribute('fill', '#050038');
    icon.appendChild(path);
    
    return icon;
}

const randomEmail = () => {
    const names = ['ivan', 'max', 'tom', 'alex', 'tim', 'kim', 'oliver', 'william', 'paul, anna', 'mark', 'noah', 'liana'];
    return `${names[Math.floor(Math.random() * names.length)]}@mail.ru`;
}

var EmailsInput = (node, props) => {
    const keyCodes = [ 44, 13 ]; // 44: comma, 13: enter, 8: backspace(?)

    const clickContainer = (event) => {
        event.currentTarget.querySelector('#input-email').focus();
    }

    const keyPressInput = (e) => {
        if (keyCodes.includes(e.keyCode) && e.target.value !== '') {
            addEmailBlock(e);
            e.target.value = ''; // Clear the field
            e.preventDefault(); // Don't show commas and breaklines
        }
    }

    const emailsPaste = (e) => {
        e.preventDefault();
        e.clipboardData.getData('text').split(',').forEach(email => {
            e.currentTarget.parentElement.querySelector('#list-emails-container').appendChild(emailBlock(email));
        });
        e.currentTarget.value = '';
    }

    const removeEmailBlock = (e) => { 
        e.currentTarget.parentElement.remove();
    }

    const emailBlock = (email) => {
        return elementFactory('span', {
            class: emailIsValid(email.trim()) ? 'email-block' : 'email-block-invalid'
        }, {}, elementFactory('span', { id: 'email-text-container' }, {}, email.trim()),
            elementFactory('span', { id: 'email-remove' }, { click: removeEmailBlock }, SVGIconRemove())
        )
    }

    const addEmailBlock = (event) => {
        event.currentTarget.parentElement.querySelector('#list-emails-container').appendChild(emailBlock(event.target.value));
    }

    // init component
    node.appendChild(elementFactory('div', { class: 'emails-container' }, { click: clickContainer },
        elementFactory('span', { id: 'list-emails-container', }),
        elementFactory('input', { type: 'text', id: 'input-email', placeholder: 'add more people...' }, { keypress: keyPressInput, paste: emailsPaste })
    ));

    // work with the props
    if (props.addRandomEmail) {
        const addRandomEmail = (event) => {
            event.target.parentElement.querySelector('#list-emails-container').appendChild(emailBlock(randomEmail()));
        }
        node.appendChild(
            elementFactory('input', { type: 'button', class: 'emails-container-button', value: 'Add Email' }, { click: addRandomEmail })
        );
    }

    if (props.getEmailCount) {
        const getEmailCount = () => {
            alert(`${node.querySelectorAll('.email-block').length} valid email${node.querySelectorAll('.email-block').length > 1 ? 's' : ''}`);
        }
        node.appendChild(
            elementFactory('input', { type: 'button', class: 'emails-container-button', value: 'Get emails count' }, { click: getEmailCount })
        );
    }
}

// Make library accesible on window 
window.EmailsInput = EmailsInput;


