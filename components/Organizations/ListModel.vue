<template>
  <div class="card">
    <Card>
      <template #title>
        <div class="text-center">
          {{ organization.name }}
        </div>
      </template>
      <template #content>
        <div class="grid">
          <div class="col-12 lg:col-2 text-center">
            <Avatar
              :label="organization.name[0]"
              class="mr-2"
              size="xlarge"
              style="background-color: #10b981; color: #ffffff"
            />
          </div>
          <div class="col-12 lg:col-10">
            <span class="line">
              <strong>Id: </strong>
              {{ organization.id }}
            </span>
            <span class="line">
              <strong>Name: </strong>
              {{ organization.name }}
            </span>
            <span class="line">
              <strong>Description: </strong>
              {{ organization.description }}
            </span>
            <span class="line">
              <strong>Code: </strong>
              {{ organization.code }}
            </span>
            <span class="line">
              <strong>Active: </strong>
              {{ organization.is_active }}
            </span>
            <span class="line">
              <strong>Created at: </strong>
              {{ organization.created_at }}
            </span>
          </div>
        </div>
        <p id="invitation-code" class="hidden">
          {{ organization.code }}
        </p>
      </template>
      <template #footer>
        <Button
          label="Copy invitation code "
          class="full-width-button"
          @click="copyCode"
          severity="info"
          size="large"
          icon="pi pi-copy"
        />
      </template>
    </Card>
  </div>
</template>
<script setup>
const props = defineProps({
  organization: {
    type: Object,
    default: {},
  },
});

const copyCode = () => {
  console.log("copy code");
  const text = document.createElement("textarea");
  text.value = `I invite you to add my organization "${props.organization.name}" in Amoso App with the following invitation code: ${props.organization.code}`;
  document.body.appendChild(text);
  text.select();
  document.execCommand("copy");
  document.body.removeChild(text);
};
</script>
<style scoped>
.line {
  display: block;
}
</style>
