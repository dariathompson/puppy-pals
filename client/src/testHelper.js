export const findTestByAttr = (wrapper, value) => {
    return wrapper.find(`[data-test="${value}"]`);
};