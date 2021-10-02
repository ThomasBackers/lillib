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
 * Array shuffler:
 * using the Fisher-Yates algorithm,
 * it does not return anything but shuffles the array directly
 * @param {array} array - any array
 */
export const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};

/**
 * 
 * @param {array} array - any array
 * @param {number} nb - amount of draws
 * @returns {*|array} - any for a single draw | the draws array
 */
export const randDraw = (array, nb) => {
    if (nb < 0) throw new RangeError("the amount of draws cannot be negative");
    const draws = [];
    for (let i = 0; i < nb; i++) draws.push(array[randInt(0, array.length)]);
    return nb === 1 ? draws[0] : draws;
};

export const noRandDraw = (array, nb) => {
    if (nb < 0) throw new RangeError("the amount of draws cannot be negative");
    if (nb > array.length) throw new RangeError("the amout of unique draws cannot exceeds the array length");
    const draws = [];
    let draw;
    for (let i = 0; i < nb; i++)
        do {
            draw = array[randInt(0, array.length)];
        } while (draws.includes(draw));
    draws.push(draw);
    return nb === 1 ? draws[0] : draws;
};

//-----------------
// NODES FUNCTIONS
//-----------------
export const swapNodes = (node1, node2) => {
    const afterNode2 = node2.nextElementSibling;
    const parent = node2.parentNode;
    node1.replaceWith(node2);
    parent.insertBefore(node1, afterNode2);
};

export const delDuplNodes = parentNode => {
    const nodesArray = [];
    for (let node of parentNode.childNodes) if (node.nodeType === 1) nodesArray.push(node);
    const seenTextContent = {};
    for (let node of nodesArray) {
        if (seenTextContent[node.textContent]) parentNode.removeChild(node);
        else seenTextContent[node.textContent] = true;
    }
};

//------------------
// COLORS FUNCTIONS
//------------------
export const randRGBColor = () => {
    return `rgb(${randInt(0, 256)}, ${randInt(0, 256)}, ${randInt(0, 256)})`;
};

export const invertRGBColor = color => {
    const splittedColor = color.split(",");
    // returns ['rgb(r', ' g', ' b)']
    // then we replace useless stuff with an empty string
    const r = splittedColor[0].replace("rgb(", ""),
        g = splittedColor[1].replace(" ", ""),
        b = splittedColor[2].replace(" ", "").replace(")", "");
    // we also put them into an array to loop over it easily
    const rgb = [parseInt(r), parseInt(g), parseInt(b)];
    for (let i = 0; i < 3; i++) rgb[i] = (i === 3 ? 1 : 255) - rgb[i];
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
};
