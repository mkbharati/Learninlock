const express = require("express");
const path = require("path");



const exp = require("constants");
const multer = require("multer");
const app = express();
require("./db/conn");
const Student = require("./db/registers");
const Question = require("./db/class10s");

const stud = Student.find({});
const { json } = require("express");
const port =8000;

app.use('/static',express.static('static'))
app.use(express.urlencoded())

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('view engine', 'pug')
app.set('views',path.join(__dirname, 'views'));


const storage = multer.diskStorage({
    destination:"./static/uploads/",
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+ "_"+ Date.now()+path.extname(file.originalname));
    }
});

const upload = multer({
    storage:storage
}).single('image');

app.get('/home', (req,res)=>{
    const params = { }
    res.status(200).render('home.pug',params);
})

app.get('/class10', (req,res)=>{
    
    res.render('class10', { });
})

app.post('/class10', upload , async (req,res)=>{
    try{
        const question = new Question({
            name: req.body.name,
            email: req.body.email,
            ques : req.body.ques,
            image : req.file.filename
        })
    
        const questions = await question.save();
        res.status(200).render("class10");
    }catch (error) {
        res.status(400).send(error);
    }
    
});

app.get('/class12', (req,res)=>{
    const params = { }
    res.status(200).render('class12.pug',params);
})

app.post('/class12', upload , async (req,res)=>{
    try{
        const question = new Question({
            name: req.body.name,
            email: req.body.email,
            ques : req.body.ques,
            image : req.file.filename
        })
    
        const questions = await question.save();
        res.status(200).render("class12");
    }catch (error) {
        res.status(400).send(error);
    }
    
});

app.get('/about', (req,res)=>{
    const params = { }
    res.status(200).render('about.pug',params);
})
app.get('/register', (req,res)=>{
    const params = { }
    res.status(200).render('register.pug',params);
})

app.post('/register', async (req,res)=>{
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        if(password === cpassword){
            const registerStudent = new Student({
                name : req.body.name,
                phone : req.body.phone,
                email : req.body.email,
                password:req.body.password,
                cpassword:req.body.cpassword
            })
            const registered = await registerStudent.save();
            res.status(200).render("login");

        }else{
            res.send("password not matching");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});    

app.get('/', (req,res)=>{
    const params = { }
    res.status(200).render('login.pug',params);
})

app.post("/login", async(req,res) =>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await Student.findOne({email:email});
        if(useremail.password===password){
            res.status(200).render("home");
        }else{
            res.send("Invalid Credentials");
        }
    } catch (error) {
        res.status(400).send("invalid Credentials");
    }
})

app.listen(port, ()=>{
    console.log(`The app started on port ${port}`);
});

