import { UAParser } from "ua-parser-js";
import supabase, { supabaseUrl } from "./supabase";

export async function getUrls(user_id) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);
  if (error) {
    console.error(error.message);
    throw new Error("Enable to load urls");
  }
  return data;
}
// delete url
export async function deleteUrl(id) {
  const { data, error } = await supabase.from("urls").delete().eq("id", id);
  if (error) {
    console.error(error.message);
    throw new Error("Enable to delete urls");
  }
  return data;
}
// create url
export async function createUrl(
  { title, longUrl, customUrl, user_id },
  qrcode
) {
  const short_url = Math.random().toString(36).substring(2, 6);
  const fileName = `qr-${short_url}`;

  const { error: storageError } = await supabase.storage
    .from("qrs")
    .upload(fileName, qrcode);
  if (storageError) {
    console.error(storageError.message);
    throw new Error("Enable to delete urls");
  }
  const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;
  const { data, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        original_url: longUrl,
        custom_url: customUrl || null,
        user_id,
        short_url,
        qr,
      },
    ])
    .select();
  if (error) {
    console.log(error.message);
    throw new Error("error creating url");
  }
  return data;
}

// redirect url
export async function getLongUrl(id) {
  const { data, error } = await supabase
    .from("urls")
    .select("id,original_url")
    .or(`short_url.eq.${id},custom_url.eq.${id}`)
    .single();
  if (error) {
    console.error(error.message);
    throw new Error("Error fetching short Link");
  }
  return data;
}
export async function getUrl({ id, user_id }) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single();
  if (error) {
    console.error(error.message);
    throw new Error("Shor url no found");
  }
  return data;
}
