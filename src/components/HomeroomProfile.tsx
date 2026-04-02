import React from 'react';
import QRCode from 'react-qr-code';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function HomeroomProfile() {
  const teacher = {
    name: 'Dra. Ratna Sari',
    nip: '197508172000032002',
    subject: 'Biologi',
    homeroomClass: 'XII IPA 1',
    email: 'ratna.sari@sekolah.sch.id',
    phone: '081345678901',
    address: 'Jl. Melati No. 12, Jakarta',
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Profil Pribadi</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 flex flex-col items-center p-6 text-center">
          <Avatar className="w-32 h-32 mb-4">
            <AvatarImage src="https://i.pravatar.cc/150?u=ratna" alt={teacher.name} />
            <AvatarFallback>RS</AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-semibold">{teacher.name}</h3>
          <p className="text-gray-500 mb-2">{teacher.nip}</p>
          <div className="flex flex-col gap-2 mb-6 items-center">
            <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">Guru {teacher.subject}</Badge>
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Wali Kelas {teacher.homeroomClass}</Badge>
          </div>
          
          <div className="w-full bg-white p-4 rounded-xl border flex justify-center">
            <QRCode value={teacher.nip} size={120} />
          </div>
          <p className="text-xs text-gray-400 mt-2">Scan QR Code ini untuk absensi guru</p>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Informasi Detail</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Nama Lengkap</p>
                <p className="text-base">{teacher.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">NIP</p>
                <p className="text-base">{teacher.nip}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Mata Pelajaran</p>
                <p className="text-base">{teacher.subject}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Kelas Perwalian</p>
                <p className="text-base font-semibold text-emerald-600">{teacher.homeroomClass}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-base">{teacher.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">No. Telepon</p>
                <p className="text-base">{teacher.phone}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm font-medium text-gray-500">Alamat</p>
                <p className="text-base">{teacher.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
