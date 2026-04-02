import React from 'react';
import QRCode from 'react-qr-code';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function StudentProfile() {
  const student = {
    name: 'Budi Santoso',
    nis: '123456789',
    class: 'XII IPA 1',
    email: 'budi.santoso@example.com',
    phone: '081234567890',
    address: 'Jl. Merdeka No. 10, Jakarta',
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Profil Pribadi</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 flex flex-col items-center p-6 text-center">
          <Avatar className="w-32 h-32 mb-4">
            <AvatarImage src="https://i.pravatar.cc/150?u=budi" alt={student.name} />
            <AvatarFallback>BS</AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-semibold">{student.name}</h3>
          <p className="text-gray-500 mb-2">{student.nis}</p>
          <Badge variant="secondary" className="mb-6">{student.class}</Badge>
          
          <div className="w-full bg-white p-4 rounded-xl border flex justify-center">
            <QRCode value={student.nis} size={120} />
          </div>
          <p className="text-xs text-gray-400 mt-2">Scan QR Code ini untuk absensi</p>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Informasi Detail</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Nama Lengkap</p>
                <p className="text-base">{student.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">NIS/NISN</p>
                <p className="text-base">{student.nis}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Kelas</p>
                <p className="text-base">{student.class}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-base">{student.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">No. Telepon</p>
                <p className="text-base">{student.phone}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm font-medium text-gray-500">Alamat</p>
                <p className="text-base">{student.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
