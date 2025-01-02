import { GameMode } from '../app/types';

export const gameModes: GameMode[] = [
  {
    id: 'classic',
    name: 'Klasik Mod',
    description: 'Temel oyun modu. Her doğru cevap 1 puan kazandırır.',
    icon: 'stars',
    questionCount: 10,
    pointSystem: {
      correctGuess: 1,
      customTraitGuess: 2,
      streak: 0
    },
    rules: [
      'Her oyuncu için 5 özellik girilir',
      'Her doğru tahmin 1 puan kazandırır',
      'Özel özellikler 2 puan kazandırır',
      'En yüksek puanı alan kazanır'
    ]
  },
  {
    id: 'time',
    name: 'Zaman Yarışı',
    description: 'Her soru için 30 saniye süren hızlı mod!',
    icon: 'timer',
    questionCount: 10,
    timeLimit: 30,
    pointSystem: {
      correctGuess: 2,
      customTraitGuess: 3,
      streak: 1
    },
    rules: [
      'Her soru için 30 saniye süre',
      'Hızlı cevaplar bonus puan kazandırır',
      'Süre bitince soru pas geçilir',
      'Doğru cevaplar 2 puan değerinde'
    ]
  },
  {
    id: 'streak',
    name: 'Seri Modu',
    description: 'Ardışık doğru cevaplar bonus puan kazandırır!',
    icon: 'local-fire-department',
    questionCount: 15,
    pointSystem: {
      correctGuess: 1,
      customTraitGuess: 2,
      streak: 2
    },
    rules: [
      'Ardışık doğru cevaplar seri oluşturur',
      'Her seri +2 bonus puan kazandırır',
      'Yanlış cevap seriyi sıfırlar',
      'Toplam 15 soru sorulur'
    ]
  }
]; 