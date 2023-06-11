<template>
    <br>
    
    <center>
      <q-card>
        <q-card-section>
          <q-item-label style="font-family: 'Courier New', Courier, monospace; font-size: 30px; font-weight: bold;">PRESENSI MEMBER GYM</q-item-label>
        </q-card-section>
      </q-card>
    </center>
    
    <br>
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
              <th class="text-left" style="width: 6.5cm">NAMA MEMBER</th>
              <th class="text-left" style="width: 4.5cm">TANGGAL GYM</th>
              <th class="text-left" style="width: 6cm">SESI GYM</th>
              <th class="text-left" style="width: 6cm">WAKTU PRESENSI</th>
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
                <q-skeleton animation="blink" type="text" width="65px" />
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
                color="positive"
                icon="add"
                @click="presensiGym(props.row)"
            ></q-btn>

            <q-btn
                flat
                round
                color="gray"
                icon="print"
                @click="printStruk(props.row)"
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
    name: 'PresensiGymComponent',
    setup() {
      const $q = useQuasar();
      
      const columns = [
        {
          name: 'id',
          required: false,
          label: 'ID',
          align: 'left',
          field: (row) => row.ID_MEMBER,
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
          name: 'tglDibooking',
          required: false,
          label: 'TANGGAL GYM',
          align: 'left',
          field: (row) => row.TGL_DIBOOKING,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'sesiGym',
          required: false,
          label: 'SESI GYM',
          align: 'left',
          field: (row) => row.SESI_GYM,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'waktuPresensi',
          required: false,
          label: 'WAKTU PRESENSI',
          align: 'left',
          field: (row) => row.WAKTU_PRESENSI_MEMBER_GYM,
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
      const jadwals = ref([]);
      function getJadwals() {
        jadwals.value = []
        api.get('/api/jadwal_harian',{
          withCredentials: true,
        })
        .then((response) => {
          jadwals.value = response.data.data;
        })
      }
      
      const rows = ref([]);
      
      const searchString = ref('');
      
      function getPresensiGym() {
        rows.value = [];
        api
        .get('/api/presensi_gym', {
          withCredentials: true,
        })
        .then((response) => {
          rows.value = response.data.data.map((item) => {
            return {
              ID_PRESENSI_GYM: item.ID_PRESENSI_GYM,
              ID_PEGAWAI: item.ID_PEGAWAI,
              ID_MEMBER: item.ID_MEMBER,
              NAMA_PEGAWAI: item.NAMA_PEGAWAI,
              NAMA_MEMBER: item.NAMA_MEMBER,
              TGL_DIBOOKING: item.TGL_DIBOOKING,
              SESI_GYM: item.SESI_GYM,
              WAKTU_PRESENSI_MEMBER_GYM: item.WAKTU_PRESENSI_MEMBER_GYM || 'Belum Presensi',
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
      
      function presensiMember(ID_PRESENSI_GYM) {
        api.put('/api/presensi_gym/' + ID_PRESENSI_GYM,
          {},
          { withCredentials: true }
        )
        .then(() => {
          $q.notify({
            message: 'Successfully presensi member',
            color: 'positive',
            icon: 'check_circle',
            position: 'top-right',
          });
          getPresensiGym();
        })
        .catch(() => {
          $q.notify({
            message: 'Failed to presensi member[!]',
            color: 'negative',
            icon: 'cancel',
            position: 'top-right',
          });
        });
      }
      
      function presensiGym(user) {
        $q.dialog({
          title: 'Confirm',
          message: 'Presensi Member Gym ?',
          cancel: true,
          persistent: true,
          ok: {
            color: 'positive',
            label: 'Presensi'
          }
        }).onOk(() => {
          presensiMember(user.ID_PRESENSI_GYM)
        })
      }
      
      function printStruk(user){
        if(user.WAKTU_PRESENSI_MEMBER_GYM == 'Belum Presensi') {
            $q.notify({
                message: 'Member belum melakukan presensi[!]',
                color: 'negative',
                icon: 'cancel',
                position: 'top-right',
            });
            getPresensiGym();
        } else {
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
                            <title> Struk Presensi Gym </title>
                            <style>
                            .card {
                                width: 500px;
                                height: 350px;
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
                            </style>
                        </head>

                        <body>
                            <div class="card vip">
                                <h2><b>Gofit</b></h2>
                                <p>Jl.Centralpark No. 10 Yogyakarta</p>
                                
                                <p></p>
                                
                                <p><b>STRUK PRESENSI GYM</b></p>
                                <div>
                                    <p><span>No Struk</span> : ${user.ID_PRESENSI_GYM}</p>
                                    <p><span>Tanggal</span> : ${user.WAKTU_PRESENSI_MEMBER_GYM}</p>
                                </div>
                                <p></p>
                                <div>
                                    <p><span>Member</span> : ${user.ID_MEMBER}/ ${user.NAMA_MEMBER}</p>
                                    <p><span>Slot Waktu</span> : ${user.SESI_GYM}</p>
                                </div>
                            </div>
                        </body>
                    </html>
                `
              myWindow.document.write(content);
              myWindow.print()
            })
        }
      }
      
      onMounted(() => {
        getPresensiGym();
        getMembers();
        getJadwals();
      });
      
      return {
        columns,
        rows,
        presensiGym,
        searchString,
        getPresensiGym,
        members,
        getMembers,
        jadwals,
        getJadwals,
        printStruk,
      };
    },
  });
  </script>