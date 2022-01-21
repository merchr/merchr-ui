import React, { useEffect, useContext } from 'react';
import { Product } from '../util/types';
import { UserContext } from '../util/userContext';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

import ImageListItemBar from '@mui/material/ImageListItemBar';
import Grid from '@mui/material/Grid';
import styles from './Products.module.scss';
import { Link } from 'react-router-dom';


function Products() {

    const [data, setData] = React.useState<{ data: Product[] }>();
    const categories= new Array(0);

    useEffect(() => {
        fetch('http://localhost:1337/api/products')
            .then(res => res.json())
            .then(res => setData(res));
    }, []);
 
    //gets the unique category Ids from data
    const categoryIds=[...Array.from(new Set(data?.data?.map(item => item.category.id)))];

    //creating an array with data for categories by mapping the array of data 
    const categoriesData = data?.data?.map((item: any) => item.category);


    categoryIds?.map(categoryId=> {
    let count=0;
        categoriesData?.map(item=>{
            if(categoryId===item.id && count===0) 
            {
                //check if the item.Id exists in the categoryIds array and if the count is 0 so we get only distinct values
                categories?.push(item);
                count++
            }
        })
   })

    return (
        <div className={styles.container}>
            <Grid container spacing={2}>
                {categories?.map((item) => (
                    <Grid item xs={12} md={4}>
                        <Card sx={{ maxWidth: 400 }}>
                            <CardActionArea>
                                <Link to={{
                                    pathname: '/product'
                                }} state={{ categoryId: item.id }} style={{ textDecoration: 'none', color: "black" }}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image="https://images.unsplash.com/photo-1597645587822-e99fa5d45d25?w=248&fit=crop&auto=format"
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.Name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.Description}
                                        </Typography>
                                    </CardContent>
                                    </Link>
                                 </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Share
                                    </Button>
                                </CardActions>
     
                        </Card>

                    </Grid>
                ))}
            </Grid>

           
           </div>
           
    );
}

export default Products;
