export const rand = (min, max) => {
    return Math.random() * (max - min) + min;
};

export const randInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

export const randDraw = (array, nb) => {
    const draws = [];
    for (let i = 0; i < nb; i++) draws.push(array[randInt(0, array.length)]);
    return draws;
};

export const noRandDraw = (array, nb) => {
    //if (nb > array.length) return RangeError("nb cannot be higher than array.length");
    const draws = [];
    let draw;
    for (let i = 0; i < nb; i++)
        do {
            draw = array[randInt(0, array.length)];
        } while (draws.includes(draw));
        draws.push(draw);
    return draws;
};

export const randomRGBColor = () => {
    return `rgb(${randInt(0, 256)}, ${randInt(0, 256)}, ${randInt(0, 256)})`;
};

export const invertRGBColor = color => {
    const splittedColor = color.split(",");
    // returns ['rgb(r', ' g', ' b)']
    // then we replace useless stuff with a void string
    const r = splittedColor[0].replace("rgb(", ""),
        g = splittedColor[1].replace(" ", ""),
        b = splittedColor[2].replace(" ", "").replace(")", "");
    // we also put them into an array to loop over it easily
    const rgb = [parseInt(r), parseInt(g), parseInt(b)];
    for (let i = 0; i < rgb.length; i++) rgb[i] = (i === 3 ? 1 : 255) - rgb[i];
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
};
console.log(invertRGBColor("rgb(0,0,0)"));

export const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};

export const swapNodes = (node1, node2) => {
    const afterNode2 = node2.nextElementSibling;
    const parent = node2.parentNode;
    node1.replaceWith(node2);
    parent.insertBefore(node1, afterNode2);
};

export const delDuplicatedOf = parentNode => {
    const nodesArray = [];
    for (let node of parentNode.childNodes) if (node.nodeType === 1) nodesArray.push(node);
    const seenTextContent = {};
    for (let node of nodesArray) {
        if (seenTextContent[node.textContent]) parentNode.removeChild(node);
        else seenTextContent[node.textContent] = true;
    }
};
