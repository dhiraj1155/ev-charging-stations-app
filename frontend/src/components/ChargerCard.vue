<template>
  <div class="bg-white p-4 rounded shadow-md">
    <h3 class="text-lg font-semibold">{{ charger.name }}</h3>
    <p>Status: {{ charger.status }}</p>
    <p>Location: {{ charger.location.latitude }}, {{ charger.location.longitude }}</p>
    <p>Power Output: {{ charger.powerOutput }} kW</p>
    <p>Connector Type: {{ charger.connectorType }}</p>
    <div class="mt-2">
      <button
        @click="startEdit"
        class="mr-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Edit
      </button>
      <button
        @click="$emit('delete', charger._id)"
        class="bg-red-500 text-white p-2 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
    <ChargerForm
      v-if="isEditing"
      :initialCharger="charger"
      @submit="handleEdit"
      @cancel="isEditing = false"
    />
  </div>
</template>

<script>
import ChargerForm from './ChargerForm.vue';

export default {
  name: 'ChargerCard',
  components: { ChargerForm },
  props: {
    charger: Object,
  },
  data() {
    return {
      isEditing: false,
    };
  },
  methods: {
    startEdit() {
      this.isEditing = true;
    },
    handleEdit(charger) {
      this.$emit('edit', { id: this.charger._id, charger });
      this.isEditing = false;
    },
  },
};
</script>