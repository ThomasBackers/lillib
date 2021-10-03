//------------------------
// MATHEMATICAL FUNCTIONS
//------------------------
/**
 * Random float generator:
 * range [min, max[
 * @param {number} min - minimum value (included)
 * @param {number} max - maximum value (excluded)
 * @returns {number} - a random float
 */
export const rand = (min, max) => {
    if (min > max) throw new RangeError("minimum cannot be higher than maximum");
    return Math.random() * (max - min) + min;
};

/**
 * Random integer generator:
 * range [min, max[
 * if you need a [min, max]: +1 to max
 * @param {number} min - minimum value (included)
 * @param {number} max - maximum value (excluded)
 * @returns {number} - a random integer
 */
export const randInt = (min, max) => {
    if (min > max) throw new RangeError("minimum cannot be higher than maximum");
    return Math.floor(Math.random() * (max - min) + min);
};

//------------------
// ARRAYS FUNCTIONS
//------------------
/**
 * Remove a value from an array:
 * if there are several identical values it removes the first one encountered
 * @param {array} array - any array
 * @param {*} value - any value inside the array
 */
// wonder why there is still not a similar native array method (?)
export const arrRemove = (array, value) => array.splice(array.indexOf(value), 1);

/**
 * Array shuffler:
 * using the Fisher-Yates algorithm,
 * it returns the shuffled array
 * @param {array} array - any array
 * @returns {array} - the shuffled array
 */
export const shuffleArr = array => {
    const arrayCopy = [...array];
    for (let i = arrayCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arrayCopy[i];
        arrayCopy[i] = arrayCopy[j];
        arrayCopy[j] = temp;
    }
    return arrayCopy;
};

/**
 * n Random draw(s) in a list
 * @param {array} array - any array
 * @param {number} n - amount of draws
 * @returns {*} - any type for a single draw | the draws array
 */
export const randDraw = (array, n) => {
    if (n < 1) throw new RangeError("the amount of draws has to be at least equal to 1");
    const draws = [];
    for (let i = 0; i < n; i++) draws.push(array[randInt(0, array.length)]);
    return n === 1 ? draws[0] : draws;
};

/**
 * n Random draw(s) without remittance in a list
 * @param {array} array - any array
 * @param {number} n - amount of draws
 * @returns {*} - any type for a single draw | the draws array
 */
export const noRandDraw = (array, n) => {
    if (n < 1) throw new RangeError("the amount of draws has to be at least equal to 1");
    if (n > array.length)
        throw new RangeError("the amout of unique draws cannot exceeds the array length");
    const arrayCopy = [...array];
    const draws = [];
    let draw;
    for (let i = 0; i < n; i++) {
        draw = arrayCopy[randInt(0, arrayCopy.length)];
        draws.push(draw);
        arrRemove(arrayCopy, draw);
    }
    return n === 1 ? draws[0] : draws;
};

//-----------------
// NODES FUNCTIONS
//-----------------
/**
 * Swap two nodes:
 * from anywhere in the DOM
 * @param {object} node1 - first node
 * @param {object} node2 - second node
 */
export const swapNodes = (node1, node2) => {
    const parentNode2 = node2.parentNode;
    if (parentNode2.childNodes[parentNode2.childNodes.length - 1] === node2)
        // swapNodes absolutely needs node2 to have a nextSibling
        parentNode2.appendChild(document.createTextNode(""));
    const afterNode2 = node2.nextSibling;
    node1.replaceWith(node2);
    parentNode2.insertBefore(node1, afterNode2);
};

//------------------
// COLORS FUNCTIONS
//------------------
/**
 * Transforms a RGB(a) color code into an array of numbers:
 * @param {string} color - rgb(r, g, b) | rgba(r, g, b, a)
 * @param {boolean} rgbaMode - optional: false by default
 * @returns {array<number>} - [r, g, b] | [r, g, b, a]
 */
