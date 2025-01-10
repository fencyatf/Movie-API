const express = require('express')
const router = express.Router()
const movies =require('../movies')

router.get('/',(req,res)=>{
    try {
        res.status(200).json({ message: 'Movies retrieved successfully', data: movies });
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch movies' });
      }
})

router.get('/:id',(req,res)=>{
    try {
        const movieID = parseInt(req.params.id)
        const movie =movies.find(m => m.id===movieID)

        if(!movie){
            res.status(404).json({error:"Movie not found"})
        }
        res.status(200).json({ message: 'Movie retrieved successfully', data: movie });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch the movie' });
    }
})

//Creating
router.post('/',(req,res)=>{
    try {
          if(!req.body)res.status(400).json({message:"Title, Genre, Release Year, and Rating are required"})
          const {title, genre, releaseYear, rating} = req.body  
          if(!title || !genre || !releaseYear || !rating) res.status(400).json({message:"Title, Genre, Release Year, and Rating are required"})

          const newMovie ={
            id:movies.length?movies[movies.length-1].id+1:1,
            title:title,
            genre:genre,
            releaseYear:releaseYear,
            rating:rating
          }

          movies.push(newMovie)
          res.status(201).json({message:"Movie added succesfully", data:newMovie})
    } catch (error) {
        res.status(500).json({ error: 'Failed to add the movie' })
    }  
})

//Updating
router.patch('/:id',(req,res)=>{
    try {
        const movieID = parseInt(req.params.id)
        const movie = movies.find(m=>m.id===movieID)
        if(!movie){
            res.status(404).json({error:"Movie not found"})
        }
        const {title, genre, releaseYear, rating} = req.body

        if (title) movie.title = title
        if (genre) movie.genre = genre
        if (releaseYear) movie.releaseYear = releaseYear
        if (rating) movie.rating = rating


        res.status(200).json({ message: 'Movie updated successfully', data: movie });
  } catch (error) {
        res.status(500).json({ error: 'Failed to update the movie' })
    }
})

//Delete
router.delete('/:id',(req,res)=>{
    try {
        const movieID = parseInt(req.params.id)
        const movieIndex = movies.findIndex(m=>m.id===movieID)

        if(movieIndex === -1){
            return res.status(404).json({error:"Movie not found"})
        }
        const deletedMovie = movies.splice(movieIndex, 1)
        res.status(200).json({ message: 'Movie deleted successfully', data: deletedMovie });
  } catch (error) {
        res.status(500).json({ error: 'Failed to delete the movie' });
    }
})

module.exports = router