const express = require('express');
const router = new express.Router();
const userController = require('../Controller/userController');
const adminController = require('../Controller/adminController');
const movieController = require('../Controller/movieController');
const movieBookingController = require('../Controller/movieBookingController');
const razorpayment = require('../Payment/razorpayment');
const jwtMiddleware = require('../Middlewares/jwtMiddleware');
const multerConfig = require('../Middlewares/multerMiddleware');

// User registration
router.post('/user/register', userController.register);

// User login
router.post('/user/login', userController.login);

// Admin registration
router.post('/admin/register', adminController.adminRegister);

// Admin login
router.post('/admin/login', adminController.adminLogin);

// Add movie details
router.post('/addmovies', jwtMiddleware, multerConfig.fields([
  { name: 'moviePoster', maxCount: 1 },
  { name: 'movieThumbnail', maxCount: 1 }
]), movieController.addMovieDetails);

// Get landing movies
router.get('/landingmovies', movieController.getLandingMovie);

// Get all movies
router.get('/allmovies', movieController.getAllMovies);

// Delete movie
router.delete('/movies/remove/:mid', jwtMiddleware, movieController.deleteMovies);

// Get all users
router.get('/allusers', jwtMiddleware, userController.getAllUserData);

// Get movie detail by ID
router.get('/moviedetails/:mid', movieController.getMovieDetailById);

//add movie booking details
router.post('/moviebookingdetails',jwtMiddleware,multerConfig.none(),movieBookingController.addMovieBooking)

// Get a user detail by ID
router.get('/userdetails/:mid', userController.getAUserData);

// Get user booking detail by ID
router.get('/userbooking/:mid',jwtMiddleware, movieBookingController.getUserBookings);

// Get all movie booking details
router.get('/allmoviebooking',jwtMiddleware, movieBookingController.getAllMovieBookingDetails);

// Get all movie booked seats details
router.get('/allseatbooking', movieBookingController.getAllBookedSeatsDetails);

//payment routing
router.post('/create-order',razorpayment.razorpayPayment);

module.exports = router;
