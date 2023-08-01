import { deleteFile, reader, writer } from "../lib/fsWork.js";
import path from "path";
let data=reader("datas.json");
// POST
export const fileUploadControlPost=(req, res)=>{
try {
  
//   console.log(data.every(f=>f.img!='/img/'+req.file.filename));
    if(!req.file)return res.status(407).json({status:407, file: null, msg:'file not found'})
     if(data.every(f=>f.img!='/img/'+req.file.filename)){ 
     data.push({id:data.at(-1)?.id+1||1, name:req.body.name||req.file.fieldname, img:'/img/'+req.file.filename, download:'/download/'+req.file.filename});
    writer('datas.json', data);
  return res.status(200).json({status:200, file:req.file.filename, msg:'ok'}); 

     }
      res.status(200).json({status:200, file:req.file.filename, msg:'usbu file DBda avvaldan mavjud!'}); 
} catch (error) {
    console.log(error.message);
}
}
// GET
export const fileUploadControlGet=(req, res)=>{
try {
   return res.send(data);
} catch (error) {
    console.log(error.message);
}
} 

// DELETE
export const fileUploadControlDelete=(req, res)=>{
    try {
      const deleteName=data.find(f=>f.id==req.params.id);
      console.log(deleteName);
      if(deleteName){      
       const newData=data.filter(f=>f.id!=req.params.id);
       deleteFile(deleteName.img.slice(5));
       writer('datas.json',newData);
       console.log(req.params.id);
       return res.status(200).json({status:200, data:newData, msg:"delete: "+deleteName});
      }
      res.status(200).json({status:200, data:data, msg:"not found id: "+req.params.id})
    } catch (error) {
        console.log(error.message);
    }
}

// PUT
export const fileUploadControlPut=(req, res)=>{
    try {
        console.log(data.some(f=>f.id==req.params.putid));
        if (data.some(f=>f.id==req.params.putid)) { 
            data.forEach(f=> {
    if(f.id==req.params.putid){
       if(f.img!='/img/'+req.file.filename) deleteFile(f.img.slice(5));
        f.name=req.body.name;
        f.img='/img/'+req.file.filename;
        f.download='/download/'+req.file.filename;
    }
     });
     writer('datas.json', data);
    // console.log(data);
    return res.status(200).json({status:200, newData: req.file, msg:'successfully update !'});
        }
        // console.log(req.file);
       res.status(200).json({status:200, data:{}, msg: 'notfound id: '+req.params.putid});
    } catch (error) {
        console.log(error.message);
    }
}

// img GET 
export const controllerImageGet=(req, res)=>{
    // console.log(req.params.params);
res.sendFile(path.join(process.cwd(), "uploads", req.params.params))
}

// img download 

export const controllerImageDownload=(req, res)=>{
    // console.log(req.params.params);
res.download(path.join(process.cwd(), "uploads", req.params.params))
} 

