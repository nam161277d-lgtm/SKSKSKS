
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { phone, password } = req.body || {};
    if (!phone || !password) {
      return res.status(400).json({ error: "Thiếu phone hoặc password" });
    }

    const hash = await bcrypt.hash(password, 10);

    const { error } = await supabase
      .from("users")
      .insert({ phone, password_hash: hash });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
