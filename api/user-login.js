import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";

const sb=createClient(process.env.SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function(req,res){
  if(req.method!=="POST") return res.status(405).end();
  const { phone,password }=req.body||{};
  const { data:user }=await sb.from("users").select("*").eq("phone",phone).single();
  if(!user) return res.status(401).json({error:"Sai tài khoản"});
  if(!await bcrypt.compare(password,user.password_hash))
    return res.status(401).json({error:"Sai mật khẩu"});
  const token=jwt.sign({phone},process.env.JWT_SECRET,{expiresIn:"7d"});
  res.json({ok:true,token});
}