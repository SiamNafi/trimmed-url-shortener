import { UAParser } from "ua-parser-js";
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
const parser = new UAParser();
export const storeClicks = async ({ id, originalUrl }) => {
  try {
    const res = parser.getResult();
    const device = res.type || "desktop";
    const response = await fetch("https://ipwhois.app/json/");
    const { city, country } = await response.json();
    console.loog;
    await supabase.from("click").insert({
      url_id: id,
      city: city,
      country: country,
      device: device,
    });
    window.location.href = originalUrl;
  } catch (error) {
    console.error("Error recording click", error);
  }
};

export async function getClicksForUrl(url_id) {
  const { data, error } = await supabase
    .from("click")
    .select("*")
    .eq("url_id", url_id);
  if (error) {
    console.error(error.message);
    throw new Error("Unable load stats");
  }
  return data;
}
