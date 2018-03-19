window.onload = initOptions;

function initOptions()
{

    var form = document.querySelector("form.form-generic"),
        textInputs,
        textInput;

    function addPopulatedInputs()
    {
        if (form.length === 0) return;

        var firstInputContainer = document.createElement("div"),
            firstInput = document.createElement("input");

        firstInputContainer.classList.add("input-wrapper");

        firstInput.setAttribute("type", "text");
        firstInput.setAttribute("placeholder", "Enter desired search term");
        firstInput.classList.add("input-generic");

        chrome.storage.sync.get({
            searchTerms: []
        }, function(data) {
            var searchTerms = data.searchTerms;
            for ( var len = searchTerms.length - 1; len >= 0; --len )
            {
                firstInput.value = searchTerms[len];
                firstInputContainer.appendChild(firstInput);
                form.insertBefore(firstInputContainer, form.firstChild);
            }
            textInputs = document.querySelectorAll(".input-generic"),
            textInput = textInputs[textInputs.length - 1].parentElement;
        });


    }

    addPopulatedInputs();

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

            textInputs = document.querySelectorAll(".input-generic"),
            textInput = textInputs[textInputs.length - 1].parentElement;

            inputContainerNew.classList.add("input-wrapper");

            inputNew.setAttribute("type", "text");
            inputNew.setAttribute("placeholder", "Enter desired search term");
            inputNew.classList.add("input-generic");
            inputContainerNew.appendChild(inputNew);
            form.insertBefore(inputContainerNew, textInput.nextElementSibling);
        }

        else if (action === "decrement")
        {
            textInputs = document.querySelectorAll(".input-generic");
            if (textInputs.length === 1) return;
            textInput = textInputs[textInputs.length - 1].parentElement;
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
            window.location.reload();
        });

    }

    form.addEventListener("submit", submitHandler);

}
