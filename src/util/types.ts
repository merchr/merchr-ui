export type User = {
    id: number;
    username: string;
    email: string;
};

export type UserContext = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
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
