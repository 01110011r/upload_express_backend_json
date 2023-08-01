export const middleware=(err, req, res, next)=>{
    if(err)console.log("middleware: ==> "+err.message);
    next();
}