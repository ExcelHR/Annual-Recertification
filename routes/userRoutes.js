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

app.route("/change-password")
.get(userController.changePassword)

app.route("/validateOldpassword")
.post(userController.validateOldpassword)


app.route("/dashboard")
.get(userController.user_dashboard)

app.route("/upload_documents")
.get(userController.upload_documents)

app.route("/getTenantsDetails")
.get(userController.getTenantsDetails)

//Create Storage Engine
const mongodb_uri=process.env.DATABASE_LOCAL
const storage = new GridFsStorage({
    url: mongodb_uri,
    file: (req, file) => {
       console.log(req.query.id)
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            print(err)
            return reject(err);
          }
        const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'Documents'
          };
          console.log(fileInfo)
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({ storage,dest:'Documents' });
const fields=[]
for (let i=0;i<3;i++){
    fields.push({name:`Document${i+1}`})
}
  app.route('/storeDocuments')
  .post( upload.fields(fields),userController.storeDocuments)
  app.route('/saveDetails')
  .post( upload.fields(fields),userController.saveDetails)

  app.route('/updateVerificationStatus')
  .post( upload.fields(fields),userController.updateVerificationStatus)

  app.route("/getVerifiedDocuments")
.get(userController.getVerifiedDocuments)

app.route('/reuploadDocuments')
  .post( upload.fields(fields),userController.reuploadDocuments)

  app.route('/updateDocumentsData')
  .post( upload.fields(fields),userController.updateDocumentsData)

module.exports=app;