const mongoose=require('mongoose');

const Dishes=require('./modals/dishes');

const url='mongodb://localhost:27017/conFusion';
const connect=mongoose.connect(url);

connect.then((db)=>{
    console.log('Connection successful to server');

    Dishes.create({
        name:'Uthappizza',
        description:'test'
    })
        .then((dish)=>{
            console.log(dish);

            Dishes.findByIdAndUpdate(dish._id, {
                $set:{description:'Updated Test'}
            },{
                new:true
            }).exec();
        })
        .then((dish)=>{
            console.log(dish);

            dish.comments.push({
                rating:5,
                comment:'Nice!!!',
                author:'Leonardo Di Carpaccio'
            });
        
        return dish.save();
    })
    .then((dish)=>{
            console.log(dish);

            return Dishes.remove({});
        })
        .then(()=>{
            return mongoose.connection.close();
        })
        .catch((err)=>{
            console.log(err);
        });
    });