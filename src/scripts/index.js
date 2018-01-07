import { prototypes } from "./helpers/prototypes.js";

import { navigation } from "./navigation.js";

import { getRandomIntInclusive } from "./helpers/rand.js";
import { actionHandler, clearHandler, diceHandler, numberHandler, paranthesesHandler, rollHandler } from './inputHandlers.js';
import { findAncestor } from "./helpers/findAncestor.js";
import { clickHandler } from "./helpers/clickHandler.js";

import { registerServiceWorker } from "./registerServiceWorker.js";

//Styles
import "./../styles/index.scss";

//Inits
registerServiceWorker.init();
navigation.init();
prototypes.init();



//Globals
global.findAncestor = findAncestor;

global.inputType = {
    action: "action",
    clear: "clear",
    del: "del",
    dice: "dice",
    number: "number",
    parantheses: "parantheses",    
    roll: "roll"
};

global.operators = {
    "/": "÷",
    "*": "×",
    "-": "-",
    "+": "+"
};

global.formula = [];
global.cur = null;

//Elements
global.formulaElem = document.querySelector(".formula");
global.outputElem = document.querySelector(".output");
global.outputFormulaElem = document.querySelector(".output__formula");
global.outputTotalElem = document.querySelector(".output__total");
global.buttonWrapper = document.querySelector(".controls-wrapper");

//Input handlers
global.handlers = {
    action: actionHandler,
    clear: clearHandler,
    dice: diceHandler,
    number: numberHandler,    
    parantheses: paranthesesHandler,
    roll: rollHandler
};

global.printFormula = function () {
    formulaElem.textContent = buildFormulaStr(true);
}

global.buildFormulaStr = function (buildForDisplay) {
    let formulaStr = "";
    for (let i = 0; i < formula.length; i++) {
        let part = formula[i];
        if (buildForDisplay) {
            formulaStr = formulaStr + part.value + " ";
        } else {
            if (part.type === inputType.dice) {
                let total = 0;
                let rolls = 0;
                for (let i = 1; i <= part.rolls; i++) {
                    rolls++;
                    total += getRandomIntInclusive(1, part.dice);
                }

                formulaStr = formulaStr + "(" + total + ") ";
            } else {
                formulaStr = formulaStr + formula[i].value + " ";
            }            
        }
        
    }

    if (!!cur) {
        formulaStr += cur.value;
    }

    if (buildForDisplay) {
        formulaStr = formulaStr.replaceAll("/", operators["/"]);
        formulaStr = formulaStr.replaceAll("\\*", operators["*"]);
        formulaStr = formulaStr.replaceAll("-", operators["-"]);
        formulaStr = formulaStr.replaceAll("\\+", operators["+"]);
    }

    return formulaStr;
}

buttonWrapper.addEventListener("click", clickHandler, false);