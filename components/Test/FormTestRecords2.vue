<template>
    <DataTable :value="records" tableStyle="min-width: 50rem"
    v-model:filters="filters" filterDisplay="row" :loading="loading"
    :globalFilterFields="['created_at','type', 'description',]">
        <template #header>
            <div class="flex justify-content-end">
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                </span>
            </div>
        </template>
        <template #empty> No customers found. </template>
        <template #loading> Loading customers data. Please wait. </template>
        <Column field="created_at" header="Date">
            <template #body="{ data }">
                {{ data.created_at }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by date" />
            </template>
        </Column>
        <Column field="type" header="Name">
            <template #body="{ data }">
                {{ data.type }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
        </Column>
        <Column field="description" header="Description">
            <template #body="{ data }">
                {{ data.description }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by description" />
            </template>
        </Column>
        <Column field="codes.rel_users_to_organizations.profiles.name" header="Owner">
            <!-- <template #body="{ data }">
                {{ data.codes.rel_users_to_organizations.profiles.name }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by owner" />
            </template> -->
        </Column>
    </DataTable>
</template>
<script setup>
    import { FilterMatchMode } from 'primevue/api'
    const props = defineProps({
        records: {
        type: Array,
        default: [],
        },
    });
    const filters = ref({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        created_at: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        type: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        // 'codes.rel_users_to_organizations.profiles.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });
</script>
<style scoped></style>