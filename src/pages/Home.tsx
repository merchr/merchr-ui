import React, { useState, useEffect } from "react";

function Home() {
    const [data, setData] = useState();

    useEffect(() => {
        fetch("http://localhost:1337/api/products")
            .then((res) => res.json())
            .then((res) => setData(res));
    }, []);

    return (
        <div className="container">
            <h1 className="my-4">Welcome to our merch store</h1>
            <p>Press the menu at the top left side to see the products.</p>
            <p>
                Press the avatar icon on the top right to sign in or create an
                account.
            </p>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default Home;
