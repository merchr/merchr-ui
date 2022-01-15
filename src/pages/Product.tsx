import React, { useEffect } from 'react';
import { Product } from '../util/types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import styles from './Products.module.scss';
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
    const categoryId = state.categoryId;

    const products = data?.data?.filter((item: any) =>
        item.category.id === categoryId
    ) || [];

    return (
        <div className={styles.container}>
            <div className={styles.title}>Products of Category {products[0]?.category.Name}</div>
            <Grid container spacing={2}>
                {products?.map((item) => (<>
                    <Grid item xs={6} md={8}>
                        <Card sx={{ maxWidth: 400 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="https://images.unsplash.com/photo-1597645587822-e99fa5d45d25?w=248&fit=crop&auto=format"
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.category.Name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.category.Description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Share
                                </Button>
                            </CardActions>

                        </Card>

                    </Grid>
                </>
                ))}
            </Grid>
            <Button variant="contained" startIcon={<AddShoppingCartIcon />} style={{ display: "flex" }}>
                Add to Cart
            </Button>
        </div>
    );
}

export default ProductPage;
