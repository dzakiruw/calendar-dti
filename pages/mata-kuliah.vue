<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8"
  >
    <!-- Alert Popup -->
    <div
      v-if="showAlert"
      class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30"
    >
      <div
        class="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center transform transition-all duration-300"
      >
        <div class="mb-4 text-red-600 text-2xl">
          <i class="fas fa-exclamation-circle"></i>
        </div>
        <div class="mb-4 text-gray-800 font-semibold">{{ alertMessage }}</div>
        <button
          @click="showAlert = false"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Tutup
        </button>
      </div>
    </div>

    <!-- Success Alert -->
    <div
      v-if="showSuccess"
      class="fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-lg transform transition-all duration-300 z-50"
    >
      <div class="flex items-center">
        <div class="py-1">
          <i class="fas fa-check-circle text-xl mr-3"></i>
        </div>
        <div>
          <p class="font-semibold">{{ successMessage }}</p>
        </div>
        <button
          @click="showSuccess = false"
          class="ml-4 text-green-700 hover:text-green-900"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
    <!-- Title -->
    <div class="mb-8 w-full flex justify-center">
      <div
        class="bg-white rounded-2xl shadow-lg p-6 flex items-center space-x-4 transform hover:scale-105 transition-all duration-300"
      >
        <img
          src="/input-matkul.png"
          alt="Book Icon"
          class="w-16 h-16 object-contain"
        />
        <h1
          class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
        >
          Input Mata Kuliah
        </h1>
      </div>
    </div>

    <!-- Mata Kuliah Form and List Container -->
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Mata Kuliah Form -->
      <div
        class="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100"
      >
        <form @submit.prevent="submitMataKuliah" class="space-y-6">
          <div>
            <label class="block text-gray-700 font-semibold mb-2"
              >Kode Mata Kuliah</label
            >
            <div v-if="editIndex !== null">
              <p class="text-lg font-bold text-blue-600">{{ kode }}</p>
            </div>
            <div v-else>
              <input
                type="text"
                v-model="kode"
                class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                placeholder="ET234602"
                required
              />
            </div>
          </div>

          <div>
            <label class="block text-gray-700 font-semibold mb-2"
              >Nama Mata Kuliah</label
            >
            <input
              type="text"
              v-model="nama"
              class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Capstone Project"
              required
            />
          </div>

          <!-- Pilih Kelas -->
          <div>
            <label class="block text-gray-700 font-semibold mb-4"
              >Pilih Kelas</label
            >
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <label
                v-for="kelas in ['A', 'B', 'C', 'D']"
                :key="kelas"
                class="relative"
              >
                <input
                  type="checkbox"
                  v-model="kelasDipilih"
                  :value="kelas"
                  class="hidden peer"
                />
                <div
                  class="p-3 text-center border border-gray-200 rounded-xl cursor-pointer transition-all duration-300 peer-checked:bg-green-50 peer-checked:border-green-500 peer-checked:text-green-600 hover:bg-gray-50"
                >
                  Kelas {{ kelas }}
                </div>
              </label>
            </div>
          </div>

          <!-- SKS Mata Kuliah -->
          <div>
            <label class="block text-gray-700 font-semibold mb-4"
              >Pilih SKS</label
            >
            <div class="grid grid-cols-3 gap-4">
              <label v-for="sks in [2, 3, 4]" :key="sks" class="relative">
                <input
                  type="radio"
                  v-model="sksDipilih"
                  :value="sks"
                  class="hidden peer"
                  name="sks"
                />
                <div
                  class="p-3 text-center border border-gray-200 rounded-xl cursor-pointer transition-all duration-300 peer-checked:bg-green-50 peer-checked:border-green-500 peer-checked:text-green-600 hover:bg-gray-50"
                >
                  {{ sks }} SKS
                </div>
              </label>
            </div>
          </div>

          <!-- Submit and Cancel Buttons -->
          <div class="flex gap-4">
            <button
              type="submit"
              class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {{ editIndex !== null ? "Update" : "Submit" }}
            </button>

            <button
              v-if="editIndex !== null"
              type="button"
              @click="cancelEdit"
              class="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-6 rounded-xl hover:from-gray-700 hover:to-gray-800 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- Daftar Mata Kuliah -->
      <div
        class="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100"
      >
        <div class="flex items-center justify-between mb-6">
          <h2
            class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          >
            <i class="fas fa-list-ul mr-2"></i> Daftar Mata Kuliah
          </h2>

          <!-- Search Input -->
          <div class="relative flex-1 max-w-xs ml-4">
            <i
              class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            ></i>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Cari mata kuliah..."
              class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-if="filteredMataKuliahList.length === 0"
          class="flex flex-col items-center justify-center py-12 text-gray-500"
        >
          <i class="fas fa-folder-open text-4xl mb-4"></i>
          <p class="text-center">
            {{
              searchQuery
                ? "Tidak ada mata kuliah yang sesuai dengan pencarian."
                : "Belum ada mata kuliah yang diinputkan."
            }}
          </p>
        </div>

        <!-- Mata Kuliah List -->
        <div v-else class="overflow-y-auto pr-2" style="height: 300px">
          <ul class="space-y-4">
            <li
              v-for="(mk, index) in filteredMataKuliahList"
              :key="index"
              class="group bg-gray-50 p-6 rounded-xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300"
            >
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-bold text-lg text-gray-800 mb-1">
                    {{ mk.matkul_nama }} - {{ mk.matkul_sks }} SKS
                  </h3>
                  <p class="text-blue-600 font-medium">{{ mk.matkul_kode }}</p>
                  <div class="mt-2 flex flex-wrap gap-2">
                    <span
                      v-for="kelas in mk.mata_kuliah_kelas"
                      :key="kelas.kelas_mk"
                      class="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium"
                    >
                      Kelas {{ kelas.kelas_mk }}
                    </span>
                  </div>
                </div>
                <div class="flex space-x-3">
                  <button
                    @click="editMataKuliah(index)"
                    class="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-300"
                  >
                    <i class="fas fa-pencil-alt"></i>
                  </button>
                  <button
                    @click="deleteMataKuliah(index)"
                    class="p-2 text-gray-400 hover:text-red-600 transition-colors duration-300"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Popup Konfirmasi Delete -->
    <div
      v-if="showDeleteConfirm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 transform transition-all duration-300"
      >
        <div class="text-center">
          <div
            class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <i class="fas fa-exclamation-triangle text-2xl text-red-600"></i>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Konfirmasi Hapus</h3>
          <p class="text-gray-600 mb-6">
            Apakah Anda yakin ingin menghapus mata kuliah ini?
          </p>
          <div class="flex justify-center space-x-4">
            <button
              @click="confirmDelete"
              class="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-300"
            >
              Ya, Hapus
            </button>
            <button
              @click="showDeleteConfirm = false"
              class="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors duration-300"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Popup Konfirmasi Edit -->
    <div
      v-if="showEditConfirm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 transform transition-all duration-300"
      >
        <div class="text-center">
          <div
            class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <i class="fas fa-pencil-alt text-2xl text-blue-600"></i>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Konfirmasi Edit</h3>
          <p class="text-gray-600 mb-6">
            Apakah Anda yakin ingin mengedit mata kuliah ini?
          </p>
          <div class="flex justify-center space-x-4">
            <button
              @click="confirmEdit"
              class="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300"
            >
              Ya, Edit
            </button>
            <button
              @click="showEditConfirm = false"
              class="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors duration-300"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import axios from "axios";

