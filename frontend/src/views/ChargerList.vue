<template>
  <div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Charging Stations</h2>
    <button
      @click="logout"
      class="mb-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
    >
      Logout
    </button>
    <div class="mb-4">
      <h3 class="text-lg font-semibold">Add Charger</h3>
      <ChargerForm @submit="createCharger" />
    </div>
    <div class="mb-4">
      <h3 class="text-lg font-semibold">Filters</h3>
      <div class="flex space-x-4">
        <select v-model="filters.status" @change="applyFilters" class="p-2 border rounded">
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <input
          v-model="filters.powerOutput"
          type="number"
          placeholder="Min Power Output (kW)"
          class="p-2 border rounded"
          @input="applyFilters"
        />
        <input
          v-model="filters.connectorType"
          type="text"
          placeholder="Connector Type"
          class="p-2 border rounded"
          @input="applyFilters"
        />
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ChargerCard
        v-for="charger in filteredChargers"
        :key="charger._id"
        :charger="charger"
        @edit="editCharger"
        @delete="deleteCharger"
      />
    </div>
  </div>
</template>

<script>
import ChargerCard from '../components/ChargerCard.vue';
import ChargerForm from '../components/ChargerForm.vue';

export default {
  name: 'ChargerList',
  components: { ChargerCard, ChargerForm },
  data() {
    return {
      filters: {
        status: '',
        powerOutput: '',
        connectorType: '',
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
    this.$store.dispatch('fetchChargers');
  },
  methods: {
    async createCharger(charger) {
      try {
        await this.$store.dispatch('createCharger', charger);
      } catch (error) {
        console.error('Error creating charger:', error);
      }
    },
    async editCharger({ id, charger }) {
      try {
        await this.$store.dispatch('updateCharger', { id, charger });
      } catch (error) {
        console.error('Error updating charger:', error);
      }
    },
    async deleteCharger(id) {
      try {
        await this.$store.dispatch('deleteCharger', id);
      } catch (error) {
        console.error('Error deleting charger:', error);
      }
    },
    applyFilters() {
      this.$store.dispatch('fetchChargers');
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
  },
};
</script>