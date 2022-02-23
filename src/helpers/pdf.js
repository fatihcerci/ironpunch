export const Document = {
  isPrintedBefore: false,
  raporTarihi: '',
  info: {
    title: "",
    author: "sistem",
    subject: "ekspertiz raporu",
    keywords: "ekspertiz, rapor, oto dışı",
  },
  content: [
    {
      index: 0,
      style: "header",
      table: {
        widths: ["*"],
        body: [["Ekspertiz Raporu"]],
      },
      layout: {
        fillColor: function (rowIndex, node, columnIndex) {
          return rowIndex % 2 === 0 ? "black" : null
        },
        hLineColor: function (i, node) {
          return "black"
        },
        vLineColor: function (i, node) {
          return "black"
        },
      },
      margin: [0, 0, 0, 5],
    },
    {
			index: 1,
      style: "tableHeader",
      table: {
        widths: ["*"],
        body: [["Dosya Bilgileri"]],
      },
      layout: {
        fillColor: function (rowIndex, node, columnIndex) {
          return "#b61738"
        },
        hLineColor: function (i, node) {
          return "#b61738"
        },
        vLineColor: function (i, node) {
          return "#b61738"
        },
      },
      margin: [0, 0, 0, 5],
    },
    {
			index: 2,
      style: "table_1",
      table: {
        widths: [60, "auto", "auto", 90, "auto", "*"],
        body: [
          [
            "Dosya Nu",
            ":",
            "@dosyaNumarasi",
            "Dosya Yöneticisi",
            ":",
            "@dosyaYoneticisi",
          ],
          [
            "Rapor Nu",
            ":",
            {
              text: "@raporNu",

            },
            "Rapor Tarihi",
            ":",
            "@raporTarihi",
          ],
        ],
      },
      layout: {
        vLineWidth: function (i, node) {
          return i === 1 || i === 4 ? 0 : 1
        },
      },

      margin: [0, 0, 0, 5],
    },
    {
      index:3,
      text: `Sompo Sigorta A.Ş. Genel Müdürlüğüne`,
      style: "subheader",
    },
    {
      index:4,
      style: "tableHeader",
      table: {
        widths: ["*"],
        body: [[""]],
      },
      layout: {
        fillColor: function (rowIndex, node, columnIndex) {
          return ""
        },
        hLineColor: function (i, node) {
          return i === 0 ? "white" : ""
        },
        vLineColor: function (i, node) {
          return "white"
        },
      },
      margin: [0, 0, 0, 5],
    },
    {
      index:5,
      style: "tableHeader",
      table: {
        widths: ["*"],
        body: [["Poliçe Bilgileri"]],
      },
      layout: {
        fillColor: function (rowIndex, node, columnIndex) {
          return rowIndex % 2 === 0 ? "#b61738" : null
        },
        hLineColor: function (i, node) {
          return "#b61738"
        },
        vLineColor: function (i, node) {
          return "#b61738"
        },
      },
    },
    {
      index:6,
      style: "table_1",
      table: {
        widths: [160, "auto", "*", "*"],
        body: [
          [
            "Ürün Adı / Poliçe Türü",
            ":",
            {
              text: "@urunAdi / @urunGrubu",
              colSpan: 2,
            },
            {},
          ],
          [
            "Acente Nu / Poliçe Nu",
            ":",
            { text: "@acenteNo / @policeNo", colSpan: 2 },
            {},
          ],
          [
            "Poliçe Vadesi / Tanzim Tarihi",
            ":",
            { text: "@baslangicTarihi - @bitisTarihi / @tanzimTarihi", colSpan: 2 },
            {},
          ],
          ["Zeyilnâme", ":", { text: "@VarYok", colSpan: 2 }, {}],
          [
            "Önceki Dönem Poliçesi",
            ":",
            { text: "@VarYok", colSpan: 2 },
            {},
          ],
          [
            "Sigortalı Adı / @vergiAdi",
            ":",
            {
              text: "@sigortali / @tcknYknVkn",
              colSpan: 2,
            },
            {},
          ],
          [
            "Banka Hesap Bilgisi",
            ":",
            { text: "@iban", colSpan: 2 },
            {},
          ],
          [
            "Rehinli Alacaklı",
            ":",
            { text: "---", color: "red", colSpan: 2 },
            {},
          ],
          [
            "Riziko Adresi",
            ":",
            {
              text: `@rizikoAdresi`,
              colSpan: 2,
            },
            {},
          ],
          [
            "Faaliyet Konusu",
            ":",
            { text: `---`, colSpan: 2 },
            {},
          ],
          [
            "Enflasyon / Artış Katsayısı",
            ":",
            { text: "0 %", color: "red", colSpan: 2 },
            {},
          ],
          [
            "Sigortalı Kıymetler / Teminat",
            ":",
            { text: "Poliçedeki Sigorta Bedeli", alignment: "center" },
            { text: "Enflasyonlu Sigorta Bedeli", alignment: "center" },
          ],
          [
            "Mutabakatlı Kayıt / Ekli Liste",
            ":",
            { text: "Yok", colSpan: 2 },
            {},
          ],
          ["Poliçe Özel Şartı", ":", { text: "---", colSpan: 2 }, {}],
          ["Müşterek Sigorta", ":", { text: "---", colSpan: 2 }, {}],
          ["Muafiyet", ":", { text: "---", colSpan: 2 }, {}],
        ],
      },
      layout: {
        vLineWidth: function (i, node) {
          return i === 1 ? 0 : 1
        },
      },

      margin: [0, 5, 0, 5],
    },
    {
      index:7,
      style: "tableHeader",
      table: {
        widths: ["*"],
        body: [["Hasar Bilgileri"]],
      },
      layout: {
        fillColor: function (rowIndex, node, columnIndex) {
          return rowIndex % 2 === 0 ? "#b61738" : null
        },
        hLineColor: function (i, node) {
          return "#b61738"
        },
        vLineColor: function (i, node) {
          return "#b61738"
        },
      },
    },
    {
      index:8,
      style: "table_1",
      table: {
        widths: [160, "auto", "*", "*"],
        body: [
          [
            "Hasar Tarihi",
            ":",
            {
              text: "@hasarTarihi",
              colSpan: 2,
            },
            {},
          ],
          [
            "Hasar Nedeni",
            ":",
            { text: "@hasarNedeni", colSpan: 2 },
            {},
          ],
          ["Hasara Maruz Kıymetler", ":", { text: "", colSpan: 2 }, {}],
          [
            "",
            "",
            { text: "Talep Tutarı", alignment: "center" },
            { text: "Tespit Tutarı", alignment: "center" },
          ],
          [
            "Tutarlar",
            ":",
            { text: "@sigortaliTalepMiktariToplam", alignment: "right" },
            { text: "@eksperTespitMiktariToplam", alignment: "right" },
          ],
          [
            { text: "Tazminat Tutarı", bold: true, fontSize: 14 },
            { text: ":", bold: true, fontSize: 14 },
            { text: "@tazminatTutari", colSpan: 2, bold: true, fontSize: 14 },
            {},
          ],
          ["Rücu İmkânı", ":", { text: "Yok", colSpan: 2 }, {}],
        ],
      },
      layout: {
        fillColor: function (rowIndex, node, columnIndex) {
          return rowIndex === 5 ? "#ef9a9a" : null
        },
        vLineWidth: function (i, node) {
          return i === 1 ? 0 : 1
        },
      },

      margin: [0, 5, 0, 5],
      //pageBreak: "after",
    },
   /* {
      style: "tableHeader",
      table: {
        widths: ["*"],
        body: [[{ text: "1. Sunum", color: "white" }]],
      },
      layout: {
        fillColor: function (rowIndex, node, columnIndex) {
          return rowIndex % 2 === 0 ? "#b61738" : null
        },
        hLineColor: function (i, node) {
          return "#b61738"
        },
        vLineColor: function (i, node) {
          return "#b61738"
        },
      },
      margin: [0, 0, 0, 5],
    },
    {
      text: `Sigortalı yerde meydana gelen hasara ilişkin olarak aşağıda aktarılan süreçte ekspertiz çalışması yapılmış ve akabinde iş bu raporumuz tanzim edilmiştir.`,
      alignment: "justify",
    },
    {
      style: "table_1",
      table: {
        widths: [160, "auto", "*", "*"],
        body: [
          [
            "Ekspertiz Talep Tarihi",
            ":",
            { text: "20.01.2020", colSpan: 2 },
            {},
          ],
          ["İlk Ekspertiz Tarihi", ":", { text: "20.01.2020", colSpan: 2 }, {}],
          [
            "Ekspertiz Adresi",
            ":",
            { text: "Hasar adresi riziko adresiyle aynıdır.", colSpan: 2 },
            {},
          ],
          [
            "Ekspertizde Görüşülen Kişiler",
            ":",
            { text: `Yeliz Hanım 0533 444 55 66`, colSpan: 2 },
            {},
          ],
          ["Asistans Hizmet", ":", { text: `Alınmadı`, colSpan: 2 }, {}],
          [
            "Mutabakat Durumu",
            ":",
            {
              text: `Belirlenen hasar miktar ve tutarı ile teminata ilişkin değerlendirmelerimiz konusunda site yönetiminden Erkan Kaya Bey'e, site yönetim kurulu başkanına sözlü olarak bilgi verilmiş, mutabakat sağlanmıştır.`,
              colSpan: 2,
              alignment: "justify",
            },
            {},
          ],
        ],
      },
      layout: {
        vLineWidth: function (i, node) {
          return i === 1 ? 0 : 1
        },
      },

      margin: [0, 5, 0, 5],
    },
    {
      style: "tableHeader",
      table: {
        widths: ["*"],
        body: [
          [{ text: `2. Sigortalı Firma Hakkında Bilgiler`, color: "white" }],
        ],
      },
      layout: {
        fillColor: function (rowIndex, node, columnIndex) {
          return rowIndex % 2 === 0 ? "#b61738" : null
        },
        hLineColor: function (i, node) {
          return "#b61738"
        },
        vLineColor: function (i, node) {
          return "#b61738"
        },
      },
      margin: [0, 0, 0, 5],
    },
    {
      text: [
        {
          text: `Sigortalı Çınar Olimpia Park Konutları 2.Etap E-F-G blokları yönetimidir. Poliçe ortak kullanım alanları için düzenlenmiştir. `,
          alignment: "justify",
        },
        {
          text: "http://www.cinarolimpiapark.com/",
          link: "http://www.cinarolimpiapark.com/",
          decoration: "underline",
          color: "blue",
        },
      ],
    },
    {
      text: `Sitenin 8 yıllık olduğu öğrenilmiştir. Bitişik yapıdadır. 3 bloktan oluşmakta olup, 196 dairenin olduğu öğrenilmiştir. Her blok -2, -1, 0, 12 kattan oluşmaktadır.`,
      alignment: "justify",
    },
    {
      style: "table_1",
      table: {
        widths: [160, "auto", "*", "*"],
        body: [
          [
            "Sigrta Bedeli (Hasar anındaki)",
            ":",
            { text: `4.400.000,00 TL`, colSpan: 2, color: "red" },
            {},
          ],
          ["Sigrta Değeri", ":", { text: `4.400.000,00 TL`, colSpan: 2 }, {}],
          [
            "Bedel - Değer Uygunluğu",
            ":",
            { text: "Eksik sigorta yoktur.", colSpan: 2 },
            {},
          ],
        ],
      },
      layout: {
        vLineWidth: function (i, node) {
          return i === 1 ? 0 : 1
        },
      },

      margin: [0, 5, 0, 5],
    },
    {
      style: "tableHeader",
      table: {
        widths: ["*"],
        body: [[{ text: "3. Hasar", color: "white" }]],
      },
      layout: {
        fillColor: function (rowIndex, node, columnIndex) {
          return rowIndex % 2 === 0 ? "#b61738" : null
        },
        hLineColor: function (i, node) {
          return "#b61738"
        },
        vLineColor: function (i, node) {
          return "#b61738"
        },
      },
      margin: [0, 0, 0, 5],
    },*/
  ],
  styles: {
    header: {
      fontSize: 24,
      bold: true,
      color: "white",
      alignment: "center",
      margin: [0, 0, 0, 20],
    },
    subheader: {
      fontSize: 18,
      bold: true,
      margin: [0, 0, 0, 0],
    },
    horizontalLine: {
      bold: true,
      margin: [0, -10, 0, 10],
    },
    tableHeader: {
      color: "white",
    },
    small: {
      fontSize: 8,
    },
  },
}
