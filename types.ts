
export enum Grade {
  G6 = 'Lớp 6',
  G7 = 'Lớp 7',
  G8 = 'Lớp 8',
  G9 = 'Lớp 9'
}

export interface Vocabulary {
  word: string;
  ipa: string;
  meaning: string;
  type: string;
  example: string;
  speakingSentence?: string; // Mẫu câu giao tiếp ngắn
  imageUrl?: string;
}

export interface Unit {
  id: string;
  title: string;
  grade: Grade;
  topic: string;
  words: Vocabulary[];
}

export enum ExerciseType {
  MULTIPLE_CHOICE = 'Trắc nghiệm',
  MATCHING = 'Nối từ',
  FILL_BLANK = 'Điền từ',
  SCRAMBLED = 'Sắp xếp chữ',
  PICTURE_MATCH = 'Nhìn hình đoán từ',
  CONTEXT_CHOOSE = 'Chọn theo ngữ cảnh',
  LISTENING = 'Nghe chọn từ',
  MINI_GAME = 'Mini Quiz'
}

export interface Exercise {
  type: ExerciseType;
  question: string;
  options?: string[];
  answer: string;
  hint: string;
  example?: string;
  audioText?: string;
  imageKeyword?: string;
}

export interface HighScore {
  unitId: string;
  unitTitle: string;
  score: number;
  total: number;
  date: string;
}

export type ViewMode = 'Learn' | 'Practice' | 'Achievements';
