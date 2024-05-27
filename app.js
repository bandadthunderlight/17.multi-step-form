var stepFlagNumber = 1
var userPlanObject = {
  name: '',
  email: '',
  phone: '',
  plan: 'Arcade',
  yearly: false,
  onlineService: false,
  largerStorage: false,
  customizableProfile: false
}
monthText = document.querySelectorAll('.monthText')
yearText = document.querySelectorAll('.yearText')
offText = document.querySelectorAll('.offText')

formDataInputItems = document.querySelectorAll('.formData-input-item')
pickAddItemInputs = document.querySelectorAll('.pickAddItemInput')

formStepItemNumber = document.querySelectorAll('.formStep-item-number');

wholeDataWrapperItem = document.querySelectorAll('.wholeDataWrapper-item');

formDataPlanCards = document.querySelectorAll('.formData-planCard');

function clearAllData() { //clear all input datas and reset them to start process again
  formDataInputItems.forEach(item => {
    item.value = ''
  })
  pickAddItemInputs.forEach(item => {
    item.checked = false
  })
  document.querySelector('#monthYearSelec').checked = false
}

function navigatorHandler(event) {//handle navigation between form pages  
  if (event.target.id == 'nextBtn') {
    if (stepFlagNumber < 5) {
      stepFlagNumber++;
      // console.log(stepFlagNumber);
      formStepItemNumberHandler(stepFlagNumber)
      setFormDataHandler(stepFlagNumber)
    }


  } else if (event.target.id == 'backBtn') {
    if (stepFlagNumber > 1) {
      stepFlagNumber--;
      formStepItemNumberHandler(stepFlagNumber)
      setFormDataHandler(stepFlagNumber)
    }

  } else {
    console.log('internal error');
  }
}

function formStepItemNumberHandler(stepFlagNumber) {//change view of step icons
  formStepItemNumber.forEach(item => {
    item.classList.remove('activeStep')
    if (Number(item.id.slice(8, 9)) == stepFlagNumber) {
      item.classList.add('activeStep')
    }
  })
}

function setFormDataHandler(stepFlagNumber) { //call 2 func for set data view by changing step
  // console.log('the flag state is :' + stepFlagNumber);
  setFormTitle(stepFlagNumber)
  setFormTexts(stepFlagNumber)
}

function setFormTitle(stepFlagNumber) {// set form title by changing step
  switch (stepFlagNumber) {
    case 1:
      document.querySelector('.formData-title').innerHTML = 'Personal info'
      document.querySelector('.formData-subTitle').innerHTML = 'Please provide your name, email address, and phone number.'
      document.querySelector('.goBackBtn').style.visibility = 'hidden'
      break;
    case 2:
      document.querySelector('.formData-title').innerHTML = 'Select your plan'
      document.querySelector('.formData-subTitle').innerHTML = 'You have the option of monthly or yearly billing.'
      document.querySelector('.goBackBtn').style.visibility = 'visible'
      break;
    case 3:
      document.querySelector('.formData-title').innerHTML = 'Pick add-ons'
      document.querySelector('.formData-subTitle').innerHTML = 'Add-ons help enhance your gaming experience'
      document.querySelector('.goNextBtn').textContent = 'Next Step'
      setupYearlyHandler()
      break;
    case 4:
      document.querySelector('.formData-title').innerHTML = 'Finishing up'
      document.querySelector('.formData-subTitle').innerHTML = 'Double-check everything looks OK before confirming.'
      document.querySelector('.goNextBtn').textContent = 'Confirm'
      break;
    case 5:
      document.querySelector('.formData-title').innerHTML = ''
      document.querySelector('.formData-subTitle').innerHTML = ''
      finishingUpHandler()
      break;
  }
}

function setFormTexts(stepFlagNumber) {//set form text by changing step
  wholeDataWrapperItem.forEach(item => {
    item.classList.add('doNotDisplay')
  })
  switch (stepFlagNumber) {
    case 1:
      document.querySelector('.formData-bodyWrapper').classList.remove('doNotDisplay')
      break;
    case 2:
      document.querySelector('.formData-planWrapper').classList.remove('doNotDisplay')
      document.querySelector('.monthlyYearly-container').classList.remove('doNotDisplay')
      break;
    case 3:
      document.querySelector('.formData-pickAddWrapper').classList.remove('doNotDisplay')
      break;
    case 4:
      document.querySelector('.formData-finishingWrapper').classList.remove('doNotDisplay')
      showFinalCheckup()
      break;
    case 5:
      document.querySelector('.final-notification').classList.remove('doNotDisplay')
      document.querySelector('.goBackBtn').classList.add('doNotDisplay')
      document.querySelector('.goNextBtn').classList.add('doNotDisplay')
      break;
  }
}

