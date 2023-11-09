<template>
  <DataTable :value="records" tableStyle="min-width: 50rem" v-model:filters="filters" filterDisplay="menu" :loading="loading" :globalFilterFields="['type', 'description', 'profile_name']">
    <template #header>
      <div class="flex justify-content-between">
        <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined @click="clearFilter()" />
        <span class="p-input-icon-left">
          <i class="pi pi-search" />
          <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
        </span>
      </div>
    </template>
    <template #empty> No customers found. </template>
    <template #loading> Loading customers data. Please wait. </template>
    <Column filterField="created_at" dataType="date" header="Date">
      <template #body="{ data }">
        {{ formatDate(data.created_at) }}
      </template>
      <template #filter="{ filterModel }">
        <Calendar v-model="filterModel.value" dateFormat="dd/mm/yy" placeholder="dd/mm/yyyy" mask="99/99/9999" />
      </template>
    </Column>
    <Column field="type" header="Name" :filterMenuStyle="{ width: '14rem' }">
      <template #body="{ data }">
        <Tag :value="data.type" :severity="getSeverity(data.type)"/>
      </template>
      <template #filter="{ filterModel, filterCallback }">
        <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="types" placeholder="Select One" class="p-column-filter" :showClear="true">
          <template #option="slotProps">
            <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)"/>
          </template>
        </Dropdown>
      </template>
    </Column>
    <Column field="description" header="Description">
      <template #body="{ data }">
        {{ data.description }}
      </template>
      <template #filter="{ filterModel }">
        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by description" />
      </template>
    </Column>
    <Column field="profile_name" header="Owner">
      <template #body="{ data }">
        {{ data.profile_name }}
      </template>
      <template #filter="{ filterModel }">
        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by profile" />
      </template>
  </Column>
  </DataTable>
</template>
<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
const loading = ref(true);
const filters = ref();
onMounted(() => {
  loading.value = false;
})
const props = defineProps({
  records: {
    type: Array,
    default: [],
  },
});
const clearFilter = () => {
  initFilters();
};
const getSeverity = (type) => {
  switch (type) {
    case 'inbound':
      return 'success';
    case 'outbound':
      return 'warning';
  }
}
const types = ref(['inbound', 'outbound']);
const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    created_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    type: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    description: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    profile_name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  };
};
initFilters();
const formatDate = (value) => {
  return value.toLocaleDateString('es-MX', {day: '2-digit', month: '2-digit', year: 'numeric'}) + ' ' + value.toLocaleTimeString("es-MX");
};
</script>
<style scoped></style>
