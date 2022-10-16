const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63428f5e500163b663afc06a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi perspiciatis ipsa officiis dolores animi numquam est, porro quod similique necessitatibus, earum minus! Suscipit, ea aperiam ipsum vitae libero impedit culpa.',
            price,
            geometry: { type: 'Point', coordinates: [cities[random1000].longitude, cities[random1000].latitude] },
            images: [
                {
                    url: 'https://res.cloudinary.com/dk29lzqrw/image/upload/v1665561189/YelpCamp/lldbmdqcgfx1ptmeokfb.jpg',
                    filename: 'YelpCamp/lldbmdqcgfx1ptmeokfb'

                },
                {
                    url: 'https://res.cloudinary.com/dk29lzqrw/image/upload/v1665561189/YelpCamp/yh26jiltn9semifj9tds.jpg',
                    filename: 'YelpCamp/yh26jiltn9semifj9tds'

                }
            ]
        })
        await camp.save();
    }
}

seedDb()
    .then(() => {
        mongoose.connection.close();
    })