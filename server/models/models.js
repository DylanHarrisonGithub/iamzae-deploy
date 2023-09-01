"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export type Product = {
//   id: number,
//   name: string,
//   maker: string,
//   price: number,
//   deal: number,
//   description: string,
//   image: string,
//   tags: string,
//   stars: number,
//   reviews: number
// }
// export type Review = {
//   id: number,
//   userID: number,
//   productID: number,
//   stars: number,
//   text: string
// }
const models = {
    user: {
        id: `SERIAL`,
        email: 'TEXT',
        password: 'TEXT',
        salt: 'TEXT',
        privilege: `TEXT`,
        avatar: `TEXT`,
        PRIMARY: 'KEY (email)'
    },
    // product: {
    //   id:`SERIAL`,
    //   name: 'TEXT',
    //   maker: 'TEXT', 
    //   price: `NUMERIC`,
    //   deal: `NUMERIC`,
    //   description: 'TEXT',
    //   image: 'TEXT',
    //   tags: 'TEXT', 
    //   stars: `NUMERIC`,
    //   reviews: `NUMERIC`,
    //   PRIMARY: 'KEY (id)' 
    // },
    // review: {
    //   id: `SERIAL`,
    //   userid: `NUMERIC`,
    //   productid: `NUMERIC`,
    //   stars: `NUMERIC`,
    //   text: `TEXT`,
    //   PRIMARY: `KEY (id)`
    // }
};
exports.default = models;
