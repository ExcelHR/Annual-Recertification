const express=require("express");
const path=require("path")

const crypto=require('crypto')
 const multer=require('multer')
 const GridFsStorage=require('multer-gridfs-storage').GridFsStorage
 const Grid=require('gridfs-stream')
 const methodOverride=require('method-override')
app=express()
const userController=require("../controllers/userController")

// Handler for - "/login"
app.route("/login")
    .post(userController.login)

// Handler for - "/createAdmin"
app.route("/createAdmin")
    .post(userController.postCreateAdmin)

// Handler for - "/forgot-password"
app.route("/forgot-password")
.get(userController.forgotPassword)

app.route("/change-password")
.get(userController.changePassword)

app.route("/dashboard")
.get(userController.user_dashboard)

app.route("/upload_documents")
.get(userController.upload_documents)


//Create Storage Engine
const mongodb_uri=process.env.DATABASE_LOCAL
const storage = new GridFsStorage({
    url: mongodb_uri,
    file: (req, file) => {
       console.log(req)
      return new Promise((resolve, reject) => {
        console.log('sadfg')
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            print(err)
            return reject(err);
        console.log('sadfg')
          }
        console.log('sadfg')
        const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'Documents'
          };
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({ storage,dest:'Documents' });

  app.route('/storeDocuments').post( upload.single('Document1'),userController.storeDocuemtns)
module.exports=app;