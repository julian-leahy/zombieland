export const hide = (selection) => {
    if (!selection) return;
    selection.classList.add('hidden');
}

export const show = (selection) => {
    if (!selection) return;
    selection.classList.remove('hidden');
}

export const showHide = (selection1, selection2) => {
    if (!selection1 || !selection2) return;
    selection1.classList.remove('hidden');
    selection2.classList.add('hidden');
}