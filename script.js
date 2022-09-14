// =======================================
// assign html element by ID to variable
// =======================================
const form = document.getElementById("form");
const holderName = document.getElementById("cc__name");
const ccNumber = document.getElementById("cc__number");
const ccExpMonth = document.getElementById("cc__exp_month");
const ccExpYear = document.getElementById("cc__exp_year");
const cvcNumber = document.getElementById("cvc__number");
const continueBtn = document.getElementById("continue__btn");
const completeStatus = document.getElementById("complete__stat");

// deafault card details
const defaultCardDeatails = () => {
  holderName.textContent = "jane appleseed"
  ccNumber.textContent = "0000 0000 0000 0000"
  ccExpMonth.textContent = "00"
  ccExpYear.textContent = "00"
  cvcNumber.textContent = "000"
}
// set default card details 
defaultCardDeatails()

// Input Event listner on form
form.addEventListener("input", (e) => {
  // target = current focused input
  let target = e.target;

  // cardHolder name
  if (target === form["cardHolder"]) {
    holderName.innerHTML = target.value;
    return;
  }

  // card number
  if (target === form["ccNumber"]) {
    let cardNumber = target.value;

    // enter only 0-9
    // let formattedCardNumber = numberOnly(cardNumber)
    let formattedCardNumber = cardNumber.replace(/\D/g, "");

    // Split the card numbers into 4 seprate group in a input
    let cardNumberSections = cardNumber.match(/\d{1,4}/g);

    // join 4 group of card with " " and store in formattedCardNumber
    if (cardNumberSections !== null) {
      formattedCardNumber = cardNumberSections.join(" ");
    }

    // update card number on card
    ccNumber.textContent = formattedCardNumber;

    // If the formmattedCardNumber is different to what is shown, change the value
    if (cardNumber !== formattedCardNumber) {
      target.value = formattedCardNumber;
    }
  }

  // expiry month
  if (target === form["ccMonth"]) {
    target.value = target.value.replace(/\D/g, "");
    if (target.value.length < 2) {
      return (ccExpMonth.textContent = "0" + target.value);
    }
    // let monthOnly = target.value.replace(/\D/g, "")
    ccExpMonth.textContent = target.value;
    return;
  }

  // expiry year
  if (target === form["ccYear"]) {
    target.value = target.value.replace(/\D/g, "");
    if (target.value.length < 2) {
      ccExpYear.textContent = "0" + target.value;
    } else {
      ccExpYear.textContent = target.value;
    }
    return;
  }

  // cvc number
  if (target === form["cvcNumber"]) {
    // update card cvc number
    target.value = target.value.replace(/\D/g, "");
    cvcNumber.textContent = target.value;
  }
});

// fouction for show error
const setError = (input, message) => {
  input.classList.add("red");
  let target = input.parentElement;
  let err = target.querySelector(".error");
  err.classList.add("show");
  err.textContent = message;
};

// function for remove error
const setSuccess = (input) => {
  input.classList.remove("red");
  let target = input.parentElement;
  let slectedElemnt = target.querySelector(".error");
  slectedElemnt.classList.remove("show");
  slectedElemnt.textContent = "";
};

// validate all form input value on sumbmit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let name = form["cardHolder"];
  let cardNumber = form["ccNumber"];
  let cardMonth = form["ccMonth"];
  let cardYear = form["ccYear"];
  let cvcNumber = form["cvcNumber"];

  // make var input and set as 0 and add 1 on every valid input if all input are valid then input === 5
  let input = 0;

  // check card holder name is valid
  if (name.value.trim() === "") {
    setError(name, "Can't be blank");
  } else {
    setSuccess(name);
    input++;
  }

  // check card number
  if(cardNumber.value.length < 1){
    setError(cardNumber, "Can't be blank");
  }else if (cardNumber.value.length >= 1 || cardNumber.value.length !== 19) {
    setError(cardNumber, "Card number must be 16 digit");
  } else {
    setSuccess(cardNumber);
    input++;
  }

  // check card expiry month
  if (cardMonth.value > 12) {
    setError(cardMonth, `${cardMonth.value} Not valid`);
  } else if (cardMonth.value < 1) {
    setError(cardMonth, `Can't be blank`);
  } else {
    setSuccess(cardMonth);
    input++;
  }

  // check card expiry year
  if (cardYear.value < 1) {
    setError(cardYear, "Can't be blank");
  }else{
   setSuccess(cardYear);
    input++;
  }

  // check card cvc number
  if (cvcNumber.value.length < 1) {
    setError(cvcNumber, `Can't be blank`);
  } else if (cvcNumber.value.length < 3) {
    setError(cvcNumber, `CVC must be 3 digit`);
  } else {
    setSuccess(cvcNumber);
    input++;
  }

  // if all 5 inputs are valid
  if (input === 5) {
    // hide form
    form.classList.add("display__none");
    // show complete states
    completeStatus.classList.add("show");
    // reset form
    form.reset()
  }
});

// contiue button for complete state
continueBtn.addEventListener("click", () => {
  // set default card details 
  defaultCardDeatails()
  
  // show form
  form.classList.remove("display__none");
  
  // hide complete state
  completeStatus.classList.remove("show");
});
