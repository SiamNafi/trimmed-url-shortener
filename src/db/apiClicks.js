import supabase from "./supabase";

export async function getClicks(urlIds) {
  const { data, error } = await supabase
    .from("click")
    .select("*")
    .in("url_id", urlIds);
  if (error) {
    console.log(error.message);
    throw new Error("Unable to get clicks");
  }
  return data;
}
