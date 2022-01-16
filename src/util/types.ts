export type User = {
    id?: number;
    username?: string;
    email?: string;
    name?: string;
    address?: string;
    phone?: string;
    cart: number[];
};

export type UserContext = {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
};

export type Product = {
    id: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    category: Category;
    color: {
        id: number;
        name: string;
        hex: string;
    } | null;
    sex: {
        id: number;
        type: string;
    } | null;
    size: {
        id: number;
        name: string;
    } | null;
};

export type Category = {
    id: number;
    Name: string;
    Description: string;
};

export type Order = {
    id: number;
    attributes: {
        userId: number;
        products: number[];
        confirmed: boolean;
        createdAt: string;
        updatedAt: string;
    };
};
