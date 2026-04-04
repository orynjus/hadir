import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Printer, Filter } from 'lucide-react';
import QRCode from 'react-qr-code';

export default function AdminPrintQR() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('Semua Kelas');

  const users: any[] = [];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.identifier.includes(searchQuery)
  );

  const massPrintUsers = selectedClass === 'Semua Kelas' 
    ? users 
    : users.filter(user => user.class === selectedClass);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Cetak QR Code</h2>
          <p className="text-gray-500">Cetak QR Code untuk siswa dan guru.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="individual" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="individual">Cetak Per User</TabsTrigger>
              <TabsTrigger value="massal">Cetak Massal</TabsTrigger>
            </TabsList>

            <TabsContent value="individual" className="space-y-6">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  type="search" 
                  placeholder="Cari nama atau NIS/NIP..." 
                  className="pl-8" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredUsers.map(user => (
                  <Card key={user.id} className="overflow-hidden flex flex-col">
                    <CardContent className="p-6 flex flex-col items-center text-center flex-1">
                      <div className="bg-white p-3 rounded-xl border mb-4">
                        <QRCode value={user.identifier} size={150} />
                      </div>
                      <h3 className="font-bold text-lg leading-tight mb-1">{user.name}</h3>
                      <p className="text-gray-500 text-sm mb-1">{user.identifier}</p>
                      <p className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                        {user.role} {user.class !== '-' ? `- ${user.class}` : ''}
                      </p>
                    </CardContent>
                    <div className="p-3 bg-gray-50 border-t">
                      <Button variant="outline" className="w-full flex items-center gap-2" onClick={handlePrint}>
                        <Printer className="w-4 h-4" /> Cetak
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="massal" className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-end">
                <div className="w-full sm:w-64 space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Filter Kelas/Peran</label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="Semua Kelas">Semua User</option>
                    <option value="XII IPA 1">XII IPA 1</option>
                    <option value="XII IPA 2">XII IPA 2</option>
                    <option value="-">Guru</option>
                  </select>
                </div>
                <Button className="flex items-center gap-2" onClick={handlePrint}>
                  <Printer className="w-4 h-4" /> Cetak Semua ({massPrintUsers.length})
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 print:grid-cols-4 print:gap-2">
                {massPrintUsers.map(user => (
                  <div key={user.id} className="border rounded-lg p-4 flex flex-col items-center text-center bg-white print:border-gray-300 print:shadow-none">
                    <div className="bg-white p-2 rounded-lg border mb-3 print:border-none">
                      <QRCode value={user.identifier} size={100} />
                    </div>
                    <h3 className="font-bold text-sm leading-tight mb-1 line-clamp-1">{user.name}</h3>
                    <p className="text-gray-500 text-xs">{user.identifier}</p>
                    <p className="text-[10px] font-medium text-gray-400 mt-1 uppercase tracking-wider">
                      {user.role} {user.class !== '-' ? `• ${user.class}` : ''}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
