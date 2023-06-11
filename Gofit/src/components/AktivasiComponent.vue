<template>
  <br>
  
  <center>
    <q-card>
      <q-card-section>
        <q-item-label style="font-family: 'Courier New', Courier, monospace; font-size: 30px; font-weight: bold;">TRANSAKSI AKTIVASI</q-item-label>
      </q-card-section>
    </q-card>
  </center>
  
  <br>
  
  <div class="float-right">
    <q-btn color="green" icon="add" @click="showAddDialog"> AKTIVASI</q-btn>
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
            <th class="text-left" style="width: 4.5cm">TANGGAL AKTIVASI</th>
            <th class="text-left" style="width: 3.5cm">TANGGAL KADALUARSA</th>
            <th class="text-left" style="width: 6cm">JUMLAH PEMBAYARAN</th>
            <th class="text-left">ACTION</th>
          </tr>
        </thead>
        
        <tbody>
          <tr v-for="n in 6" :key="n">
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
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="25px" />
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
        <div class="text-h6 text-center">Add Aktivasi</div>
      </q-card-section>
      
      <q-card-section >
        <q-form @submit.prevent="saveNewData" @reset="closeAddDialog" class="q-gutter-md">
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
          
          <q-input
          v-model="addData.JUMLAH_PEMBAYARAN_TRANSAKSI_AKTIVASI.value"
          label="Jumlah Pembayaran"
          outlined
          lazy-rules
          disable
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
.float-right {
  margin-right: 25px;
}
</style>
  
<script>
import { defineComponent, onMounted, ref } from 'vue';
import axios, { api } from 'boot/axios';
import { useQuasar, QSelect } from 'quasar';
  
  
export default defineComponent({
  name: 'AktivasiComponent',
  setup() {
    const $q = useQuasar();
    
    const columns = [
      {
        name: 'id',
        required: false,
        label: 'ID',
        align: 'left',
        field: (row) => row.ID_TRANSAKSI_AKTIVASI,
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
        name: 'tglAktivasi',
        required: false,
        label: 'TANGGAL AKTIVASI',
        align: 'left',
        field: (row) => row.TGL_TRANSAKSI_AKTIVASI,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'kadaluarsa',
        required: false,
        label: 'TANGGAL KADALUARSA',
        align: 'left',
        field: (row) => row.MASA_BERLAKU_TRANSAKSI_AKTIVASI,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: 'pembayaran',
        required: false,
        label: 'JUMLAH PEMBAYARAN',
        align: 'left',
        field: (row) => row.JUMLAH_PEMBAYARAN_TRANSAKSI_AKTIVASI,
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
    
    const rows = ref([]);
    
    const addDialog = ref(false);
    
    const addData = {
      ID_PEGAWAI: ref(JSON.parse(localStorage.getItem('user')).ID_PEGAWAI),
      NAMA_PEGAWAI: ref(JSON.parse(localStorage.getItem('user')).NAMA_PEGAWAI),
      ID_MEMBER: ref(null),
      JUMLAH_PEMBAYARAN_TRANSAKSI_AKTIVASI: ref(3000000),
    };
    
    const searchString = ref('');
    
    function getAktivasi() {
      rows.value = [];
      api
      .get('/api/transaksi_aktivasi', {
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
    
    function showAddDialog() {
      $q.dialog({
        title: 'Confirm',
        message: 'Do you want to add data ?',
        cancel: true,
        persistent: true,
        ok: {
          color: 'positive',
          label: 'Add'
        }
      }).onOk(() => {
        addDialog.value = true;
      })
    }
    
    function closeAddDialog() {
      addDialog.value = false;
      addData.ID_MEMBER.value = '';
    }
    
    function deleteData(ID_TRANSAKSI_AKTIVASI) {
      api.delete('/api/transaksi_aktivasi/' + ID_TRANSAKSI_AKTIVASI,
        {
          // ID_TRANSAKSI_AKTIVASI: ID_TRANSAKSI_AKTIVASI,
        },
        { withCredentials: true }
      )
      .then(() => {
        $q.notify({
          message: 'Successfully deleted data',
          color: 'positive',
          icon: 'check_circle',
          position: 'top-right',
        });
        getAktivasi();
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
        deleteData(user.ID_TRANSAKSI_AKTIVASI)
      })
    }
    
    function saveNewData() {
      api.post('/api/transaksi_aktivasi',
        {
          ID_PEGAWAI: JSON.parse(localStorage.getItem('user')).ID_PEGAWAI,
          ID_MEMBER: addData.ID_MEMBER.value.ID_MEMBER,
          JUMLAH_PEMBAYARAN_TRANSAKSI_AKTIVASI: addData.JUMLAH_PEMBAYARAN_TRANSAKSI_AKTIVASI.value,
        },
        { withCredentials: true }
      )
      .then(() => {
        $q.notify({
          message: 'Successfully add Aktivasi',
          color: 'positive',
          icon: 'check_circle',
          position: 'top-right',
        });
        getAktivasi();
      })
      .catch(() => {
        $q.notify({
          message: 'Failed to add Aktivasi',
          color: 'negative',
          icon: 'cancel',
          position: 'top-right',
        });
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
                <title> Struk Aktivasi Tahunan </title>
                <style>
                  .card {
                    width: 800px;
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
                    width: 160px;
                    font-weight: bold;
                  }
                  .footer {
                    text-align: left;
                    margin-left: 530px;
                    margin-top: -100px;
                  }
                  .footers {
                    display: inline-block;
                    text-align: left;
                    margin-left: 530px;
                    margin-top: -60px;
                  }
                </style>
              </head>

              <body>
                <div class="card vip">
                  <h2><b>Gofit</b></h2>
                  <p>Jl.Centralpark No. 10 Yogyakarta</p>
                  <div class="footer" style="text-align: left; ">
                    <h4><span>No Struk</span> : ${user.ID_TRANSAKSI_AKTIVASI}</h4>
                    <h4><span>Tanggal</span>  : ${user.TGL_TRANSAKSI_AKTIVASI}</h4>
                  </div>

                  <p></p>
                  
                  <div>
                    <p><span>Member</span> : ${user.ID_MEMBER}/ ${user.NAMA_MEMBER}</p>
                    <p><span>Aktivasi Tahunan</span> : Rp. ${user.JUMLAH_PEMBAYARAN_TRANSAKSI_AKTIVASI},-</p>
                    <p><span>Masa Aktif Member</span> : ${user.MASA_BERLAKU_TRANSAKSI_AKTIVASI}</p>
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
      getAktivasi();
      getMembers();
      getPegawais();
    });
    
    return {
      columns,
      rows,
      deleteDataDialog,
      addData,
      addDialog,
      showAddDialog,
      closeAddDialog,
      saveNewData,
      searchString,
      getAktivasi,
      members,
      getMembers,
      pegawais,
      getPegawais,
      printStruk,
    };
  },
});
</script>