import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

export default function HomeroomHistory() {
  const history = [
    { id: 1, date: '2026-04-02', timeIn: '06:10', timeOut: '15:35', status: 'Hadir' },
    { id: 2, date: '2026-04-01', timeIn: '06:15', timeOut: '15:40', status: 'Hadir' },
    { id: 3, date: '2026-03-31', timeIn: '06:05', timeOut: '15:30', status: 'Hadir' },
    { id: 4, date: '2026-03-30', timeIn: '06:12', timeOut: '15:30', status: 'Hadir' },
    { id: 5, date: '2026-03-29', timeIn: '-', timeOut: '-', status: 'Izin' },
  ];

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
      <h2 className="text-2xl font-bold tracking-tight">Riwayat Absensi Anda</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Hadir</p>
              <p className="text-2xl font-bold">21</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-full">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Terlambat</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Sakit/Izin</p>
              <p className="text-2xl font-bold">1</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center space-x-4">
            <div className="p-3 bg-red-100 text-red-600 rounded-full">
              <XCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Alpa</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detail Riwayat Kehadiran</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Jam Masuk</TableHead>
                <TableHead>Jam Keluar</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.date}</TableCell>
                  <TableCell>{record.timeIn}</TableCell>
                  <TableCell>{record.timeOut}</TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
