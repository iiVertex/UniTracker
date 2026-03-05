import { supabase } from "@/lib/supabase";

export async function GET() {
  // Lightweight query to keep the Supabase project active
  const { error } = await supabase.from("universities").select("id").limit(1);

  return Response.json({
    ok: !error,
    timestamp: new Date().toISOString(),
  });
}
