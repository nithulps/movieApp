const movies = require('../Model/movieModel');

// Add movie details
exports.addMovieDetails = async (req, res) => {
    try {
        console.log("Inside movie controller function");

        const {
            movieName, releaseDate, movieLength, movieLanguage, rottenRating, imdbRating,
            movieGenre, movieTrailer, movieFrom, movieTo, screensShowing, movieAbout
        } = req.body;

        const moviePoster = req.files.moviePoster[0].filename;
        const movieThumbnail =req.files.movieThumbnail[0].filename;

        const userId = req.payload; 

        console.log(
            movieName, releaseDate, movieLength, movieLanguage, rottenRating, imdbRating,
            movieGenre, movieThumbnail, moviePoster, movieTrailer, movieFrom, movieTo,
            screensShowing, movieAbout, userId
        );


        const existingMovie=await movies.findOne({movieName})
        if(existingMovie){
            res.status(406).json("Movie already exist")
        }else{
            const newMovie=new movies({
                movieName, releaseDate, movieLength, movieLanguage, rottenRating, imdbRating,
                movieGenre, movieThumbnail, moviePoster, movieTrailer, movieFrom, movieTo,
                screensShowing, movieAbout, userId
            })
            await newMovie.save()
            res.status(200).json(newMovie)
        }
    } catch (error) {
        console.error("Error adding movie details:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// home movie displaying

exports.getLandingMovie=async(req,res)=>{
    try {
        const allHomeMovies=await movies.find().limit(4)
        res.status(200).json(allHomeMovies)
    } catch (err) {
        res.status(401).json(err)
    }
}

// all movie displaying

exports.getAllMovies=async(req,res)=>{
    try {
        const allMovies=await movies.find()
        res.status(200).json(allMovies)
    } catch (error) {
        res.status(401).json(error)
    }
}

//delete movie
exports.deleteMovies=async(req,res)=>{
    const {mid}=req.params
    try {
        const deleteData=await movies.findByIdAndDelete({_id:mid})
        res.status(200).json(deleteData)
    } catch (err) {
        res.status(401).json(err)
    }
}


// get an movie detail by id 

exports.getMovieDetailById=async(req,res)=>{
    const {mid}=req.params
    try {
        const getMovieDetails=await movies.findById({_id:mid})
        res.status(200).json(getMovieDetails)
    } catch (err) {
        res.status(401).json(err)
    }
}
