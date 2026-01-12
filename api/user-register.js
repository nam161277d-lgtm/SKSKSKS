import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";

const sb=createClient(process.env.SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function(req,res){
  if(req.method!=="POST") return res.status(405).end();
  const { phone,password }=req.body||{};
  const hash=await bcrypt.hash(password,10);
  const { error }=await sb.from("users").insert({phone,password_hash:hash});
  if(error) return res.status(400).json({error:"SĐT đã tồn tại"});
  res.json({ok:true});
}