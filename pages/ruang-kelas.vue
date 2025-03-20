<template>
  <div class="h-screen flex flex-col items-center justify-center bg-gray-50">
    <!-- Title -->
    <h1 class="text-3xl font-bold mb-6">🏫 Input Ruang Kelas</h1>

    <!-- Form -->
    <form @submit.prevent="submitForm" class="bg-white p-6 shadow-md rounded-lg w-96">
      <!-- Input Kode Ruangan -->
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Kode Ruangan</label>
        <input
          v-model="form.kodeRuangan"
          type="text"
          class="w-full mt-2 p-2 border rounded-lg"
          placeholder="Masukkan kode ruangan"
          required
        />
      </div>

      <!-- Input Kapasitas Ruangan -->
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Kapasitas Ruangan</label>
        <input
          v-model="form.kapasitasRuangan"
          type="number"
          class="w-full mt-2 p-2 border rounded-lg"
          placeholder="Masukkan kapasitas ruangan"
          required
        />
      </div>

      <!-- Input Jenis Ruangan -->
      <div class="mb-4">
        <label class="block text-gray-700 font-semibold">Jenis Ruangan</label>
        <select
          v-model="form.jenisRuangan"
          class="w-full mt-2 p-2 border rounded-lg"
          required
        >
          <option value="milik DTI">Milik DTI</option>
          <option value="bukan milik DTI">Bukan Milik DTI</option>
        </select>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700"
      >
        {{ editIndex !== null ? 'Update Ruangan' : 'Simpan Ruangan' }}
      </button>
    </form>

    <!-- Daftar Ruang Kelas -->
    <div class="mt-8 bg-white p-6 shadow-md rounded-lg w-96">
      <h2 class="text-2xl font-bold mb-4">📋 Daftar Ruang Kelas</h2>
      <div v-if="ruangKelasList.length === 0" class="text-gray-500">
        Belum ada data ruang kelas.
      </div>
      <div v-else class="space-y-4">
        <div
          v-for="(ruangKelas, index) in ruangKelasList"
          :key="index"
          class="p-4 border border-gray-200 rounded-lg"
        >
          <div class="flex justify-between items-center">
            <div>
              <p class="font-medium">Kode Ruangan: {{ ruangKelas.kodeRuangan }}</p>
              <p class="text-sm text-gray-600">Kapasitas: {{ ruangKelas.kapasitasRuangan }}</p>
              <p class="text-sm text-gray-600">Jenis: {{ ruangKelas.jenisRuangan }}</p>
            </div>
            <div class="flex space-x-2">
              <!-- Edit Button -->
              <button
                @click="editRuangKelas(index)"
                class="text-blue-600 hover:text-blue-900"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <!-- Delete Button -->
              <button
                @click="deleteRuangKelas(index)"
                class="text-red-600 hover:text-red-900"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
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

<style scoped>
/* Optional: Styling */
</style>