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
  "Güvenilir": {
    trait: "Güvenilir",
    questions: [
      "Arkadaşlarına söz verdiğini yerine getirir.",
      "İşleri düzenli ve sistematik bir şekilde yapar.",
      "Sorumluluk alırken her zaman güvenilirlik korur.",
      "İşleri yaparken her zaman güvenilirlik korur.",
      "Sorumluluk alırken her zaman güvenilirlik korur."
    ]
  },
  "Sabırlı": {
    trait: "Sabırlı",
    questions: [
        "Zor bir durum karşısında sakinliğini koruyarak çözüm bulur.",
        "Uzun vadeli hedeflere ulaşmak için sabırla çalışır.",
        "Başkalarını anlamak için zaman ayırır.",
        "Öğrenme süreçlerinde pes etmeden ilerler.",
        "Detaylı işlerde dikkatli ve sabırlı bir yaklaşım gösterir."
    ]
  },
  "Düzenli": {
    trait: "Düzenli",
    questions: [
        "Planlı bir şekilde günlük işlerini düzenler.",
        "Kendi yaşam alanını temiz ve düzenli tutar.",
        "Projelerde zaman yönetimini etkili bir şekilde yapar.",
        "Düzenli bir çalışma ortamının üretkenliği artırdığını düşünür.",
        "Hayatındaki hedeflerini önceliklendirerek belirler."
    ]
  },
  "Yaratıcı": {
    trait: "Yaratıcı",
    questions: [
        "Sorunlara özgün ve farklı çözümler üretir.",
        "Sanatsal veya yaratıcı projelerde aktif rol alır.",
        "İlham almak için farklı kaynaklardan yararlanır.",
        "Yeni fikirler üretmekten keyif alır.",
        "Hayal gücünü kullanarak başkalarına ilham verir."
    ]
  },
  "Enerjik": {
    trait: "Enerjik",
    questions: [
        "Yüksek enerji seviyesiyle hareket eder.",
        "Kendini sürekli aktivite içinde tutar.",
        "Küçük bir süre içinde fazla sayıda iş yapabilir.",
        "Kendini aktivite içinde tutarak enerji kaybetmez.",
        "Yeni aktivitelerden keyif alır."
    ]
  },
  "Cesur": {
    trait: "Cesur",
    questions: [
        "Zor bir durumda sorumluluk almaktan çekinmez.",
        "Riskli bir karar alırken korkularını kontrol edebilir.",
        "Yeni ve bilinmeyen durumlarla karşılaştığında cesaretle hareket eder.",
        "Başkalarını tehlikeli veya zorlu durumlarda savunur.",
        "Hayatta bir hedef için konfor alanından çıkmayı göze alır."
    ]
  },
  "Anlayışlı": {
    trait: "Anlayışlı",
    questions: [
        "Başkalarının hatalarını yargılamadan kabul eder.",
        "Farklı düşüncelere saygı duyar ve anlamaya çalışır.",
        "Empati yaparak karşısındaki kişinin duygularını anlar.",
        "İlişkilerinde çözüm odaklı bir yaklaşım sergiler.",
        "Zor durumda olan birine destek vermekten çekinmez."
    ]
  },
  "Çalışkan": {
    trait: "Çalışkan",
    questions: [
        "Kendini sürekli geliştirmek için çalışır.",
        "Yeni bilgileri öğrenmekten keyif alır.",
        "Kendini sürekli geliştirmek için çalışır.",
        "Yeni bilgileri öğrenmekten keyif alır.",
        "Kendini sürekli geliştirmek için çalışır."
    ]
  },
  "Lider ruhlu": {
    trait: "Lider ruhlu",
    questions: [
        "Grup çalışmalarında liderlik gösterir.",
        "Başkalarına yönelik öğretici bir tutum sergiler.",
        "İşleri düzenli ve sistematik bir şekilde yönetir.",
        "Problemleri çözmek için yönetici bir yaklaşım sergiler.",
        "Grup çalışmalarında liderlik gösterir."
    ]
  },
  "Esprili": {
    trait: "Esprili",
    questions: [
        "Zor durumları esprili bir şekilde yumuşatır.",
        "İnsanları güldürmekten keyif alır.",
        "Espri yaparak ekip ruhunu canlandırır.",
        "Mizah anlayışını günlük yaşamında kullanır.",
        "Arkadaş ortamında genelde eğlencenin kaynağı olur."
    ]
  },
  "Merhametli": {
    trait: "Merhametli",
    questions: [
        "Zor durumda olan birine yardım etmek için elinden geleni yapar.",
        "Hayvanlara ve doğaya karşı şefkatlidir.",
        "Başkalarının duygularını incitmemeye özen gösterir.",
        "Affedici bir yaklaşım sergileyerek empati yapar.",
        "Gönüllü çalışmalara katılarak topluma fayda sağlar."
    ]
  },
  "Kararlı": {
    trait: "Kararlı",
    questions: [
        "Kendini sürekli geliştirmek için çalışır.",
        "Yeni bilgileri öğrenmekten keyif alır.",
        "Kendini sürekli geliştirmek için çalışır.",
        "Yeni bilgileri öğrenmekten keyif alır.",
        "Kendini sürekli geliştirmek için çalışır."
    ]
  },
  "Pozitif": {
    trait: "Pozitif",
    questions: [
        "Zor durumlarda bile olumlu bir bakış açısı sergiler.",
        "Başkalarına pozitif enerji vermekten keyif alır.",
        "Hayata karşı olumlu bir tutum geliştirir.",
        "Olumsuzluklardan ders çıkararak ileriye bakar.",
        "Etrafındaki insanları motive eder ve destekler."
    ]
  },
  "Girişken": {
    trait: "Girişken",
    questions: [
        "Yeni insanlarla tanışmaktan çekinmez.",
        "Ekip içinde ilk adımı atarak projelere yön verir.",
        "Fırsatları değerlendirmek için inisiyatif alır.",
        "Kalabalık ortamlarda rahatlıkla fikirlerini paylaşır.",
        "Sosyal çevresini genişletmek için etkinliklere katılır."
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