import React, { useState, useEffect } from 'react';
import { api, Student } from '../lib/api';
import { editImageWithFlashImage } from '../lib/gemini';
import { Edit2, Sparkles, Upload, X } from 'lucide-react';

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newAvatar, setNewAvatar] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const st = await api.getStudents();
    setStudents(st);
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setNewAvatar(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAiEdit = async () => {
    if (!newAvatar || !prompt) return;
    setIsEditing(true);
    try {
      const base64Data = newAvatar.split(',')[1];
      const mimeType = newAvatar.split(';')[0].split(':')[1];
      const edited = await editImageWithFlashImage(base64Data, mimeType, prompt);
      setNewAvatar(edited);
    } catch (error) {
      console.error(error);
      alert('Gagal mengedit gambar');
    } finally {
      setIsEditing(false);
    }
  };

  const saveAvatar = async () => {
    if (!selectedStudent || !newAvatar) return;
    await api.updateStudent(selectedStudent.id, selectedStudent.name, newAvatar);
    setSelectedStudent(null);
    setNewAvatar(null);
    loadData();
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Memuat data...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Daftar Siswa</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors">
          + Tambah Siswa
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {students.map(student => (
          <div key={student.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="relative group">
              <div className="h-24 w-24 rounded-full overflow-hidden mb-4 border-4 border-gray-50">
                {student.avatar_url ? (
                  <img className="h-full w-full object-cover" src={student.avatar_url} alt="" referrerPolicy="no-referrer" />
                ) : (
                  <div className="h-full w-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-3xl">
                    {student.name.charAt(0)}
                  </div>
                )}
              </div>
              <button 
                onClick={() => {
                  setSelectedStudent(student);
                  setNewAvatar(student.avatar_url || null);
                }}
                className="absolute bottom-4 right-0 bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
            <h3 className="text-lg font-medium text-gray-900">{student.name}</h3>
            <p className="text-sm text-gray-500">ID: {student.id}</p>
          </div>
        ))}
      </div>

      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Edit Profil: {selectedStudent.name}</h3>
              <button onClick={() => setSelectedStudent(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <div className="h-40 w-40 rounded-full overflow-hidden border-4 border-gray-50 bg-gray-100">
                {newAvatar ? (
                  <img src={newAvatar} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-400">
                    <Upload className="w-8 h-8" />
                  </div>
                )}
              </div>
              
              <label className="cursor-pointer px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors text-sm">
                Upload Gambar
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            </div>

            {newAvatar && (
              <div className="bg-indigo-50 rounded-xl p-4 space-y-3 border border-indigo-100">
                <div className="flex items-center space-x-2 text-indigo-800 font-medium">
                  <Sparkles className="w-5 h-5" />
                  <span>AI Edit (Nano Banana)</span>
                </div>
                <div className="flex space-x-2">
                  <input 
                    type="text" 
                    placeholder="Contoh: Tambahkan kacamata hitam" 
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    className="flex-1 px-3 py-2 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                  <button 
                    onClick={handleAiEdit}
                    disabled={isEditing || !prompt}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {isEditing ? 'Memproses...' : 'Edit'}
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <button 
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
              >
                Batal
              </button>
              <button 
                onClick={saveAvatar}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
