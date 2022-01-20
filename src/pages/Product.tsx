import React, { ChangeEvent, useEffect } from 'react';
import { Product } from '../util/types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
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
    const [selectedColor, setSelectedColor] = React.useState('Blue');
    const [selectedSex, setSelectedSex] = React.useState('Men');
    const [selectedSize, setSelectedSize] = React.useState('S');

    const products = data?.data?.filter((item: any) =>
        item.category.id === categoryId
    ) || [];

    const colors = products.map(item => item.color?.name).filter((v, i, a) => a.indexOf(v) === i);
    const sex = products.map(item => item.sex?.type).filter((v, i, a) => a.indexOf(v) === i);
    const size = products.map(item => item.size?.name).filter((v, i, a) => a.indexOf(v) === i);

    const selectedProduct = products.filter(item => item?.size?.name === selectedSize && item.color?.name === selectedColor && item.sex?.type === selectedSex);
    console.log("selectedProduct", selectedProduct);

    return (
        <div className={styles.container}>
            <div className={styles.title}>Products of Category {products[0]?.category.Name}</div>
            <Grid container spacing={2}>

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
                                    {products[0]?.category.Name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {products[0]?.category.Description}
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
                <Grid item xs={6} md={4}>
                    <div className={styles.section}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Color</FormLabel>
                            <RadioGroup row aria-label="color" name="row-radio-buttons-group" value={selectedColor}
                                onChange={(event) => setSelectedColor(event.target.value)}>
                                {colors?.map((item, index) => (
                                    <div key={index}>
                                        <FormControlLabel value={item} control={<Radio />} label={item || 'label'} />
                                    </div>
                                ))}
                            </RadioGroup>
                        </FormControl>

                        {sex[0] && (
                            <>
                                <hr />
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Gender</FormLabel>
                                    <RadioGroup row aria-label="gender" name="row-radio-buttons-group" value={selectedSex}
                                        onChange={(event) => setSelectedSex(event.target.value)}>
                                        {sex?.map((item, index) => (
                                            <div key={index}>
                                                <FormControlLabel value={item} control={<Radio />} label={item || 'label'} />
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </>
                        )}

                        {size[0] && (
                            <>
                                <hr />
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Size</FormLabel>
                                    <RadioGroup row aria-label="size" name="row-radio-buttons-group" value={selectedSize}
                                        onChange={(event) => setSelectedSize(event.target.value)}>
                                        {size?.map((item, index) => (
                                            <div key={index}>
                                                <FormControlLabel value={item} control={<Radio />} label={item || 'label'} />
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </>
                        )}
                    </div>
                </Grid>
            </Grid>
            <Button variant="contained" startIcon={<AddShoppingCartIcon />} style={{ display: "flex" }}>
                Add to Cart
            </Button>
        </div>
    );
}

export default ProductPage;
