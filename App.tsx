
import React, { useState, useEffect } from 'react';
import { Grade, Unit, ViewMode, Exercise, HighScore } from './types.ts';
import { INITIAL_UNITS } from './constants.tsx';
import { WordCard } from './components/WordCard.tsx';
import { ExerciseView } from './components/ExerciseView.tsx';
import { AiAssistant } from './components/AiAssistant.tsx';
import { generateUnitContent, generateExercises } from './services/geminiService.ts';

const App: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<Grade>(Grade.G6);
  const [units, setUnits] = useState<Unit[]>(INITIAL_UNITS);
  const [currentUnit, setCurrentUnit] = useState<Unit>(INITIAL_UNITS[0]);
  const [viewMode, setViewMode] = useState<ViewMode>('Learn');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiUnitTopic, setAiUnitTopic] = useState('');
  const [highScores, setHighScores] = useState<HighScore[]>([]);

  useEffect(() => {
    const savedScores = localStorage.getItem('em_high_scores');
    if (savedScores) setHighScores(JSON.parse(savedScores));
  }, []);

  const handleGradeChange = (grade: Grade) => {
    setSelectedGrade(grade);
    const firstUnit = units.find(u => u.grade === grade);
    if (firstUnit) setCurrentUnit(firstUnit);
    setViewMode('Learn');
  };

  const handleAiGenerate = async () => {
    if (!aiUnitTopic) return;
    setIsLoading(true);
    try {
      const newUnit = await generateUnitContent(selectedGrade, aiUnitTopic);
      setUnits(prev => [...prev, newUnit]);
      setCurrentUnit(newUnit);
      setAiUnitTopic('');
      setViewMode('Learn');
    } catch (err: any) {
      alert("Lỗi AI: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const startPractice = async () => {
    setIsLoading(true);
    try {
      const ex = await generateExercises(currentUnit);
      setExercises(ex);
      setViewMode('Practice');
    } catch (err: any) {
      alert("Lỗi tạo bài tập: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <h1 className="text-lg font-black text-gray-800">English Master</h1>
          </div>
          
          <nav className="flex bg-gray-100 p-1 rounded-xl">
            {Object.values(Grade).map(grade => (
              <button
                key={grade}
                onClick={() => handleGradeChange(grade)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedGrade === grade ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {grade}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-72 flex-shrink-0">
          <div className="flex flex-col gap-6 sticky top-24">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b bg-gray-50 font-bold text-gray-800 text-xs uppercase tracking-widest">
                Danh sách Unit
              </div>
              <div className="p-2 max-h-[400px] overflow-y-auto">
                {units.filter(u => u.grade === selectedGrade).map(u => (
                  <button
                    key={u.id}
                    onClick={() => { setCurrentUnit(u); setViewMode('Learn'); }}
                    className={`w-full text-left p-3 rounded-xl transition-all mb-1 ${
                      currentUnit.id === u.id ? 'bg-blue-600 text-white font-bold' : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <div className="text-sm truncate">{u.title}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
              <p className="text-[10px] font-black text-blue-800 mb-2 uppercase tracking-widest">AI Soạn bài mới</p>
              <input 
                type="text" 
                value={aiUnitTopic}
                onChange={(e) => setAiUnitTopic(e.target.value)}
                placeholder="Ví dụ: Unit 2 My Friends" 
                className="w-full text-sm p-2 border border-gray-200 rounded-lg mb-2 focus:outline-none focus:border-blue-500"
              />
              <button 
                onClick={handleAiGenerate}
                disabled={isLoading || !aiUnitTopic}
                className="w-full bg-blue-600 text-white text-xs py-2 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Đang tạo...' : 'Tạo Unit bằng AI'}
              </button>
            </div>
          </div>
        </aside>

        <div className="flex-grow">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500 font-bold">Thầy đang chuẩn bị bài cho em...</p>
            </div>
          ) : (
            <>
              <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-black text-gray-900">{currentUnit.title}</h2>
                  <p className="text-gray-400 text-sm">{currentUnit.topic}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setViewMode('Learn')} className={`px-4 py-2 rounded-xl text-sm font-bold ${viewMode === 'Learn' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border text-gray-500'}`}>Từ vựng</button>
                  <button onClick={startPractice} className={`px-4 py-2 rounded-xl text-sm font-bold ${viewMode === 'Practice' ? 'bg-green-600 text-white shadow-lg' : 'bg-white border text-gray-500'}`}>Luyện tập</button>
                  <button onClick={() => setViewMode('Achievements')} className={`px-4 py-2 rounded-xl text-sm font-bold ${viewMode === 'Achievements' ? 'bg-yellow-500 text-white shadow-lg' : 'bg-white border text-gray-500'}`}>Cúp</button>
                </div>
              </div>

              {viewMode === 'Learn' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in duration-500">
                  {currentUnit.words.map((w, idx) => (
                    <WordCard key={idx} vocab={w} />
                  ))}
                </div>
              ) : viewMode === 'Practice' ? (
                <ExerciseView 
                  unitId={currentUnit.id} 
                  unitTitle={currentUnit.title} 
                  exercises={exercises} 
                  onComplete={() => {
                    const saved = localStorage.getItem('em_high_scores');
                    if (saved) setHighScores(JSON.parse(saved));
                  }} 
                />
              ) : (
                <div className="bg-white p-6 rounded-3xl border border-gray-100">
                  <h3 className="text-xl font-black mb-4">Thành tích của em 🏆</h3>
                  {highScores.length > 0 ? (
                    <div className="space-y-3">
                      {highScores.map((hs, i) => (
                        <div key={i} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                          <span className="font-bold">{hs.unitTitle}</span>
                          <span className="text-blue-600 font-black">{hs.score}/{hs.total}</span>
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-gray-400 italic">Chưa có thành tích. Cố gắng lên em nhé!</p>}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <AiAssistant currentContext={currentUnit.title} />

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t p-2 lg:hidden flex justify-around">
        <button onClick={() => setViewMode('Learn')} className={`flex flex-col items-center p-2 rounded-lg ${viewMode === 'Learn' ? 'text-blue-600' : 'text-gray-400'}`}>
          <i className="fas fa-book"></i>
          <span className="text-[10px] font-bold">HỌC</span>
        </button>
        <button onClick={startPractice} className={`flex flex-col items-center p-2 rounded-lg ${viewMode === 'Practice' ? 'text-green-600' : 'text-gray-400'}`}>
          <i className="fas fa-tasks"></i>
          <span className="text-[10px] font-bold">LUYỆN</span>
        </button>
        <button onClick={() => setViewMode('Achievements')} className={`flex flex-col items-center p-2 rounded-lg ${viewMode === 'Achievements' ? 'text-yellow-600' : 'text-gray-400'}`}>
          <i className="fas fa-trophy"></i>
          <span className="text-[10px] font-bold">CÚP</span>
        </button>
      </footer>
    </div>
  );
};

export default App;
