import React, { useContext, useEffect } from 'react';
import { UserContext } from '../util/userContext';

function About() {
    const user = useContext(UserContext);


    useEffect(() => {
        if (user) {
            user.setUser({ id: 1, name: 'Jogn' })
        }
    }, []);

    return (
        <div>
        </div>
    );
}

export default About;
