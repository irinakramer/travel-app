function checkInput(leavingFromText, goingToText) {
    let regexp = /^[a-zA-Z\s]{0,255}$/;
    if (regexp.test(leavingFromText) && regexp.test(goingToText)) {
        return
    } else {
        alert("please enter a valid name");
    }
}

export { checkInput }
