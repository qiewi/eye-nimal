export type AnimalInfo = {
  scientificName: string;
  image: string;
  category: string;
  about: string[];
};

export const animalEncyclopedia: Record<string, AnimalInfo> = {
  "anjing": {
    scientificName: "Canis lupus familiaris",
    image: "/animals/anjing.jpg",
    category: "Mamalia",
    about: [
      "Anjing adalah hewan peliharaan yang sangat setia dan telah hidup berdampingan dengan manusia selama ribuan tahun.",
      "Mereka memiliki berbagai ras dengan karakteristik dan ukuran yang berbeda-beda.",
      "Anjing dikenal sebagai sahabat manusia dan sering digunakan untuk membantu dalam berbagai tugas seperti berburu, menjaga rumah, dan terapi."
    ]
  },
  "ayam": {
    scientificName: "Gallus gallus domesticus",
    image: "/animals/ayam.jpg",
    category: "Unggas",
    about: [
      "Ayam adalah unggas yang banyak dipelihara untuk diambil daging dan telurnya.",
      "Ayam memiliki banyak ras dengan warna bulu dan ukuran yang beragam.",
      "Selain sebagai sumber pangan, ayam juga sering dipelihara sebagai hewan hias."
    ]
  },
  "domba": {
    scientificName: "Ovis aries",
    image: "/animals/domba.jpg",
    category: "Mamalia",
    about: [
      "Domba adalah hewan ternak yang dikenal karena bulunya yang dapat diolah menjadi wol.",
      "Domba juga dimanfaatkan daging dan susunya.",
      "Hewan ini hidup berkelompok dan sering ditemukan di padang rumput."
    ]
  },
  "gajah": {
    scientificName: "Elephas maximus",
    image: "/animals/gajah.jpg",
    category: "Mamalia",
    about: [
      "Gajah adalah mamalia darat terbesar di dunia yang dikenal dengan belalainya yang panjang.",
      "Gajah memiliki peran penting dalam ekosistem dan budaya di banyak negara Asia dan Afrika.",
      "Populasi gajah saat ini terancam akibat perburuan dan hilangnya habitat."
    ]
  },
  "kucing": {
    scientificName: "Felis catus",
    image: "/animals/kucing.jpg",
    category: "Mamalia",
    about: [
      "Kucing adalah hewan peliharaan populer yang dikenal dengan sifatnya yang mandiri dan lincah.",
      "Kucing memiliki kemampuan berburu yang baik dan sering digunakan untuk mengendalikan populasi tikus.",
      "Ada banyak ras kucing dengan warna dan pola bulu yang beragam."
    ]
  },
  "kuda": {
    scientificName: "Equus ferus caballus",
    image: "/animals/kuda.jpg",
    category: "Mamalia",
    about: [
      "Kuda adalah hewan yang telah lama digunakan manusia untuk transportasi, pertanian, dan olahraga.",
      "Kuda memiliki kekuatan dan kecepatan yang luar biasa.",
      "Banyak budaya di dunia yang memiliki hubungan erat dengan kuda."
    ]
  },
  "kupu-kupu": {
    scientificName: "Lepidoptera",
    image: "/animals/kupu-kupu.jpg",
    category: "Serangga",
    about: [
      "Kupu-kupu adalah serangga yang dikenal dengan sayapnya yang indah dan berwarna-warni.",
      "Mereka mengalami metamorfosis sempurna dari ulat menjadi kupu-kupu dewasa.",
      "Kupu-kupu berperan penting dalam penyerbukan tanaman."
    ]
  },
  "laba-laba": {
    scientificName: "Araneae",
    image: "/animals/laba-laba.jpg",
    category: "Arachnida",
    about: [
      "Laba-laba adalah hewan berkaki delapan yang dikenal dengan kemampuannya membuat jaring.",
      "Sebagian besar laba-laba tidak berbahaya bagi manusia dan membantu mengendalikan populasi serangga.",
      "Laba-laba ditemukan di hampir semua habitat di dunia."
    ]
  },
  "sapi": {
    scientificName: "Bos taurus",
    image: "/animals/sapi.jpg",
    category: "Mamalia",
    about: [
      "Sapi adalah hewan ternak penting yang dimanfaatkan daging, susu, dan kulitnya.",
      "Sapi juga digunakan sebagai hewan pekerja di beberapa negara.",
      "Ada banyak ras sapi dengan karakteristik yang berbeda-beda."
    ]
  },
  "tupai": {
    scientificName: "Sciuridae",
    image: "/animals/tupai.jpg",
    category: "Mamalia",
    about: [
      "Tupai adalah mamalia kecil yang lincah dan sering ditemukan di pepohonan.",
      "Mereka memakan biji-bijian, buah, dan kadang-kadang serangga.",
      "Tupai dikenal dengan ekornya yang lebat dan kemampuannya melompat dari satu pohon ke pohon lain."
    ]
  }
};