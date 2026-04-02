import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function TeacherMonitor() {
  const [selectedClass, setSelectedClass] = useState('XII IPA 1');

  const allStudents = [
    { id: 1, name: 'Budi Santoso', nis: '123456789', class: 'XII IPA 1', status: 'Hadir', time: '06:45', avatar: 'BS' },
    { id: 2, name: 'Siti Aminah', nis: '123456790', class: 'XII IPA 1', status: 'Hadir', time: '06:50', avatar: 'SA' },
    { id: 3, name: 'Andi Wijaya', nis: '123456791', class: 'XII IPA 1', status: 'Terlambat', time: '07:15', avatar: 'AW' },
    { id: 4, name: 'Dewi Lestari', nis: '123456792', class: 'XII IPA 1', status: 'Sakit', time: '-', avatar: 'DL' },
    { id: 5, name: 'Reza Rahadian', nis: '123456793', class: 'XII IPA 1', status: 'Alpa', time: '-', avatar: 'RR' },
    { id: 6, name: 'Ahmad Fauzi', nis: '123456794', class: 'XII IPA 2', status: 'Hadir', time: '06:55', avatar: 'AF' },
    { id: 7, name: 'Nisa Sabyan', nis: '123456795', class: 'XII IPA 2', status: 'Hadir', time: '06:58', avatar: 'NS' },
    { id: 8, name: 'Kevin Sanjaya', nis: '123456796', class: 'XII IPS 1', status: 'Terlambat', time: '07:20', avatar: 'KS' },
  ];

  const filteredStudents = allStudents.filter(s => s.class === selectedClass);

  const totalStudents = filteredStudents.length;
  const hadirCount = filteredStudents.filter(s => s.status === 'Hadir').length;
  const terlambatCount = filteredStudents.filter(s => s.status === 'Terlambat').length;
  const tidakHadirCount = filteredStudents.filter(s => ['Sakit', 'Izin', 'Alpa'].includes(s.status)).length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Hadir':
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100"><CheckCircle2 className="w-3 h-3 mr-1" /> Hadir</Badge>;
      case 'Terlambat':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100"><Clock className="w-3 h-3 mr-1" /> Terlambat</Badge>;
      case 'Sakit':
      case 'Izin':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100"><Clock className="w-3 h-3 mr-1" /> {status}</Badge>;
      case 'Alpa':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100"><XCircle className="w-3 h-3 mr-1" /> Alpa</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Monitor Siswa</h2>
          <p className="text-gray-500">Pantau kehadiran siswa di kelas Anda hari ini.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="flex h-10 w-full sm:w-[150px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="XII IPA 1">XII IPA 1</option>
            <option value="XII IPA 2">XII IPA 2</option>
            <option value="XII IPS 1">XII IPS 1</option>
          </select>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="Cari siswa..." className="pl-8" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <p className="text-sm text-gray-500 font-medium mb-1">Total Siswa</p>
            <p className="text-3xl font-bold text-gray-900">{totalStudents}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <p className="text-sm text-emerald-600 font-medium mb-1">Hadir</p>
            <p className="text-3xl font-bold text-emerald-700">{hadirCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <p className="text-sm text-amber-600 font-medium mb-1">Terlambat</p>
            <p className="text-3xl font-bold text-amber-700">{terlambatCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <p className="text-sm text-red-600 font-medium mb-1">Tidak Hadir</p>
            <p className="text-3xl font-bold text-red-700">{tidakHadirCount}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Kehadiran Kelas {selectedClass}</CardTitle>
          <CardDescription>Update terakhir: Hari ini, 07:30 WIB</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Siswa</TableHead>
                <TableHead>NIS</TableHead>
                <TableHead>Waktu</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs">{student.avatar}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{student.name}</span>
                    </TableCell>
                    <TableCell className="text-gray-500">{student.nis}</TableCell>
                    <TableCell>{student.time}</TableCell>
                    <TableCell>{getStatusBadge(student.status)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                    Tidak ada data siswa untuk kelas ini.
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
