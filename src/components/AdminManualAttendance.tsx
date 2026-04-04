import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Users, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function AdminManualAttendance() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const classes = ['XII IPA 1', 'XII IPA 2', 'XII IPS 1', 'XI IPA 1', 'X IPA 1'];

  const [students, setStudents] = useState<any[]>([]);

  const handleStatusChange = (id: number, newStatus: string) => {
    setStudents(students.map(s => s.id === id ? { ...s, status: newStatus } : s));
    toast.success(`Status absensi berhasil diubah menjadi ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Absen Manual</h2>
        <p className="text-gray-500">Pilih kelas atau cari nama untuk melakukan absensi manual.</p>
      </div>

      <div className="relative w-full max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
        <Input 
          type="search" 
          placeholder="Cari nama siswa..." 
          className="pl-8" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {!selectedClass && !searchQuery ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {classes.map((cls) => (
            <Card 
              key={cls} 
              className="cursor-pointer hover:border-indigo-500 hover:shadow-md transition-all"
              onClick={() => setSelectedClass(cls)}
            >
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full mb-3">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg">{cls}</h3>
                <p className="text-sm text-gray-500 mt-1">32 Siswa</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
            <CardTitle>
              {searchQuery ? `Hasil Pencarian: ${searchQuery}` : `Daftar Siswa Kelas ${selectedClass}`}
            </CardTitle>
            <Button variant="outline" size="sm" onClick={() => { setSelectedClass(null); setSearchQuery(''); }}>
              Kembali
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {students.map((student) => (
                <div key={student.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-lg">{student.name}</p>
                    <p className="text-sm text-gray-500">NIS: {student.nis}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant={student.status === 'hadir' ? 'default' : 'outline'} 
                      className={student.status === 'hadir' ? 'bg-emerald-600 hover:bg-emerald-700' : ''} 
                      size="sm"
                      onClick={() => handleStatusChange(student.id, 'hadir')}
                    >
                      Hadir
                    </Button>
                    <Button 
                      variant={student.status === 'terlambat' ? 'default' : 'outline'} 
                      className={student.status === 'terlambat' ? 'bg-amber-500 hover:bg-amber-600' : ''} 
                      size="sm"
                      onClick={() => handleStatusChange(student.id, 'terlambat')}
                    >
                      Terlambat
                    </Button>
                    <Button 
                      variant={student.status === 'izin' ? 'default' : 'outline'} 
                      className={student.status === 'izin' ? 'bg-blue-600 hover:bg-blue-700' : ''} 
                      size="sm"
                      onClick={() => handleStatusChange(student.id, 'izin')}
                    >
                      Izin/Sakit
                    </Button>
                    <Button 
                      variant={student.status === 'alpha' ? 'default' : 'outline'} 
                      className={student.status === 'alpha' ? 'bg-red-600 hover:bg-red-700' : ''} 
                      size="sm"
                      onClick={() => handleStatusChange(student.id, 'alpha')}
                    >
                      Alpha
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
