import { isGetAccessorDeclaration } from "typescript";

export const getProductImage = (categoryId: number, color?: string): string => {
    if (categoryId === 1) {
        return "/tshirt.png";
    }

    if (categoryId === 2) {
        if(color)
            return `/mug_${color}.jpg`;
        else 
            return "mug_Blue.jpg"
    }

    if (categoryId === 3) {
        return "/notebook.png";
    }

    if (categoryId === 4) {
        return "/bag.png";
    }

    return "";
};