const kode = ref("");
const nama = ref("");
const kelasDipilih = ref([]);
const sksDipilih = ref(null);
const mataKuliahList = ref([]);
const editIndex = ref(null);
const searchQuery = ref("");
const showDeleteConfirm = ref(false);
const showEditConfirm = ref(false);
const selectedIndex = ref(null);
const showAlert = ref(false);
const alertMessage = ref("");
const showSuccess = ref(false);
const successMessage = ref("");
let pollingInterval = null;

// Computed property for filtered mata kuliah list
const filteredMataKuliahList = computed(() => {
  if (!searchQuery.value) return mataKuliahList.value;

  const query = searchQuery.value.toLowerCase();
  return mataKuliahList.value.filter(
    (mk) =>
      mk.matkul_kode.toLowerCase().includes(query) ||
      mk.matkul_nama.toLowerCase().includes(query) ||
      mk.mata_kuliah_kelas.some((k) => k.kelas_mk.toLowerCase().includes(query))
  );
});

// Fetch Mata Kuliah Data from API
const fetchMataKuliah = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("user"))?.accessToken;
    if (!token) {
      throw new Error("User is not authenticated");
    }

    const response = await axios.get("http://10.4.90.25:3000/mata_kuliah", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    mataKuliahList.value = response.data;
  } catch (error) {
    console.error("Gagal mengambil data mata kuliah", error);
  }
};

// Function to show success message
const showSuccessAlert = (message) => {
  successMessage.value = message;
  showSuccess.value = true;
  setTimeout(() => {
    showSuccess.value = false;
  }, 3000); // Hide after 3 seconds
};

