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
// wonder why it's still not a native array method xD
export const arrRemove = (array, value) => array.splice(array.indexOf(value), 1);

/**
 * Array shuffler:
 * using the Fisher-Yates algorithm,
 * it returns the shuffled the array
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
    let draw, index;
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
 * Swap two nodes :
 * from anywhere in the DOM
 * @param {object} node1 - first node
 * @param {object} node2 - second node
 */
export const swapNodes = (node1, node2) => {
    const parentNode2 = node2.parentNode;
    if (parentNode2.childNodes[parentNode2.childNodes.length - 1] === node2)
        parentNode2.appendChild(document.createTextNode("")); // swapNodes absolutely needs node2 to have a nextSibling
    const afterNode2 = node2.nextSibling;
    node1.replaceWith(node2);
    parentNode2.insertBefore(node1, afterNode2);
};

//------------------
// COLORS FUNCTIONS
//------------------
/**
 * Random RGB(a) color code generator
 * @param {boolean} rgbaMode - optional: false by default
 * @returns {string} - rgb(r, g, b) | rgba(r, g, b, a)
 */
export const randRGBColor = (rgbaMode = false) => {
    return rgbaMode
        ? `rgba(${randInt(0, 256)}, ${randInt(0, 256)}, ${randInt(0, 256)}, ${Math.random().toFixed(
              1
          )})`
        : `rgb(${randInt(0, 256)}, ${randInt(0, 256)}, ${randInt(0, 256)})`;
};

/**
 * Invert a RGB(a) color code
 * @param {string} color - rgb(r, g, b) | rgba(r, g, b, a)
 * @param {boolean} rgbaMode - optional: false by default
 * @returns {string} - rgb(r, g, b) | rgba(r, g, b, a)
 */
export const invertRGBColor = (color, rgbaMode = false) => {
    const splittedColor = color.split(","); // returns ['rgb(r', ' g', ' b)'] or ['rgba(r', ' g', ' b', ' a)']
    const rgb = [];
    const g = splittedColor[1].replace(" ", "");
    if (rgbaMode) {
        const r = splittedColor[0].replace("rgba(", "");
        const b = splittedColor[2].replace(" ", "");
        const a = splittedColor[3].replace(" ", "").replace(")", "");
        rgb.push(parseInt(r), parseInt(g), parseInt(b), parseFloat(a));
        for (let i = 0; i < 4; i++) rgb[i] = (i === 3 ? 1 : 255) - rgb[i];
        return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${rgb[3]})`;
    } else {
        const r = splittedColor[0].replace("rgb(", "");
        const b = splittedColor[2].replace(")", "");
        rgb.push(parseInt(r), parseInt(g), parseInt(b));
        for (let i = 0; i < rgb.length; i++) rgb[i] = 255 - rgb[i];
        return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    }
};
