import { createClient } from "@supabase/supabase-js";
const sb=createClient(process.env.SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY);
export default async function(req,res){
  const { data }=await sb.from("users").select("*").eq("phone",req.query.phone).single();
  res.json(data||null);
}