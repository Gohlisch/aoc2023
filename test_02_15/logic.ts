export function calcPaper(line: string) {
    const [ls, ws, hs] = line.split("x").map(a => +a);
    const [l, w, h] = [ls * ws, ws * hs, hs * ls];

    return 2*l + 2*w + 2*h + Math.min(l, w, h);
}

export function calcRibbon(line: string) {
    const [l, w, h] = line.split("x")
        .map(a => +a)
        .sort((a, b) => a-b);

    return l*2 + w*2 + l*w*h;
}