function selectPlanHandler(event) {//change view of plan cards by selecting them
  formDataPlanCards.forEach(item => {
    item.classList.remove('activePlanCard')
  })
  if (event.target.classList == 'formData-planCard') {
    event.target.classList.add('activePlanCard')
    userPlanObject.plan = event.target.id
  } else if (event.target.parentElement.classList == 'formData-planCard') {
    event.target.parentElement.classList.add('activePlanCard')
    userPlanObject.plan = event.target.parentElement.id
  } else if (event.target.parentElement.parentElement.classList == 'formData-planCard') {
    event.target.parentElement.parentElement.classList.add('activePlanCard')
    userPlanObject.plan = event.target.parentElement.parentElement.id
  }
  // console.log(userPlanObject);
}

function monthYearSelectHandler(event) {//change view of page2 when mo/yr selector changes
  if (event.target.checked == true) {
    userPlanObject.yearly = true
    document.querySelector('#monthSelect').style.color = '#808080'
    document.querySelector('#yearSelect').style.color = '#02295a'
    monthText.forEach(item => {
      item.classList.add('doNotDisplay')
    })
    yearText.forEach(item => {
      item.classList.remove('doNotDisplay')
    })
    offText.forEach(item => {
      item.classList.remove('doNotDisplay')
    })
  }
  else if (event.target.checked == false) {
    userPlanObject.yearly = false
    document.querySelector('#monthSelect').style.color = '#02295a'
    document.querySelector('#yearSelect').style.color = '#808080'
    monthText.forEach(item => {
      item.classList.remove('doNotDisplay')
    })
    yearText.forEach(item => {
      item.classList.add('doNotDisplay')
    })
    offText.forEach(item => {
      item.classList.add('doNotDisplay')
    })
  }
  // console.log(userPlanObject);
}
function setupYearlyHandler() {//change view of page3 when mo/yr selector changes
  if (userPlanObject.yearly) {
    document.querySelector('#addItem-onlineSrv-amount').innerHTML = '+$10/yr'
    document.querySelector('#addItem-lrgerStr-amount').innerHTML = '+$20/yr'
    document.querySelector('#addItem-custmable-amount').innerHTML = '+$10/yr'
  } else {
    document.querySelector('#addItem-onlineSrv-amount').innerHTML = '+$1/mo'
    document.querySelector('#addItem-lrgerStr-amount').innerHTML = '+$2/mo'
    document.querySelector('#addItem-custmable-amount').innerHTML = '+$1/mo'
  }
}

function pickAddItemHandler(event) {//change userplanObject by check or uncheck addOns
  if (event.target.id == 'onlineService') {
    if (event.target.checked == true) {
      userPlanObject.onlineService = true
    } else {
      userPlanObject.onlineService = false
    }
  }
  if (event.target.id == 'largerStorage') {
    if (event.target.checked == true) {
      userPlanObject.largerStorage = true
    } else {
      userPlanObject.largerStorage = false
    }
  }
  if (event.target.id == 'customizableProfile') {
    if (event.target.checked == true) {
      userPlanObject.customizableProfile = true
    } else {
      userPlanObject.customizableProfile = false
    }
  }
  // console.log(userPlanObject);
}

function finishingUpHandler() {//set name & email & phone in userplanObject in final state
  userPlanObject.name = document.querySelector('#name-input').value
  userPlanObject.email = document.querySelector('#email-input').value
  userPlanObject.phone = document.querySelector('#phone-input').value
  localStorage.setItem('userPlanObject', JSON.stringify(userPlanObject))
  // console.log(userPlanObject);
}

