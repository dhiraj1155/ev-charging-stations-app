<template>
  <div class="container mx-auto px-4 py-6 space-y-8 font-sans">
    <!-- Top Bar -->
    <div class="flex items-center justify-between">
      <h2 class="text-3xl font-bold text-green-700 flex items-center gap-2">
        ⚡ EV Charging Dashboard
      </h2>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white p-5 rounded-2xl shadow-lg border-l-4 border-green-500">
        <h4 class="text-gray-600">Total Chargers</h4>
        <p class="text-3xl font-bold text-green-700">{{ stats.total }}</p>
      </div>
      <div class="bg-white p-5 rounded-2xl shadow-lg border-l-4 border-blue-500">
        <h4 class="text-gray-600">Active Chargers</h4>
        <p class="text-3xl font-bold text-blue-700">{{ stats.active }}</p>
      </div>
      <div class="bg-white p-5 rounded-2xl shadow-lg border-l-4 border-red-500">
        <h4 class="text-gray-600">Inactive Chargers</h4>
        <p class="text-3xl font-bold text-red-700">{{ stats.inactive }}</p>
      </div>
      <div class="bg-white p-5 rounded-2xl shadow-lg border-l-4 border-yellow-500">
        <h4 class="text-gray-600">Avg Power Output</h4>
        <p class="text-3xl font-bold text-yellow-600">{{ stats.avgPowerOutput }} kW</p>
      </div>
    </div>

    <!-- Add Charger Form -->
    <div class="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
      <ChargerForm @submit="createCharger" />
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-2xl shadow-md p-6 border border-blue-100">
      <h3 class="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
        🔍 Filter Chargers
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          v-model="filters.status"
          @change="applyFilters"
          class="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="">All Statuses</option>
          <option value="Active">✅ Active</option>
          <option value="Inactive">❌ Inactive</option>
        </select>

        <input
          v-model="filters.powerOutput"
          type="number"
          placeholder="⚡ Min Power Output (kW)"
          class="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          @input="applyFilters"
        />

        <input
          v-model="filters.connectorType"
          type="text"
          placeholder="🔌 Connector Type"
          class="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          @input="applyFilters"
        />
      </div>
    </div>

    <!-- Chargers List -->
    <div>
      <h3 class="text-xl font-semibold mb-4 text-gray-800">📋 Listed Chargers</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ChargerCard
          v-for="charger in filteredChargers"
          :key="charger._id"
          :charger="charger"
          @edit="editCharger"
          @delete="deleteCharger"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ChargerCard from '../components/ChargerCard.vue';
import ChargerForm from '../components/ChargerForm.vue';

export default {
  name: 'ChargerDashboard',
  components: { ChargerCard, ChargerForm },
  data() {
    return {
      filters: {
        status: '',
        powerOutput: '',
        connectorType: '',
      },
      stats: {
        total: 0,
        active: 0,
        inactive: 0,
        avgPowerOutput: 0,
      },
    };
  },
  computed: {
    filteredChargers() {
      let chargers = this.$store.state.chargers;
      if (this.filters.status) {
        chargers = chargers.filter((c) => c.status === this.filters.status);
      }
      if (this.filters.powerOutput) {
        chargers = chargers.filter((c) => c.powerOutput >= this.filters.powerOutput);
      }
      if (this.filters.connectorType) {
        chargers = chargers.filter((c) =>
          c.connectorType.toLowerCase().includes(this.filters.connectorType.toLowerCase())
        );
      }
      return chargers;
    },
  },
  created() {
    this.$store.dispatch('fetchChargers').then(() => {
      this.calculateStats();
    });
  },
  methods: {
    async createCharger(charger) {
      try {
        await this.$store.dispatch('createCharger', charger);
        this.calculateStats();
      } catch (error) {
        console.error('Error creating charger:', error);
      }
    },
    async editCharger({ id, charger }) {
      try {
        await this.$store.dispatch('updateCharger', { id, charger });
        this.calculateStats();
      } catch (error) {
        console.error('Error updating charger:', error);
      }
    },
    async deleteCharger(id) {
      try {
        await this.$store.dispatch('deleteCharger', id);
        this.calculateStats();
      } catch (error) {
        console.error('Error deleting charger:', error);
      }
    },
    applyFilters() {
      this.$store.dispatch('fetchChargers').then(() => {
        this.calculateStats();
      });
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
    calculateStats() {
      const chargers = this.$store.state.chargers;
      this.stats.total = chargers.length;
      this.stats.active = chargers.filter((c) => c.status === 'Active').length;
      this.stats.inactive = chargers.filter((c) => c.status === 'Inactive').length;
      const totalPower = chargers.reduce((sum, c) => sum + (c.powerOutput || 0), 0);
      this.stats.avgPowerOutput = chargers.length ? (totalPower / chargers.length).toFixed(2) : 0;
    },
  },
};
</script>

<style scoped>
body {
  background-color: #f9fafb;
}
</style>
