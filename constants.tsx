
import { Grade, Unit } from './types';

export const INITIAL_UNITS: Unit[] = [
  {
    id: 'g6-u1',
    grade: Grade.G6,
    title: 'Unit 1: My New School',
    topic: 'Global Success - School Things & Activities',
    words: [
      { word: 'Uniform', ipa: '/ˈjuːnɪfɔːm/', type: 'n', meaning: 'Đồng phục', example: 'I wear my uniform at school.', speakingSentence: 'I have a new uniform.' },
      { word: 'Calculator', ipa: '/ˈkælkjuleɪtə(r)/', type: 'n', meaning: 'Máy tính', example: 'I use a calculator for Math.', speakingSentence: 'Do you have a calculator?' },
      { word: 'Compass', ipa: '/ˈkʌmpəs/', type: 'n', meaning: 'Com-pa', example: 'I draw circles with a compass.', speakingSentence: 'Pass me the compass, please.' },
      { word: 'Pencil sharpener', ipa: '/ˈpensl ʃɑːpnə(r)/', type: 'n', meaning: 'Gọt bút chì', example: 'My pencil sharpener is blue.', speakingSentence: 'Where is my sharpener?' },
      { word: 'Textbook', ipa: '/ˈtekstbʊk/', type: 'n', meaning: 'Sách giáo khoa', example: 'Open your textbook to page 10.', speakingSentence: 'I like this textbook.' },
      { word: 'Library', ipa: '/ˈlaɪbrəri/', type: 'n', meaning: 'Thư viện', example: 'Our library is big.', speakingSentence: 'Let\'s go to the library.' },
    ]
  },
  {
    id: 'g6-u2',
    grade: Grade.G6,
    title: 'Unit 2: My House',
    topic: 'Global Success - Rooms & Furniture',
    words: [
      { word: 'Country house', ipa: '/ˈkʌntri haʊs/', type: 'n', meaning: 'Nhà ở nông thôn', example: 'My grandparents live in a country house.', speakingSentence: 'I love my country house.' },
      { word: 'Living room', ipa: '/ˈlɪvɪŋ ruːm/', type: 'n', meaning: 'Phòng khách', example: 'The TV is in the living room.', speakingSentence: 'Sit in the living room, please.' },
      { word: 'Chest of drawers', ipa: '/ˌtʃest əv ˈdrɔːz/', type: 'n', meaning: 'Tủ có ngăn kéo', example: 'My clothes are in the chest of drawers.', speakingSentence: 'This is a nice chest of drawers.' },
    ]
  },
  {
    id: 'g7-u1',
    grade: Grade.G7,
    title: 'Unit 1: Hobbies',
    topic: 'Global Success - My Favorite Things',
    words: [
      { word: 'Gardening', ipa: '/ˈɡɑːdnɪŋ/', type: 'n', meaning: 'Làm vườn', example: 'My mom enjoys gardening.', speakingSentence: 'Do you like gardening?' },
      { word: 'Making models', ipa: '/ˈmeɪkɪŋ ˈmɒdlz/', type: 'n', meaning: 'Làm mô hình', example: 'Ba likes making models.', speakingSentence: 'It\'s a beautiful model!' },
    ]
  },
  {
    id: 'g8-u1',
    grade: Grade.G8,
    title: 'Unit 1: Leisure Time',
    topic: 'Global Success - After School Activities',
    words: [
      { word: 'DIY', ipa: '/ˌdiː aɪ ˈwaɪ/', type: 'n', meaning: 'Tự làm đồ dùng', example: 'I like doing DIY.', speakingSentence: 'Let\'s do some DIY today!' },
    ]
  }
];