function showFinalCheckup() { // handle view of final check page

  // set plan in final page
  document.querySelector('.finalStatePlan').innerHTML = userPlanObject.plan
  let finalStatePlanCost = document.querySelector('.finalStatePlanCost')
  if (userPlanObject.yearly) {
    if (userPlanObject.plan == 'Arcade') {
      finalStatePlanCost.innerHTML = '$90/yr'
    } else if (userPlanObject.plan == 'Advanced') {
      finalStatePlanCost.innerHTML = '$120/yr'
    } else if (userPlanObject.plan == 'Pro') {
      finalStatePlanCost.innerHTML = '$150/yr'
    }
  } else {
    if (userPlanObject.plan == 'Arcade') {
      finalStatePlanCost.innerHTML = '$9/mo'
    } else if (userPlanObject.plan == 'Advanced') {
      finalStatePlanCost.innerHTML = '$12/mo'
    } else if (userPlanObject.plan == 'Pro') {
      finalStatePlanCost.innerHTML = '$15/mo'
    }
  }


  // set addons in final page
  let formDataFinishingAddons = document.querySelector('.formData-finishing-addons')
  formDataFinishingAddons.innerHTML = ''
  if (userPlanObject.yearly) {
    if (userPlanObject.onlineService) {
      formDataFinishingAddons.insertAdjacentHTML('beforeend', `
           <div class="finishing-addons-items">
                  <span>Online service</span>
                  <span>+$10/yr</span>
                </div>
      `)
    }
    if (userPlanObject.largerStorage) {
      formDataFinishingAddons.insertAdjacentHTML('beforeend', `
           <div class="finishing-addons-items">
                  <span>Larger starage</span>
                  <span>+$20/yr</span>
                </div>
      `)
    }
    if (userPlanObject.customizableProfile) {
      formDataFinishingAddons.insertAdjacentHTML('beforeend', `
           <div class="finishing-addons-items">
                  <span>Customizable Profile</span>
                  <span>+$10/yr</span>
                </div>
      `)
    }
  } else {
    if (userPlanObject.onlineService) {
      formDataFinishingAddons.insertAdjacentHTML('beforeend', `
           <div class="finishing-addons-items">
                  <span>Online service</span>
                  <span>+$1/mo</span>
                </div>
      `)
    }
    if (userPlanObject.largerStorage) {
      formDataFinishingAddons.insertAdjacentHTML('beforeend', `
           <div class="finishing-addons-items">
                  <span>Larger starage</span>
                  <span>+$2/mo</span>
                </div>
      `)
    }
    if (userPlanObject.customizableProfile) {
      formDataFinishingAddons.insertAdjacentHTML('beforeend', `
           <div class="finishing-addons-items">
                  <span>Customizable Profile</span>
                  <span>+$1/mo</span>
                </div>
      `)
    }
  }


  // set total amount in final page
  let myfinishingAddonsItems = document.querySelectorAll('.finishing-addons-items')
  if (userPlanObject.yearly) {
    let totalAmount = Number(document.querySelector('.finalStatePlanCost').textContent.slice(1, 4))
    if (!totalAmount) { totalAmount = Number(document.querySelector('.finalStatePlanCost').textContent.slice(1, 3)) }
    myfinishingAddonsItems.forEach(item => {
      totalAmount = totalAmount + Number(item.children[1].textContent.slice(2, 4));
    })
    document.querySelector('.totalFinalAmount-title').textContent = 'Total (per year)'
    document.querySelector('.totalFinalAmount-number').textContent = `+$${totalAmount}/yr`
  } else {
    let totalAmount = Number(document.querySelector('.finalStatePlanCost').textContent.slice(1, 3))
    if (!totalAmount) { totalAmount = Number(document.querySelector('.finalStatePlanCost').textContent.slice(1, 2)) }
    myfinishingAddonsItems.forEach(item => {
      totalAmount = totalAmount + Number(item.children[1].textContent.slice(2, 3));
    })
    document.querySelector('.totalFinalAmount-title').textContent = 'Total (per year)'
    document.querySelector('.totalFinalAmount-number').textContent = `+$${totalAmount}/mo`
  }

}

function checkInputs(event) { //check first page inputs validity

  if (event.target.validity.valueMissing) {
    event.target.previousSibling.previousSibling.previousSibling.previousSibling.classList.remove('doNotDisplay')
  } else {
    event.target.previousSibling.previousSibling.previousSibling.previousSibling.classList.add('doNotDisplay')
  }
}

