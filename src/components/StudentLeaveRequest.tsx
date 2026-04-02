import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { MessageSquare } from 'lucide-react';

export default function StudentLeaveRequest() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leaveHistory, setLeaveHistory] = useState([
    { id: 1, date: '2026-03-30', type: 'Sakit', reason: 'Demam tinggi', status: 'Disetujui' },
    { id: 2, date: '2026-02-15', type: 'Izin', reason: 'Acara keluarga', status: 'Disetujui' },
  ]);

  const [formData, setFormData] = useState({
    type: '',
    date: '',
    reason: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      
      const newRequest = {
        id: Date.now(),
        date: formData.date,
        type: formData.type === 'sakit' ? 'Sakit' : 'Izin',
        reason: formData.reason,
        status: 'Menunggu Persetujuan'
      };
      
      setLeaveHistory([newRequest, ...leaveHistory]);
      setFormData({ type: '', date: '', reason: '' });
      
      toast.success('Pengajuan izin berhasil dikirim!', {
        description: 'Notifikasi WA otomatis terkirim ke Wali Kelas (XII IPA 1).',
        icon: <MessageSquare className="w-4 h-4 text-emerald-500" />
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Pengajuan Izin</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Form Pengajuan</CardTitle>
            <CardDescription>Isi form berikut untuk mengajukan izin tidak hadir.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Jenis Izin</Label>
                <select 
                  id="type" 
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="">Pilih jenis izin...</option>
                  <option value="sakit">Sakit</option>
                  <option value="izin">Izin Keperluan Lain</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Tanggal</Label>
                <Input 
                  id="date" 
                  type="date" 
                  required 
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reason">Alasan</Label>
                <Textarea 
                  id="reason" 
                  placeholder="Jelaskan alasan izin Anda..." 
                  required 
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="attachment">Lampiran (Surat Dokter/dll)</Label>
                <Input id="attachment" type="file" />
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Mengirim...' : 'Kirim Pengajuan'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Riwayat Pengajuan Izin</CardTitle>
            <CardDescription>Status pengajuan izin Anda sebelumnya.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Jenis</TableHead>
                  <TableHead>Alasan</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaveHistory.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.date}</TableCell>
                    <TableCell>{record.type}</TableCell>
                    <TableCell>{record.reason}</TableCell>
                    <TableCell>
                      <Badge variant={record.status === 'Disetujui' ? 'default' : 'secondary'} className={record.status === 'Disetujui' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100' : record.status === 'Menunggu Persetujuan' ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' : ''}>
                        {record.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
