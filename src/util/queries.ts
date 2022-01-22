import { Order, Product } from "./types";

export const getOrderWithId = async (id: number): Promise<Order | null> => {
    try {
        const res = await fetch(`http://localhost:1337/api/orders/${id}`);

        const json = await res.json();

        const order = json.data;

        return {
            ...order,
            attributes: {
                ...order.attributes,
                products: JSON.parse(order.attributes.products as string),
            },
        };
    } catch (err) {
        console.log(err);

        return null;
    }
};

export const getOrdersOfUser = async (userId: number): Promise<Order[]> => {
    try {
        const res = await fetch(`http://localhost:1337/api/orders`);

        const json = await res.json();

        const orders = json.data;

        const filteredOrders = orders.filter(
            (order: any) => order.attributes.userId === userId
        );

        return filteredOrders.map((order: any) => ({
            ...order,
            attributes: {
                ...order.attributes,
                products: JSON.parse(order.attributes.products as string),
            },
        }));
    } catch (err) {
        console.log(err);

        return [];
    }
};

export const getProducts = async () => {
    try {
        const res = await fetch(`http://localhost:1337/api/products`);

        const json = await res.json();

        const products = json.data as Product[];

        return products;
    } catch (err) {
        console.log(err);

        return [];
    }
};

export const createOrder = async (
    userId: number,
    products: number[]
): Promise<Order | null> => {
    try {
        const res = await fetch("http://localhost:1337/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    userId,
                    confirmed: true,
                    products: `[${products.toString()}]`,
                },
            }),
        });

        const json = await res.json();

        return json.data;
    } catch (err) {
        console.log(err);

        return null;
    }
};
