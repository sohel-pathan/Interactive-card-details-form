// declare variable
const form = document.getElementById("form");
//  card
const holderName = document.getElementById("cc__name");
const ccNumber = document.getElementById("cc__number");
const ccExpMonth = document.getElementById("cc__exp_month");
const ccExpYear = document.getElementById("cc__exp_year");
const cvcNumber = document.getElementById("cvc__number");
const continueBtn = document.getElementById("continue__btn");
const completeStatus = document.getElementById("complete__stat");

// deafault card details
const defaultCardDeatails = () => {
  holderName.textContent = "jane appleseed";
  ccNumber.textContent = "0000 0000 0000 0000";
  ccExpMonth.textContent = "00";
  ccExpYear.textContent = "00";
  cvcNumber.textContent = "000";
};
// set default card details
defaultCardDeatails();

// Input Event listner on form
form.addEventListener("input", (e) => {
  // target = current input
  let target = e.target;

  // cardHolder name
  if (target === form["cardHolder"]) {
    return (holderName.innerText = target.value);
  } else {
    // only number
    let formattedNumber = target.value.replace(/\D/g, "");
    // card number
    if (target === form["ccNumber"]) {
      // Split the card numbers into 4 group in cardNumberSections as array
      let cardNumberSections = formattedNumber.match(/\d{1,4}/g);

      // join group of cardNumberSections with join
      if (cardNumberSections !== null) {
        formattedNumber = cardNumberSections.join(" ");
      }
      // update number on card
      ccNumber.textContent = formattedNumber;
    }

    // expiry month
    if (target === form["ccMonth"]) {
      formattedNumber.length < 2
        ? (ccExpMonth.textContent = "0" + formattedNumber)
        : (ccExpMonth.textContent = formattedNumber);
    }

    // expiry year
    if (target === form["ccYear"]) {
      formattedNumber.length < 2
        ? (ccExpYear.textContent = "0" + formattedNumber)
        : (ccExpYear.textContent = formattedNumber);
    }

    // cvc number
    if (target === form["cvcNumber"]) {
      cvcNumber.textContent = formattedNumber;
    }
    // formattedNumber number in input
    return (target.value = formattedNumber);
  }
});

// fouction for show error
const setError = (input, message) => {
  input.classList.add("red");
  let target = input.parentElement.querySelector(".error");
  target.classList.add("show");
  target.textContent = message;
};

// function for remove error
const setSuccess = (input) => {
  input.classList.remove("red");
  let target = input.parentElement.querySelector(".error");
  target.classList.remove("show");
  target.textContent = "";
};

// validate all form input value on sumbmit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let name = form["cardHolder"];
  let cardNumber = form["ccNumber"];
  let cardMonth = form["ccMonth"];
  let cardYear = form["ccYear"];
  let cvcNumber = form["cvcNumber"];

  // make variable input and set as 0 and add 1 on every valid input if all input are valid then input === 5
  let input = 0;

  //  card holder name is valid
  if (name.value.trim() == "") {
    setError(name, "Can't be blank");
  } else {
    setSuccess(name);
    input++;
  }

  //  card number
  if (cardNumber.value.length < 1) {
    setError(cardNumber, "Can't be blank");
  } else if (cardNumber.value.length < 19) {
    setError(cardNumber, "Card number must be 16 digit");
  } else {
    input++;
    setSuccess(cardNumber);
  }

  //  card expiry month
  if (cardMonth.value.length < 1 || parseInt(cardMonth.value) < 1) {
    setError(cardMonth, `Can't be blank`);
  } else if (parseInt(cardMonth.value) > 12) {
    setError(cardMonth, `${cardMonth.value} Not valid`);
  } else {
    input++;
    setSuccess(cardMonth);
  }

  //  card expiry year
  if (parseInt(cardYear.value) < 1 || cardYear.value.length < 1) {
    setError(cardYear, "Can't be blank");
  } else {
    input++;
    setSuccess(cardYear);
  }
  //  card cvc number
  console.log(cvcNumber.value.length);
  if (cvcNumber.value.length < 3) {
    setError(cvcNumber, `CVC must be 3 digit`);
  } else {
    input++;
    setSuccess(cvcNumber);
  }

  // input equal 5  all inputs are valid
  if (input === 5) {
    // hide form
    form.classList.add("display__none");
    // show complete states
    completeStatus.classList.add("show");
    // reset form
    form.reset();
  }
});

// contiue button for complete state
continueBtn.addEventListener("click", () => {
  // set card detail to default
  defaultCardDeatails();

  // show form
  form.classList.remove("display__none");

  // hide complete states
  completeStatus.classList.remove("show");
});
