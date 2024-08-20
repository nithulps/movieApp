const mongoose=require('mongoose')
const connectionString=process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log(`mongoDb Atlas successfully connected with bmeServer`);
}).catch((err)=>{
    console.log(`mongoDb connection failed! error:${err}`);
})