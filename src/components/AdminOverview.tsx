import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Users, UserCheck, Clock, LogOut, FileText, XCircle, HelpCircle, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function AdminOverview() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Mock Data
  const stats = {
    totalSiswa: 850,
    totalGuru: 65,
  };

  const attendanceData = [
    { id: 'hadir', label: 'Hadir', count: 700, icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-100', border: 'border-emerald-200' },
    { id: 'terlambat', label: 'Terlambat', count: 45, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-200' },
    { id: 'pulang', label: 'Sudah Pulang', count: 120, icon: LogOut, color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-200' },
    { id: 'izin', label: 'Izin/Sakit', count: 25, icon: FileText, color: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-200' },
    { id: 'alpha', label: 'Alpha', count: 10, icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', border: 'border-red-200' },
    { id: 'belum', label: 'Belum Scan', count: 115, icon: HelpCircle, color: 'text-gray-600', bg: 'bg-gray-100', border: 'border-gray-200' },
  ];

  const mockUsers = [
    { id: 1, name: 'Budi Santoso', role: 'Siswa', class: 'XII IPA 1', status: 'hadir', timeIn: '06:45', timeOut: '-' },
    { id: 2, name: 'Siti Aminah', role: 'Siswa', class: 'XII IPA 1', status: 'terlambat', timeIn: '07:15', timeOut: '-' },
    { id: 3, name: 'Ahmad Hidayat', role: 'Guru', class: '-', status: 'hadir', timeIn: '06:30', timeOut: '-' },
    { id: 4, name: 'Dewi Lestari', role: 'Siswa', class: 'XII IPS 2', status: 'izin', timeIn: '-', timeOut: '-' },
    { id: 5, name: 'Reza Rahadian', role: 'Siswa', class: 'XI IPA 3', status: 'alpha', timeIn: '-', timeOut: '-' },
    { id: 6, name: 'Joko Widodo', role: 'Siswa', class: 'X IPS 1', status: 'belum', timeIn: '-', timeOut: '-' },
    { id: 7, name: 'Megawati', role: 'Guru', class: '-', status: 'pulang', timeIn: '06:20', timeOut: '15:00' },
  ];

  const filteredUsers = mockUsers.filter(user => 
    (selectedStatus ? user.status === selectedStatus : true) &&
    (user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.role.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Overview Hari Ini</h2>
          <p className="text-gray-500">Ringkasan kehadiran seluruh siswa dan guru.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            type="search" 
            placeholder="Cari siswa atau guru..." 
            className="pl-8" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-indigo-100 font-medium mb-1">Total Siswa</p>
              <p className="text-4xl font-bold">{stats.totalSiswa}</p>
            </div>
            <div className="p-4 bg-white/20 rounded-full">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-teal-100 font-medium mb-1">Total Guru</p>
              <p className="text-4xl font-bold">{stats.totalGuru}</p>
            </div>
            <div className="p-4 bg-white/20 rounded-full">
              <Users className="w-8 h-8 text-white" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {attendanceData.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedStatus === item.id;
          return (
            <Card 
              key={item.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${isSelected ? `ring-2 ring-offset-2 ring-${item.color.split('-')[1]}-500 ${item.bg}` : ''}`}
              onClick={() => setSelectedStatus(isSelected ? null : item.id)}
            >
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <div className={`p-3 rounded-full ${item.bg} ${item.color} mb-3`}>
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{item.count}</p>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mt-1">{item.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detail Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {selectedStatus 
              ? `Detail: ${attendanceData.find(a => a.id === selectedStatus)?.label}` 
              : 'Semua Data Kehadiran'}
          </CardTitle>
          {selectedStatus && (
            <Badge variant="outline" className="cursor-pointer" onClick={() => setSelectedStatus(null)}>
              Clear Filter <XCircle className="w-3 h-3 ml-1" />
            </Badge>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Peran</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Jam Datang</TableHead>
                <TableHead>Jam Pulang</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.class}</TableCell>
                    <TableCell>{user.timeIn}</TableCell>
                    <TableCell>{user.timeOut}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        user.status === 'hadir' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        user.status === 'terlambat' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        user.status === 'pulang' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        user.status === 'izin' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        user.status === 'alpha' ? 'bg-red-50 text-red-700 border-red-200' :
                        'bg-gray-50 text-gray-700 border-gray-200'
                      }>
                        {attendanceData.find(a => a.id === user.status)?.label || user.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Tidak ada data yang sesuai dengan filter/pencarian.
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
