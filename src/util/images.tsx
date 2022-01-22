export const getProductImage = (categoryId: number): string => {
    if (categoryId === 1) {
        return "/tshirt.png";
    }

    if (categoryId === 2) {
        return "/mug.png";
    }

    if (categoryId === 3) {
        return "/notebook.png";
    }

    if (categoryId === 4) {
        return "/bag.png";
    }

    return "";
};
