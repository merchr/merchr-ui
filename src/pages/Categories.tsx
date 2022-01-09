import React, { useEffect, useContext } from 'react';
import { Product } from '../util/types';
import { UserContext } from '../util/userContext';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import styles from './Categories.module.scss';
import { Link } from 'react-router-dom';

function Categories() {

    const [data, setData] = React.useState<{ data: Product[] }>();

    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:1337/api/products')
            .then(res => res.json())
            .then(res => setData(res));
    }, []);

    const categories = data?.data?.map((item: any) =>
        item.category
    ) || [];
    
    return (
        <div className={styles.container}>
            <ImageList cols={3} gap={40}>
                {categories?.map((item) => (
                    <ImageListItem key={item.Id}>
                        <Link to={{
                            pathname: '/product'
                        }} state={{ categoryId: item.id }} style={{ textDecoration: 'none', color: "black" }}>
                            <img
                                src={`https://images.unsplash.com/photo-1597645587822-e99fa5d45d25?w=248&fit=crop&auto=format`}
                                srcSet={`https://images.unsplash.com/photo-1597645587822-e99fa5d45d25?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.Name}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={item.Name}
                                subtitle={<span>{item.Description}</span>}
                                position="below"
                            /></Link>
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
}

export default Categories;
