import React, { useEffect } from 'react';
import { Product } from '../util/types';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import styles from './Products';
import { useLocation } from 'react-router-dom'

function ProductPage() {

    const [data, setData] = React.useState<{ data: Product[] }>()

    useEffect(() => {
        fetch('http://localhost:1337/api/products')
            .then(res => res.json())
            .then(res => setData(res));
    }, []);

    const location = useLocation();
    const state = location?.state as { categoryId: number };
    const categoryId= state.categoryId;

    const products = data?.data?.filter((item: any) =>
        item.category.id === categoryId
    ) || [];

    return (
        <div className={styles.container}>
            <div className={styles.title}>Products of Category {products[0]?.category.Name}</div>
                {products?.map((item) => (<>
                    <ImageListItem key={item.category.Name}>
                    <img
                        src={`https://images.unsplash.com/photo-1597645587822-e99fa5d45d25?w=248&fit=crop&auto=format`}
                        srcSet={`https://images.unsplash.com/photo-1597645587822-e99fa5d45d25?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.category.Name}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.category.Name}
                        subtitle={<span>{item.category.Description}</span>}
                        position="below"
                    />
                            <div>{item?.color?.name}</div>
                            {/* <Button variant="contained" startIcon={<AddShoppingCartIcon />} >
                        Add to Cart
            </Button> */}
                    </ImageListItem>
                    </>
                    ))}
            <Button variant="contained" startIcon={<AddShoppingCartIcon />} style={{display: "flex"}}>
                        Add to Cart
            </Button>
        </div>
    );
}

export default ProductPage;
