export const convertKeyToValue = (itemId, arrData) => {
    if (!itemId || arrData?.length <= 0) return '';
    for (let item of arrData) {
        if (item.keyMap === itemId) {
            return item.valueVi;
        }
    }
};