export const splitRgb = (color, rgbaMode = false) => {
    // first line returns ['rgb(r', ' g', ' b)'] or ['rgba(r', ' g', ' b', ' a)']
    const splittedColor = color.split(",");
    const rgbArray = [];
    const g = splittedColor[1].replace(" ", "");
    if (rgbaMode) {
        const r = splittedColor[0].replace("rgba(", "");
        const b = splittedColor[2].replace(" ", "");
        const a = splittedColor[3].replace(" ", "").replace(")", "");
        rgbArray.push(parseInt(r), parseInt(g), parseInt(b), parseFloat(a));
    } else {
        const r = splittedColor[0].replace("rgb(", "");
        const b = splittedColor[2].replace(")", "");
        rgbArray.push(parseInt(r), parseInt(g), parseInt(b));
    }
    return rgbArray;
};

/**
 * Converts a RGB(a) color code into a hexadecimal one
 * @param {string} color - rgb(r, g, b) | rgba(r, g, b, a)
 * @param {boolean} rgbaMode - optional: false by default
 * @returns {string} - #rrggbb | #rrggbbaa
 */
export const rgbToHex = (color, rgbaMode = false) => {
    const rgbArray = splitRgb(color, rgbaMode);
    const hexArray = [];
    for (let i = 0; i < rgbArray.length; i++) {
        if (i === 3) hexArray.push(Math.round(rgbArray[i] * 100));
        else
            rgbArray[i].toString(16).length === 1
                ? hexArray.push("0" + rgbArray[i].toString(16))
                : hexArray.push(rgbArray[i].toString(16));
    }
    let hex = "#";
    for (let hexValue of hexArray) hex += hexValue;
    return hex;
};

export const rgbToHsl = () => {};

/**
 * Converts a hexadecimal(a) color code into a rgb one
 * @param {string} color - #rrggbb | #rrggbbaa
 * @param {boolean} alphaMode - optional: false by default
 * @returns {string} - rgb(r, g, b) | rgba(r, g, b, a)
 */
export const hexToRgb = (color, alphaMode = false) => {
    //yourNumber = parseInt(hexString, 16);
    let rgbValue = alphaMode ? "rgba(" : "rgb(";
    let currentValue = "";
    for (let i = 1; i < color.length; i++) {
        currentValue += color[i];
        if (i % 2 === 0) {
            i !== 8
                ? (rgbValue += parseInt(currentValue, 16))
                : (rgbValue += parseInt(currentValue) / 100);
            if (i !== color.length - 1) {
                rgbValue += ", ";
                currentValue = "";
            } else rgbValue += ")";
        }
    }
    return rgbValue;
};

export const hexToHsl = () => {};

export const hslToRgb = () => {};

export const hslToHex = () => {};

/**
 * Random RGB(a) color code generator
 * @param {boolean} rgbaMode - optional: false by default
 * @returns {string} - rgb(r, g, b) | rgba(r, g, b, a)
 */
export const randRgb = (rgbaMode = false) => {
    return rgbaMode
        ? `rgba(${randInt(0, 256)}, ${randInt(0, 256)}, ${randInt(0, 256)}, ${Math.random().toFixed(1)})`
        : `rgb(${randInt(0, 256)}, ${randInt(0, 256)}, ${randInt(0, 256)})`;
};

/**
 * Invert a RGB(a) color code
 * @param {string} color - rgb(r, g, b) | rgba(r, g, b, a)
 * @param {boolean} rgbaMode - optional: false by default
 * @returns {string} - rgb(r, g, b) | rgba(r, g, b, a)
 */
export const invertRgb = (color, rgbaMode = false) => {
    // first line returns an array of numbers containing RGB(a) values
    const rgbArray = splitRgb(color, rgbaMode);
    for (let i = 0; i < rgbArray.length; i++) rgbArray[i] = (i === 3 ? 1 : 255) - rgbArray[i];
    if (rgbaMode) return `rgba(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]}, ${rgbArray[3]})`;
    else return `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;
};
