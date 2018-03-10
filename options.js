window.onload = initOptions;

function initOptions()
{

    var textInputs = document.querySelectorAll(".input-generic"),
        textInput = textInputs[textInputs.length - 1].parentElement,
        form = textInput.parentElement;

    if (form.length === 0)
    {
        throw "Form is missing!";
        return;
    }

    var customValidation = function(formElem)
    {

        for ( var i = 0; i < formElem.elements.length; i++ )
        {
            
            var formInput = formElem.elements[i].tagName.toLowerCase();

            if ( formInput === "button" || formInput === "label" ) continue;

            instantiateMethods(formElem.elements[i]);
        }

    };

    function addRemove()
    {
        var action = this.dataset.action;

        if (action === "increment")
        {
            var inputContainerNew = document.createElement("div"),
                inputNew = document.createElement("input");

            inputContainerNew.classList.add("input-wrapper");

            inputNew.setAttribute("type", "text");
            inputNew.setAttribute("placeholder", "Enter desired search term");
            inputNew.classList.add("input-generic");
            inputContainerNew.appendChild(inputNew);
            form.insertBefore(inputContainerNew, textInput.nextElementSibling);
        }

        else if (action === "decrement")
        {
            var inputCount = document.querySelectorAll(".input-generic");
            if (inputCount.length === 1) return;
            form.removeChild(textInput);
        }

    }

    function buttonEvents()
    {

        let toggleBtns = document.querySelectorAll(".cta-toggle");

        Array.from(toggleBtns).forEach(function(toggleBtn)
        {
            toggleBtn.addEventListener("click", addRemove, true);
        });

    }

    buttonEvents();

    function submitHandler(event)
    {
        event.preventDefault();
        customValidation(this);

        if ( !this.checkValidity() )
        {
            alert("Form is not valid!");
            return;
        }

        var textInputs = this.querySelectorAll(".input-generic"),
            optionsArray = [];

        for ( var i = 0; i < textInputs.length; i++ )
        {
            optionsArray.push(textInputs[i].value);
        }

        if (!optionsArray.length) return;

        chrome.storage.sync.set({
            searchTerms: optionsArray
        }, function() {
            console.log("Added to list!");
        });

    }

    form.addEventListener("submit", submitHandler);

}
