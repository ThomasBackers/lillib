/**
 * Genrate a random float number between two border
 * @param {int} min minimum value
 * @param {int} max maximum value
 * @returns a random float between mix and max
 */
export const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Genrate a random integer number between two border
 * @param {int} min minimum value
 * @param {int} max maximum value
 * @returns a random integer between mix and max
 */
export const randInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Generate a random RGB color with this synthax : rgb(xx,xx,xx)
 * @returns random rgb color
 */
export const randomRGBColor = () => {
    return `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
};

/**
 * Invert a given rgb color
 * @param {*} color rgb color (ex: rgb(xx,xx,xx))
 * @returns inverted rgb color
 */
const invertRGBColor = color => {
    const splittedColor = color.split(",");
    // returns ['rgb(r', ' g', ' b)']
    // then we replace useless stuff with a void string
    const r = splittedColor[0].replace("rgb(", "");
    const g = splittedColor[1].replace(" ", ""); 
    const b = splittedColor[2].replace(" ", "").replace(")", "");
    // we also put them into an array to loop over it easily
    const rgb = [parseInt(r), parseInt(g), parseInt(b)];
    for (let i = 0; i < rgb.length; i++) rgb[i] = (i === 3 ? 1 : 255) - rgb[i];
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

/**
 * Shuffle a given array
 * @param {Array} array an array to shuffle
 * @returns shuffle array
 */
export const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
};

/**
 * Swap two node
 * @param {Node} node1 HTML node
 * @param {Node} node2 HTML Node
 */
export const swapNodes = (node1, node2) => {
    const afterNode2 = node2.nextElementSibling;
    const parent = node2.parentNode;
    node1.replaceWith(node2);
    parent.insertBefore(node1, afterNode2);
};

/**
 * Delete all the duplication in a given node
 * @param {Node} parentNode parent HTML Node to search the duplication
 */
export const delDuplicatedOf = parentNode => {
    const nodesArray = [];
    for (let node of parentNode.childNodes) if (node.nodeType === 1) nodesArray.push(node);
    const seenTextContent = {};
    for (let node of nodesArray) {
        if (seenTextContent[node.textContent]) parentNode.removeChild(node);
        else seenTextContent[node.textContent] = true;
    }
};
