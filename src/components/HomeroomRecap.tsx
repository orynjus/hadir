import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export default function HomeroomRecap() {
  const homeroomClass = 'XII IPA 1';
  const [selectedClass, setSelectedClass] = useState(homeroomClass);
  const [selectedMonth, setSelectedMonth] = useState('2026-04');

  // Mock data rekap
  const recapData: any[] = [];

  const filteredData = recapData.filter(s => s.class === selectedClass);

  const handleExportCSV = () => {
    // Header CSV
    const headers = ['No', 'Nama Siswa', 'NIS', 'Hadir', 'Terlambat', 'Sakit', 'Izin', 'Alpa'];
    
    // Rows CSV
    const rows = filteredData.map((student, index) => [
      index + 1,
      student.name,
      student.nis,
      student.hadir,
      student.terlambat,
      student.sakit,
      student.izin,
      student.alpa
    ]);

    // Gabungkan Header dan Rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Buat Blob dan Link untuk download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Rekap_Absensi_${selectedClass}_${selectedMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Rekap Absensi Siswa</h2>
          <p className="text-gray-500">Lihat dan unduh rekapitulasi kehadiran siswa.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="flex h-10 w-full sm:w-[150px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="2026-04">April 2026</option>
            <option value="2026-03">Maret 2026</option>
            <option value="2026-02">Februari 2026</option>
          </select>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="flex h-10 w-full sm:w-[180px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="XII IPA 1">XII IPA 1 (Kelas Anda)</option>
            <option value="XII IPA 2">XII IPA 2</option>
            <option value="XII IPS 1">XII IPS 1</option>
          </select>
          <Button onClick={handleExportCSV} className="w-full sm:w-auto flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rekapitulasi Kelas {selectedClass}</CardTitle>
          <CardDescription>Periode: {selectedMonth}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Nama Siswa</TableHead>
                <TableHead>NIS</TableHead>
                <TableHead className="text-center">Hadir</TableHead>
                <TableHead className="text-center">Terlambat</TableHead>
                <TableHead className="text-center">Sakit</TableHead>
                <TableHead className="text-center">Izin</TableHead>
                <TableHead className="text-center">Alpa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((student, index) => (
                  <TableRow key={student.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell className="text-gray-500">{student.nis}</TableCell>
                    <TableCell className="text-center font-medium text-emerald-600">{student.hadir}</TableCell>
                    <TableCell className="text-center font-medium text-amber-600">{student.terlambat}</TableCell>
                    <TableCell className="text-center font-medium text-blue-600">{student.sakit}</TableCell>
                    <TableCell className="text-center font-medium text-blue-600">{student.izin}</TableCell>
                    <TableCell className="text-center font-medium text-red-600">{student.alpa}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                    Tidak ada data rekap untuk kelas ini.
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
