function clickHandler (evt) {
    let btn;
    if (evt.target.nodeName !== "BUTTON") {
        btn = findAncestor(evt.target, "btn");
    } else {
        btn = evt.target;
    }    
    
    const type = btn.dataset.type; 
    const value = btn.dataset.value;

    if (!cur && formula.length > 0) {
        cur = formula.pop();
    }

    handlers[type](value);

    printFormula();
}

export { clickHandler }