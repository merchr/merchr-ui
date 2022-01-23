import { useState, useEffect, useContext } from "react";
import { Badge, Drawer, Grid, LinearProgress, IconButton } from "@material-ui/core";
import { Product } from '../util/types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions, Modal } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../util/userContext";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import styles from './Products.module.scss';
import { getProductImage } from "../util/images";

const Wrapper = styled.div`
  margin: 40px;
`;

const StyledButton = styled(IconButton)`
  position: fixed;
  z-index: 100;
  right: 20px;
  top: 20px;
`;

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function ProductPage() {
    const [cartItems, setCartItems] = useState<number[]>([]);
    const [data, setData] = useState<{ data: Product[] }>()
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:1337/api/products')
            .then(res => res.json())
            .then(res => setData(res));
    }, []);

    const location = useLocation();
    const state = location?.state as { categoryId: number };
    const categoryId = state.categoryId;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedColor, setSelectedColor] = useState('Red');
    const [selectedSex, setSelectedSex] = useState('Men');
    const [selectedSize, setSelectedSize] = useState('S');

    const products = data?.data?.filter((item: any) =>
        item.category.id === categoryId
    ) || [];

    const colors = products.map(item => item.color?.name).filter((v, i, a) => a.indexOf(v) === i);
    const sex = products.map(item => item.sex?.type).filter((v, i, a) => a.indexOf(v) === i);
    const size = products.map(item => item.size?.name).filter((v, i, a) => a.indexOf(v) === i);

    const selectedProduct: Product[] = products.filter(item => item?.size?.name === selectedSize && item.color?.name === selectedColor && item.sex?.type === selectedSex);

    const handleAddToCart = (clickedItemId: any) => {
        setUser({ ...user, cart: [...user.cart, clickedItemId] });
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.title}>Products of Category {products[0]?.category.Name}</div>
                <Grid container spacing={2}>

                    <Grid item xs={6} md={8}>
                        <Card sx={{ maxWidth: 400 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={getProductImage(categoryId)}
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
                <Button variant="contained" startIcon={<AddShoppingCartIcon />} style={{ display: "flex" }} onClick={() => selectedProduct[0]?.id ? handleAddToCart(selectedProduct[0]?.id) : handleOpen()}>
                    Add to Cart
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            This item is currently not in stock
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Try different customization options!
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </>
    );
}

export default ProductPage;