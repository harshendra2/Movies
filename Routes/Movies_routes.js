const express=require('express');
const router=new express.Router();
const controller=require('../Controller/movies_controller');
const {upload}=require('../Middleware/multer');

router.get('/movie/get',controller.GetAllMovies);
router.get('/movie/get_category',controller.GetAllCategory);
router.post('/movie/add',upload.single('file'),controller.AddNewMovie);
router.get('/movie/single_movie/:id',controller.GetSingleMovie);

//Create Movies Parts
router.post('/movie/creat/genres',controller.CreateGenres);
router.post('/movie/creat/director',controller.CreateDirectors);
router.post('/movie/create/Actors',controller.CreateActors);

module.exports=router;