import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../util/userContext';

function Home() {
    const [data, setData] = useState();

    const user = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:1337/api/products')
            .then(res => res.json())
            .then(res => setData(res));
    }, []);

    return (
        <div>
            <pre>
                {JSON.stringify(user?.user, null, 2)}
            </pre>
            <pre>
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
}

export default Home;
