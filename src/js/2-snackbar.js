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
                resolve(delay);
            } else {
                reject(delay);
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

    const delayValue = parseInt(delayInput.value);

    if (!delayValue || delayValue <= 0) {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a valid delay',
            position: 'topRight'
        });
        return;
    }

    let promise;
    if (radioFulfilled.checked) {
        promise = createPromise(true, delayValue);
    } else if (radioRejected.checked) {
        promise = createPromise(false, delayValue);
    } else {
        iziToast.error({
            title: 'Error',
            message: 'Please select promise state',
            position: 'topRight'
        });
        return;
    }

    promise
        .then(delay => {
            iziToast.success({
                title: 'Success',
                message: `Fulfilled promise in ${delay}ms`,
                position: 'topRight'
            });
        })
        .catch(delay => {
            iziToast.error({
                title: 'Error',
                message: `Rejected promise in ${delay}ms`,
                position: 'topRight'
            });
        })
        .finally(() => {
            clearInputs();
        });
});
