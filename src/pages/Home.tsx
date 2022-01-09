import React, { useState, useEffect } from "react";

function Home() {
    const [data, setData] = useState();

    useEffect(() => {
        fetch("http://localhost:1337/api/products")
            .then((res) => res.json())
            .then((res) => setData(res));
    }, []);

    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default Home;
