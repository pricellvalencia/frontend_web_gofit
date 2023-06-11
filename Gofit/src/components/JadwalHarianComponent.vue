<template>
    <br>
    
    <center>
      <q-card>
        <q-card-section>
          <q-item-label style="font-family: 'Courier New', Courier, monospace; font-size: 30px; font-weight: bold;">JADWAL HARIAN</q-item-label>
        </q-card-section>
      </q-card>
    </center>
    
    <br>
    
    <div class="float-right">
      <q-btn color="green" icon="add" @click="generateJadwal"> GENERATE JADWAL</q-btn>
    </div>
    
    <br>
    <br>
    <br>
    
    <div class="q-px-md">
      <div
      class="no-margin"
      :style="rows.length == 0 ? 'display: block' : 'display: none'"
      >
        <q-markup-table>
          <thead>
            <tr>
              <th class="no-border" colspan="5">
                <div class="row q-my-mb float-right">
                  <q-input outlined dense v-model="searchString" label="Search..">
                    <template v-slot:append>
                      <q-icon
                      v-if="searchString !== ''"
                      name="close"
                      @click="searchString = ''"
                      class="cursor-pointer"
                      ></q-icon>
                      
                      <q-icon name="search"></q-icon>
                    </template>
                  </q-input>
                  
                  <q-space></q-space>
                </div>
              </th>
            </tr>
            
            <tr>
              <th class="text-left" style="width: 0.5cm">TANGGAL</th>
              <th class="text-left" style="width: 2.5cm">NAMA INSTRUKTUR</th>
              <th class="text-left" style="width: 6.5cm">NAMA KELAS</th>
              <th class="text-left" style="width: 4.5cm">STATUS</th>
              <th class="text-left">ACTION</th>
            </tr>
          </thead>
          
          <tbody>
            <tr v-for="n in 5" :key="n">
              <td class="text-left">
                <q-skeleton animation="blink" type="text" width="20px" />
              </td>
              <td class="text-right">
                <q-skeleton animation="blink" type="text" width="50px" />
              </td>
              <td class="text-right">
                <q-skeleton animation="blink" type="text" width="35px" />
              </td>
              <td class="text-right">
                <q-skeleton animation="blink" type="text" width="65px" />
              </td>
              <td class="text-left">
                <q-icon name="print" color="gray" size="sm" />
                <q-icon name="delete" color="negative" size="sm" />
              </td>
            </tr>
            
            <tr>
              <td class="text-right">
                <q-icon
                class="q-mr-md"
                name="navigate_before"
                color="grey"
                size="sm"
                />
                
                <q-icon
                class="q-mr-xs"
                name="navigate_next"
                color="grey"
                size="sm"
                />
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
      
      <q-table
      :filter="searchString"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :rows-per-page-options="[5]"
      :style="rows.length == 0 ? 'display: none' : 'display: block'"
      >
        <template v-slot:top>
          <q-input outlined dense v-model="searchString" label="Search...">
            <template v-slot:append>
              <q-icon
              v-if="searchString !== ''"
              name="close"
              @click="searchString = ''"
              class="cursor-pointer"
              ></q-icon>
              
              <q-icon name="search"></q-icon>
            </template>
          </q-input>
          
          <q-space></q-space>
        </template>
        
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
                flat
                round
                color="positive"
                icon="edit"
                @click="liburkanKelas(props.row)"
            ></q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </template>
    
  <style scoped>
  .float-right {
    margin-right: 25px;
  }
  </style>
    
  <script>
  import { defineComponent, onMounted, ref } from 'vue';
  import axios, { api } from 'boot/axios';
  import { useQuasar, QSelect } from 'quasar';
  
  
  export default defineComponent({
    name: 'JadwalHarianComponent',
    setup() {
      const $q = useQuasar();
      
      const columns = [
        {
          name: 'tanggal',
          required: false,
          label: 'TANGGAL',
          align: 'left',
          field: (row) => row.TANGGAL,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'namaInstruktur',
          required: false,
          label: 'NAMA INSTRUKTUR',
          align: 'left',
          field: (row) => row.NAMA_INSTRUKTUR,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'namaKelas',
          required: false,
          label: 'NAMA KELAS',
          align: 'left',
          field: (row) => row.NAMA_KELAS,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'status',
          required: false,
          label: 'STATUS',
          align: 'left',
          field: (row) => row.STATUS_KELAS,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'action',
          required: false,
          label: 'ACTION',
          align: 'left',
        },
      ];
      
    selectStatus: [
        { label: 'Libur', value: '0' }
    ];
      
      const kelas = ref([]);
      function getKelas() {
        kelas.value = []
        api.get('/api/kelas',{
          withCredentials: true,
        })
        .then((response) => {
          kelas.value = response.data.data;
        })
      }
      const instrukturs = ref([]);
      function getInstrukturs() {
        instrukturs.value = []
        api.get('/api/instruktur',{
          withCredentials: true,
        })
        .then((response) => {
          instrukturs.value = response.data.data;
        })
      }
      
      const rows = ref([]);
      
      const searchString = ref('');
      
      function getJadwal() {
        rows.value = [];
        api
        .get('/api/jadwal_harian', {
          withCredentials: true,
        })
        .then((response) => {
          rows.value = response.data.data;
        })
        .catch(() => {
          $q.notify({
            message: 'Failed to load data[!]',
            color: 'negative',
            position: 'top-right',
          });
        });
      }
      
      function generateJadwal() {
        api.post('/api/jadwal_harian',
          {},
          { withCredentials: true }
        )
        .then(() => {
          $q.notify({
            message: 'Successfully generate jadwal',
            color: 'positive',
            icon: 'check_circle',
            position: 'top-right',
          });
          getJadwal();
        })
        .catch(() => {
          $q.notify({
            message: 'Failed to generate jadwal',
            color: 'negative',
            icon: 'cancel',
            position: 'top-right',
          });
        });
      }
      
      function editStatus(ID_JADWAL_HARIAN) {
        api.put('/api/jadwal_harian/' + ID_JADWAL_HARIAN,
        {}, { withCredentials: true })
        .then(() => {
          $q.notify({
            message: 'Successfully update status',
            color: 'positive',
            icon: 'check_circle',
            position: 'top-right'
          })
          getJadwal()
        })
        .catch(() => {
          $q.notify({
            message: 'Failed to update status',
            color: 'negative',
            icon: 'cancel',
            position: 'top-right'
          })
        })
      }

      function liburkanKelas(user) {
        $q.dialog({
          title: 'Confirm',
          message: 'Apakah Anda ingin meliburkan kelas ini ?',
          cancel: true,
          persistent: true,
          ok: {
            color: 'negative',
            label: 'Liburkan'
          }
        }).onOk(() => {
          editStatus(user.ID_JADWAL_HARIAN)
        })
      }
      
      onMounted(() => {
        getJadwal();
        getKelas();
        getInstrukturs();
      });
      
      return {
        columns,
        rows,
        generateJadwal,
        searchString,
        getJadwal,
        kelas,
        getKelas,
        instrukturs,
        getInstrukturs,
        liburkanKelas,
      };
    },
  });
  </script>