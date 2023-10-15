import {el, setChildren} from 'redom';
import Inputmask from 'inputmask';

const dateMask = new Inputmask('99/99');
const cvvMask = new Inputmask('999');
const nameMask = new Inputmask('Aaa| a| a| a| a| a| a| a| aa', {
  placeholder: ' ',
});
const numberMask = new Inputmask('9999 9999 9999 9999', {
  placeholder: 'x',
});

const displayInput = (input, displayBlock, defaultText) => {
  input.addEventListener('input', () => {
    if (input.value) {
      displayBlock.textContent = input.value;
    } else {
      displayBlock.textContent = defaultText;
    }
  });
};

const createCard = () => {
  const cardNumber = el('span.card__number', 'xxxx xxxx xxxx xxxx');
  const cardName = el('span.card__name', 'John Doe');
  const cardDate = el('span.card__date', '04/24');

  const nameInput = el('input.input.input__holder', {type: 'text'});
  const numberInput = el('input.input.input__number#cardNumber');
  const dateInput = el('input.input.input__date', {type: 'text'});
  const cvvInput = el('input.input.input__cvv', {type: 'text'});

  nameMask.mask(nameInput);
  numberMask.mask(numberInput);
  dateMask.mask(dateInput);
  cvvMask.mask(cvvInput);

  displayInput(nameInput, cardName, 'John Doe');
  displayInput(numberInput, cardNumber, 'xxxx xxxx xxxx xxxx');
  displayInput(dateInput, cardDate, '04/24');

  const form = el('form.form#form', {action: '#'}, [
    el('.form__input-wrap.form__input-wrap_holder', [
      el('label.form__label.form__holder-label', {for: ''}, 'Card Holder'),
      nameInput,
    ]),
    el('.form__input-wrap.form__input-wrap_number', [
      el('label.form__label.form__number-label', {for: ''}, 'Card Number'),
      numberInput,
    ]),
    el('.form__input-wrap.form__input-wrap_date', [
      el('label.form__label.form__date-label', {for: ''}, 'Card Expiry'),
      dateInput,
    ]),
    el('.form__input-wrap.form__input-wrap_cvv', [
      el('label.form__label.form__cvv-label', {for: ''}, 'CVV'),
      cvvInput,
    ]),
    el('button.form__button', 'CHECK OUT'),
  ]);


  return el('.card', [el('p.secure', 'Secure Checkout'), el('.credit-card', [
    cardNumber, el('.card__personal', [cardName, cardDate]),
  ]), form]);
};

const init = () => {
  const card = createCard();
  setChildren(document.body, el('.wrapper', [card]));
};

window.init = init;
