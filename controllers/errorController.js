// Utilty functions on handling custom errors as well as page not found.
const sendErrorProd = (err, res)=>{
    if(err.isOperational){
        return res.status(err.statusCode).send({
            status:err.status,
            message: err.message
        })
    }
}

exports.error = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    let error = {...err};
    error.message = err.message
    sendErrorProd(error,res);
}

exports.pageNotFound = (req,res,next) =>{
    res.status(404).render('404');
};