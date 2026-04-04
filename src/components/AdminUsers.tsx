import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Upload, Edit, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('siswa');

  const [siswaList, setSiswaList] = useState<any[]>([]);

  const [guruList, setGuruList] = useState<any[]>([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    identifier: '',
    class: '',
    subject: '',
    phone: ''
  });

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const handleAction = (action: string, name?: string) => {
    if (action === 'Import Data') {
      setIsImportModalOpen(true);
    }
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Mengimpor data...',
        success: 'Data berhasil diimpor!',
        error: 'Gagal mengimpor data.',
      }
    );
    setIsImportModalOpen(false);
  };

  const openAddModal = () => {
    setFormData({ name: '', identifier: '', class: '', subject: '', phone: '' });
    setIsAddModalOpen(true);
  };

  const openEditModal = (user: any) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      identifier: user.identifier,
      class: user.class || '',
      subject: user.subject || '',
      phone: user.phone || ''
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (user: any) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'siswa') {
      setSiswaList([...siswaList, { id: Date.now(), name: formData.name, identifier: formData.identifier, class: formData.class, phone: formData.phone }]);
    } else {
      setGuruList([...guruList, { id: Date.now(), name: formData.name, identifier: formData.identifier, subject: formData.subject, phone: formData.phone }]);
    }
    toast.success(`Data ${activeTab} berhasil ditambahkan`);
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'siswa') {
      setSiswaList(siswaList.map(s => s.id === selectedUser.id ? { ...s, name: formData.name, identifier: formData.identifier, class: formData.class, phone: formData.phone } : s));
    } else {
      setGuruList(guruList.map(g => g.id === selectedUser.id ? { ...g, name: formData.name, identifier: formData.identifier, subject: formData.subject, phone: formData.phone } : g));
    }
    toast.success(`Data ${activeTab} berhasil diperbarui`);
    setIsEditModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (activeTab === 'siswa') {
      setSiswaList(siswaList.filter(s => s.id !== selectedUser.id));
    } else {
      setGuruList(guruList.filter(g => g.id !== selectedUser.id));
    }
    toast.success(`Data ${activeTab} berhasil dihapus`);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Kelola User</h2>
          <p className="text-gray-500">Tambah, edit, hapus, atau import data siswa dan guru.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2" onClick={() => handleAction('Import Data')}>
            <Upload className="w-4 h-4" />
            Import CSV/Sheet
          </Button>
          <Button className="flex items-center gap-2" onClick={openAddModal}>
            <Plus className="w-4 h-4" />
            Tambah User
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="siswa" className="w-full" onValueChange={setActiveTab}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <TabsList>
                <TabsTrigger value="siswa">Data Siswa</TabsTrigger>
                <TabsTrigger value="guru">Data Guru</TabsTrigger>
              </TabsList>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  type="search" 
                  placeholder="Cari nama atau ID..." 
                  className="pl-8" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <TabsContent value="siswa">
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead>Nama Siswa</TableHead>
                      <TableHead>NIS</TableHead>
                      <TableHead>Kelas</TableHead>
                      <TableHead>No. HP</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {siswaList.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.identifier.includes(searchQuery)).map((siswa) => (
                      <TableRow key={siswa.id}>
                        <TableCell className="font-medium">{siswa.name}</TableCell>
                        <TableCell>{siswa.identifier}</TableCell>
                        <TableCell>{siswa.class}</TableCell>
                        <TableCell>{siswa.phone}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600" onClick={() => openEditModal(siswa)}><Edit className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600" onClick={() => openDeleteModal(siswa)}><Trash2 className="w-4 h-4" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="guru">
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead>Nama Guru</TableHead>
                      <TableHead>NIP</TableHead>
                      <TableHead>Mata Pelajaran</TableHead>
                      <TableHead>No. HP</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {guruList.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()) || g.identifier.includes(searchQuery)).map((guru) => (
                      <TableRow key={guru.id}>
                        <TableCell className="font-medium">{guru.name}</TableCell>
                        <TableCell>{guru.identifier}</TableCell>
                        <TableCell>{guru.subject}</TableCell>
                        <TableCell>{guru.phone}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600" onClick={() => openEditModal(guru)}><Edit className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600" onClick={() => openDeleteModal(guru)}><Trash2 className="w-4 h-4" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah {activeTab === 'siswa' ? 'Siswa' : 'Guru'}</DialogTitle>
            <DialogDescription>Masukkan detail data {activeTab} baru.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Nama Lengkap</Label>
              <Input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>{activeTab === 'siswa' ? 'NIS' : 'NIP'}</Label>
              <Input required value={formData.identifier} onChange={(e) => setFormData({...formData, identifier: e.target.value})} />
            </div>
            {activeTab === 'siswa' ? (
              <div className="space-y-2">
                <Label>Kelas</Label>
                <Input required value={formData.class} onChange={(e) => setFormData({...formData, class: e.target.value})} />
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Mata Pelajaran</Label>
                <Input required value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} />
              </div>
            )}
            <div className="space-y-2">
              <Label>No. HP</Label>
              <Input required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Batal</Button>
              <Button type="submit">Simpan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {activeTab === 'siswa' ? 'Siswa' : 'Guru'}</DialogTitle>
            <DialogDescription>Perbarui detail data {activeTab}.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Nama Lengkap</Label>
              <Input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>{activeTab === 'siswa' ? 'NIS' : 'NIP'}</Label>
              <Input required value={formData.identifier} onChange={(e) => setFormData({...formData, identifier: e.target.value})} />
            </div>
            {activeTab === 'siswa' ? (
              <div className="space-y-2">
                <Label>Kelas</Label>
                <Input required value={formData.class} onChange={(e) => setFormData({...formData, class: e.target.value})} />
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Mata Pelajaran</Label>
                <Input required value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} />
              </div>
            )}
            <div className="space-y-2">
              <Label>No. HP</Label>
              <Input required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>Batal</Button>
              <Button type="submit">Simpan Perubahan</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Data</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus data {selectedUser?.name}? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Batal</Button>
            <Button type="button" variant="destructive" onClick={handleDeleteConfirm}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Import Modal */}
      <Dialog open={isImportModalOpen} onOpenChange={setIsImportModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Data {activeTab === 'siswa' ? 'Siswa' : 'Guru'}</DialogTitle>
            <DialogDescription>
              Unggah file CSV atau Excel untuk mengimpor data secara massal.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleImportSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>File Data</Label>
              <Input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" required />
              <p className="text-xs text-gray-500">Format yang didukung: .csv, .xls, .xlsx</p>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsImportModalOpen(false)}>Batal</Button>
              <Button type="submit">Mulai Import</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
