const mongoose = require('mongoose');

const DB = 'mongodb+srv://mkgautam:manish@cluster0.ikn0u.mongodb.net/student?retryWrites=true&w=majority';

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() =>{
    console.log(`we are connected`);
}).catch((e) => {
    console.log(`no connection`);
})

