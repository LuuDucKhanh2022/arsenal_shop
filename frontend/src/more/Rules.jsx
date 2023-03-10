import React from 'react'
import "./Rules.css";
import Header from '../component/Home/Header';
import MetaData from './Metadata';
import Footer from '../Footer';
import Breadcrumbs from './Breadcrumbs';

const Rules = () => {
    return (
        <>
        <MetaData title="Rules" />
        <Header />
        <Breadcrumbs />
        <div className='rules' style={{
            padding:"50px 30px",
            display:"flex",
            width:"95%",
            overflow:"hidden"
        }}>
            <ul className='rules'>
                <span style={{
                    color:"#000",
                    fontSize:"1.3rem",
                    fontWeight:"800",
                    fontFamily:"Roboto",
                }}>Some Rules:</span>
                <li>1. You can easily return your product..But you have to give us the delivery charge...</li>
                <li>2. You can customize your name, jersey number, tournament logo when ordering products in the Kit category</li>
                <li>3. You can not buy the outofstock products...</li>
                <li>4. You can buy any products from us...we are trying to our best for give the best quality of products...</li>
                <li>5. You can find more new features in our buiseness in very soon...Our developers team always work for your good services...</li>
                <li>6. At last thanks for visit our website...Have a good day !</li>
            </ul>
        </div>
        <Footer />
        </>
    )
}

export default Rules
