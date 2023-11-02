<template>
    <div>
      <h1>Records Test</h1>
      <div class="grid">
        <div class="col-6 mt-2">
            <div class="flex flex-column gap-2">
                <Calendar
                v-model="form.date"
                selectionMode="range"
                :manualInput="false"
                placeholder="Date range"
                class="w-full p-inputtext-lg"
                />
            </div>
        </div>
        <div class="col-3 mt-2">
                <Button
                    label="Search"
                    icon="pi pi-search"
                    class="full-width-button"
                    size="large"
                    @click="searchByDates"
                />
        </div>
    </div>
        <test-form-test-records :records="records"/>
    </div>
</template>
<script setup>
    definePageMeta({ layout: "admin" });
    import useApi from "@/composables/useApi";
    const { getRecordsByDates } = useApi();
    const link_id = ref();
    const records = ref([]);
    const form = ref({});
    // Obtener fecha actual
    const date_today = new Date(); 
    const day = date_today.getDate();
    const month = date_today.getMonth() + 1;
    const year = date_today.getFullYear();
    const formatted_date = year + "-" + (month < 10 ? "0" : "") + month + "-" + (day < 10 ? "0" : "") + day;
    let dates = {
        date_start: formatted_date + "T00:00:00.000Z",
        date_end: formatted_date + "T23:59:59.999Z"
    }
    const searchByDates = (async() => {
        const fields = JSON.parse(JSON.stringify(form.value));
        if (Object.keys(fields).length > 0) {
            dates.date_start = fields.date[0].substring(0, 10) + "T00:00:00.000Z";
            dates.date_end = fields.date[1].substring(0, 10) + "T23:59:59.999Z";
        }
        records.value = await getRecordsByDates(link_id.value.code, dates);
    });
    onMounted(async () => {
        link_id.value = JSON.parse(localStorage.getItem("sb_org_id"));
        records.value = await getRecordsByDates(link_id.value.code, dates);
    });
</script>
<style scoped></style>
  