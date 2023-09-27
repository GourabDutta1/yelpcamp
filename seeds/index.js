const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 25; i++) {
        const random1000 = Math.floor(Math.random() * 100);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '5f5c330c2cd79d538f2c66d9',
            location: `${cities[random1000].city}, ${cities[random1000].country}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].lng,
                    cities[random1000].lat,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dgtu8fqn8/image/upload/v1693631697/YelpCamp/guzjebztnmsr2q6lrc3x.png',
                    filename: 'YelpCamp/guzjebztnmsr2q6lrc3x'
                },
                {
                    url: 'https://res.cloudinary.com/dgtu8fqn8/image/upload/v1693631695/YelpCamp/f6wbfentdivop7hssibb.png',
                    filename: 'YelpCamp/f6wbfentdivop7hssibb'
                },
                {
                    url: 'https://res.cloudinary.com/dgtu8fqn8/image/upload/v1693636200/YelpCamp/kabyhui3q0qq26huyez2.avif',
                    filename: 'YelpCamp/kabyhui3q0qq26huyez2'
                },
                {
                    url: 'https://res.cloudinary.com/dgtu8fqn8/image/upload/v1693636197/YelpCamp/zuldfivmfblbp4gf4tvj.avif',
                    filename: 'YelpCamp/zuldfivmfblbp4gf4tvj'
                },
                {
                    url: 'https://res.cloudinary.com/dgtu8fqn8/image/upload/v1693636196/YelpCamp/jjavegprlbqjphzwcjsl.avif',
                    filename: 'YelpCamp/jjavegprlbqjphzwcjsl'
                },
                {
                    url: 'https://res.cloudinary.com/dgtu8fqn8/image/upload/v1693636196/YelpCamp/cr5o90g4gpkh607ec36w.avif',
                    filename: 'YelpCamp/cr5o90g4gpkh607ec36w'
                },

            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
    console.log('Database closed');
})