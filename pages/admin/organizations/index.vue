<template>
  <h1>Organizations</h1>
  <div class="grid">
    <div class="col-12">
      <NuxtLink to="/admin/organizations/add">
        <Button
          label="Add"
          icon="pi pi-plus"
          size="large"
          class="full-width-button"
        />
      </NuxtLink>
    </div>
  </div>
  <div class="grid">
    <div class="col-12" v-for="item in organizations" :key="item.id">
      <organizations-list-model :organization="item" />
    </div>
  </div>
</template>
<script setup>
import useApi from "@/composables/useApi";
const { getOrganizations } = useApi();

const organizations = ref([]);
definePageMeta({ layout: "admin" });

onMounted(async () => {
  const data = await getOrganizations();
  organizations.value = data;
});
</script>
<style scoped></style>
