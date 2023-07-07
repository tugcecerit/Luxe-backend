require('dotenv').config();

const { PORT } = process.env;

const express = require('express');
// const routes = require('./routes/index')
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


// app.use('/', routes);

app.get('/', (req, res) => {
    res.send('Hello World');
  });



app.post("/checkout", async (req, res) => {
    console.log("Received checkout request");
    console.log(req.body);
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item)=> {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.BACKEND_URL}/success`,
        cancel_url: `${process.env.BACKEND_URL}/cancel`
    });

    res.send(JSON.stringify({
        url: session.url
    }));
});

// const router = require('express').Router()
const { testimonialCtrl } = require('./controllers')
app.get('/testimonials', testimonialCtrl.getTestimonial)
app.post('/testimonials', testimonialCtrl.createTestimonial)
app.put('/testimonials/:id', testimonialCtrl.updateTestimonial)
app.delete('/testimonials/:id', testimonialCtrl.deleteTestimonial)

app.use((req, res) => {
    res.status(404).json({message: 'Not a proper route!'})
})

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));


