import { cache } from "react";
import { createClient } from "./server";

/**
 * Deduplicated auth call via React.cache().
 * Both the (users) layout and each dashboard page import this.
 * React ensures only one network request is made to Supabase Auth
 * per server-render cycle — eliminating the duplicate round-trip.
 */
export const getUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

/**
 * Deduplicated profile fetch, keyed by userId.
 * The layout fetches this once; pages get the cached result instantly.
 * Selects all fields needed by both the sidebar and dashboard pages.
 */
export const getUserProfile = cache(async (userId: string) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("full_name, role, id_verified")
    .eq("id", userId)
    .single();
  return data;
});
