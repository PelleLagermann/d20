function actionHandler (value) {
    var newInput = {
        type: inputType.action,
        value: value
    };
    if (!!cur) {
        if (cur.type === inputType.action) {
            cur.value = value;            
        } else {
            formula.push(cur);
            cur = newInput;
        }        
    } else {
        cur = newInput;
    }
}

function clearHandler (value) {
    if (value === "clear") {
        formula = [];
        cur = null;
        outputElem.textContent = "";        
    }

    if (value === "del") {
        cur = formula.pop();
    }    
}

function diceHandler (value) {    
    var newInput = {
        type: inputType.dice,        
        rolls: 1,
        dice: value,
        isCustom: value === "x"
    };
    newInput.value = newInput.rolls + "d" + newInput.dice;

    if (!!cur) {
        switch (cur.type) {
            case inputType.action:
                formula.push(cur);
                cur = newInput;
                break;                
            case inputType.dice:
                if (cur.dice === value ||
                    cur.isCustom && value === "x") {
                    cur.rolls++;
                    cur.value = cur.rolls + "d" + cur.dice;
                } else {
                    formula.push(cur);
                    formula.push({
                        type: inputType.action,
                        value: "+"
                    });
                    cur = newInput;
                }
                
                break;
            case inputType.number:                            
                newInput.rolls = cur.value;
                newInput.value = newInput.rolls + "d" + newInput.dice;
                cur = newInput;
        }
    } else {
        cur = newInput;
    }    
}

function numberHandler (value) {    
    var newInput = {
        type: inputType.number,
        value: value
    };

    if (!!cur) {
        switch (cur.type) {
            case inputType.action:
                formula.push(cur);
                cur = newInput;
                break;                
            case inputType.dice: 
                if (cur.isCustom) {                    
                    cur.dice = cur.dice.replace("x", "") + value;
                    cur.value = cur.rolls + "d" + cur.dice;
                } else {
                    formula.push(cur);
                    cur = newInput;
                }               
                
                break;
            case inputType.number:                
            default:
                cur.value += "" + value;                
        }
    } else {
        cur = newInput;
    }    
}

function paranthesesHandler (value) {

}

function rollHandler (value) {   
    if (cur) {
        formula.push(cur);
        cur = null;
    }
    
    let formulaStr = buildFormulaStr();    
    console.log("formulaStr", formulaStr);
    
    //perform dice rolls
    //var a = getRandomIntInclusive(1, value.replace("d", ""));

    const result = eval(formulaStr);
    outputFormulaElem.textContent = formulaStr;
    outputTotalElem.textContent = result;
    outputTotalElem.classList.add("animated", "zoomIn");
    

    setTimeout(function () {
        outputTotalElem.classList.remove("animated", "zoomIn");
    }, 700);
}



export { actionHandler, clearHandler, diceHandler, numberHandler, paranthesesHandler, rollHandler }