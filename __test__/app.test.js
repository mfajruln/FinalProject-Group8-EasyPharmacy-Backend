const { where } = require('sequelize');
const app = require('../app');
const { comparePassword, hashPassword } = require('../helpers/bcrypt');

const { sequelize } = require('../models');

const request = require('supertest');

beforeAll( async () => {

    let dataUser = [
        {
    
            email: "steve@bithealth.co.id",
            password: hashPassword("BitHealth2024"), 
            fullName: "steve",
            phoneNumber: "082347324649",
            roleUser: "user",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]

    let dataCart = [

        {

            userId: 1,
            drugId: 3,
            quantity: 5,
            deletedAt: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]

    let dataDrug = require('../data/drug.json')

    dataDrug.forEach(el=>{
        el.createdAt = new Date()
        el.updatedAt = new Date()
    })

    let dataOrder = require('../data/order.json');
    let dataDetailOrder = require('../data/detailOrder.json');

    dataOrder.forEach(el => {
        el.createdAt = new Date();
        el.updatedAt = new Date();
    });

    dataDetailOrder.forEach(el => {
        el.createdAt = new Date();
        el.updatedAt = new Date();
    });

    await sequelize.queryInterface.bulkInsert('Users', dataUser)

    await sequelize.queryInterface.bulkInsert('Drugs', dataDrug)

    await sequelize.queryInterface.bulkInsert('Carts', dataCart)

    await sequelize.queryInterface.bulkInsert('Orders', dataOrder)

    await sequelize.queryInterface.bulkInsert('OrderDetails', dataDetailOrder)

    // const dataDrug = [
    //     {
    //         "image": "https://d2qjkwm11akmwu.cloudfront.net/products/782475_23-3-2020_14-28-1-1665778689.jpeg",
    //         "name": "Paracetamol",
    //         "description": "Obat penurun demam dan pereda nyeri",
    //         "dose": "500mg",
    //         "drugClass": "Bebas",
    //         "drugFactory": "Generik",
    //         "drugType": "Kaplet",
    //         "price": 6365,
    //         "stock": 50,
    //         "packaging": "Strip"
    //     },
    //     {
    //         "image": "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/05/13090017/amoxilin.jpg",
    //         "name": "Amoxicillin",
    //         "description": "Antibiotik untuk mengobati infeksi bakteri, seperti infeksi saluran pernapasan, kulit, dan infeksi THT.",
    //         "dose": "500mg",
    //         "drugClass": "Keras",
    //         "drugFactory": "Generik",
    //         "drugType": "Kaplet",
    //         "price": 12000,
    //         "stock": 75,
    //         "packaging": "Strip"
    //         },
    //         {
    //         "image": "https://kalbemed.com/storage/images/products/ec5f39e7f0c80b20c0bf1e614e968acf.jpg",
    //         "name": "Cetirizine",
    //         "description": "Obat antihistamin untuk meredakan gejala alergi, seperti pilek, bersin, mata gatal, dan ruam kulit.",
    //         "dose": "10mg",
    //         "drugClass": "Keras",
    //         "drugFactory": "Generik",
    //         "drugType": "Kaplet",
    //         "price": 4500,
    //         "stock": 35,
    //         "packaging": "Strip"
    //         },
    //         {
    //         "image": "https://d3bbrrd0qs69m4.cloudfront.net/images/product/large/apotek_online_k24klik_20200905113048359225_TREMENZA.jpg",
    //         "name": "Tremenza",
    //         "description": "Obat Tremenza adalah obat yang digunakan untuk meringankan gelaja flu seperti hidung tersumbat dan bersin-bersin yang disebabkan oleh alergi pada saluran pernapasan atas.",
    //         "dose": "60mg",
    //         "drugClass": "Keras",
    //         "drugFactory": "Generik",
    //         "drugType": "Tablet",
    //         "price": 14000,
    //         "stock": 57,
    //         "packaging": "Strip"
    //         },
    //         {
    //         "image": "https://d3bbrrd0qs69m4.cloudfront.net/images/product/large/apotek_online_k24klik_20210802083708359225_IMG-20210730-180652--2---2-.jpg",
    //         "name": "Methylprednisolon",
    //         "description": "Obat Methylprednisolon merupakan glukokortikoid turunan prednisolon yang mempunyai efek kerja dan penggunaan yang sama seperti prednison.",
    //         "dose": "4mg",
    //         "drugClass": "Keras",
    //         "drugFactory": "Generik",
    //         "drugType": "Tablet",
    //         "price": 62500,
    //         "stock": 99,
    //         "packaging": "Strip",
    //         },
    //         {
    //         "image": "https://res.cloudinary.com/dk0z4ums3/image/upload/v1692150696/attached_image/rhinos-sr.jpg",
    //         "name": "Rhinos SR",
    //         "description": "Obat Rhinos SR merupakan obat yang digunakan untuk meringankan gejala rinitis alergi, bersin-bersin, hidung tersumbat, dan rasa gatal pada hidup.",
    //         "dose": "60mg",
    //         "drugClass": "Keras",
    //         "drugFactory": "Generik",
    //         "drugType": "Kapsul",
    //         "price": 45000,
    //         "stock": 71,
    //         "packaging": "Strip",
    //         }
    // ]

    // const drugs = await Drug.bulkCreate(dataDrug);

    // const dataUser = await User.create({

    //     email: "steve@bithealth.co.id",
    //     password: "BitHealth2024", 
    //     fullName: "steve",
    //     phoneNumber: "082347324649",
    //     roleUser: "User",
    // })

    // // await Drug.create({

    // //     image: "https://d3bbrrd0qs69m4.cloudfront.net/images/product/large/apotek_online_k24klik_20200905113048359225_TREMENZA.jpg",
    // //     name: "Tremenza",
    // //     description: "Obat Tremenza adalah obat yang digunakan untuk meringankan gelaja flu seperti hidung tersumbat dan bersin-bersin yang disebabkan oleh alergi pada saluran pernapasan atas.",
    // //     dose: "60mg",
    // //     drugClass: "Keras",
    // //     drugFactory: "Generik",
    // //     drugType: "Tablet",
    // //     price: 14000,
    // //     stock: 57,
    // //     packaging: "Strip"
    // // })

    // await Cart.create({

    //     userId: dataUser.id,
    //     drugId: 1, 
    //     quantity: 5,
    //     deletedAt: new Date(),
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    // })
})

// afterAll( async () => {

    // await User.destroy({

    //     where: {

    //         email: "steve@bithealth.co.id"
    //     }
    // })

    // urutannya dibalik dari yang insert
    // await sequelize.queryInterface.bulkDelete('Carts', null, {})
    // await sequelize.queryInterface.bulkDelete('Drugs', null, {})
    // await sequelize.queryInterface.bulkDelete('Users', null, {})
// });

describe("Authentication", () => {
    
    describe("Registration", () => {

        // beforeEach ( async () => {

        //     await User.destroy({

        //         where: {
        
        //             email: "fajrul.nugraha@bithealth.co.id"
        //         }
        //     })
        // })

        describe('when registration successful', () => {

            const payload = {
                
                fullName:"Fajrul",
                email:"fajrul.nugraha@bithealth.co.id",
                phoneNumber:"085273552227",
                password:"BitHealth2024",
                roleUser: "user"
            }

            test('should return status code 200 with message', async () => {

                const response = await request(app).post("/user/register").send(payload)
        
                expect(response.statusCode).toBe(201)
                expect(response.body).toHaveProperty('message')
            })
        })

        describe('when registration get error bad request', () => {

            test('should return status code 400 with bad request message', async () => {

                const errorPayload = {
                
                    fullName:"Fajrul",
                    email:"fajrul.nugrahabithealth.co.id",
                    phoneNumber:"085273552227",
                    password:"BitHealth2024",
                    roleUser: "user"
                }

                const response = await request(app).post("/user/register").send(errorPayload)
        
                expect(response.statusCode).toBe(400)
                expect(response.body).toHaveProperty('message')
            })
        })

        describe('when registration get error user already exist', () => {

            test('should return status code 400 with used email / phone number message', async () => {

                
                const payload = {
                    
                        fullName:"Fajrul",
                        email:"fajrul.nugraha@bithealth.co.id",
                        phoneNumber:"085273552227",
                        password:"BitHealth2024",
                        roleUser: "user"
                    }

                await request(app).post("/user/register").send(payload)

                const response = await request(app).post("/user/register").send(payload)
        
                expect(response.statusCode).toBe(400)
                expect(response.body).toHaveProperty('message')
            })
        })
    })

    describe("Login", () => {

        describe("when login successful", () => {

            const payload = {

                email: "steve@bithealth.co.id",
                password: "BitHealth2024",
            };

            test('should return status code 200', async () => { 

                const response = await request(app).post("/user/login").send(payload)
        
                expect(response.statusCode).toBe(200)
             })

             test("should return with token and userData ", async () => {

                const response = await request(app).post("/user/login").send(payload);

                expect(response.body).toHaveProperty('token');
                expect(response.body.userData).toHaveProperty('id');
                expect(response.body.userData).toHaveProperty('email');
                expect(response.body.userData).toHaveProperty('fullName');
             })
        })

        describe('when login get error bad request', () => {

            const payload = {

                email: "testbithealth.co.id",
                password: "BitHealth2024",
            };

            test('should return status code 400 with message', async () => { 

                const response = await request(app).post("/user/login").send(payload)
        
                expect(response.statusCode).toBe(400)
                expect(response.body).toHaveProperty('message')
             })
        })

        describe('when login get error email or password invalid', () => {

            const payload = {

                email: "stevebithealth.co.id",
                password: "BitHealth2024",
            };

            test('should return status code 400 with message', async () => {

                const response = await request(app).post("/user/login").send(payload)
            
                expect(response.statusCode).toBe(400)
                expect(response.body).toHaveProperty('message')
            })
        })

        describe('when login get error user not found', () => {

            const payload = {

                email: "nicola@bithealth.co.id",
                password: "test",
            };

            test('should return status code 404 with message', async () => {

                const response = await request(app).post("/user/login").send(payload)
            
                expect(response.statusCode).toBe(404)
                expect(response.body).toHaveProperty('message')
            })
        })
        
    })
})

describe("Drug" , () => {

    describe("Get Length of Drug", () => {

        describe('when successful get the length of drug data', () => {

            test("should return the lenght of drug data", async () => {
    
                const response = await request(app).get("/drug/datalength")
            
                expect(response.statusCode).toBe(200)
                expect(response.body).toHaveProperty('lenghtData')
            })
        })

    })

    describe("Get all the data of Drug", () => {

        describe('when successful get all list data of drug', () => {

            test("should return all list data of drug", async () => {
    
                const response = await request(app).get("/drug/list")

                expect(response.statusCode).toBe(200)
                expect(response.body).toHaveProperty('data')
            })
        })

    })

    describe("Get the detail data of a drug", () => {

        describe('when successful get the detail of drug data', () => {

            test("should return the detail of drug", async () => {
    
                const response = await request(app).get("/drug/detail/3")
            
                expect(response.statusCode).toBe(200)
                expect(response.body).toHaveProperty('data')
            })
        })

        describe('when fail get the detail data of drug because bad request', () => {

            test('should return status code 400 with bad request message', async () => { 
    
                const response = await request(app).get("/drug/detail/-9")
    
                expect(response.statusCode).toBe(400)
                expect(response.body).toHaveProperty('message')
             })
        })

        describe('when fail get the detail data of drug because drug are not found', () => {

            test('should return status code 404 with drug not found message', async () => { 
    
               const response = await request(app).get("/drug/detail/99")
    
               expect(response.statusCode).toBe(404)
               expect(response.body).toHaveProperty('message')
             })
        })
    })
})

describe("Cart", () => {

    const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZnVsbE5hbWUiOiJzdGV2ZSIsInJvbGVVc2VyIjoiVXNlciIsImlhdCI6MTcxODExNzUyOH0.hVL8aoQO_UV2fxoYl6NQKDUUv1silVeWX2HaiPfQsJM";

    describe("Get all the cart items", () => {

        describe('when successful get the data cart items', () => {

            test("should return all list data of cart", async () => {
    
                const response = await request(app).get("/cart/list/1")
                                        .set('token', `${userToken}`);

                expect(response.statusCode).toBe(200)
                expect(response.body[0]).toHaveProperty('id')
                expect(response.body[0]).toHaveProperty('userId')
                expect(response.body[0]).toHaveProperty('drugId')
                expect(response.body[0]).toHaveProperty('quantity')
                expect(response.body[0]).toHaveProperty('deletedAt')
                expect(response.body[0]).toHaveProperty('createdAt')
                expect(response.body[0]).toHaveProperty('updatedAt')
                expect(response.body[0].Drug).toHaveProperty('image')
                expect(response.body[0].Drug).toHaveProperty('name')
                expect(response.body[0].Drug).toHaveProperty('price')
            })

            test('should return status code 404 with message if no cart items found', async () => {
                const response = await request(app).get("/cart/list/999").set('token', `${userToken}`);
                expect(response.statusCode).toBe(404);
                expect(response.body).toHaveProperty('message');
            });

            test('should return status code 400 with bad request message if invalid userId', async () => {
                const response = await request(app).get("/cart/list/invalidId").set('token', `${userToken}`);
                expect(response.statusCode).toBe(400);
                expect(response.body).toHaveProperty('message');
            });
        })
    })

    // describe("Add to Cart", () => {
    //     describe('when successfully add to cart', () => {
    //         test('should return status code 201 with message', async () => {
    //             const payload = {
    //                 userId: 1,
    //                 drugId: 3,
    //                 quantity: 2
    //             };
    //             const response = await request(app).post("/cart/add").send(payload).set('token', `${userToken}`);
    //             expect(response.statusCode).toBe(201);
    //             expect(response.body).toHaveProperty('message');
    //         });
    //     });

    //     describe('when adding to cart fails due to bad request', () => {
    //         test('should return status code 400 with message', async () => {
    //             const payload = {
    //                 userId: "invalid",
    //                 drugId: "invalid",
    //                 quantity: "invalid"
    //             };
    //             const response = await request(app).post("/cart/add").send(payload).set('token', `${userToken}`);
    //             expect(response.statusCode).toBe(400);
    //             expect(response.body).toHaveProperty('message');
    //         });
    //     });

    //     describe('when updating the cart quantity', () => {
    //         test('should return status code 200 with updated data', async () => {
    //             const payload = {
    //                 userId: 1,
    //                 drugId: 3,
    //                 quantity: 5
    //             };
    //             const response = await request(app).post("/cart/add").send(payload).set('token', `${userToken}`);
    //             expect(response.statusCode).toBe(200);
    //             expect(response.body).toHaveProperty('data');
    //             expect(response.body).toHaveProperty('message');
    //         });
    //     });
    // });

    // describe("Update Cart Quantity", () => {
    //     describe('when successfully update the quantity of a cart item', () => {
    //         test('should return status code 200 with updated data', async () => {
    //             const payload = {
    //                 id: 1,
    //                 quantity: 10
    //             };
    //             const response = await request(app).put("/cart/updateQuantity").send(payload).set('token', `${userToken}`);
    //             expect(response.statusCode).toBe(200);
    //             expect(response.body).toHaveProperty('quantity', 10);
    //         });
    //     });

    //     describe('when updating quantity fails due to bad request', () => {
    //         test('should return status code 400 with message', async () => {
    //             const payload = {
    //                 id: "invalid",
    //                 quantity: "invalid"
    //             };
    //             const response = await request(app).put("/cart/updateQuantity").send(payload).set('token', `${userToken}`);
    //             expect(response.statusCode).toBe(400);
    //             expect(response.body).toHaveProperty('message');
    //         });
    //     });

    //     describe('when updating quantity fails due to item not found', () => {
    //         test('should return status code 404 with message', async () => {
    //             const payload = {
    //                 id: 999,
    //                 quantity: 10
    //             };
    //             const response = await request(app).put("/cart/updateQuantity").send(payload).set('token', `${userToken}`);
    //             expect(response.statusCode).toBe(404);
    //             expect(response.body).toHaveProperty('message');
    //         });
    //     });
    // });

    // describe("Delete Cart Item", () => {
    //     describe('when successfully delete a cart item', () => {
    //         test('should return status code 200 with message', async () => {
    //             const payload = {
    //                 id: 1,
    //                 userId: 1
    //             };
    //             const response = await request(app).delete("/cart/delete").send(payload).set('token', `${userToken}`);
    //             expect(response.statusCode).toBe(200);
    //             expect(response.body).toHaveProperty('message');
    //         });
    //     });

    //     describe('when deleting a cart item fails due to bad request', () => {
    //         test('should return status code 400 with message', async () => {
    //             const payload = {
    //                 id: "invalid",
    //                 userId: "invalid"
    //             };
    //             const response = await request(app).delete("/cart/delete").send(payload).set('token', `${userToken}`);
    //             expect(response.statusCode).toBe(400);
    //             expect(response.body).toHaveProperty('message');
    //         });
    //     });

    //     describe('when deleting a cart item fails due to item not found', () => {
    //         test('should return status code 404 with message', async () => {
    //             const payload = {
    //                 id: 999,
    //                 userId: 1
    //             };
    //             const response = await request(app).delete("/cart/delete").send(payload).set('token', `${userToken}`);
    //             expect(response.statusCode).toBe(404);
    //             expect(response.body).toHaveProperty('message');
    //         });
    //     });
    // });

    describe('Add to Cart', () => {

        test('should return status code 201 with message when successfully add to cart', async () => {
            const payload = {
                userId: 1,
                drugId: 1,
                quantity: 2
            };
            const response = await request(app)
                .post("/cart/add")
                .send(payload)
                .set('token', `${userToken}`);
            if (response.statusCode !== 201) {
                console.error('Error response:', response.body);
            }
            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('message');
        });

        test('should return status code 400 with message when adding to cart fails due to bad request', async () => {
            const payload = {
                userId: 1,
                drugId: 1,
                quantity: "invalid"
            };
            const response = await request(app)
                .post("/cart/add")
                .send(payload)
                .set('token', `${userToken}`);
            if (response.statusCode !== 400) {
                console.error('Error response:', response.body);
            }
            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('message');
        });

        test('should return status code 200 with updated data when updating the cart quantity', async () => {
            const payload = {
                userId: 1,
                drugId: 1,
                quantity: 5
            };
            const response = await request(app)
                .post("/cart/add")
                .send(payload)
                .set('token', `${userToken}`);
            if (response.statusCode !== 200) {
                console.error('Error response:', response.body);
            }
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('data');
            expect(response.body).toHaveProperty('message');
        });
    });

    describe('Update Cart Quantity', () => {
        test('should return status code 200 with updated data when successfully update the quantity of a cart item', async () => {
            const payload = {
                id: 1,
                quantity: 10
            };
            const response = await request(app)
                .put("/cart/updateQuantity")
                .send(payload)
                .set('token', `${userToken}`);
            if (response.statusCode !== 200) {
                console.error('Error response:', response.body);
            }
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('quantity', 10);
        });

        test('should return status code 400 with message when updating quantity fails due to bad request', async () => {
            const payload = {
                id: 1,
                quantity: "invalid"
            };
            const response = await request(app)
                .put("/cart/updateQuantity")
                .send(payload)
                .set('token', `${userToken}`);
            if (response.statusCode !== 400) {
                console.error('Error response:', response.body);
            }
            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('message');
        });

        test('should return status code 404 with message when updating quantity fails due to item not found', async () => {
            const payload = {
                id: 999, // Asumsikan produk dengan ID ini tidak ada
                quantity: 10
            };
            const response = await request(app)
                .put("/cart/updateQuantity")
                .send(payload)
                .set('token', `${userToken}`);
            if (response.statusCode !== 404) {
                console.error('Error response:', response.body);
            }
            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('message');
        });
    });

    describe('Delete Cart Item', () => {
        test('should return status code 200 with message when successfully delete a cart item', async () => {
            const payload = {
                userId: 1,
                id: 1
            };
            const response = await request(app)
                .delete("/cart/delete")
                .send(payload)
                .set('token', `${userToken}`);
            if (response.statusCode !== 200) {
                console.error('Error response:', response.body);
            }
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('message');
        });

        test('should return status code 400 with message when deleting a cart item fails due to bad request', async () => {
            const payload = {
                userId: 1,
                id: "invalid"
            };
            const response = await request(app)
                .delete("/cart/delete")
                .send(payload)
                .set('token', `${userToken}`);
            if (response.statusCode !== 400) {
                console.error('Error response:', response.body);
            }
            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('message');
        });

        test('should return status code 404 with message when deleting a cart item fails due to item not found', async () => {
            const payload = {
                userId: 1,
                id: 999 // Asumsikan produk dengan ID ini tidak ada
            };
            const response = await request(app)
                .delete("/cart/delete")
                .send(payload)
                .set('token', `${userToken}`);
            if (response.statusCode !== 404) {
                console.error('Error response:', response.body);
            }
            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('message');
        });
    });

    // describe('Add to Cart', () => {
    //     test('should return status code 201 with message when successfully add to cart', async () => {
    //         const payload = {
    //             userId: 1,
    //             drugId: 1,
    //             quantity: 2
    //         };
    //         const response = await request(app)
    //             .post("/cart/add")
    //             .send(payload)
    //             .set('token', `${userToken}`);
    //         if (response.statusCode !== 201) {
    //             console.error('Error response:', response.body);
    //         }
    //         expect(response.statusCode).toBe(201);
    //         expect(response.body).toHaveProperty('message');
    //     });

    //     test('should return status code 400 with message when adding to cart fails due to bad request', async () => {
    //         const payload = {
    //             userId: 1,
    //             drugId: 1,
    //             quantity: "invalid"
    //         };
    //         const response = await request(app)
    //             .post("/cart/add")
    //             .send(payload)
    //             .set('token', `${userToken}`);
    //         if (response.statusCode !== 400) {
    //             console.error('Error response:', response.body);
    //         }
    //         expect(response.statusCode).toBe(400);
    //         expect(response.body).toHaveProperty('message');
    //     });

    //     test('should return status code 200 with updated data when updating the cart quantity', async () => {
    //         const payload = {
    //             userId: 1,
    //             drugId: 1,
    //             quantity: 5
    //         };
    //         const response = await request(app)
    //             .post("/cart/add")
    //             .send(payload)
    //             .set('token', `${userToken}`);
    //         if (response.statusCode !== 200) {
    //             console.error('Error response:', response.body);
    //         }
    //         expect(response.statusCode).toBe(200);
    //         expect(response.body).toHaveProperty('data');
    //         expect(response.body).toHaveProperty('message');
    //     });
    // });

    // describe('Update Cart Quantity', () => {
    //     test('should return status code 200 with updated data when successfully update the quantity of a cart item', async () => {
    //         const payload = {
    //             drugId: 1,
    //             quantity: 10
    //         };
    //         const response = await request(app)
    //             .put("/cart/updatequantity") // Perubahan disini
    //             .send(payload)
    //             .set('token', `${userToken}`);
    //         if (response.statusCode !== 200) {
    //             console.error('Error response:', response.body);
    //         }
    //         expect(response.statusCode).toBe(200);
    //         expect(response.body).toHaveProperty('quantity', 10);
    //     });

    //     test('should return status code 400 with message when updating quantity fails due to bad request', async () => {
    //         const payload = {
    //             drugId: 1,
    //             quantity: "invalid"
    //         };
    //         const response = await request(app)
    //             .put("/cart/updatequantity") // Perubahan disini
    //             .send(payload)
    //             .set('token', `${userToken}`);
    //         if (response.statusCode !== 400) {
    //             console.error('Error response:', response.body);
    //         }
    //         expect(response.statusCode).toBe(400);
    //         expect(response.body).toHaveProperty('message');
    //     });

    //     test('should return status code 404 with message when updating quantity fails due to item not found', async () => {
    //         const payload = {
    //             drugId: 999, // Asumsikan produk dengan ID ini tidak ada
    //             quantity: 10
    //         };
    //         const response = await request(app)
    //             .put("/cart/updatequantity") // Perubahan disini
    //             .send(payload)
    //             .set('token', `${userToken}`);
    //         if (response.statusCode !== 404) {
    //             console.error('Error response:', response.body);
    //         }
    //         expect(response.statusCode).toBe(404);
    //         expect(response.body).toHaveProperty('message');
    //     });
    // });

    // describe('Delete Cart Item', () => {
    //     test('should return status code 200 with message when successfully delete a cart item', async () => {
    //         const payload = {
    //             drugId: 1
    //         };
    //         const response = await request(app)
    //             .delete("/cart/delete") // Perubahan disini
    //             .send(payload)
    //             .set('token', `${userToken}`);
    //         if (response.statusCode !== 200) {
    //             console.error('Error response:', response.body);
    //         }
    //         expect(response.statusCode).toBe(200);
    //         expect(response.body).toHaveProperty('message');
    //     });

    //     test('should return status code 400 with message when deleting a cart item fails due to bad request', async () => {
    //         const payload = {
    //             drugId: "invalid"
    //         };
    //         const response = await request(app)
    //             .delete("/cart/delete") // Perubahan disini
    //             .send(payload)
    //             .set('token', `${userToken}`);
    //         if (response.statusCode !== 400) {
    //             console.error('Error response:', response.body);
    //         }
    //         expect(response.statusCode).toBe(400);
    //         expect(response.body).toHaveProperty('message');
    //     });

    //     test('should return status code 404 with message when deleting a cart item fails due to item not found', async () => {
    //         const payload = {
    //             drugId: 999 // Asumsikan produk dengan ID ini tidak ada
    //         };
    //         const response = await request(app)
    //             .delete("/cart/delete") // Perubahan disini
    //             .send(payload)
    //             .set('token', `${userToken}`);
    //         if (response.statusCode !== 404) {
    //             console.error('Error response:', response.body);
    //         }
    //         expect(response.statusCode).toBe(404);
    //         expect(response.body).toHaveProperty('message');
    //     });
    // });
})

describe("Order", () => {

    const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZnVsbE5hbWUiOiJzdGV2ZSIsInJvbGVVc2VyIjoiVXNlciIsImlhdCI6MTcxODExNzUyOH0.hVL8aoQO_UV2fxoYl6NQKDUUv1silVeWX2HaiPfQsJM";

    describe("Get unpaid order list", () => {
        test("should return unpaid order list", async () => {
            const response = await request(app)
                .get("/order/unpaidlist/1")
                .set('token', `${userToken}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });

        test("should return error with bad request message", async () => {
            const response = await request(app)
                .get("/order/unpaidlist/-1")
                .set('token', `${userToken}`);
            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('message');
        });

        test("should return error with not found message", async () => {
            const response = await request(app)
                .get("/order/unpaidlist/17")
                .set('token', `${userToken}`);
            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('message');
        });
    });

    describe("Get paid order list", () => {
        test("should return paid order list", async () => {
            const response = await request(app)
                .get("/order/paidlist/1")
                .set('token', `${userToken}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });

        test("should return error with bad request message", async () => {
            const response = await request(app)
                .get("/order/paidlist/-1")
                .set('token', `${userToken}`);
            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('message');
        });

        test("should return error with not found message", async () => {
            const response = await request(app)
                .get("/order/paidlist/17")
                .set('token', `${userToken}`);
            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('message');
        });
    });

    describe("Get cancelled order list", () => {
        test("should return cancelled order list", async () => {
            const response = await request(app)
                .get("/order/cancellist/1")
                .set('token', `${userToken}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });

        test("should return error with bad request message", async () => {
            const response = await request(app)
                .get("/order/cancellist/-1")
                .set('token', `${userToken}`);
            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('message');
        });

        test("should return error with not found message", async () => {
            const response = await request(app)
                .get("/order/cancellist/17")
                .set('token', `${userToken}`);
            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('message');
        });
    });

    describe("Place an order", () => {
        test("should place an order and return status code 201", async () => {
            const payload = { userId: 1 };
            const response = await request(app)
                .post("/order/placedorder")
                .send(payload)
                .set('token', `${userToken}`);
            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('message');
        });

        test("should return status code 400 for bad request", async () => {
            const payload = {};
            const response = await request(app)
                .post("/order/placedorder")
                .send(payload)
                .set('token', `${userToken}`);
            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('message');
        });
    });

    describe("Order detail", () => {
        test("should return order detail", async () => {
            const payload = { orderId: 1, userId: 1 };
            const response = await request(app)
                .post("/order/detail")
                .send(payload)
                .set('token', `${userToken}`);
            expect(response.statusCode).toBe(200);
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('orderId');
            expect(response.body[0]).toHaveProperty('drugId');
            expect(response.body[0]).toHaveProperty('quantity');
            expect(response.body[0]).toHaveProperty('createdAt');
            expect(response.body[0]).toHaveProperty('updatedAt');
            expect(response.body[0].Drug).toHaveProperty('image');
            expect(response.body[0].Drug).toHaveProperty('name');
            expect(response.body[0].Drug).toHaveProperty('price');
        });

        test("should return status code 400 for bad request", async () => {
            const payload = { userId: 1 };
            const response = await request(app)
                .post("/order/detail")
                .send(payload)
                .set('token', `${userToken}`);
            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('message');
        });
            
        test("should return status code 404 for invalid order", async () => {
            const payload = { orderId: 100, userId: 1 };
            const response = await request(app)
            .post("/order/detail")
            .send(payload)
            .set('token', `${userToken}`);
            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('message');
            // expect(response.body[0]).toHaveProperty('message');
        });
    });

    describe("Mark order as paid", () => {
        test("should mark order as paid and return status code 200", async () => {
            const payload = { orderId: 1, userId: 1 };
            const response = await request(app)
                .post("/order/paid")
                .send(payload)
                .set('token', `${userToken}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('message');
        });

        test("should return status code 400 for bad request", async () => {
            const payload = { userId: 1 };
            const response = await request(app)
                .post("/order/paid")
                .send(payload)
                .set('token', `${userToken}`);
            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('message');
        });

        test("should return status code 404 for not found order", async () => {
            const payload = { orderId: 100, userId: 1 };
            const response = await request(app)
                .post("/order/paid")
                .send(payload)
                .set('token', `${userToken}`);
            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('message');
        });

        test("should return status code 400 for out of stock", async () => {
            const payload = { orderId: 3, userId: 1 };
            const response = await request(app)
                .post("/order/paid")
                .send(payload)
                .set('token', `${userToken}`);
            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('message');
        });
    });

    describe("Update order quantity", () => {
        test("should update order quantity and return status code 200", async () => {
            const payload = { orderDetailId: 7, orderId: 3, userId:1, quantity: 15 };
            const response = await request(app)
                .put("/order/update")
                .send(payload)
                .set('token', `${userToken}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('message');
        });

        test("should return status code 400 for bad request", async () => {
            const payload = { orderId: 1, userId: 1, quantity: "invalid" };
            const response = await request(app)
                .put("/order/update")
                .send(payload)
                .set('token', `${userToken}`);
            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('message');
        });

        test("should return status code 404 for invalid order", async () => {
            const payload = { orderDetailId: 7, orderId: 30, userId: 1, quantity: 17 };
            const response = await request(app)
                .put("/order/update")
                .send(payload)
                .set('token', `${userToken}`);
            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('message');
        });

        test("should return status code 404 for invalid Order Item", async () => {
            const payload = { orderDetailId: 70, orderId: 3, userId:1, quantity: 15 };
            const response = await request(app)
                .put("/order/update")
                .send(payload)
                .set('token', `${userToken}`);
            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('message');
        });
    });

    describe("Cancel an order", () => {
        test("should cancel the order and return status code 200", async () => {
            const payload = { orderId: 2, userId: 1 };
            const response = await request(app)
                .post("/order/cancel")
                .send(payload)
                .set('token', `${userToken}`);
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('message');
        });

        test("should return status code 404 for order not found", async () => {
            const payload = { orderId: 200, userId: 1 };
            const response = await request(app)
                .post("/order/cancel")
                .send(payload)
                .set('token', `${userToken}`);
            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('message');
        });

        test("should return status code 400 for bad request", async () => {
            const payload = { userId: 1 };
            const response = await request(app)
                .post("/order/cancel")
                .send(payload)
                .set('token', `${userToken}`);
            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('message');
        });
    });

});