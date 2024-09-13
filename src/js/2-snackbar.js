import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const delayInput = document.querySelector('input[name="delay"]');
const radioFulfilled = document.querySelector('input[type="radio"][name="state"][value="fulfilled"]');
const radioRejected = document.querySelector('input[type="radio"][name="state"][value="rejected"]');
const notificationBtn = document.querySelector('button[type=submit]');

function createPromise(isSuccess, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isSuccess) {
                iziToast.success({
                    title: 'Success',
                    message: `Fulfilled promise in ${delay}ms`, 
                    position: 'topRight'
                });
                resolve();
            } else {
                iziToast.error({
                    title: 'Error',
                    message: `Rejected promise in ${delay}ms`, 
                    position: 'topRight'
                });
                reject();
            }
        }, delay);
    });
}

function clearInputs() {
    delayInput.value = '';
    radioFulfilled.checked = false;
    radioRejected.checked = false;
}


notificationBtn.addEventListener("click", event => {
    event.preventDefault();

    const delayValue = delayInput.value;
    
    if (!delayValue || delayValue <= 0) {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a valid delay',
            position: 'topRight'
        });
        return;
    }

    if (radioFulfilled.checked) {
        createPromise(true, delayValue);
        clearInputs()
    } else if (radioRejected.checked) {
        createPromise(false, delayValue);
        clearInputs()
    }
});