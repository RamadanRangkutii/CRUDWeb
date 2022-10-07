var express = require('express');
var router = express.Router();
var multer = require('multer');

const db = require('../models');
const news = require('../models/news');
// const Comment = db.comments;
const News = db.newss;
const Op = db.Sequelize.Op;

const fileStorageEngine = multer.diskStorage({
	destination: (req, file, cb)=>{
		cb(null, '././public/images')
	},
	filename:(req,file,cb)=>{
		cb(null, new Date().getTime() + '-' + file.originalname)
	}
});
const upload = multer ({storage: fileStorageEngine});



/* GET home page. */
// SELECT * FROM news
router.get('/', function(req, res, next) {
	News.findAll()
	.then(news=>{
		res.render('homepage', { 
			title: 'Home Page',
			news: news
			});
	})
  .catch(err=>{
		res.render('homepage',{
			title: 'Home Page',
			news: []
		})
	})
});


//detailnews
router.get('/detailnews/:id', function(req, res, next) {  
  var id = parseInt(req.params.id); // /detail/2, /detail/3
  // query ke database
  // select * from product where id=id
  News.findByPk(id)
	.then(detailNews => {
		if(detailNews){
			res.render('detailnews', { 
        title: 'Detail News',
        news: detailNews
      });
		}else{
			// http 404 not found
			res.render('detailnews', { 
        title: 'Detail News',
        news: {}
      });
		}
		
	})
	.catch(err => {
		res.render('Detail News', { 
      title: 'Detail News',
      news: {}
    });
	});
});


//addnews
router.get('/addnews', function(req, res, next) {
  res.render('addnews', { title: 'Add News',
path:'addnews' });
});


router.post('/addnews', upload.array('image',1), function(req, res, next) {
	
	var image = req.files[0].filename;
  var news = {
		title: req.body.title,
    image: image,
    content: req.body.content
	}
	console.log(news);
	News.create(news)
	.then(data => {
		console.log(image);
		res.redirect('/');
	})
	.catch(err => {
		res.json({
			info:"Error",
			message: err.message
		})
	});

  //res.render('addproduct', { title: 'Add Product' });
});
  //res.render('addproduct', { title: 'Add Product' });



//DELETE News
//PR=flag delete
router.get('/deletenews/:id', function(req, res, next) {  
  var id = parseInt(req.params.id); // /detail/2, /detail/3
	

  News.destroy({
		where: {id: id}
	})
	.then(num => {
    res.redirect('/');
	})
	.catch(err => {
		res.json({
			info: "Error",
			message: err.message
		});
	});  
});


//update
// router.get('/editnews/:id', function(req, res, next) {  
//   var id = parseInt(req.params.id); // /detail/2, /detail/3
//   // query ke database
//   // select * from product where id=id
//   News.findByPk(id)
// 	.then(detailNews => {
// 		if(detailNews){
// 			res.render('editnews', { 
//         title: 'Edit News',
//         title: detailNews.title,
//         name: detailProduct.image,
//       });
// 		}else{
// 			// http 404 not found
// 			res.redirect('/news');
// 		}
		
// 	})
// 	.catch(err => {
// 		res.redirect('/news');
// 	});

// });

//POST

router.get('/updatenews/:id', function(req, res, next) {
	var id = parseInt(req.params.id);

	News.findByPk(id)
	  .then(news => {
		  if(news){
			res.render('updatenews', { 
			  title: 'Update News',
			  news: news
			});
		  }else{
			  res.redirect('/')
		  }
	  })
	  .catch(err => {
		res.redirect('/')
	  });
  });

  router.post('/updatenews/:id', upload.single('image'), function(req, res, next) {
	var id = req.params.id;
	if(req.body.title) var title=req.body.title;
	if(req.file.filename) var image=req.file.filename;
	if(req.body.content) var content=req.body.content; 
	var coba = {
		title: title,
		image: image,
		content: content
	}

	News.update(coba, {
		where: {id: id}
	})
	.then(num => {
		res.redirect('/')
	})
	.catch(err => {
		res.redirect('/')
	});
});

// router.post('/updatenews/:id', function(req, res, next) {  
//   var id = parseInt(req.params.id); // /detail/2, /detail/3

//   News.update(req.body, {
// 		where: {id: id}
// 	})
// 	.then(num => {
// 		res.redirect('/');
		
// 	})
// 	.catch(err => {
// 		res.json({
// 			info: "Error",
// 			message: err.message
// 		});
// 	});
// });


module.exports = router;
