const moviebooking = require('../Model/movieBookingModel');

// Add movie booking details
exports.addMovieBooking = async (req, res) => {
    console.log("Inside movie booking controller function");
    console.log("Request body:", req.body);

    const {
        movieId, userMovieName, userMovieShowDate, userMovieShowTime,
        userMovieSeatNumber, userNumberOfSeats, userTicketAmount, userId, movieImage
    } = req.body;

    // Validate input
    if (!movieId || !userMovieName || !userMovieShowDate || !userMovieShowTime || !userMovieSeatNumber || !userNumberOfSeats || !userTicketAmount || !userId || !movieImage) {
        console.error("Missing required booking details");
        return res.status(400).json({ error: "All fields are required" });
    }

    console.log(`Booking details received: 
        Movie ID: ${movieId}, 
        Movie Name: ${userMovieName}, 
        Show Date: ${userMovieShowDate}, 
        Show Time: ${userMovieShowTime}, 
        Seat Numbers: ${userMovieSeatNumber}, 
        Number of Seats: ${userNumberOfSeats}, 
        Ticket Amount: ${userTicketAmount},
        User ID: ${userId},
        image link: ${movieImage}`);

    try {
        // // Ensure userMovieSeatNumber is an array
        // const seatNumbersArray = JSON.parse(userMovieSeatNumber);
        // if (!Array.isArray(seatNumbersArray)) {
        //     throw new Error("userMovieSeatNumber should be an array");
        // }

        // // Check if any seat is already booked for the given movie and show date/time
        // const existingBooking = await moviebooking.findOne({
        //     userMovieName,
        //     userMovieShowDate,
        //     userMovieShowTime,
        //     userMovieSeatNumber: { $in: seatNumbersArray }
        // });

        // if (existingBooking) {
        //     console.error("One or more of the seats are already booked");
        //     return res.status(406).json({ error: "One or more of the seats are already booked" });
        // }

        // Create new booking
        const newBooking = new moviebooking({
            movieId, userMovieName, userMovieShowDate, userMovieShowTime,
            userMovieSeatNumber, userNumberOfSeats, userTicketAmount, userId, movieImage
        });

        await newBooking.save();
        console.log("New booking created successfully");
        res.status(200).json(newBooking);
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// get movie booking detail by id 

exports.getUserBookings = async (req, res) => {
    const { mid } = req.params;

    try {
        const userBookingDetails = await moviebooking.find({ userId: mid });
        res.status(200).json(userBookingDetails);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// get all movie booking detail
exports.getAllMovieBookingDetails=async(req,res)=>{
    try {
        const allMovieBookingDetails=await moviebooking.find()
        res.status(200).json(allMovieBookingDetails)
    } catch (error) {
        res.status(401).json(error)
    }
}

// get all movie booking for inactivating seats
exports.getAllBookedSeatsDetails=async(req,res)=>{
    try {
        const allBookedSeatsDetails=await moviebooking.find()
        res.status(200).json(allBookedSeatsDetails)
    } catch (error) {
        res.status(401).json(error)
    }
}
