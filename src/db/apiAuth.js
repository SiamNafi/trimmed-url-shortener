import supabase from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}
