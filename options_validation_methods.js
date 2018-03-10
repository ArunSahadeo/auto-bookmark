window.onload = instantiateMethods;

function instantiateMethods(formInput)
{

    switch (formInput.type)
    {
        case "text":
            if ( formInput.value.length < 1 || !formInput.value.replace(/\s/g, '').length )
            {
                formInput.setCustomValidity("Please enter a value");
            }
            else formInput.setCustomValidity("");
        break;

        default:
            console.log(formInput.type);
        break;
    }
}
