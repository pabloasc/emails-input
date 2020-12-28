const EmailsInput = require('emails-input');
const { mainModule } = require('process');

describe('EmailsInput tests', () => {
    test('randomEmail expect random email to be generated', () => {
        const container = document.createElement('div');
        const emailInputComponent = EmailsInput(container, {});
        expect(emailInputComponent.randomEmail()).toMatch(/@mail.ru/);
    });

    test('emailIsValid expect to validate emails', () => {
        const container = document.createElement('div');
        const emailInputComponent = EmailsInput(container, {});
        expect(emailInputComponent.emailIsValid('tim@mail.ru')).toBe(true);
        expect(emailInputComponent.emailIsValid('timmail.ru')).toBe(false);
        expect(emailInputComponent.emailIsValid('tim@mailru')).toBe(false);
    });


    it('Email block to match snapshot', () => {
        const container = document.createElement('div');
        const emailInputComponent = EmailsInput(container, {});
      
        expect(emailInputComponent.emailBlock('email@mail.ru')).toMatchSnapshot();
    });
});