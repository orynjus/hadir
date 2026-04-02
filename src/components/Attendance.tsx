import { useState, useEffect } from 'react';
import { api, Student, AttendanceRecord } from '../lib/api';
import { format } from 'date-fns';
import { Check, X, Clock, AlertCircle } from 'lucide-react';

export default function Attendance() {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [students, setStudents] = useState<Student[]>([]);
  const [records, setRecords] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [date]);

  const loadData = async () => {
    setLoading(true);
    const [st, att] = await Promise.all([
      api.getStudents(),
      api.getAttendance(date)
    ]);
    setStudents(st);
    
    const recMap: Record<number, string> = {};
    att.forEach(r => { recMap[r.student_id] = r.status; });
    setRecords(recMap);
    setLoading(false);
  };

  const mark = async (studentId: number, status: string) => {
    setRecords(prev => ({ ...prev, [studentId]: status }));
    await api.markAttendance(studentId, date, status);
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Memuat data...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Absensi Harian</h2>
        <input 
          type="date" 
          value={date} 
          onChange={e => setDate(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Siswa</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status Kehadiran</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.map(student => (
              <tr key={student.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      {student.avatar_url ? (
                        <img className="h-10 w-10 rounded-full object-cover" src={student.avatar_url} alt="" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                          {student.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => mark(student.id, 'present')}
                      className={`p-2 rounded-full ${records[student.id] === 'present' ? 'bg-green-100 text-green-600 ring-2 ring-green-500' : 'bg-gray-100 text-gray-400 hover:bg-green-50'}`}
                      title="Hadir"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => mark(student.id, 'absent')}
                      className={`p-2 rounded-full ${records[student.id] === 'absent' ? 'bg-red-100 text-red-600 ring-2 ring-red-500' : 'bg-gray-100 text-gray-400 hover:bg-red-50'}`}
                      title="Alpa"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => mark(student.id, 'late')}
                      className={`p-2 rounded-full ${records[student.id] === 'late' ? 'bg-yellow-100 text-yellow-600 ring-2 ring-yellow-500' : 'bg-gray-100 text-gray-400 hover:bg-yellow-50'}`}
                      title="Terlambat"
                    >
                      <Clock className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => mark(student.id, 'excused')}
                      className={`p-2 rounded-full ${records[student.id] === 'excused' ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-500' : 'bg-gray-100 text-gray-400 hover:bg-blue-50'}`}
                      title="Izin/Sakit"
                    >
                      <AlertCircle className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
