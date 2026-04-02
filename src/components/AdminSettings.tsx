import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Save, Upload, KeyRound, Database, MessageSquare, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettings() {
  const [schedules, setSchedules] = React.useState([
    { day: 'Senin', active: true, scanInStart: '06:00', scanInEnd: '07:30', lateTime: '07:00', alphaTime: '08:00', scanOutStart: '15:00', scanOutEnd: '16:30' },
    { day: 'Selasa', active: true, scanInStart: '06:00', scanInEnd: '07:30', lateTime: '07:00', alphaTime: '08:00', scanOutStart: '15:00', scanOutEnd: '16:30' },
    { day: 'Rabu', active: true, scanInStart: '06:00', scanInEnd: '07:30', lateTime: '07:00', alphaTime: '08:00', scanOutStart: '15:00', scanOutEnd: '16:30' },
    { day: 'Kamis', active: true, scanInStart: '06:00', scanInEnd: '07:30', lateTime: '07:00', alphaTime: '08:00', scanOutStart: '15:00', scanOutEnd: '16:30' },
    { day: 'Jumat', active: true, scanInStart: '06:00', scanInEnd: '07:30', lateTime: '07:00', alphaTime: '08:00', scanOutStart: '15:00', scanOutEnd: '16:30' },
    { day: 'Sabtu', active: false, scanInStart: '06:00', scanInEnd: '07:30', lateTime: '07:00', alphaTime: '08:00', scanOutStart: '15:00', scanOutEnd: '16:30' },
    { day: 'Minggu', active: false, scanInStart: '06:00', scanInEnd: '07:30', lateTime: '07:00', alphaTime: '08:00', scanOutStart: '15:00', scanOutEnd: '16:30' },
  ]);

  const [specialHolidays, setSpecialHolidays] = useState<{date: string, description: string}[]>([]);
  const [newHolidayDate, setNewHolidayDate] = useState('');
  const [newHolidayDesc, setNewHolidayDesc] = useState('');

  const updateSchedule = (index: number, field: string, value: string | boolean) => {
    const newSchedules = [...schedules];
    newSchedules[index] = { ...newSchedules[index], [field]: value };
    setSchedules(newSchedules);
  };

  const handleSave = (section: string) => {
    toast.success(`Pengaturan ${section} berhasil disimpan`);
  };

  const handleTestConnection = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Menguji koneksi ke Google API...',
        success: 'Koneksi berhasil! API Key valid.',
        error: 'Gagal terhubung ke Google API.',
      }
    );
  };

  const handleAddHoliday = () => {
    if (!newHolidayDate || !newHolidayDesc) {
      toast.error('Tanggal dan keterangan harus diisi');
      return;
    }
    setSpecialHolidays([...specialHolidays, { date: newHolidayDate, description: newHolidayDesc }]);
    setNewHolidayDate('');
    setNewHolidayDesc('');
    toast.success('Hari libur khusus ditambahkan');
  };

  const handleRemoveHoliday = (index: number) => {
    setSpecialHolidays(specialHolidays.filter((_, i) => i !== index));
    toast.success('Hari libur khusus dihapus');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Setelan Sistem</h2>
        <p className="text-gray-500">Konfigurasi aplikasi, integrasi, dan keamanan.</p>
      </div>

      <Tabs defaultValue="tampilan" className="w-full">
        <TabsList className="mb-6 flex flex-wrap h-auto gap-2">
          <TabsTrigger value="tampilan">Tampilan</TabsTrigger>
          <TabsTrigger value="jadwal">Jadwal Scan</TabsTrigger>
          <TabsTrigger value="integrasi">Integrasi Google</TabsTrigger>
          <TabsTrigger value="notifikasi">Notifikasi WA</TabsTrigger>
          <TabsTrigger value="keamanan">Keamanan</TabsTrigger>
        </TabsList>

        {/* Tab Tampilan */}
        <TabsContent value="tampilan" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Identitas Sistem</CardTitle>
              <CardDescription>Atur nama sekolah dan nama aplikasi.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Nama Sekolah</Label>
                <Input type="text" placeholder="Masukkan Nama Sekolah" defaultValue="SMA Negeri 1 Contoh" />
              </div>
              <div className="space-y-2">
                <Label>Nama Aplikasi</Label>
                <Input type="text" placeholder="Masukkan Nama Aplikasi" defaultValue="HadirAI" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Logo Sekolah</CardTitle>
              <CardDescription>Ubah logo yang ditampilkan di aplikasi.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <span className="text-gray-400 text-xs">Preview</span>
                </div>
                <div className="space-y-2">
                  <Input type="file" accept="image/*" />
                  <p className="text-xs text-gray-500">Format: PNG, JPG, SVG. Maksimal 2MB.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Hari Libur</CardTitle>
              <CardDescription>Atur hari libur reguler dan khusus.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Hari Libur Reguler (Otomatis tidak ada absensi)</Label>
                <div className="flex flex-wrap gap-4">
                  {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map((hari) => (
                    <label key={hari} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked={hari === 'Sabtu' || hari === 'Minggu'} />
                      <span className="text-sm">{hari}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label>Hari Libur Khusus (Manual)</Label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input type="date" value={newHolidayDate} onChange={(e) => setNewHolidayDate(e.target.value)} />
                  <Input type="text" placeholder="Keterangan (misal: Rapat Guru)" value={newHolidayDesc} onChange={(e) => setNewHolidayDesc(e.target.value)} />
                  <Button variant="secondary" onClick={handleAddHoliday}>Tambah</Button>
                </div>
                
                {specialHolidays.length > 0 && (
                  <div className="mt-4 border rounded-md divide-y">
                    {specialHolidays.map((holiday, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 text-sm">
                        <div>
                          <span className="font-medium">{holiday.date}</span>
                          <span className="text-gray-500 ml-2">- {holiday.description}</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleRemoveHoliday(idx)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button className="flex items-center gap-2" onClick={() => handleSave('Tampilan')}><Save className="w-4 h-4" /> Simpan Perubahan</Button>
          </div>
        </TabsContent>

        {/* Tab Jadwal Scan */}
        <TabsContent value="jadwal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Jadwal Scanner Per Hari</CardTitle>
              <CardDescription>Atur jam operasional scanner otomatis (datang dan pulang) serta batas keterlambatan.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {schedules.map((schedule, index) => (
                  <div key={schedule.day} className="flex flex-col p-4 border rounded-lg bg-gray-50 space-y-4">
                    <div className="flex items-center gap-4">
                      <Switch 
                        checked={schedule.active} 
                        onCheckedChange={(checked) => updateSchedule(index, 'active', checked)}
                      />
                      <Label className="font-bold text-base">{schedule.day}</Label>
                    </div>
                    {schedule.active && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pl-0 md:pl-14">
                        <div className="space-y-2">
                          <Label className="text-xs text-gray-500 font-semibold uppercase">Scan Datang</Label>
                          <div className="flex items-center gap-2">
                            <Input 
                              type="time" 
                              value={schedule.scanInStart} 
                              onChange={(e) => updateSchedule(index, 'scanInStart', e.target.value)}
                              className="w-24"
                            />
                            <span className="text-gray-400">-</span>
                            <Input 
                              type="time" 
                              value={schedule.scanInEnd} 
                              onChange={(e) => updateSchedule(index, 'scanInEnd', e.target.value)}
                              className="w-24"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs text-gray-500 font-semibold uppercase">Batas Terlambat</Label>
                          <Input 
                            type="time" 
                            value={schedule.lateTime} 
                            onChange={(e) => updateSchedule(index, 'lateTime', e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs text-gray-500 font-semibold uppercase">Batas Alpa</Label>
                          <Input 
                            type="time" 
                            value={schedule.alphaTime} 
                            onChange={(e) => updateSchedule(index, 'alphaTime', e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs text-gray-500 font-semibold uppercase">Scan Pulang</Label>
                          <div className="flex items-center gap-2">
                            <Input 
                              type="time" 
                              value={schedule.scanOutStart} 
                              onChange={(e) => updateSchedule(index, 'scanOutStart', e.target.value)}
                              className="w-24"
                            />
                            <span className="text-gray-400">-</span>
                            <Input 
                              type="time" 
                              value={schedule.scanOutEnd} 
                              onChange={(e) => updateSchedule(index, 'scanOutEnd', e.target.value)}
                              className="w-24"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button className="flex items-center gap-2" onClick={() => handleSave('Jadwal')}><Save className="w-4 h-4" /> Simpan Jadwal</Button>
          </div>
        </TabsContent>

        {/* Tab Integrasi Google */}
        <TabsContent value="integrasi" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Database className="w-5 h-5" /> Google Sheets & Drive</CardTitle>
              <CardDescription>Konfigurasi penyimpanan data eksternal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Google Sheet ID (Untuk Database/Import)</Label>
                <Input placeholder="Masukkan ID Spreadsheet..." defaultValue="1BxiMVs0XRYFgwnLEkp..." />
                <p className="text-xs text-gray-500">ID dapat ditemukan pada URL Google Sheet Anda.</p>
              </div>
              <div className="space-y-2">
                <Label>Google Drive Folder ID (Untuk Foto Izin)</Label>
                <Input placeholder="Masukkan ID Folder Drive..." defaultValue="0BwwA4oUTwgctYm..." />
              </div>
              <div className="pt-4">
                <Button variant="outline" className="w-full sm:w-auto" onClick={handleTestConnection}>Test Koneksi Google API</Button>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button className="flex items-center gap-2" onClick={() => handleSave('Integrasi')}><Save className="w-4 h-4" /> Simpan Integrasi</Button>
          </div>
        </TabsContent>

        {/* Tab Notifikasi WA */}
        <TabsContent value="notifikasi" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MessageSquare className="w-5 h-5" /> Pengaturan Fonnte (WhatsApp)</CardTitle>
              <CardDescription>Kirim notifikasi absensi ke orang tua via WhatsApp.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base">Aktifkan Notifikasi WA</Label>
                  <p className="text-sm text-gray-500">Kirim pesan otomatis saat siswa absen atau terlambat.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Fonnte API Token</Label>
                <Input type="password" placeholder="Masukkan Token API Fonnte..." defaultValue="token_rahasia_123" />
              </div>
              <div className="space-y-2">
                <Label>Template Pesan Datang (Hadir)</Label>
                <textarea 
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="Yth. Orang Tua dari {nama_siswa}, kami menginformasikan bahwa ananda telah tiba di sekolah pada pukul {waktu_scan}."
                />
              </div>
              <div className="space-y-2">
                <Label>Template Pesan Pulang</Label>
                <textarea 
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="Yth. Orang Tua dari {nama_siswa}, kami menginformasikan bahwa ananda telah pulang dari sekolah pada pukul {waktu_scan}."
                />
              </div>
              <div className="space-y-2">
                <Label>Template Pesan Alpa (Tidak Hadir)</Label>
                <textarea 
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="Yth. Orang Tua dari {nama_siswa}, kami menginformasikan bahwa hingga batas waktu yang ditentukan, ananda tercatat TIDAK HADIR (Alpa) di sekolah hari ini."
                />
                <p className="text-xs text-gray-500">Pesan ini akan dikirim otomatis pada Jam Batas Alpa jika siswa belum melakukan scan datang dan tidak ada izin.</p>
              </div>
              <div className="space-y-2">
                <Label>Template Pesan Izin (Ke Wali Kelas)</Label>
                <textarea 
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue="Pemberitahuan: Siswa {nama_siswa} mengajukan izin ({jenis_izin}) pada tanggal {tanggal}. Alasan: {alasan}."
                />
                <p className="text-xs text-gray-500">Gunakan tag: {'{nama_siswa}'}, {'{waktu_scan}'}, {'{jenis_izin}'}, {'{tanggal}'}, {'{alasan}'}</p>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button className="flex items-center gap-2" onClick={() => handleSave('Notifikasi WA')}><Save className="w-4 h-4" /> Simpan Pengaturan WA</Button>
          </div>
        </TabsContent>

        {/* Tab Keamanan */}
        <TabsContent value="keamanan" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><KeyRound className="w-5 h-5" /> Ubah Password Admin</CardTitle>
              <CardDescription>Perbarui kata sandi untuk akun administrator.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Password Saat Ini</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>Password Baru</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>Konfirmasi Password Baru</Label>
                <Input type="password" />
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button className="flex items-center gap-2" onClick={() => toast.success('Password berhasil diupdate')}><Save className="w-4 h-4" /> Update Password</Button>
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}
