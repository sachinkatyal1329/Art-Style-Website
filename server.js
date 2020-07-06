const express = require('express');
const multer = require("multer");
const {spawn} = require('child_process');
const path = require('path');


const app = express();

var urls = [];

var names = [];

app.get('/', (req, res) => {
	res.render('index.ejs', {user: "HI"});	
});

app.use(express.static('public'));

app.get('/api/customers', (req, res) => {
	res.json(urls);
});   

const port = 5000

app.listen(port, () => {
	console.log('Server started on port 5000');
	dir();

});


//requiring path and fs modules
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, 'public/images/result/');
//passsing directoryPath and callback function

const dir = function() {
	urls = []

	 fs.readdir(directoryPath, function (err, files) {
	    //handling error
	    if (err) {
	        return console.log('Unable to scan directory: ' + err);
	    } 
	    //listing all files using forEach
	    console.log("HI " + files.length);
	    files.forEach(function (file) {
	        // Do whatever you want to do with the file
	        var type = file.split(".");

	       	if (type.length == 2 && (type[1] == "png" || type[1] == "jpg")) {
	       		urlResult = "http://localhost:5000/images/result/"
	       		url = "http://localhost:5000/images/"

	       		urls.push({
	       			conent: url.concat("mypic-" + file.split("-")[0]) + ".jpg",
	       			style: url.concat("mypic-" + file.split("-")[1]),
	       			result: urlResult.concat(file)
	       		})

	       		//urls.push(url.concat(file));
	       	}
	    });
	});
}


var storage = multer.diskStorage({ 
    destination: function (req, file, cb) { 
  
        // Uploads is the Upload_folder_name 
        cb(null, "public/images/") 
    }, 
    filename: function (req, file, cb) { 
		const name =  file.fieldname + "-" + Date.now()+".jpg"

		const paths = "public/images/";
		names.push(paths.concat(name));

      cb(null, name) 
    } 
  })




const maxSize = 1 * 1000 * 1000; 
    
var upload = multer({  
    storage: storage, 
    limits: { fileSize: maxSize }, 
    fileFilter: function (req, file, cb){

    
        // Set the filetypes, it is optional 
        var filetypes = /jpeg|jpg|png/; 
        var mimetype = filetypes.test(file.mimetype); 
  
        var extname = filetypes.test(path.extname( 
                    file.originalname).toLowerCase()); 
        
        if (mimetype && extname) { 
            return cb(null, true); 
        } 
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes); 
      }  
  
// mypic is the name of file attribute 
}).array("mypic"); 



app.post("/", function (req, res, next) { 

    // Error MiddleWare for multer file upload, so if any 
    // error occurs, the image would not be uploaded! 
    upload(req,res,function(err) { 
  
        if(err) { 
  
            // ERROR occured (here it can be occured due 
            // to uploading image of size greater than 
            // 1MB or uploading different file type) 
            res.send(err) 

        } 
        else { 
        	console.log(req.body)
        	console.log(req.body.content);
        	console.log(req.body.style);


        	let content = req.body.content;
        	let style = req.body.style;


        	let result;

        	if (style != undefined)  {
				names[1] = style
			}
			if (content != undefined) {
				names[0] = content
			}

			// spawn new child process to call the python script
			const python = spawn('python3', ['image.py', names[0], names[1]]);
			

			result = names[0].split("-")[1].split(".")[0] + "-" + names[1].split("-")[1].split(".")[0] + ".png";


			urls.push({
				content: `http://localhost:5000/${names[0]}.png`,
				style: `http://localhost:5000/${names[1]}`,
				result: `http://localhost:5000/images/result/${result}`,
			});

			python.stdout.on('data', function(data) { 
	        	res.redirect(
	        		`http://localhost:3000?content=${names[0]}&style=${names[1]}&result=public/images/result/${result}`); 
	        	names = [];
	 	    });

			

        } 
    }) 
})

 


