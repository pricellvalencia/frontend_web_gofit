<template>
    <br>
    
    <center>
      <q-card>
        <q-card-section>
          <q-item-label style="font-family: 'Courier New', Courier, monospace; font-size: 30px; font-weight: bold;">TRANSAKSI DEPOSIT KELAS</q-item-label>
        </q-card-section>
      </q-card>
    </center>
    
    <br>
    
    <div>
      <div class="float-left">
        <q-btn color="info" @click="showExp">Expired Deposit</q-btn>

        <q-btn color="warning" @click="resetDeposit" class="q-ml-md">RESET DEPOSIT</q-btn>
      </div>
      
      <div class="float-right">
        <q-btn color="green" icon="add" @click="showAddDialog"> DEPOSIT KELAS</q-btn>
      </div>
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
              <th class="text-left" style="width: 0.5cm">ID</th>
              <th class="text-left" style="width: 2.5cm">NAMA PEGAWAI</th>
              <th class="text-left" style="width: 6.5cm">NAMA MEMBER</th>
              <th class="text-left" style="width: 6.5cm">NAMA KELAS</th>
              <th class="text-left" style="width: 4.5cm">TANGGAL DEPOSIT KELAS</th>
              <th class="text-left" style="width: 6cm">JUMLAH DEPOSIT KELAS</th>
              <th class="text-left" style="width: 6cm">BONUS DEPOSIT KELAS</th>
              <th class="text-left" style="width: 6cm">MASA BERLAKU</th>
              <th class="text-left">ACTION</th>
            </tr>
          </thead>
          
          <tbody>
            <tr v-for="n in 8" :key="n">
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
                <q-skeleton animation="blink" type="text" width="35px" />
              </td>
              <td class="text-right">
                <q-skeleton animation="blink" type="text" width="65px" />
              </td>
              <td class="text-right">
                <q-skeleton animation="blink" type="text" width="25px" />
              </td>
              <td class="text-right">
                <q-skeleton animation="blink" type="text" width="85px" />
              </td>
              <td class="text-right">
                <q-skeleton animation="blink" type="text" width="85px" />
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
            color="gray"
            icon="print"
            @click="printStruk(props.row)"
            ></q-btn>
            
            <q-btn
            flat
            round
            color="negative"
            icon="delete"
            @click="deleteDataDialog(props.row)"
            ></q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
    
    <q-dialog v-model="addDialog" persistent>
      <q-card style="min-width: 14cm">
        <q-card-section class="q-pb-none">
          <div class="text-h6 text-center">Add Deposit Kelas</div>
        </q-card-section>
        
        <q-card-section >
          <q-form @submit.prevent="saveAddData" @reset="closeAddDialog" class="q-gutter-md">
            <q-input
              v-model="addData.NAMA_PEGAWAI.value"
              label="Nama Pegawai"
              outlined
              lazy-rules
              disable
            ></q-input>
            
            <q-select
              v-model="addData.ID_MEMBER.value"
              :options="members"
              label="Select Member"
              option-label="NAMA_MEMBER"
              option-value="ID_MEMBER"
              outlined
            ></q-select>
            
            <q-select
              v-model="addData.ID_KELAS.value"
              :options="kelas"
              label="Select Kelas"
              option-label="NAMA_KELAS"
              option-value="ID_KELAS"
              outlined
            ></q-select>
            
            <q-input
              v-model="addData.JUMLAH_TRANSAKSI_DEPOSIT_KELAS.value"
              label="Jumlah Deposit Kelas"
              outlined
              lazy-rules
              :rules="[(val) => val.length > 0 || 'Jumlah deposit kelas tidak boleh kosong']"
            ></q-input>
            
            <div class="row float-right q-mp-t">
              <q-btn
              class="q-mb-md q-ml-sm q-mr-md"
              label="Cancel"
              type="reset"
              color="primary"
              flat
              ></q-btn>
              
              <q-btn class="q-mb-md" label="Save" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </template>
  
  <style scoped>
    .float-left {
      margin-left: 25px;
    }
    .float-right {
      margin-right: 25px;
    }
  </style>
  
    
  <script>
  import { defineComponent, onMounted, ref } from 'vue';
  import axios, { api } from 'boot/axios';
  import { useQuasar, QSelect } from 'quasar';
    
    
  export default defineComponent({
    name: 'DepositUangComponent',
    setup() {
      const $q = useQuasar();
      
      const columns = [
        {
          name: 'id',
          required: false,
          label: 'ID',
          align: 'left',
          field: (row) => row.ID_TRANSAKSI_DEPOSIT_KELAS,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'namaPegawai',
          required: false,
          label: 'NAMA PEGAWAI',
          align: 'left',
          field: (row) => row.NAMA_PEGAWAI,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'namaMember',
          required: false,
          label: 'NAMA MEMBER',
          align: 'left',
          field: (row) => row.NAMA_MEMBER,
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
          name: 'tglDepositKelas',
          required: false,
          label: 'TANGGAL DEPOSIT KELAS',
          align: 'left',
          field: (row) => row.TGL_TRANSAKSI_DEPOSIT_KELAS,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'jumlahDepositKelas',
          required: false,
          label: 'JUMLAH DEPOSIT KELAS',
          align: 'left',
          field: (row) => row.JUMLAH_TRANSAKSI_DEPOSIT_KELAS,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'bonusDepositKelas',
          required: false,
          label: 'BONUS DEPOSIT KELAS',
          align: 'left',
          field: (row) => row.BONUS_DEPOSIT_KELAS,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'masaBerlaku',
          required: false,
          label: 'MASA BERLAKU',
          align: 'left',
          field: (row) => row.MASA_BERLAKU,
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
      
      const members = ref([]);
      function getMembers() {
        members.value = []
        api.get('/api/member',{
          withCredentials: true,
        })
        .then((response) => {
          members.value = response.data.data;
        })
      }
      const pegawais = ref([]);
      function getPegawais() {
        pegawais.value = []
        api.get('/api/pegawai',{
          withCredentials: true,
        })
        .then((response) => {
          pegawais.value = response.data.data;
        })
      }
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
      
      const rows = ref([]);
      
      const addDialog = ref(false);
      
      const addData = {
        ID_PEGAWAI: ref(JSON.parse(localStorage.getItem('user')).ID_PEGAWAI),
        NAMA_PEGAWAI: ref(JSON.parse(localStorage.getItem('user')).NAMA_PEGAWAI),
        ID_MEMBER: ref(null),
        ID_KELAS: ref(null),
        JUMLAH_TRANSAKSI_DEPOSIT_KELAS: ref(''),
      };
      
      const searchString = ref('');
      
      function getDepositKelas() {
        rows.value = [];
        api
        .get('/api/transaksi_deposit_kelas', {
          withCredentials: true,
        })
        .then((response) => {
          rows.value = response.data.data.map((item) => {
            return {
              ID_TRANSAKSI_DEPOSIT_KELAS: item.ID_TRANSAKSI_DEPOSIT_KELAS,
              ID_PEGAWAI: item.ID_PEGAWAI,
              ID_MEMBER: item.ID_MEMBER,
              ID_KELAS: item.ID_KELAS,
              NAMA_PEGAWAI: item.NAMA_PEGAWAI,
              NAMA_MEMBER: item.NAMA_MEMBER,
              NAMA_KELAS: item.NAMA_KELAS,
              TGL_TRANSAKSI_DEPOSIT_KELAS: item.TGL_TRANSAKSI_DEPOSIT_KELAS,
              JUMLAH_TRANSAKSI_DEPOSIT_KELAS: item.JUMLAH_TRANSAKSI_DEPOSIT_KELAS,
              MASA_BERLAKU: item.MASA_BERLAKU,
              HARGA_KELAS: item.HARGA_KELAS,
              total_deposit: item.JUMLAH_TRANSAKSI_DEPOSIT_KELAS + item.BONUS_DEPOSIT_KELAS,
              BONUS_DEPOSIT_KELAS: item.BONUS_DEPOSIT_KELAS || 0,
              TOTAL_PEMBAYARAN: item.TOTAL_PEMBAYARAN || 0,
              DEPOSIT_PAKET_KELAS: item.DEPOSIT_PAKET_KELAS || 0
            };
          });
        })
        .catch(() => {
          $q.notify({
            message: 'Failed to load data[!]',
            color: 'negative',
            position: 'top-right',
          });
        });
      }
      
      function showAddDialog() {
        addDialog.value = true;
      }
      
      function closeAddDialog() {
        addDialog.value = false;
        addData.ID_MEMBER.value = '';
        addData.ID_KELAS.value = '';
        addData.JUMLAH_TRANSAKSI_DEPOSIT_KELAS.value = '';
      }

      function resetDeposit() {
        api.put('/api/resetDeposit', {
          withCredentials: true
        })
        .then(() => {
          $q.notify({
            message: 'Successfully reset deposit',
            color: 'positive',
            icon: 'check_circle',
            position: 'top-right',
          });
          getDepositKelas();
        })
        .catch(() => {
          $q.notify({
            message: 'Failed to reset deposit[!]',
            color: 'negative',
            icon: 'cancel',
            position: 'top-right',
          });
        });
      }
      
      function deleteData(ID_TRANSAKSI_DEPOSIT_KELAS) {
        api.delete('/api/transaksi_deposit_kelas/' + ID_TRANSAKSI_DEPOSIT_KELAS,
          {},
          { withCredentials: true }
        )
        .then(() => {
          $q.notify({
            message: 'Successfully deleted data',
            color: 'positive',
            icon: 'check_circle',
            position: 'top-right',
          });
          getDepositKelas();
        })
        .catch(() => {
          $q.notify({
            message: 'Failed to delete data[!]',
            color: 'negative',
            icon: 'cancel',
            position: 'top-right',
          });
        });
      }
      
      function deleteDataDialog(user) {
        $q.dialog({
          title: 'Confirm',
          message: 'Do you want to delete this data ?',
          cancel: true,
          persistent: true,
          ok: {
            color: 'negative',
            label: 'Delete'
          }
        }).onOk(() => {
          deleteData(user.ID_TRANSAKSI_DEPOSIT_KELAS)
        })
      }
      
      function saveAddData() {
        api.post('/api/transaksi_deposit_kelas',
          {
            ID_PEGAWAI: JSON.parse(localStorage.getItem('user')).ID_PEGAWAI,
            ID_MEMBER: addData.ID_MEMBER.value.ID_MEMBER,
            ID_KELAS: addData.ID_KELAS.value.ID_KELAS,
            JUMLAH_TRANSAKSI_DEPOSIT_KELAS: addData.JUMLAH_TRANSAKSI_DEPOSIT_KELAS.value,
          },
          { withCredentials: true }
        )
        .then(() => {
          $q.notify({
            message: 'Successfully add Deposit Kelas',
            color: 'positive',
            icon: 'check_circle',
            position: 'top-right',
          });
          getDepositKelas();
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            $q.notify({
              message: 'Member tidak aktif',
              color: 'negative',
              icon: 'cancel',
              position: 'top-right',
            });
          } else if (error.response && error.response.status === 402) {
            $q.notify({
              message: 'Jumlah deposit harus 5 atau 10',
              color: 'negative',
              icon: 'cancel',
              position: 'top-right',
            });
          } else if (error.response && error.response.status === 403) {
            $q.notify({
              message: 'Sisa paket anda masih ada dan belum hangus',
              color: 'negative',
              icon: 'cancel',
              position: 'top-right',
            });
          }
        });
        closeAddDialog();
      }
      
      function printStruk(user){
        $q.dialog({
          title: 'Confirm',
          message: 'Do you want to print struk ?',
          cancel: true,
          persistent: true,
          ok: {
            color: 'positive',
            label: 'Yes'
          }
        }).onOk(() => {
          var myWindow = window.open("", "printWindow", "width=1200,height=700");
          var content =
            `<!DOCTYPE html>
              <html>
                <head>
                  <title> Struk Deposit Kelas </title>
                  <style>
                    .card {
                      width: 900px;
                      height: 300px;
                      background-color: #d9d9d9;
                      border-radius: 10px;
                      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
                      padding: 20px;
                      display: flex;
                      flex-direction: column;
                    }
                    .vip { 
                      background-repeat: no-repeat;
                      background-size: cover;
                    }
                    p {
                      display: block;
                      text-align: left;
                      margin-top:4px;
                    }
                    p span {
                      display: inline-block;
                      width: 200px;
                      font-weight: bold;
                    }
                    .footer {
                      text-align: left;
                      margin-left: 570px;
                      margin-top: -100px;
                    }
                    .footers {
                      display: inline-block;
                      text-align: left;
                      margin-left: 570px;
                      margin-top: -60px;
                    }
                  </style>
                </head>
  
                <body>
                  <div class="card vip">
                    <h2><b>Gofit</b></h2>
                    <p>Jl.Centralpark No. 10 Yogyakarta</p>
                    <div class="footer" style="text-align: left; ">
                      <h4><span>No Struk</span> : ${user.ID_TRANSAKSI_DEPOSIT_KELAS}</h4>
                      <h4><span>Tanggal</span>  : ${user.TGL_TRANSAKSI_DEPOSIT_KELAS}</h4>
                    </div>
  
                    <p></p>
                    
                    <div>
                      <p><span>Member</span> : ${user.ID_MEMBER}/ ${user.NAMA_MEMBER}</p>
                      <p><span>Deposit (bayar ${user.JUMLAH_TRANSAKSI_DEPOSIT_KELAS} gratis ${user.BONUS_DEPOSIT_KELAS})</span> : Rp. ${user.TOTAL_PEMBAYARAN},- (${user.JUMLAH_TRANSAKSI_DEPOSIT_KELAS} x Rp.${user.HARGA_KELAS})</p>
                      <p><span>Jenis Kelas</span> : ${user.NAMA_KELAS}</p>
                      <p><span>Total Deposit ${user.NAMA_KELAS}</span> : ${user.total_deposit}</p>
                      <p><span>Berlaku sampai dengan</span> : ${user.MASA_BERLAKU}</p>
                    </div>
                    <div class="footers" style="text-align: left; ">
                      <h4><span>Kasir</span> : ${user.ID_PEGAWAI} / ${user.NAMA_PEGAWAI}</h4>
                    </div>
                  </div>
                </body>
              </html>
            `
          myWindow.document.write(content);
          myWindow.print()
        })
      }
      
      onMounted(() => {
        getDepositKelas();
        getMembers();
        getPegawais();
        getKelas();
      });
      
      return {
        columns,
        rows,
        deleteDataDialog,
        addData,
        addDialog,
        showAddDialog,
        closeAddDialog,
        saveAddData,
        searchString,
        getDepositKelas,
        members,
        getMembers,
        pegawais,
        getPegawais,
        kelas,
        getKelas,
        printStruk,
        resetDeposit,
      };
    },
  });
  </script>