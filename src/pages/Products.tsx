import React, { useEffect, useContext } from "react";
import { Product } from "../util/types";
import { UserContext } from "../util/userContext";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

import ImageListItemBar from "@mui/material/ImageListItemBar";
import Grid from "@mui/material/Grid";
import styles from "./Products.module.scss";
import { Link } from "react-router-dom";
import { getProductImage } from "../util/images";

function Products() {
    const [products, setProducts] = React.useState<Product[]>([]);

    const [search, setSearch] = React.useState<string>("");
    const categories = new Array(0);

    useEffect(() => {
        fetch("http://localhost:1337/api/products")
            .then((res) => res.json())
            .then((res) => setProducts(res.data));
    }, []);

    const data = search
        ? products.filter((product) =>
              product.category.Name.toLowerCase().includes(search.toLowerCase())
          )
        : products;

    //gets the unique category Ids from data
    const categoryIds = [
        ...Array.from(new Set(data.map((item) => item.category.id))),
    ];

    //creating an array with data for categories by mapping the array of data
    const categoriesData = products.map((item: any) => item.category);

    categoryIds?.map((categoryId) => {
        let count = 0;
        categoriesData?.map((item) => {
            if (categoryId === item.id && count === 0) {
                //check if the item.Id exists in the categoryIds array and if the count is 0 so we get only distinct values
                categories?.push(item);
                count++;
            }
        });
    });

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col fs-1 mx-auto text-center">Products</div>
            </div>

            <div className={styles.container}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap",
                        columnGap: "15px",
                        rowGap: "5px",
                    }}
                >
                    <label htmlFor="search" className="mr-3">
                        Search products by name:
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        name="search"
                        id="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <hr className="my-5" />
                <Grid container spacing={2}>
                    {categories?.map((item) => (
                        <Grid item xs={12} md={4}>
                            <Card sx={{ maxWidth: 400 }}>
                                <CardActionArea>
                                    <Link
                                        to={{
                                            pathname: "/product",
                                        }}
                                        state={{ categoryId: item.id }}
                                        style={{
                                            textDecoration: "none",
                                            color: "black",
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={getProductImage(item.id)}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="div"
                                            >
                                                {item.Name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {item.Description}
                                            </Typography>
                                        </CardContent>
                                    </Link>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}

export default Products;
