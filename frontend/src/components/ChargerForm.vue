<template>
  <div class="max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
    <div class="text-center mb-8">
      <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h2 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
        {{ initialCharger ? 'Update Charging Station' : 'Add Charging Station' }}
      </h2>
      <p class="text-gray-600 mt-2">{{ initialCharger ? 'Modify station details' : 'Expand your charging network' }}</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Station Name -->
      <div class="group">
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Station Name
          </span>
        </label>
        <input
          v-model="form.name"
          type="text"
          placeholder="e.g., GreenVolt Station"
          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 group-hover:border-gray-300"
          required
        />
      </div>

      <!-- Location Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="group">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              Latitude
            </span>
          </label>
          <input
            v-model="form.location.latitude"
            type="number"
            step="any"
            placeholder="e.g., 18.5204"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-200 group-hover:border-gray-300"
            required
          />
        </div>
        <div class="group">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              Longitude
            </span>
          </label>
          <input
            v-model="form.location.longitude"
            type="number"
            step="any"
            placeholder="e.g., 73.8567"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-200 group-hover:border-gray-300"
            required
          />
        </div>
      </div>

      <!-- Status and Power Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="group">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Status
            </span>
          </label>
          <select
            v-model="form.status"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 group-hover:border-gray-300 appearance-none bg-white"
            required
          >
            <option value="Active">🟢 Active</option>
            <option value="Inactive">🔴 Inactive</option>
          </select>
        </div>

        <div class="group">
          <label class="block text-sm font-semibold text-gray-700 mb-2">
            <span class="flex items-center gap-2">
              <svg class="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Power Output (kW)
            </span>
          </label>
          <input
            v-model="form.powerOutput"
            type="number"
            placeholder="e.g., 50"
            class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all duration-200 group-hover:border-gray-300"
            required
          />
        </div>
      </div>

      <!-- Connector Type -->
      <div class="group">
        <label class="block text-sm font-semibold text-gray-700 mb-2">
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Connector Type
          </span>
        </label>
        <select
          v-model="form.connectorType"
          class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-200 group-hover:border-gray-300 appearance-none bg-white"
          required
        >
          <option value="" disabled>Select connector type</option>
          <option value="CCS">🔌 CCS (Combined Charging System)</option>
          <option value="CHAdeMO">⚡ CHAdeMO</option>
          <option value="Type 2">🔋 Type 2 (Mennekes)</option>
          <option value="Tesla Supercharger">🚗 Tesla Supercharger</option>
        </select>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
        <button
          type="submit"
          class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          {{ initialCharger ? 'Update Station' : 'Add Station' }}
        </button>
        <button
          v-if="initialCharger"
          type="button"
          @click="$emit('cancel')"
          class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Cancel
        </button>
      </div>
    </form>
  </div>
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
      if (!this.initialCharger) {
        this.resetForm();
      }
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