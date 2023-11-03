export default function () {
  const supabase = useSupabaseClient();
  async function getRecords(link_id) {
    const { data, error } = await supabase
      .from("view_records")
      // .from("records")
      // .select("*, codes!inner(*, rel_users_to_organizations!inner(*))")
      // .select('*, codes!inner(link_id, rel_users_to_organizations!inner(profile_id, profiles!inner(*)))')
      .select()
      .eq("rel_id", link_id);
    if (error) throw error;
    return data;
  }

  async function createRecords(fields) {
    const { data, error } = await supabase.from("records").insert([fields]);
    if (error) throw error;
    return data;
  }

  async function getRecordsByDates(link_id, dates) {
    const { data, error } = await supabase
      .from("records")
      .select('*, codes!inner(link_id, rel_users_to_organizations!inner(profile_id, profiles!inner(*)))')
      .gt('created_at', dates.date_start)
      .lt('created_at', dates.date_end)
      .eq("codes.rel_users_to_organizations.id", link_id);
    if (error) throw error;
    return data;
  }

  return {
    getRecords,
    createRecords,
    getRecordsByDates,
  };
}