// Submit Mata Kuliah (Add or Update)
const submitMataKuliah = async () => {
  kode.value = kode.value.trim();
  if (!kode.value) {
    alertMessage.value =
      "Kode mata kuliah tidak boleh kosong atau hanya spasi.";
    showAlert.value = true;
    return;
  }
  const newMataKuliah = {
    matkul_kode: kode.value,
    matkul_nama: nama.value,
    matkul_sks: sksDipilih.value,
    kelas: kelasDipilih.value.map((k) => ({ kelas_mk: k })),
  };

  try {
    const token = JSON.parse(localStorage.getItem("user"))?.accessToken;
    if (!token) {
      throw new Error("User is not authenticated");
    }

    if (editIndex.value !== null) {
      // Update Mata Kuliah
      const mataKuliahKode = mataKuliahList.value[editIndex.value].matkul_kode;
      await axios.patch(
        `http://10.4.90.25:3000/mata_kuliah/${mataKuliahKode}`,
        newMataKuliah,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // After update, fetch the list again to ensure consistency
      await fetchMataKuliah();
      resetForm();
      editIndex.value = null;
      showSuccessAlert("Data mata kuliah berhasil diperbarui!");
    } else {
      // Add New Mata Kuliah
      await axios.post("http://10.4.90.25:3000/mata_kuliah", newMataKuliah, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Fetch updated mata kuliah list
      await fetchMataKuliah();
      resetForm();
      showSuccessAlert("Data mata kuliah berhasil ditambahkan!");
    }
  } catch (error) {
    console.error("Gagal mengirim data mata kuliah", error);
    let msg = "Gagal mengupdate data: ";
    if (error.response && error.response.data && error.response.data.error) {
      msg += error.response.data.error;
    } else if (error.message) {
      msg += error.message;
    } else {
      msg += "Terjadi kesalahan.";
    }
    alertMessage.value = msg;
    showAlert.value = true;
  }
};

// Edit Mata Kuliah
const editMataKuliah = (index) => {
  const mk = filteredMataKuliahList.value[index];
  selectedIndex.value = mataKuliahList.value.findIndex(
    (m) => m.matkul_kode === mk.matkul_kode
  );
  showEditConfirm.value = true;
};

// Confirm edit function
const confirmEdit = () => {
  const index = selectedIndex.value;
  const mk = mataKuliahList.value[index];
  kode.value = mk.matkul_kode;
  nama.value = mk.matkul_nama;
  kelasDipilih.value = mk.mata_kuliah_kelas.map((k) => k.kelas_mk);
  sksDipilih.value = mk.matkul_sks;
  editIndex.value = index;
  showEditConfirm.value = false;
};

// Cancel Edit
const cancelEdit = () => {
  resetForm();
  editIndex.value = null; // Reset to allow adding new mata kuliah
};

// Delete Mata Kuliah
const deleteMataKuliah = (index) => {
  const mk = filteredMataKuliahList.value[index];
  selectedIndex.value = mataKuliahList.value.findIndex(
    (m) => m.matkul_kode === mk.matkul_kode
  );
  showDeleteConfirm.value = true;
};

// Confirm delete function
const confirmDelete = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("user"))?.accessToken;
    if (!token) {
      throw new Error("User is not authenticated");
    }

    const mk = mataKuliahList.value[selectedIndex.value];
    await axios.delete(
      `http://10.4.90.25:3000/mata_kuliah/${mk.matkul_kode}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    mataKuliahList.value.splice(selectedIndex.value, 1);
    showDeleteConfirm.value = false;
    showSuccessAlert("Data mata kuliah berhasil dihapus!");
  } catch (error) {
    console.error("Error deleting mata kuliah:", error);
    let msg = "Gagal menghapus mata kuliah: ";
    if (error.response && error.response.data && error.response.data.error) {
      msg += error.response.data.error;
    } else if (error.message) {
      msg += error.message;
    } else {
      msg += "Terjadi kesalahan.";
    }
    alertMessage.value = msg;
    showAlert.value = true;
  }
};

// Reset Form after submit
const resetForm = () => {
  kode.value = "";
  nama.value = "";
  kelasDipilih.value = [];
  sksDipilih.value = null;
};

// Fetch mata kuliah data when component is mounted
onMounted(() => {
  fetchMataKuliah();
  pollingInterval = setInterval(fetchMataKuliah, 10000); // 10 detik
});

onUnmounted(() => {
  if (pollingInterval) clearInterval(pollingInterval);
});
</script>
