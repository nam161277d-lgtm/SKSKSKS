export default function(req,res){
  const { phone,password }=req.body||{};
  if(phone==="0898555137" && password==="Nam16127@")
    return res.json({ok:true});
  res.status(401).json({ok:false});
}