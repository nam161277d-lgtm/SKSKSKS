import { createClient } from "@supabase/supabase-js";
const sb=createClient(process.env.SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY);
export default async function(req,res){
  if(req.headers["x-admin-token"]!=="ADMIN_OK") return res.status(403).end();
  const { data }=await sb.from("users").select("*");
  res.json(data);
}