<template>
  <div>
    <!-- Main Card -->
    <div class="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
      <!-- Status indicator -->
      <div class="absolute top-4 right-4 z-10">
        <div :class="statusClasses" class="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium">
          <div class="w-2 h-2 rounded-full" :class="statusDotClasses"></div>
          {{ charger.status }}
        </div>
      </div>

      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-50"></div>

      <div class="relative p-6">
        <!-- Header -->
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                {{ charger.name }}
              </h3>
              <p class="text-gray-500 text-sm">Charging Station</p>
            </div>
          </div>
        </div>

        <!-- Details Grid -->
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div class="bg-gray-50 rounded-xl p-3">
            <div class="flex items-center gap-2 mb-1">
              <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-xs font-medium text-gray-600">Location</span>
            </div>
            <p class="text-sm font-semibold text-gray-800">
              {{ charger.location.latitude.toFixed(4) }}, {{ charger.location.longitude.toFixed(4) }}
            </p>
          </div>

          <div class="bg-gray-50 rounded-xl p-3">
            <div class="flex items-center gap-2 mb-1">
              <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span class="text-xs font-medium text-gray-600">Power</span>
            </div>
            <p class="text-sm font-bold text-gray-800">{{ charger.powerOutput }} kW</p>
          </div>
        </div>

        <!-- Connector Type -->
        <div class="mb-6">
          <div class="flex items-center gap-2 mb-2">
            <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span class="text-sm font-medium text-gray-600">Connector Type</span>
          </div>
          <span class="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
            {{ charger.connectorType }}
          </span>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3">
          <button
            @click="startEdit"
            class="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          <button
            @click="$emit('delete', charger._id)"
            class="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Form Modal -->
    <teleport to="body">
      <div
        v-if="isEditing"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto"
      >
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-2xl font-bold text-gray-800">Edit Charging Station</h3>
              <button
                @click="isEditing = false"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ChargerForm
              :initialCharger="charger"
              @submit="handleEdit"
              @cancel="isEditing = false"
            />
          </div>
        </div>
      </div>
    </teleport>
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
  computed: {
    statusClasses() {
      return this.charger.status === 'Active'
        ? 'bg-green-100 text-green-800'
        : 'bg-red-100 text-red-800';
    },
    statusDotClasses() {
      return this.charger.status === 'Active'
        ? 'bg-green-500 animate-pulse'
        : 'bg-red-500';
    },
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
