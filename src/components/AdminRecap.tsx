import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, Filter } from 'lucide-react';

export default function AdminRecap() {
  const [selectedPeriod, setSelectedPeriod] = useState('2026-04');
  const [selectedGroup, setSelectedGroup] = useState('Semua');

  // Mock data rekap
  const recapData = [
    { id: 1, name: 'Budi Santoso', identifier: '123456789', role: 'Siswa', group: 'XII IPA 1', hadir: 18, terlambat: 2, sakit: 0, izin: 0, alpa: 0 },
    { id: 2, name: 'Siti Aminah', identifier: '123456790', role: 'Siswa', group: 'XII IPA 1', hadir: 20, terlambat: 0, sakit: 0, izin: 0, alpa: 0 },
    { id: 3, name: 'Andi Wijaya', identifier: '123456791', role: 'Siswa', group: 'XII IPA 2', hadir: 17, terlambat: 1, sakit: 1, izin: 1, alpa: 0 },
    { id: 4, name: 'Ahmad Hidayat, S.Pd', identifier: '198001012005011001', role: 'Guru', group: 'Guru', hadir: 21, terlambat: 0, sakit: 0, izin: 0, alpa: 0 },
    { id: 5, name: 'Dra. Ratna Sari', identifier: '197508172000032002', role: 'Guru', group: 'Guru', hadir: 20, terlambat: 0, sakit: 1, izin: 0, alpa: 0 },
  ];

  const filteredData = recapData.filter(item => 
    selectedGroup === 'Semua' ? true : item.group === selectedGroup
  );

  const handleExportCSV = () => {
    const headers = ['No', 'Nama', 'NIS/NIP', 'Peran', 'Kelas/Grup', 'Hadir', 'Terlambat', 'Sakit', 'Izin', 'Alpa'];
    const rows = filteredData.map((item, index) => [
      index + 1,
      item.name,
      item.identifier,
      item.role,
      item.group,
      item.hadir,
      item.terlambat,
      item.sakit,
      item.izin,
      item.alpa
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Rekap_Absensi_${selectedGroup}_${selectedPeriod}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Rekap Absensi</h2>
          <p className="text-gray-500">Lihat dan unduh rekapitulasi kehadiran seluruh user.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="flex h-10 w-full sm:w-[150px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="2026-04">April 2026</option>
            <option value="2026-03">Maret 2026</option>
            <option value="2026-02">Februari 2026</option>
          </select>
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="flex h-10 w-full sm:w-[150px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="Semua">Semua User</option>
            <option value="Guru">Guru</option>
            <option value="XII IPA 1">XII IPA 1</option>
            <option value="XII IPA 2">XII IPA 2</option>
          </select>
          <Button onClick={handleExportCSV} className="w-full sm:w-auto flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Data Rekapitulasi</CardTitle>
          <CardDescription>Periode: {selectedPeriod} | Filter: {selectedGroup}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>NIS/NIP</TableHead>
                <TableHead>Grup</TableHead>
                <TableHead className="text-center">Hadir</TableHead>
                <TableHead className="text-center">Terlambat</TableHead>
                <TableHead className="text-center">Sakit</TableHead>
                <TableHead className="text-center">Izin</TableHead>
                <TableHead className="text-center">Alpa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-gray-500">{item.identifier}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.role === 'Guru' ? 'bg-indigo-50 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}>
                        {item.group}
                      </span>
                    </TableCell>
                    <TableCell className="text-center font-medium text-emerald-600">{item.hadir}</TableCell>
                    <TableCell className="text-center font-medium text-amber-600">{item.terlambat}</TableCell>
                    <TableCell className="text-center font-medium text-blue-600">{item.sakit}</TableCell>
                    <TableCell className="text-center font-medium text-blue-600">{item.izin}</TableCell>
                    <TableCell className="text-center font-medium text-red-600">{item.alpa}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-6 text-gray-500">
                    Tidak ada data rekap untuk filter ini.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
