![logo](./images/logo.png)

## Description

This is an online shopping website for fashion with full-featured wish list, shopping cart, checkout page, and order list.

- The backend is built with Express. Structured data is stored in MongoDB and image data is stored in an AWS S3 bucket.

- The frontend is built with React.js and NextUI.

## Homepage

The homepage contains navbar, search bar and filters, and cards of products and pagination at the bottom.

![homepage](./images/homepage.png)

Candidate sections are based on the index that user chose at the navbar and candidate product types update dynamically based on chosen index and section.

Products can be shown in the ascending or descending order of price or the order of popularity.

![filter](./images/filter.png)

Users can login with Google Account (for now). Favorite button and cart button will be shown for logined users.

![login](./images/favorite.png)

## Product Detail

When clicking on a product card, a product detail card will pop over. Users can browse the pictures of different colors of the product and add the product to the shopping cart after choosing the size.

![detail](./images/detail.png)

## Favorites Page

Users can view their liked products on this page.

![favorite page](./images/favorite%20page.png)

## Shopping Cart

Users can view the products in the shopping cart on this page. They can directly modify the count of the products here.

![cart](./images/cart.png)

By clicking the title of a product, a card will pop over and users can also change the color and the size of the product.

![cart change](./images/cart%20change.png)

After choosing at least one product, the order calculator and checkout form will be shown below.

![checkout](./images/checkout.png)

## History Orders

Users can view and manage their history orders on this page.

![order](./images/order.png)