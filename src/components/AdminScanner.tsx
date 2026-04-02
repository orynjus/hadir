import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Clock, ScanLine, AlertCircle, CheckCircle2, MessageSquare, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';

const playSound = (type: 'success' | 'error') => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    } else {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    }
  } catch (e) {
    console.error("Audio play failed", e);
  }
};

export default function AdminScanner() {
  const [isScannerActive, setIsScannerActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scanOverlay, setScanOverlay] = useState<{type: 'success'|'error', title: string, subtitle: string} | null>(null);
  const [scannedUsers, setScannedUsers] = useState<Record<string, { datang: boolean, pulang: boolean }>>({});

  // Mock schedule per day
  const schedules = [
    { day: 'Minggu', start: '06:00', end: '07:30', active: false }, // 0
    { day: 'Senin', start: '06:00', end: '07:30', active: true },   // 1
    { day: 'Selasa', start: '06:00', end: '07:30', active: true },  // 2
    { day: 'Rabu', start: '06:00', end: '07:30', active: true },    // 3
    { day: 'Kamis', start: '06:00', end: '07:30', active: true },   // 4
    { day: 'Jumat', start: '06:00', end: '07:30', active: true },   // 5
    { day: 'Sabtu', start: '06:00', end: '07:30', active: false },  // 6
  ];

  const currentDayIndex = currentTime.getDay();
  const todaySchedule = schedules[currentDayIndex];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Check if current time is within schedule (Mock logic)
  useEffect(() => {
    if (!todaySchedule.active) {
      setIsScannerActive(false);
      return;
    }

    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const currentMinutes = hours * 60 + minutes;
    
    const startParts = todaySchedule.start.split(':').map(Number);
    const endParts = todaySchedule.end.split(':').map(Number);
    
    const startMinutes = startParts[0] * 60 + startParts[1];
    const endMinutes = endParts[0] * 60 + endParts[1];

    if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
      setIsScannerActive(true);
    } else {
      setIsScannerActive(false);
    }
  }, [currentTime, todaySchedule]);

  const [recentScans, setRecentScans] = useState([
    { id: 1, name: 'Budi Santoso', role: 'Siswa', time: '06:45:12', status: 'Berhasil' },
    { id: 2, name: 'Siti Aminah', role: 'Siswa', time: '06:44:50', status: 'Berhasil' },
    { id: 3, name: 'Unknown QR', role: '-', time: '06:42:10', status: 'Gagal' },
  ]);

  const handleSimulateScan = (type: 'Datang' | 'Pulang', isSuccess: boolean = true) => {
    const userName = 'Budi Santoso';

    if (isSuccess) {
      const userStatus = scannedUsers[userName] || { datang: false, pulang: false };

      if (type === 'Datang' && userStatus.datang) {
        setScanOverlay({
          type: 'error',
          title: 'Scan Ditolak!',
          subtitle: `${userName} sudah melakukan absensi Datang hari ini.`
        });
        playSound('error');
        setTimeout(() => setScanOverlay(null), 2500);
        return;
      }

      if (type === 'Pulang' && userStatus.pulang) {
        setScanOverlay({
          type: 'error',
          title: 'Scan Ditolak!',
          subtitle: `${userName} sudah melakukan absensi Pulang hari ini.`
        });
        playSound('error');
        setTimeout(() => setScanOverlay(null), 2500);
        return;
      }

      const newScan = {
        id: Date.now(),
        name: userName,
        role: 'Siswa',
        time: new Date().toLocaleTimeString('id-ID'),
        status: 'Berhasil'
      };
      setRecentScans([newScan, ...recentScans]);
      
      setScannedUsers({
        ...scannedUsers,
        [userName]: {
          ...userStatus,
          [type.toLowerCase()]: true
        }
      });
      
      setScanOverlay({
        type: 'success',
        title: `Scan ${type} Berhasil!`,
        subtitle: `${userName} - XII IPA 1`
      });
      playSound('success');
      
      toast.success(`Scan ${type} Berhasil`, {
        description: `Notifikasi WA otomatis terkirim ke Orang Tua ${userName}.`,
        icon: <MessageSquare className="w-4 h-4 text-emerald-500" />
      });
    } else {
      const newScan = {
        id: Date.now(),
        name: 'Unknown QR',
        role: '-',
        time: new Date().toLocaleTimeString('id-ID'),
        status: 'Gagal'
      };
      setRecentScans([newScan, ...recentScans]);

      setScanOverlay({
        type: 'error',
        title: 'Scan Gagal!',
        subtitle: 'QR Code tidak dikenali atau tidak valid.'
      });
      playSound('error');
    }

    setTimeout(() => {
      setScanOverlay(null);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Scanner Barcode / QR Code</h2>
        <p className="text-gray-500">Scanner otomatis aktif sesuai jadwal yang ditentukan.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Kamera Scanner</CardTitle>
              <CardDescription>Arahkan QR Code ke kamera</CardDescription>
            </div>
            <Badge variant={isScannerActive ? "default" : "destructive"} className={isScannerActive ? "bg-emerald-500" : ""}>
              {isScannerActive ? 'Aktif' : 'Nonaktif'}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className={`relative w-full aspect-video rounded-xl border-2 flex items-center justify-center overflow-hidden transition-colors ${isScannerActive ? 'border-emerald-500 bg-black' : 'border-gray-300 bg-gray-100'}`}>
              {isScannerActive ? (
                <>
                  {/* Mock Camera Feed */}
                  <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1577563908411-50cb98976fea?auto=format&fit=crop&q=80')] bg-cover bg-center" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border-2 border-emerald-500 rounded-lg relative">
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-emerald-500 -mt-1 -ml-1"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-emerald-500 -mt-1 -mr-1"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-emerald-500 -mb-1 -ml-1"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-emerald-500 -mb-1 -mr-1"></div>
                      <div className="w-full h-0.5 bg-emerald-500 absolute top-1/2 animate-scan shadow-[0_0_8px_2px_rgba(16,185,129,0.5)]"></div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-500 flex flex-col items-center">
                  <Camera className="w-12 h-12 mb-2 opacity-50" />
                  <p>Kamera dinonaktifkan.</p>
                  <p className="text-sm">
                    {todaySchedule.active 
                      ? `Di luar jadwal scan hari ${todaySchedule.day} (${todaySchedule.start} - ${todaySchedule.end})` 
                      : `Hari ${todaySchedule.day} diliburkan (scanner nonaktif)`}
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                <span className="font-mono text-lg">{currentTime.toLocaleTimeString('id-ID')}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={() => handleSimulateScan('Datang', true)}>
                  Simulasi Datang
                </Button>
                <Button variant="outline" onClick={() => handleSimulateScan('Pulang', true)}>
                  Simulasi Pulang
                </Button>
                <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleSimulateScan('Datang', false)}>
                  Simulasi Gagal
                </Button>
                <Button variant="secondary" onClick={() => setIsScannerActive(!isScannerActive)}>
                  {isScannerActive ? 'Matikan Paksa' : 'Aktifkan Paksa'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ScanLine className="w-5 h-5" />
              Scan Terakhir
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentScans.map((scan) => (
                <div key={scan.id} className="flex items-start justify-between p-3 rounded-lg border bg-gray-50">
                  <div>
                    <p className="font-medium text-sm">{scan.name}</p>
                    <p className="text-xs text-gray-500">{scan.role} • {scan.time}</p>
                  </div>
                  {scan.status === 'Berhasil' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fullscreen Scan Overlay */}
      <AnimatePresence>
        {scanOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm ${
              scanOverlay.type === 'success' ? 'bg-emerald-500/90' : 'bg-red-500/90'
            }`}
          >
            <motion.div
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="bg-white rounded-3xl p-10 flex flex-col items-center text-center shadow-2xl max-w-md w-full mx-4"
            >
              {scanOverlay.type === 'success' ? (
                <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-20 h-20 text-emerald-600" />
                </div>
              ) : (
                <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mb-6">
                  <XCircle className="w-20 h-20 text-red-600" />
                </div>
              )}
              <h2 className={`text-4xl font-black mb-2 ${scanOverlay.type === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>
                {scanOverlay.title}
              </h2>
              <p className="text-xl text-gray-600 font-medium">
                {scanOverlay.subtitle}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
