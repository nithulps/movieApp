const mongoose = require('mongoose')

const movieBookingSchema=new mongoose.Schema({
    movieId:{
        type:String,
        required:true
    },
    userMovieName:{
        type:String,
        required:true
    },
    userMovieShowDate:{
        type:String,
        required:true
    },
    userMovieShowTime:{
        type:String,
        required:true
    },
    userMovieSeatNumber:{
        type:String,
        required:true
    },
    userNumberOfSeats:{
        type:String,
        required:true
    },
    userTicketAmount:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    movieImage:{
        type:String,
        required:true
    }
})
const moviebooking=mongoose.model("moviebooking",movieBookingSchema)
module.exports=moviebooking