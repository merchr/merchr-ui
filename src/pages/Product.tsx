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
    //variables to hold data 
    const [data, setData] = useState<{ data: Product[] }>()
    //using context
    const { user, setUser } = useContext(UserContext);

    //fetch data 
    useEffect(() => {
        fetch('http://localhost:1337/api/products')
            .then(res => res.json())
            .then(res => setData(res));
    }, []);

    
    // get categoryId from router state
    const location = useLocation();
    const state = location?.state as { categoryId: number };
    const categoryId = state.categoryId;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSex, setSelectedSex] = useState("");
    const [selectedSize, setSelectedSize] = useState("");

    //filter only products that have the category id equal to the category Id that we get from router state
    const products = data?.data?.filter((item: any) =>
        item.category.id === categoryId
    ) || [];

    //map all color names and then filter so we have only unique color names
    const colors = products.map(item => item.color?.name).filter((v, i, a) => a.indexOf(v) === i);
    
    //map all sex data and then filter them so we have only unique sex data
    const sex = products.map(item => item.sex?.type).filter((v, i, a) => a.indexOf(v) === i);

    //map all size data and then filter so we have only unique size 
    const size = products.map(item => item.size?.name).filter((v, i, a) => a.indexOf(v) === i);

    //find the id of selected Product, by filtering products that have the color that is selected, and if the product has size atribute then also filter the product with the size that is slected and if the product has sex atribute filter also the product to have the sex that is selected  
    const selectedProduct: Product[] = products.filter(item =>  item.color?.name === selectedColor &&  (selectedSize ? (item?.size?.name === selectedSize): true && selectedSex ? (item.sex?.type === selectedSex): true));

    //add to cart functionality, setUser with its data and add clicked Item Id in the cart array
    const handleAddToCart = (clickedItemId: any) => {
        setUser({ ...user, cart: [...user.cart, clickedItemId] });
    };

    return (
        <>
            <div className="container">
            <div className="row mt-5">
                <div className="col fs-1 mx-auto text-center">Products of Category {products[0]?.category.Name}</div>
            </div>
            <div className={styles.container}>
               <Grid container spacing={2}>

                    <Grid item xs={12} md={8}>
                        <Card sx={{ maxWidth: 700 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="300"
                                    style={{maxWidth: "400px", objectFit: "contain"}}
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
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
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
                        {/*  check if the sex array is not empty */}
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
                            {/* check if the size array is not empty since some products don't have size and it can be empty */}
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
                <Button variant="contained" startIcon={<AddShoppingCartIcon />} style={{ display: "flex" , margin: "20px"}} onClick={() => selectedProduct[0]?.id ? handleAddToCart(selectedProduct[0]?.id) : handleOpen()}>
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
            </div>
        </>
    );
}

export default ProductPage;