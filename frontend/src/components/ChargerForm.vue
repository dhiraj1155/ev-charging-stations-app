<template>
  <form @submit.prevent="handleSubmit" class="mt-4">
    <div class="mb-2">
      <label class="block text-gray-700">Name</label>
      <input
        v-model="form.name"
        type="text"
        class="w-full p-2 border rounded"
        required
      />
    </div>
    <div class="mb-2">
      <label class="block text-gray-700">Latitude</label>
      <input
        v-model="form.location.latitude"
        type="number"
        step="any"
        class="w-full p-2 border rounded"
        required
      />
    </div>
    <div class="mb-2">
      <label class="block text-gray-700">Longitude</label>
      <input
        v-model="form.location.longitude"
        type="number"
        step="any"
        class="w-full p-2 border rounded"
        required
      />
    </div>
    <div class="mb-2">
      <label class="block text-gray-700">Status</label>
      <select v-model="form.status" class="w-full p-2 border rounded" required>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>
    <div class="mb-2">
      <label class="block text-gray-700">Power Output (kW)</label>
      <input
        v-model="form.powerOutput"
        type="number"
        class="w-full p-2 border rounded"
        required
      />
    </div>
    <div class="mb-2">
      <label class="block text-gray-700">Connector Type</label>
      <input
        v-model="form.connectorType"
        type="text"
        class="w-full p-2 border rounded"
        required
      />
    </div>
    <div class="flex space-x-2">
      <button
        type="submit"
        class="bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        {{ initialCharger ? 'Update' : 'Add' }}
      </button>
      <button
        v-if="initialCharger"
        type="button"
        @click="$emit('cancel')"
        class="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'ChargerForm',
  props: {
    initialCharger: Object,
  },
  data() {
    return {
      form: {
        name: '',
        location: { latitude: '', longitude: '' },
        status: 'Active',
        powerOutput: '',
        connectorType: '',
      },
    };
  },
  created() {
    if (this.initialCharger) {
      this.form = { ...this.initialCharger };
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.form);
      this.resetForm();
    },
    resetForm() {
      this.form = {
        name: '',
        location: { latitude: '', longitude: '' },
        status: 'Active',
        powerOutput: '',
        connectorType: '',
      };
    },
  },
};
</script>