type TraitQuestion = {
  trait: string;
  questions: string[];
};

export const traitQuestions: Record<string, TraitQuestion> = {
  // Yaşam Tarzı Özellikleri
  "Gurme": {
    trait: "Gurme",
    questions: [
      "Zor zamanlarda ve evde tek kaldığında kendisini doyurabilir.",
      "Yemek yapmayı ve yeni tarifler denemeyi sever.",
      "Restoranda menüyü en uzun süre inceleyen kişidir.",
      "Arkadaşlarına sürekli yeni restoranlar önerir.",
      "Yemek konusunda oldukça seçicidir ve kaliteye önem verir."
    ]
  },
  "Sporcu": {
    trait: "Sporcu",
    questions: [
      "Sabah erkenden koşuya çıkmayı tercih eder.",
      "Asansör yerine merdivenleri kullanır.",
      "Hafta sonu planlarını genelde aktif aktiviteler oluşturur.",
      "Spor ekipmanları koleksiyonu vardır.",
      "Sağlıklı beslenme konusunda titizdir."
    ]
  },
  "Kitap kurdu": {
    trait: "Kitap kurdu",
    questions: [
      "Tatile giderken bavulunun yarısını kitaplar kaplar.",
      "Bir kitabı bitirmeden uyumaz.",
      "Arkadaşlarına sürekli kitap önerileri yapar.",
      "Kütüphanede saatlerce vakit geçirebilir.",
      "Yeni çıkan kitapları takip eder."
    ]
  },

  // Sosyal Özellikler
  "İyi bir dinleyici": {
    trait: "İyi bir dinleyici",
    questions: [
      "Arkadaşları sorunlarını öncelikle ona anlatır.",
      "Bir konuşmada karşısındakinin sözünü kesmez.",
      "İnsanlar ona dertlerini anlatmaktan çekinmez.",
      "Grup sohbetlerinde herkesi dinler ve fikirlerini önemser.",
      "Konuşmalardan önemli detayları hatırlar."
    ]
  },

  // Olumlu Özellikler
  "Yardımsever": {
    trait: "Yardımsever",
    questions: [
      "İhtiyacı olan birine tereddüt etmeden yardım eder.",
      "Grup çalışmalarında ekstra sorumluluk alır.",
      "Arkadaşları zor durumda kaldığında ilk onu arar.",
      "Başkalarının işlerini kolaylaştırmak için çaba gösterir.",
      "Gönüllü işlerde yer almayı sever."
    ]
  },

  // Düşünsel Özellikler
  "Analitik düşünen": {
    trait: "Analitik düşünen",
    questions: [
      "Karmaşık problemleri küçük parçalara ayırarak çözer.",
      "Bir konuda karar vermeden önce tüm olasılıkları değerlendirir.",
      "Tartışmalarda mantıklı argümanlar sunar.",
      "Detaylara önem verir ve analiz yapmayı sever.",
      "Verilere dayalı kararlar almayı tercih eder."
    ]
  }
  // Diğer özellikler için benzer şekilde devam edebiliriz...
}; 