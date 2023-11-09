export default function () {
  const supabase = useSupabaseClient();
  async function getRecords(link_id) {
    const { data, error } = await supabase
      .from("view_records")
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

  return {
    getRecords,
    createRecords,
  };
}
