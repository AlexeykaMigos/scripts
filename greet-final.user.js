(function () {
    const buttonHtml = '<button id="insertTextButton" class="btn btn-default btn-sm">👋</button>';

    // Добавляем кнопку
    function addButton() {
        const PREVIEW_BUTTON = document.querySelector('[data-marker="preview/button"]');
        const existingButton = document.querySelector('#insertTextButton');

        if (existingButton) {
            return;
        }

        if (!PREVIEW_BUTTON) {
            return;
        }

        // Глазик
        PREVIEW_BUTTON.insertAdjacentHTML('afterend', buttonHtml);

        const BTN = document.querySelector('#insertTextButton');
        BTN.addEventListener('click', onButtonClick);
    }

    function onButtonClick(e) {
        e.preventDefault();
        const TEXT_FIELD = getTextFieldOrHandleMutation();
        if (TEXT_FIELD) {
            TEXT_FIELD.focus();
            sxSaveReactInput(TEXT_FIELD, "Здравствуйте.\n\n" + TEXT_FIELD.value);
        }
    }

    function sxSaveReactInput(input, newVal) {
        let lastValue = input.value;
        input.value = newVal;
        let event = new Event('input', { bubbles: true });
        event.simulated = true;
        let tracker = input._valueTracker;
        if (tracker) {
            tracker.setValue(lastValue);
        }
        input.dispatchEvent(event);
    }

    // Проверяем или получаем текстовое поле
    function getTextFieldOrHandleMutation() {
        let isFieldChecked = false; 
        const TEXT_FIELD = document.querySelector('[data-userscript-marker="comment-field/textarea"]');
        if (TEXT_FIELD) {
            if (!isFieldChecked) {
                addButton();
                isFieldChecked = true; 
            }
        } else {
            isFieldChecked = false; 
        }
        return TEXT_FIELD;
    }

    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            getTextFieldOrHandleMutation();
        }
    });

    window.addEventListener('load', () => {
        getTextFieldOrHandleMutation();
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
        });
    });

})();