<template>
  <div class="p-8">
    <!-- Title -->
    <h1 class="text-2xl font-bold mb-6">Input Ruang Kelas</h1>

    <!-- Form -->
    <form @submit.prevent="submitForm" class="mb-8">
      <div class="space-y-4">
        <!-- Input Kode Ruangan -->
        <div>
          <label for="kodeRuangan" class="block text-sm font-medium text-gray-700">Kode Ruangan</label>
          <input
            v-model="form.kodeRuangan"
            type="text"
            id="kodeRuangan"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Input Kapasitas Ruangan -->
        <div>
          <label for="kapasitasRuangan" class="block text-sm font-medium text-gray-700">Kapasitas Ruangan</label>
          <input
            v-model="form.kapasitasRuangan"
            type="number"
            id="kapasitasRuangan"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Input Jenis Ruangan -->
        <div>
          <label for="jenisRuangan" class="block text-sm font-medium text-gray-700">Jenis Ruangan</label>
          <select
            v-model="form.jenisRuangan"
            id="jenisRuangan"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="milik DTI">Milik DTI</option>
            <option value="bukan milik DTI">Bukan Milik DTI</option>
          </select>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            class="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </div>
    </form>

    <!-- Hasil Submit -->
    <div>
      <h2 class="text-xl font-bold mb-4">Daftar Ruang Kelas</h2>
      <div v-if="ruangKelasList.length === 0" class="text-gray-500">
        Belum ada data ruang kelas.
      </div>
      <div v-else class="space-y-4">
        <div
          v-for="(ruangKelas, index) in ruangKelasList"
          :key="index"
          class="p-4 border border-gray-200 rounded-md"
        >
          <div class="flex justify-between items-center">
            <div>
              <p class="font-medium">Kode Ruangan: {{ ruangKelas.kodeRuangan }}</p>
              <p>Kapasitas: {{ ruangKelas.kapasitasRuangan }}</p>
              <p>Jenis: {{ ruangKelas.jenisRuangan }}</p>
            </div>
            <div class="space-x-2">
              <!-- Edit Button -->
              <button
                @click="editRuangKelas(index)"
                class="text-indigo-600 hover:text-indigo-900"
              >
                Edit
              </button>
              <!-- Delete Button -->
              <button
                @click="deleteRuangKelas(index)"
                class="text-red-600 hover:text-red-900"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

// Data Form
const form = ref({
  kodeRuangan: "",
  kapasitasRuangan: "",
  jenisRuangan: "milik DTI",
});

// Data Ruang Kelas
const ruangKelasList = ref<
  Array<{
    kodeRuangan: string;
    kapasitasRuangan: string;
    jenisRuangan: string;
  }>
>([]);

// Index untuk Edit
const editIndex = ref<number | null>(null);

// Submit Form
const submitForm = () => {
  if (editIndex.value !== null) {
    // Edit Data
    ruangKelasList.value[editIndex.value] = { ...form.value };
    editIndex.value = null;
  } else {
    // Tambah Data Baru
    ruangKelasList.value.push({ ...form.value });
  }

  // Reset Form
  form.value = {
    kodeRuangan: "",
    kapasitasRuangan: "",
    jenisRuangan: "milik DTI",
  };
};

// Edit Data
const editRuangKelas = (index: number) => {
  form.value = { ...ruangKelasList.value[index] };
  editIndex.value = index;
};

// Hapus Data
const deleteRuangKelas = (index: number) => {
  ruangKelasList.value.splice(index, 1);
};
</script>
