export const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

export const randInt = (min, max) => {
    return Math.random() * (max - min) + min;
};

export const randomRGBColor = () => {
    return `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
};

export const invertRGBColor = color => {
    const splittedColor = color.split(",");
    let r = splittedColor[0].replace("rgb(", ""),
        g = splittedColor[1].replace(" ", ""),
        b = splittedColor[2].replace(" ", "").replace(")", "");
    for (let value of [r, g, b]) value = (i === 3 ? 1 : 255) - rgb[i];
    return `rgb(${r}, ${g}, ${b})`;
};

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
