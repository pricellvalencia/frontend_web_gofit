<template>
    <br>

    <center>
        <q-card>
            <q-card-section>
                <q-item-label
                    style="font-family: 'Courier New', Courier, monospace; font-size: 30px; font-weight: bold;">PRINT
                    LAPORAN</q-item-label>
            </q-card-section>
        </q-card>
    </center>

    <br>

    <div>
        <div class="float-left">
            <tr>
                <th class="text-left" style="width: 15cm">
                    <p style="font-family: 'Courier New', Courier, monospace; font-size: 20px; font-weight: bold;">Print
                        Laporan Pendapatan Tahunan</p>
                </th>
                <th class="text-left" style="width: 5cm">
                    <q-icon name="arrow_forward" />
                </th>
                <td>
                    <q-btn color="negative" icon="print" @click="showPendapatanDialog"></q-btn>
                </td>
            </tr>

            <br>
            <br>

            <tr>
                <th class="text-left" style="width: 15cm">
                    <p style="font-family: 'Courier New', Courier, monospace; font-size: 20px; font-weight: bold;">Print
                        Laporan Aktivitas Kelas</p>
                </th>
                <th class="text-left" style="width: 5cm">
                    <q-icon name="arrow_forward" />
                </th>
                <td>
                    <q-btn color="positive" icon="print" @click="showKelasDialog"></q-btn>
                </td>
            </tr>

            <br>
            <br>

            <tr>
                <th class="text-left" style="width: 15cm">
                    <p style="font-family: 'Courier New', Courier, monospace; font-size: 20px; font-weight: bold;">Print
                        Laporan Aktivitas Gym</p>
                </th>
                <th class="text-left" style="width: 5cm">
                    <q-icon name="arrow_forward" />
                </th>
                <td>
                    <q-btn color="info" icon="print" @click="showGymDialog"></q-btn>
                </td>
            </tr>

            <br>
            <br>

            <tr>
                <th class="text-left" style="width: 15cm">
                    <p style="font-family: 'Courier New', Courier, monospace; font-size: 20px; font-weight: bold;">Print
                        Laporan Kinerja Instruktur</p>
                </th>
                <th class="text-left" style="width: 5cm">
                    <q-icon name="arrow_forward" />
                </th>
                <td>
                    <q-btn color="warning" icon="print" @click="showKinerjaDialog"></q-btn>
                </td>
            </tr>
        </div>
    </div>


    <!-- Dialog input tahun pendapatan -->
    <q-dialog v-model="pendapatanDialog" persistent>
        <q-card style="min-width: 14cm">
            <q-card-section class="q-pb-none">
                <div class="text-h6 text-center">Print Laporan Pendapatan Bulanan</div>
            </q-card-section>

            <q-card-section>
                <q-form @submit.prevent="printPendapatan" @reset="closePendapatan" class="q-gutter-md">
                    <q-input v-model="pendapatanData.tahun.value" label="Masukkan Tahun" outlined lazy-rules></q-input>

                    <div class="row float-right q-mp-t">
                        <q-btn class="q-mb-md q-ml-sm q-mr-md" label="Cancel" type="reset" color="primary" flat></q-btn>

                        <q-btn class="q-mb-md" label="Print" type="submit" color="primary" />
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </q-dialog>

    <!-- Dialog input bulan dan tahun aktivitas kelas -->
    <q-dialog v-model="kelasDialog" persistent>
        <q-card style="min-width: 14cm">
            <q-card-section class="q-pb-none">
                <div class="text-h6 text-center">Print Laporan Aktivitas Kelas</div>
            </q-card-section>

            <q-card-section>
                <q-form @submit.prevent="printKelas" @reset="closeKelas" class="q-gutter-md">
                    <q-input v-model="kelasData.tahun.value" label="Masukkan Tahun" outlined lazy-rules></q-input>

                    <q-input v-model="kelasData.bulan.value" label="Masukkan Bulan" outlined lazy-rules></q-input>

                    <div class="row float-right q-mp-t">
                        <q-btn class="q-mb-md q-ml-sm q-mr-md" label="Cancel" type="reset" color="primary" flat></q-btn>

                        <q-btn class="q-mb-md" label="Print" type="submit" color="primary" />
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </q-dialog>

    <!-- Dialog input bulan dan tahun aktivitas gym -->
    <q-dialog v-model="gymDialog" persistent>
        <q-card style="min-width: 14cm">
            <q-card-section class="q-pb-none">
                <div class="text-h6 text-center">Print Laporan Aktivitas Gym</div>
            </q-card-section>

            <q-card-section>
                <q-form @submit.prevent="printGym" @reset="closeGym" class="q-gutter-md">
                    <q-input v-model="gymData.tahun.value" label="Masukkan Tahun" outlined lazy-rules></q-input>

                    <q-input v-model="gymData.bulan.value" label="Masukkan Bulan" outlined lazy-rules></q-input>

                    <div class="row float-right q-mp-t">
                        <q-btn class="q-mb-md q-ml-sm q-mr-md" label="Cancel" type="reset" color="primary" flat></q-btn>

                        <q-btn class="q-mb-md" label="Print" type="submit" color="primary" />
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </q-dialog>

    <!-- Dialog input bulan dan tahun kinerja instruktur -->
    <q-dialog v-model="kinerjaDialog" persistent>
        <q-card style="min-width: 14cm">
            <q-card-section class="q-pb-none">
                <div class="text-h6 text-center">Print Laporan Kinerja Instruktur</div>
            </q-card-section>

            <q-card-section>
                <q-form @submit.prevent="printKinerja" @reset="closeKinerja" class="q-gutter-md">
                    <q-input v-model="kinerjaData.tahun.value" label="Masukkan Tahun" outlined lazy-rules></q-input>

                    <q-input v-model="kinerjaData.bulan.value" label="Masukkan Bulan" outlined lazy-rules></q-input>

                    <div class="row float-right q-mp-t">
                        <q-btn class="q-mb-md q-ml-sm q-mr-md" label="Cancel" type="reset" color="primary" flat></q-btn>

                        <q-btn class="q-mb-md" label="Print" type="submit" color="primary" />
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>
  
