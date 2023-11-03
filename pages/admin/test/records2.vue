<template>
    <div>
      <h1>Records Test 2</h1>
        <test-form-test-records2 :records="records"/>
    </div>
</template>
<script setup>
    definePageMeta({ layout: "admin" });
    import useApi from "@/composables/useApi";
    const { getRecords } = useApi();
    const link_id = ref();
    const records = ref([]);
    const getFormatDate = (data) => {
        return [...(data || [])].map((d) => {
            d.created_at = new Date(d.created_at);
            return d;
        });
    };
    onMounted(async () => {
        link_id.value = JSON.parse(localStorage.getItem("sb_org_id"));
        records.value = getFormatDate(await getRecords(link_id.value.code));
    });
    
</script>
<style scoped></style>
  