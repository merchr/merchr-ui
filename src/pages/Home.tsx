import React, { useState, useEffect } from "react";
import 'antd/dist/antd.css'; 

import { Carousel, Button } from 'antd';
import  "./Home.module.scss";

import '../App.css'

const items = [
    {
      key: '1',
      title: 'Press the menu at the top left side to see the products',
      content: 'Press the avatar icon on the top right to sign in or create an account.',
    },
   
    
  ]

function Home() {
    const [data, setData] = useState();

    useEffect(() => {
        fetch("http://localhost:1337/api/products")
            .then((res) => res.json())
            .then((res) => setData(res));
    }, []);

   
    return (
      
 
    <div className="heroBlock">
     

  
        <div id="hero" className="heroBlock">
          
          <Carousel>
          <div className="container-fluid">
                  <div className="content">
                  <h3 className="content">Welcome to our merch store</h3> 
                  <div className="btnHolder">
                  <Button type="primary" href="http://localhost:3000/login"  size="large">Sign In</Button>
                  <Button size="large" href="http://localhost:3000/products"> <i className="fas fa-desktop"></i> Shop Now</Button>
                </div>
                    
                    
                  </div>
                </div>  
          
            {items.map(item => {
              return (
                <div key={item.key} className="container-fluid">
                  <div className="content">
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                   
                  </div>
                </div>  
              );
            })}
                </Carousel>
            </div>
      
        
            <pre>{JSON.stringify(data, null, 2)}</pre>
        
       
    </div>
        
        
    );
}

export default Home;