<style scoped>
.float-left {
    margin-top: 50px;
    margin-left: 225px;
}

.float-right {
    margin-right: 25px;
}
</style>
  
    
<script>
import { defineComponent, onMounted, ref } from 'vue';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';


export default defineComponent({
    name: 'LaporanComponent',
    setup() {
        const $q = useQuasar();

        // laporan pendapatan tahunan
        const pendapatanDialog = ref(false);

        const pendapatanData = {
            tahun: ref(''),
        };

        function showPendapatanDialog() {
            pendapatanDialog.value = true;
        }

        function closePendapatan() {
            pendapatanDialog.value = false;
            pendapatanData.tahun.value = '';
        }

        const laporanPendapatan = ref([]);
        async function getLaporanPendapatan() {
            laporanPendapatan.value = []
            return api.post('/api/laporanPendapatan', {
                tahun: pendapatanData.tahun.value,
            },
                { withCredentials: true }
            )
                .then((response) => {
                    laporanPendapatan.value = response.data;
                })
        }

        function printPendapatan() {
            var content = '';

            getLaporanPendapatan().then(() => {
                content = `<!DOCTYPE html>
                    <html>
                    <head>
                        <title>Laporan Pendapatan Bulanan</title>
                        <style>
                            table {
                                border-collapse: collapse;
                                width: 100%;
                            }

                            th, td {
                                border: 1px solid black;
                                padding: 8px;
                            }

                            th {
                                background-color: #f2f2f2;
                            }
                        </style>
                    </head>
                    <body>
                        <p><b>Gofit</b></p>
                        <p>Jl. Centralpark No. 10 Yogyakarta</p>

                        <br>

                        <P><b><u>LAPORAN PENDAPATAN BULANAN</u></b></P>
                        <p>PERIODE: ${laporanPendapatan.value.tahun}</p>
                        <p>Tanggal Cetak: ${laporanPendapatan.value.tanggalCetak}</p>
                        
                        <table>
                            <tr>
                                <th>Bulan</th>
                                <th>Aktivasi</th>
                                <th>Deposit</th>
                                <th>Total</th>
                            </tr>`;

                laporanPendapatan.value.bulan.forEach((data) => {
                    content += `
                                    <tr>
                                        <td>${data.bulan_label}</td>
                                        <td>${data.aktivasi}</td>
                                        <td>${data.deposit}</td>
                                        <td>${data.total_perbulan}</td>
                                    </tr>`;
                });

                content += `
                            <tr>
                                <td colspan="3">Total</td>
                                <td>${laporanPendapatan.value.totalPertahun}</td>
                            </tr>
                        </table>
                    </body>
                    </html>`;

                var myWindow = window.open("", "printWindow", "width=1200,height=700");
                myWindow.document.write(content);
                myWindow.print();
            })
        }

        // laporan aktivitas kelas
        const kelasDialog = ref(false);

        const kelasData = {
            bulan: ref(''),
            tahun: ref(''),
        };

        function showKelasDialog() {
            kelasDialog.value = true;
        }

        function closeKelas() {
            kelasDialog.value = false;
            kelasData.tahun.value = '';
            kelasData.bulan.value = '';
        }

        const laporanKelas = ref([]);
        async function getLaporanKelas() {
            laporanKelas.value = []
            return api.post('/api/laporanKelas', {
                bulan: kelasData.bulan.value,
                tahun: kelasData.tahun.value,
            },
                { withCredentials: true }
            )
                .then((response) => {
                    laporanKelas.value = response.data;
                })
        }

        function printKelas() {
            var content = '';

            getLaporanKelas().then(() => {
                content = `<!DOCTYPE html>
                    <html>
                    <head>
                        <title>Laporan Aktivitas Kelas Bulanan</title>
                        <style>
                            table {
                                border-collapse: collapse;
                                width: 100%;
                            }

                            th, td {
                                border: 1px solid black;
                                padding: 8px;
                            }

                            th {
                                background-color: #f2f2f2;
                            }
                        </style>
                    </head>
                    <body>
                        <p><b>Gofit</b></p>
                        <p>Jl. Centralpark No. 10 Yogyakarta</p>

                        <br>

                        <P><b><u>LAPORAN AKTIVITAS KELAS BULANAN</u></b></P>
                        <p><u>Bulan: ${laporanKelas.value.bulan}<span style="margin-right: 15px;"></span>Tahun: ${laporanKelas.value.tahun}</u></p>
                        <p>Tanggal Cetak: ${laporanKelas.value.tanggalCetak}</p>
                        
                        <table>
                            <tr>
                                <th>Kelas</th>
                                <th>Instruktur</th>
                                <th>Jumlah Peserta</th>
                                <th>Jumlah Libur</th>
                            </tr>`;

                if (laporanKelas.value.dataKelasInstruktur.length === 0) {
                    content += `
                                        <tr>
                                            <td colspan="4">Tidak ada aktivitas kelas pada bulan ${laporanKelas.value.bulan}</td>
                                        </tr>`;
                } else {
                    laporanKelas.value.dataKelasInstruktur.forEach((data) => {
                        content += `
                                        <tr>
                                            <td>${data.NAMA_KELAS}</td>
                                            <td>${data.NAMA_INSTRUKTUR}</td>
                                            <td>${data.jumlah_peserta}</td>
                                            <td>${data.jumlah_libur}</td>
                                        </tr>`;
                    });
                }

                content += `
                        </table>
                    </body>
                    </html>`;

                var myWindow = window.open("", "printWindow", "width=1200,height=700");
                myWindow.document.write(content);
                myWindow.print();
            })
        }

        // laporan aktivitas gym
        const gymDialog = ref(false);

        const gymData = {
            bulan: ref(''),
            tahun: ref(''),
        };

        function showGymDialog() {
            gymDialog.value = true;
        }

        function closeGym() {
            gymDialog.value = false;
            gymData.tahun.value = '';
            gymData.bulan.value = '';
        }

        const laporanGym = ref([]);
        async function getLaporanGym() {
            laporanGym.value = []
            return api.post('/api/laporanGym', {
                bulan: gymData.bulan.value,
                tahun: gymData.tahun.value,
            },
                { withCredentials: true }
            )
                .then((response) => {
                    laporanGym.value = response.data;
                })
        }

        function printGym() {
            var content = '';

            getLaporanGym().then(() => {
                content = `<!DOCTYPE html>
                    <html>
                    <head>
                        <title>Laporan Aktivitas Gym Bulanan</title>
                        <style>
                            table {
                                border-collapse: collapse;
                                width: 100%;
                            }

                            th, td {
                                border: 1px solid black;
                                padding: 8px;
                            }

                            th {
                                background-color: #f2f2f2;
                            }
                        </style>
                    </head>
                    <body>
                        <p><b>Gofit</b></p>
                        <p>Jl. Centralpark No. 10 Yogyakarta</p>

                        <br>

                        <P><b><u>LAPORAN AKTIVITAS GYM BULANAN</u></b></P>
                        <p><u>Bulan: ${laporanGym.value.bulan}<span style="margin-right: 15px;"></span>Tahun: ${laporanGym.value.tahun}</u></p>
                        <p>Tanggal Cetak: ${laporanGym.value.tanggalCetak}</p>
                        
                        <table>
                            <tr>
                                <th>Tanggal</th>
                                <th>Jumlah Member</th>
                            </tr>`;

                laporanGym.value.dataGym.forEach((data) => {
                    content += `
                            <tr>
                                <td>${data.tanggal}</td>
                                <td>${data.jumlahPeserta}</td>
                            </tr>`;
                });

                content += `
                        </table>
                    </body>
                    </html>`;

                var myWindow = window.open("", "printWindow", "width=1200,height=700");
                myWindow.document.write(content);
                myWindow.print();
            })
        }

        // laporan kinerja instruktur
        const kinerjaDialog = ref(false);

        const kinerjaData = {
            bulan: ref(''),
            tahun: ref(''),
        }

        function showKinerjaDialog() {
            kinerjaDialog.value = true;
        }

        function closeKinerja() {
            kinerjaDialog.value = false;
            kinerjaData.bulan.value = '';
            kinerjaData.tahun.value = '';
        }

        const laporanKinerja = ref([]);
        async function getLaporanKinerja() {
            laporanKinerja.value = []
            return api.post('/api/laporanKinerja', {
                bulan: kinerjaData.bulan.value,
                tahun: kinerjaData.tahun.value,
            },
                { withCredentials: true }
            )
                .then((response) => {
                    laporanKinerja.value = response.data;
                })
        }

        function printKinerja() {
            var content = '';

            getLaporanKinerja().then(() => {
                content = `<!DOCTYPE html>
                    <html>
                    <head>
                        <title>Laporan Kinerja Instruktur</title>
                        <style>
                            table {
                                border-collapse: collapse;
                                width: 100%;
                            }

                            th, td {
                                border: 1px solid black;
                                padding: 8px;
                            }

                            th {
                                background-color: #f2f2f2;
                            }
                        </style>
                    </head>
                    <body>
                        <p><b>Gofit</b></p>
                        <p>Jl. Centralpark No. 10 Yogyakarta</p>

                        <br>

                        <P><b><u>LAPORAN KINERJA INSTRUKTUR BULANAN</u></b></P>
                        <p><u>Bulan: ${laporanKinerja.value.bulan}<span style="margin-right: 15px;"></span>Tahun: ${laporanKinerja.value.tahun}</u></p>
                        <p>Tanggal Cetak: ${laporanKinerja.value.tanggalCetak}</p>
                        
                        <table>
                            <tr>
                                <th>Nama</th>
                                <th>Jumlah Hadir</th>
                                <th>Jumlah Libur</th>
                                <th>Waktu Terlambat (detik)</th>
                            </tr>`;

                laporanKinerja.value.dataKinerja.forEach((data) => {
                    content += `
                            <tr>
                                <td>${data.NAMA_INSTRUKTUR}</td>
                                <td>${data.JUMLAH_HADIR}</td>
                                <td>${data.JUMLAH_LIBUR}</td>
                                <td>${data.KETERLAMBATAN}</td>
                            </tr>`;
                });

                content += `
                        </table>
                    </body>
                    </html>`;

                var myWindow = window.open("", "printWindow", "width=1200,height=700");
                myWindow.document.write(content);
                myWindow.print();
            })
        }

        onMounted(() => {
            getLaporanPendapatan();
            getLaporanKelas();
            getLaporanGym();
            getLaporanKinerja();
        });

        return {
            //laporan pendapatan
            pendapatanDialog,
            pendapatanData,
            showPendapatanDialog,
            closePendapatan,
            laporanPendapatan,
            getLaporanPendapatan,
            printPendapatan,
            //laporan kelas
            kelasDialog,
            kelasData,
            showKelasDialog,
            closeKelas,
            laporanKelas,
            getLaporanKelas,
            printKelas,
            //laporan gym
            gymDialog,
            gymData,
            showGymDialog,
            closeGym,
            laporanGym,
            getLaporanGym,
            printGym,
            //laporan kineerja instruktur
            kinerjaDialog,
            kinerjaData,
            showKinerjaDialog,
            closeKinerja,
            laporanKinerja,
            getLaporanKinerja,
            printKinerja,
        };
    },
});
</script>