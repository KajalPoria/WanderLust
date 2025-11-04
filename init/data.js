const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    title_i18n: {
      en: "Cozy Beachfront Cottage",
      hi: "आरामदायक समुद्रतटीय कुटिया",
      fr: "Gîte confortable en bord de mer",
      es: "Acogedora cabaña frente a la playa"
    },
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    description_i18n: {
      en: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
      hi: "आरामदायक छुट्टी के लिए इस मनमोहक समुद्रतट कुटिया में जाएँ। शानदार समुद्री दृश्य और समुद्र तट तक आसान पहुँच का आनंद लें।",
      fr: "Évadez-vous dans ce charmant gîte en bord de mer pour un séjour relaxant. Profitez de splendides vues sur l'océan et d'un accès direct à la plage.",
      es: "Escápate a esta encantadora cabaña frente al mar para una escapada relajante. Disfruta de impresionantes vistas al océano y acceso fácil a la playa."
    },
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
    category: "Trending",
  },
  {
    title: "Modern Loft in Downtown",
    title_i18n: {
      en: "Modern Loft in Downtown",
      hi: "डाउनटाउन में आधुनिक लॉफ्ट",
      fr: "Loft moderne au centre-ville",
      es: "Loft moderno en el centro"
    },
    description:
      "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    description_i18n: {
      en: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
      hi: "शहर के केंद्र में इस स्टाइलिश लॉफ्ट अपार्टमेंट में ठहरें। शहरी खोजकर्ताओं के लिए उत्तम!",
      fr: "Séjournez au cœur de la ville dans ce loft élégant. Parfait pour les explorateurs urbains !",
      es: "Alójate en el corazón de la ciudad en este elegante loft. ¡Perfecto para exploradores urbanos!"
    },
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "New York City",
    country: "United States",
    category: "Iconic Cities",
  },
  {
    title: "Mountain Retreat",
    title_i18n: {
      en: "Mountain Retreat",
      hi: "पर्वतीय विश्राम स्थल",
      fr: "Retraite à la montagne",
      es: "Retiro en la montaña"
    },
    description:
      "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    description_i18n: {
      en: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
      hi: "इस शांत पर्वतीय केबिन में आराम करें। प्रकृति से घिरा हुआ, ऊर्जा पुनः प्राप्त करने के लिए उत्तम स्थान।",
      fr: "Déconnectez-vous et détendez-vous dans ce paisible chalet de montagne. Entouré par la nature, c'est l'endroit idéal pour se ressourcer.",
      es: "Desconecta y relájate en esta tranquila cabaña de montaña. Rodeada de naturaleza, es perfecta para recargar energías."
    },
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
    category: "Mountains",
  },
  {
    title: "Historic Villa in Tuscany",
    title_i18n: {
      en: "Historic Villa in Tuscany",
      hi: "टस्कनी में ऐतिहासिक विला",
      fr: "Villa historique en Toscane",
      es: "Villa histórica en la Toscana"
    },
    description:
      "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    description_i18n: {
      en: "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
      hi: "इस खूबसूरती से पुनर्निर्मित विला में टस्कनी के आकर्षण का अनुभव करें। लहरदार पहाड़ियों और अंगूर के बागों की खोज करें।",
      fr: "Découvrez le charme de la Toscane dans cette villa magnifiquement restaurée. Explorez les collines ondulantes et les vignobles.",
      es: "Vive el encanto de la Toscana en esta villa bellamente restaurada. Explora las colinas y viñedos ondulantes."
    },
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
    category: "Farms",
  },
  {
    title: "Secluded Treehouse Getaway",
    title_i18n: {
      en: "Secluded Treehouse Getaway",
      hi: "एकांत ट्रीहाउस अवकाश",
      fr: "Escapade en cabane dans les arbres isolée",
      es: "Escapada a una casa del árbol aislada"
    },
    description:
      "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    description_i18n: {
      en: "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
      hi: "इस अनोखे ट्रीहाउस रिट्रीट में पेड़ों की चोटियों के बीच रहें। प्रकृति प्रेमियों के लिए स्वर्ग।",
      fr: "Vivez parmi la canopée dans cette cabane unique. Un véritable paradis pour les amoureux de la nature.",
      es: "Vive entre las copas de los árboles en este retiro único. Un verdadero paraíso para los amantes de la naturaleza."
    },
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 800,
    location: "Portland",
    country: "United States",
    category: "Camping",
  },
  {
    title: "Beachfront Paradise",
    title_i18n: {
      en: "Beachfront Paradise",
      hi: "समुद्रतट स्वर्ग",
      fr: "Paradis en bord de mer",
      es: "Paraíso frente a la playa"
    },
    description:
      "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    description_i18n: {
      en: "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
      hi: "अपने दरवाज़े से बाहर निकलते ही रेतीले समुद्र तट पर पहुँचें। यह बीचफ्रंट कॉन्डो सर्वोच्च आराम प्रदान करता है।",
      fr: "Sortez de votre porte directement sur la plage de sable. Ce condo en bord de mer offre une détente absolue.",
      es: "Sal de tu puerta directamente a la playa de arena. Este condominio frente al mar ofrece la máxima relajación."
    },
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    category: "Amazing Pools",
  },
  {
    title: "Rustic Cabin by the Lake",
    title_i18n: {
      en: "Rustic Cabin by the Lake",
      hi: "झील किनारे देहाती केबिन",
      fr: "Cabane rustique au bord du lac",
      es: "Cabaña rústica junto al lago"
    },
    description:
      "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    description_i18n: {
      en: "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
      hi: "शांत झील में मछली पकड़ने और कायकिंग में दिन बिताएँ। यह आरामदायक केबिन प्रकृति प्रेमियों के लिए उत्तम है।",
      fr: "Passez vos journées à pêcher et à faire du kayak sur le lac serein. Cette cabane confortable est parfaite pour les amateurs de plein air.",
      es: "Pasa tus días pescando y haciendo kayak en el sereno lago. Esta acogedora cabaña es perfecta para los amantes del aire libre."
    },
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    category: "Rooms",
  },
  {
    title: "Luxury Penthouse with City Views",
    title_i18n: {
      en: "Luxury Penthouse with City Views",
      hi: "शानदार शहर दृश्य वाला लग्ज़री पेंटहाउस",
      fr: "Penthouse de luxe avec vue sur la ville",
      es: "Ático de lujo con vistas a la ciudad"
    },
    description:
      "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    description_i18n: {
      en: "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
      hi: "इस शानदार पेंटहाउस से शहर के पैनोरमिक दृश्य के साथ विलासितापूर्ण जीवन का आनंद लें।",
      fr: "Profitez d'un style de vie luxueux avec des vues panoramiques sur la ville depuis ce superbe penthouse.",
      es: "Disfruta de una vida de lujo con vistas panorámicas de la ciudad desde este impresionante ático."
    },
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
    category: "Iconic Cities",
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    title_i18n: {
      en: "Ski-In/Ski-Out Chalet",
      hi: "स्की-इन/स्की-आउट शैले",
      fr: "Chalet ski-in/ski-out",
      es: "Chalet ski-in/ski-out"
    },
    description:
      "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
    description_i18n: {
      en: "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
      hi: "स्विस आल्प्स के इस स्की-इन/स्की-आउट शैले में अपने दरवाज़े से ही ढलानों पर निकलें।",
      fr: "Accédez aux pistes directement depuis votre porte dans ce chalet ski-in/ski-out des Alpes suisses.",
      es: "Accede a las pistas directamente desde tu puerta en este chalet ski-in/ski-out en los Alpes suizos."
    },
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
    category: "Mountains",
  },
  {
    title: "Safari Lodge in the Serengeti",
    title_i18n: {
      en: "Safari Lodge in the Serengeti",
      hi: "सेरेनगेटी में सफ़ारी लॉज",
      fr: "Lodge safari dans le Serengeti",
      es: "Lodge de safari en el Serengueti"
    },
    description:
      "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
    description_i18n: {
      en: "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
      hi: "आरामदायक सफ़ारी लॉज में जंगल के रोमांच का अनुभव करें। ग्रेट माइग्रेशन को करीब से देखें।",
      fr: "Vivez les sensations de la nature sauvage dans un lodge confortable. Assistez de près à la Grande Migration.",
      es: "Vive la emoción de lo salvaje en un cómodo lodge de safari. Sé testigo de la Gran Migración de cerca."
    },
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
    category: "Trending",
  },
  {
    title: "Historic Canal House",
    title_i18n: {
      en: "Historic Canal House",
      hi: "ऐतिहासिक नहर का घर",
      fr: "Maison de canal historique",
      es: "Casa histórica del canal"
    },
    description:
      "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
    description_i18n: {
      en: "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
      hi: "एम्स्टर्डम के प्रतिष्ठित क्षेत्र में इस खूबसूरती से संरक्षित नहर-घर में इतिहास का अनुभव करें।",
      fr: "Séjournez dans un morceau d'histoire dans cette maison de canal magnifiquement préservée du quartier emblématique d'Amsterdam.",
      es: "Alójate en un pedazo de historia en esta casa de canal bellamente conservada en el icónico distrito de Ámsterdam."
    },
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
    category: "Iconic Cities",
  },
  {
    title: "Private Island Retreat",
    title_i18n: {
      en: "Private Island Retreat",
      hi: "निजी द्वीप रिट्रीट",
      fr: "Retraite sur une île privée",
      es: "Retiro en isla privada"
    },
    description:
      "Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.",
    description_i18n: {
      en: "Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.",
      hi: "पूरे द्वीप को अपने लिए पाकर एक अद्वितीय और अविस्मरणीय छुट्टी का अनुभव लें।",
      fr: "Profitez d'une île entière rien que pour vous pour une expérience de vacances exclusive et inoubliable.",
      es: "Disfruta de una isla entera para ti solo para una experiencia vacacional exclusiva e inolvidable."
    },
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 10000,
    location: "Fiji",
    country: "Fiji",
    category: "Amazing Pools",
  },
  {
    title: "Charming Cottage in the Cotswolds",
    title_i18n: {
      en: "Charming Cottage in the Cotswolds",
      hi: "कॉटस्वोल्ड्स में आकर्षक कुटिया",
      fr: "Charmant cottage dans les Cotswolds",
      es: "Encantadora cabaña en los Cotswolds"
    },
    description:
      "Escape to the picturesque Cotswolds in this quaint and charming cottage with a thatched roof.",
    description_i18n: {
      en: "Escape to the picturesque Cotswolds in this quaint and charming cottage with a thatched roof.",
      hi: "घास-फूस की छत वाली इस सुंदर और आकर्षक कुटिया में मनमोहक कॉट्सवोल्ड्स की सैर करें।",
      fr: "Évadez-vous dans les pittoresques Cotswolds dans ce cottage charmant au toit de chaume.",
      es: "Escápate a los pintorescos Cotswolds en esta acogedora y encantadora cabaña con techo de paja."
    },
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhY2glMjB2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "Cotswolds",
    country: "United Kingdom",
    category: "Rooms",
  },
  {
    title: "Historic Brownstone in Boston",
    title_i18n: {
      en: "Historic Brownstone in Boston",
      hi: "बोस्टन में ऐतिहासिक ब्राउनस्टोन",
      fr: "Maison en grès brun historique à Boston",
      es: "Histórica casa brownstone en Boston"
    },
    description:
      "Step back in time in this elegant historic brownstone located in the heart of Boston.",
    description_i18n: {
      en: "Step back in time in this elegant historic brownstone located in the heart of Boston.",
      hi: "बोस्टन के हृदय में स्थित इस सुरुचिपूर्ण ऐतिहासिक ब्राउनस्टोन में समय में पीछे जाएँ।",
      fr: "Remontez le temps dans cette élégante maison historique située au cœur de Boston.",
      es: "Viaja en el tiempo en esta elegante casa histórica situada en el corazón de Boston."
    },
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 2200,
    location: "Boston",
    country: "United States",
    category: "Iconic Cities",
  },
  {
    title: "Beachfront Bungalow in Bali",
    title_i18n: {
      en: "Beachfront Bungalow in Bali",
      hi: "बाली में समुद्रतट बंगला",
      fr: "Bungalow en bord de mer à Bali",
      es: "Bungaló frente a la playa en Bali"
    },
    description:
      "Relax on the sandy shores of Bali in this beautiful beachfront bungalow with a private pool.",
    description_i18n: {
      en: "Relax on the sandy shores of Bali in this beautiful beachfront bungalow with a private pool.",
      hi: "निजी पूल वाले इस सुंदर समुद्रतट बंगले में बाली के रेतीले किनारों पर आराम करें।",
      fr: "Détendez-vous sur les plages de sable de Bali dans ce magnifique bungalow en bord de mer avec piscine privée.",
      es: "Relájate en las arenas de Bali en este hermoso bungaló frente al mar con piscina privada."
    },
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602391833977-358a52198938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Bali",
    country: "Indonesia",
    category: "Amazing Pools",
  },
  {
    title: "Mountain View Cabin in Banff",
    title_i18n: {
      en: "Mountain View Cabin in Banff",
      hi: "बैनफ में पर्वत दृश्य केबिन",
      fr: "Cabane avec vue sur la montagne à Banff",
      es: "Cabaña con vista a la montaña en Banff"
    },
    description:
      "Enjoy breathtaking mountain views from this cozy cabin in the Canadian Rockies.",
    description_i18n: {
      en: "Enjoy breathtaking mountain views from this cozy cabin in the Canadian Rockies.",
      hi: "कनाडाई रॉकीज़ में इस आरामदायक केबिन से मनमोहक पर्वतीय दृश्यों का आनंद लें।",
      fr: "Profitez de vues imprenables sur la montagne depuis cette cabane confortable dans les Rocheuses canadiennes.",
      es: "Disfruta de impresionantes vistas a la montaña desde esta acogedora cabaña en las Rocosas canadienses."
    },
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Banff",
    country: "Canada",
    category: "Mountains",
  },
  {
    title: "Art Deco Apartment in Miami",
    title_i18n: {
      en: "Art Deco Apartment in Miami",
      hi: "मियामी में आर्ट डेको अपार्टमेंट",
      fr: "Appartement Art déco à Miami",
      es: "Apartamento Art Decó en Miami"
    },
    description:
      "Step into the glamour of the 1920s in this stylish Art Deco apartment in South Beach.",
    description_i18n: {
      en: "Step into the glamour of the 1920s in this stylish Art Deco apartment in South Beach.",
      hi: "साउथ बीच के इस स्टाइलिश आर्ट डेको अपार्टमेंट में 1920 के दशक की शान का अनुभव करें।",
      fr: "Entrez dans le glamour des années 1920 dans cet élégant appartement Art déco à South Beach.",
      es: "Entra en el glamour de los años 20 en este elegante apartamento Art Decó en South Beach."
    },
    image: {
      filename: "listingimage",
      url: "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1600,
    location: "Miami",
    country: "United States",
    category: "Iconic Cities",
  },
  {
    title: "Tropical Villa in Phuket",
    title_i18n: {
      en: "Tropical Villa in Phuket",
      hi: "फुकेत में उष्णकटिबंधीय विला",
      fr: "Villa tropicale à Phuket",
      es: "Villa tropical en Phuket"
    },
    description:
      "Escape to a tropical paradise in this luxurious villa with a private infinity pool in Phuket.",
    description_i18n: {
      en: "Escape to a tropical paradise in this luxurious villa with a private infinity pool in Phuket.",
      hi: "फुकेत में निजी इन्फिनिटी पूल वाले इस शानदार विला में उष्णकटिबंधीय स्वर्ग का आनंद लें।",
      fr: "Évadez-vous vers un paradis tropical dans cette luxueuse villa avec piscine à débordement privée à Phuket.",
      es: "Escapa a un paraíso tropical en esta lujosa villa con piscina infinita privada en Phuket."
    },
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 3000,
    location: "Phuket",
    country: "Thailand",
    category: "Amazing Pools",
  },
  {
    title: "Historic Castle in Scotland",
    title_i18n: {
      en: "Historic Castle in Scotland",
      hi: "स्कॉटलैंड में ऐतिहासिक किला",
      fr: "Château historique en Écosse",
      es: "Castillo histórico en Escocia"
    },
    description:
      "Live like royalty in this historic castle in the Scottish Highlands. Explore the rugged beauty of the area.",
    description_i18n: {
      en: "Live like royalty in this historic castle in the Scottish Highlands. Explore the rugged beauty of the area.",
      hi: "स्कॉटिश हाइलैंड्स के इस ऐतिहासिक किले में राजसी जीवन जिएँ। क्षेत्र की खुरदरी सुंदरता का अन्वेषण करें।",
      fr: "Vivez comme des rois dans ce château historique des Highlands écossais. Explorez la beauté sauvage de la région.",
      es: "Vive como la realeza en este castillo histórico en las Tierras Altas escocesas. Explora la belleza agreste del lugar."
    },
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJlYWNoJTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 4000,
    location: "Scottish Highlands",
    country: "United Kingdom",
    category: "Castles",
  },
  {
    title: "Desert Oasis in Dubai",
    title_i18n: {
      en: "Desert Oasis in Dubai",
      hi: "दुबई में रेगिस्तानी नखलिस्तान",
      fr: "Oasis du désert à Dubaï",
      es: "Oasis del desierto en Dubái"
    },
    description:
      "Experience luxury in the middle of the desert in this opulent oasis in Dubai with a private pool.",
    description_i18n: {
      en: "Experience luxury in the middle of the desert in this opulent oasis in Dubai with a private pool.",
      hi: "निजी पूल वाले इस भव्य दुबई नखलिस्तान में रेगिस्तान के बीच विलासिता का अनुभव करें।",
      fr: "Vivez le luxe au milieu du désert dans cette somptueuse oasis à Dubaï avec piscine privée.",
      es: "Experimenta el lujo en medio del desierto en este suntuoso oasis de Dubái con piscina privada."
    },
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 5000,
    location: "Dubai",
    country: "United Arab Emirates",
    category: "Amazing Pools",
  },
  {
    title: "Rustic Log Cabin in Montana",
    title_i18n: {
      en: "Rustic Log Cabin in Montana",
      hi: "मोंटाना में देहाती लकड़ी का केबिन",
      fr: "Cabane en rondins rustique dans le Montana",
      es: "Cabaña rústica de troncos en Montana"
    },
    description:
      "Unplug and unwind in this cozy log cabin surrounded by the natural beauty of Montana.",
    description_i18n: {
      en: "Unplug and unwind in this cozy log cabin surrounded by the natural beauty of Montana.",
      hi: "मोंटाना की प्राकृतिक सुंदरता से घिरे इस आरामदायक लकड़ी के केबिन में आराम करें।",
      fr: "Déconnectez-vous et détendez-vous dans cette cabane en rondins confortable, entourée par la beauté naturelle du Montana.",
      es: "Desconecta y relájate en esta acogedora cabaña de troncos rodeada de la belleza natural de Montana."
    },
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1100,
    location: "Montana",
    country: "United States",
    category: "Rooms",
  },
  {
    title: "Beachfront Villa in Greece",
    title_i18n: {
      en: "Beachfront Villa in Greece",
      hi: "ग्रीस में समुद्रतट विला",
      fr: "Villa en bord de mer en Grèce",
      es: "Villa frente a la playa en Grecia"
    },
    description:
      "Enjoy the crystal-clear waters of the Mediterranean in this beautiful beachfront villa on a Greek island.",
    description_i18n: {
      en: "Enjoy the crystal-clear waters of the Mediterranean in this beautiful beachfront villa on a Greek island.",
      hi: "ग्रीक द्वीप पर स्थित इस खूबसूरत समुद्रतट विला में भूमध्य सागर के स्वच्छ जल का आनंद लें।",
      fr: "Profitez des eaux cristallines de la Méditerranée dans cette magnifique villa en bord de mer sur une île grecque.",
      es: "Disfruta de las aguas cristalinas del Mediterráneo en esta hermosa villa frente al mar en una isla griega."
    },
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Mykonos",
    country: "Greece",
    category: "Trending",
  },
  {
    title: "Eco-Friendly Treehouse Retreat",
    title_i18n: {
      en: "Eco-Friendly Treehouse Retreat",
      hi: "पर्यावरण-अनुकूल ट्रीहाउस रिट्रीट",
      fr: "Retraite écoresponsable en cabane dans les arbres",
      es: "Retiro ecológico en casa del árbol"
    },
    description:
      "Stay in an eco-friendly treehouse nestled in the forest. It's the perfect escape for nature lovers.",
    description_i18n: {
      en: "Stay in an eco-friendly treehouse nestled in the forest. It's the perfect escape for nature lovers.",
      hi: "वन में स्थित एक पर्यावरण-अनुकूल ट्रीहाउस में रहें। प्रकृति प्रेमियों के लिए उत्तम स्थान।",
      fr: "Séjournez dans une cabane écologique nichée dans la forêt. Le refuge idéal pour les amoureux de la nature.",
      es: "Alójate en una casa del árbol ecológica enclavada en el bosque. El escape perfecto para los amantes de la naturaleza."
    },
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 750,
    location: "Costa Rica",
    country: "Costa Rica",
    category: "Camping",
  },
  {
    title: "Historic Cottage in Charleston",
    title_i18n: {
      en: "Historic Cottage in Charleston",
      hi: "चार्ल्सटन में ऐतिहासिक कुटिया",
      fr: "Cottage historique à Charleston",
      es: "Cabaña histórica en Charleston"
    },
    description:
      "Experience the charm of historic Charleston in this beautifully restored cottage with a private garden.",
    description_i18n: {
      en: "Experience the charm of historic Charleston in this beautifully restored cottage with a private garden.",
      hi: "निजी बगीचे वाली इस खूबसूरती से पुनर्निर्मित कुटिया में ऐतिहासिक चार्ल्सटन के आकर्षण का अनुभव करें।",
      fr: "Découvrez le charme du Charleston historique dans ce cottage magnifiquement restauré avec jardin privé.",
      es: "Vive el encanto del histórico Charleston en esta cabaña bellamente restaurada con jardín privado."
    },
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 1600,
    location: "Charleston",
    country: "United States",
    category: "Iconic Cities",
  },
  {
    title: "Modern Apartment in Tokyo",
    title_i18n: {
      en: "Modern Apartment in Tokyo",
      hi: "टोक्यो में आधुनिक अपार्टमेंट",
      fr: "Appartement moderne à Tokyo",
      es: "Apartamento moderno en Tokio"
    },
    description:
      "Explore the vibrant city of Tokyo from this modern and centrally located apartment.",
    description_i18n: {
      en: "Explore the vibrant city of Tokyo from this modern and centrally located apartment.",
      hi: "इस आधुनिक और केंद्रीय रूप से स्थित अपार्टमेंट से टोक्यो के जीवंत शहर का अन्वेषण करें।",
      fr: "Explorez la ville vibrante de Tokyo depuis cet appartement moderne et central.",
      es: "Explora la vibrante ciudad de Tokio desde este moderno apartamento céntrico."
    },
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRva3lvfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    price: 2000,
    location: "Tokyo",
    country: "Japan",
    category: "Iconic Cities",
  },
  {
    title: "Lakefront Cabin in New Hampshire",
    title_i18n: {
      en: "Lakefront Cabin in New Hampshire",
      hi: "न्यू हैम्पशायर में झील किनारे केबिन",
      fr: "Cabane au bord du lac dans le New Hampshire",
      es: "Cabaña frente al lago en New Hampshire"
    },
    description:
      "Spend your days by the lake in this cozy cabin in the scenic White Mountains of New Hampshire.",
    description_i18n: {
      en: "Spend your days by the lake in this cozy cabin in the scenic White Mountains of New Hampshire.",
      hi: "न्यू हैम्पशायर के सुंदर व्हाइट माउंटेन्स में स्थित इस आरामदायक केबिन में झील किनारे अपने दिन बिताएँ।",
      fr: "Passez vos journées au bord du lac dans cette cabane confortable des pittoresques Montagnes Blanches du New Hampshire.",
      es: "Pasa tus días junto al lago en esta acogedora cabaña en las pintorescas Montañas Blancas de New Hampshire."
    },
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "New Hampshire",
    country: "United States",
    category: "Rooms",
  },
  {
    title: "Luxury Villa in the Maldives",
    title_i18n: {
      en: "Luxury Villa in the Maldives",
      hi: "मालदीव में लग्ज़री विला",
      fr: "Villa de luxe aux Maldives",
      es: "Villa de lujo en las Maldivas"
    },
    description:
      "Indulge in luxury in this overwater villa in the Maldives with stunning views of the Indian Ocean.",
    description_i18n: {
      en: "Indulge in luxury in this overwater villa in the Maldives with stunning views of the Indian Ocean.",
      hi: "भारतीय महासागर के शानदार दृश्यों के साथ इस वाटर-विला में विलासिता का आनंद लें।",
      fr: "Profitez du luxe dans cette villa sur l'eau aux Maldives avec des vues imprenables sur l'océan Indien.",
      es: "Disfruta del lujo en esta villa sobre el agua en las Maldivas con impresionantes vistas del océano Índico."
    },
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 6000,
    location: "Maldives",
    country: "Maldives",
    category: "Amazing Pools",
  },
  {
    title: "Ski Chalet in Aspen",
    title_i18n: {
      en: "Ski Chalet in Aspen",
      hi: "एस्पेन में स्की शैले",
      fr: "Chalet de ski à Aspen",
      es: "Chalet de esquí en Aspen"
    },
    description:
      "Hit the slopes in style with this luxurious ski chalet in the world-famous Aspen ski resort.",
    description_i18n: {
      en: "Hit the slopes in style with this luxurious ski chalet in the world-famous Aspen ski resort.",
      hi: "विश्व-प्रसिद्ध एस्पेन स्की रिसॉर्ट में इस शानदार स्की शैले के साथ स्टाइल में स्की करें।",
      fr: "Dévalez les pistes avec style dans ce luxueux chalet de ski de la célèbre station d'Aspen.",
      es: "Disfruta de las pistas con estilo en este lujoso chalet de esquí en la famosa estación de Aspen."
    },
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxha2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 4000,
    location: "Aspen",
    country: "United States",
    category: "Mountains",
  },
  {
    title: "Secluded Beach House in Costa Rica",
    title_i18n: {
      en: "Secluded Beach House in Costa Rica",
      hi: "कोस्टा रिका में एकांत बीच हाउस",
      fr: "Maison de plage isolée au Costa Rica",
      es: "Casa de playa aislada en Costa Rica"
    },
    description:
      "Escape to a secluded beach house on the Pacific coast of Costa Rica. Surf, relax, and unwind.",
    description_i18n: {
      en: "Escape to a secluded beach house on the Pacific coast of Costa Rica. Surf, relax, and unwind.",
      hi: "कोस्टा रिका के प्रशांत तट पर एकांत बीच हाउस में जाएँ। सर्फ करें, आराम करें और तनावमुक्त रहें।",
      fr: "Évadez-vous dans une maison de plage isolée sur la côte pacifique du Costa Rica. Surfez, détendez-vous et lâchez prise.",
      es: "Escápate a una casa de playa apartada en la costa del Pacífico de Costa Rica. Surfea, relájate y descansa."
    },
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Costa Rica",
    country: "Costa Rica",
    category: "Trending",
  },
  
];

module.exports = { data: sampleListings };
