// All 195 Official World Countries Database (193 UN Members + 2 UN Observers)
// Includes Authentic National Flags, ISO 3-letter codes, Emojis, Colors & Crisp Canvas Texture Generators
const COUNTRIES_DATA = [
  {
    "code": "AFG",
    "name": "Afghanistan",
    "emoji": "🇦🇫",
    "colors": [
      "#000000",
      "#D32011",
      "#007A36"
    ],
    "pattern": "v-tricolor"
  },
  {
    "code": "ALB",
    "name": "Albania",
    "emoji": "🇦🇱",
    "colors": [
      "#E41E20",
      "#000000"
    ],
    "pattern": "solid"
  },
  {
    "code": "DZA",
    "name": "Algeria",
    "emoji": "🇩🇿",
    "colors": [
      "#006233",
      "#FFFFFF",
      "#D21034"
    ],
    "pattern": "v-bicolor"
  },
  {
    "code": "AND",
    "name": "Andorra",
    "emoji": "🇦🇩",
    "colors": [
      "#10069F",
      "#FED100",
      "#D50032"
    ],
    "pattern": "v-tricolor"
  },
  {
    "code": "AGO",
    "name": "Angola",
    "emoji": "🇦🇴",
    "colors": [
      "#CC092F",
      "#000000",
      "#FFCC00"
    ],
    "pattern": "h-bicolor"
  },
  {
    "code": "ATG",
    "name": "Antigua and Barbuda",
    "emoji": "🇦🇬",
    "colors": [
      "#CE1126",
      "#000000",
      "#0072CE",
      "#FFFFFF"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "ARG",
    "name": "Argentina",
    "emoji": "🇦🇷",
    "colors": [
      "#74ACDF",
      "#FFFFFF",
      "#74ACDF"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "ARM",
    "name": "Armenia",
    "emoji": "🇦🇲",
    "colors": [
      "#D90012",
      "#0033A0",
      "#F2A800"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "AUS",
    "name": "Australia",
    "emoji": "🇦🇺",
    "colors": [
      "#00008B",
      "#FFFFFF",
      "#FF0000"
    ],
    "pattern": "cross"
  },
  {
    "code": "AUT",
    "name": "Austria",
    "emoji": "🇦🇹",
    "colors": [
      "#ED2939",
      "#FFFFFF",
      "#ED2939"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "AZE",
    "name": "Azerbaijan",
    "emoji": "🇦🇿",
    "colors": [
      "#00B5E2",
      "#EF3340",
      "#509E2F"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "BHS",
    "name": "Bahamas",
    "emoji": "🇧🇸",
    "colors": [
      "#00778B",
      "#FFC72C",
      "#000000"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "BHR",
    "name": "Bahrain",
    "emoji": "🇧🇭",
    "colors": [
      "#FFFFFF",
      "#CE1126"
    ],
    "pattern": "v-bicolor"
  },
  {
    "code": "BGD",
    "name": "Bangladesh",
    "emoji": "🇧🇩",
    "colors": [
      "#006A4E",
      "#F42A41"
    ],
    "pattern": "circle"
  },
  {
    "code": "BRB",
    "name": "Barbados",
    "emoji": "🇧🇧",
    "colors": [
      "#00267F",
      "#FFC72C",
      "#000000"
    ],
    "pattern": "v-tricolor"
  },
  {
    "code": "BLR",
    "name": "Belarus",
    "emoji": "🇧🇾",
    "colors": [
      "#C8313E",
      "#4AA658"
    ],
    "pattern": "h-bicolor"
  },
  {
    "code": "BEL",
    "name": "Belgium",
    "emoji": "🇧🇪",
    "colors": [
      "#000000",
      "#FFD100",
      "#FF0F21"
    ],
    "pattern": "v-tricolor"
  },
  {
    "code": "BLZ",
    "name": "Belize",
    "emoji": "🇧🇿",
    "colors": [
      "#003F87",
      "#CE1126",
      "#FFFFFF"
    ],
    "pattern": "solid"
  },
  {
    "code": "BEN",
    "name": "Benin",
    "emoji": "🇧🇯",
    "colors": [
      "#008751",
      "#FCD116",
      "#E8112D"
    ],
    "pattern": "v-tricolor"
  },
  {
    "code": "BTN",
    "name": "Bhutan",
    "emoji": "🇧🇹",
    "colors": [
      "#FFD520",
      "#FF4E12"
    ],
    "pattern": "h-bicolor"
  },
  {
    "code": "BOL",
    "name": "Bolivia",
    "emoji": "🇧🇴",
    "colors": [
      "#D52B1E",
      "#F9E300",
      "#007934"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "BIH",
    "name": "Bosnia and Herzegovina",
    "emoji": "🇧🇦",
    "colors": [
      "#002395",
      "#FECB00",
      "#FFFFFF"
    ],
    "pattern": "solid"
  },
  {
    "code": "BWA",
    "name": "Botswana",
    "emoji": "🇧🇼",
    "colors": [
      "#75AADB",
      "#000000",
      "#FFFFFF"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "BRA",
    "name": "Brazil",
    "emoji": "🇧🇷",
    "colors": [
      "#009C3B",
      "#FFDF00",
      "#002776"
    ],
    "pattern": "circle"
  },
  {
    "code": "BRN",
    "name": "Brunei",
    "emoji": "🇧🇳",
    "colors": [
      "#F7E017",
      "#FFFFFF",
      "#000000"
    ],
    "pattern": "solid"
  },
  {
    "code": "BGR",
    "name": "Bulgaria",
    "emoji": "🇧🇬",
    "colors": [
      "#FFFFFF",
      "#00966E",
      "#D62612"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "BFA",
    "name": "Burkina Faso",
    "emoji": "🇧🇫",
    "colors": [
      "#EF3340",
      "#009739",
      "#FCD116"
    ],
    "pattern": "h-bicolor"
  },
  {
    "code": "BDI",
    "name": "Burundi",
    "emoji": "🇧🇮",
    "colors": [
      "#1EB53A",
      "#CE1126",
      "#FFFFFF"
    ],
    "pattern": "cross"
  },
  {
    "code": "CPV",
    "name": "Cabo Verde",
    "emoji": "🇨🇻",
    "colors": [
      "#003893",
      "#FFFFFF",
      "#CF2027"
    ],
    "pattern": "h-stripes"
  },
  {
    "code": "KHM",
    "name": "Cambodia",
    "emoji": "🇰🇭",
    "colors": [
      "#032EA1",
      "#E00025",
      "#032EA1"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "CMR",
    "name": "Cameroon",
    "emoji": "🇨🇲",
    "colors": [
      "#007A5E",
      "#CE1126",
      "#FCD116"
    ],
    "pattern": "v-tricolor"
  },
  {
    "code": "CAN",
    "name": "Canada",
    "emoji": "🇨🇦",
    "colors": [
      "#FF0000",
      "#FFFFFF",
      "#FF0000"
    ],
    "pattern": "v-tricolor"
  },
  {
    "code": "CAF",
    "name": "Central African Republic",
    "emoji": "🇨🇫",
    "colors": [
      "#003082",
      "#FFFFFF",
      "#289728",
      "#FFCE00",
      "#D21034"
    ],
    "pattern": "h-stripes"
  },
  {
    "code": "TCD",
    "name": "Chad",
    "emoji": "🇹🇩",
    "colors": [
      "#00205B",
      "#FFCD00",
      "#C8102E"
    ],
    "pattern": "v-tricolor"
  },
  {
    "code": "CHL",
    "name": "Chile",
    "emoji": "🇨🇱",
    "colors": [
      "#FFFFFF",
      "#D52B1E",
      "#0039A6"
    ],
    "pattern": "h-bicolor"
  },
  {
    "code": "CHN",
    "name": "China",
    "emoji": "🇨🇳",
    "colors": [
      "#DE2910",
      "#FFDE00"
    ],
    "pattern": "solid"
  },
  {
    "code": "COL",
    "name": "Colombia",
    "emoji": "🇨🇴",
    "colors": [
      "#FCD116",
      "#003893",
      "#CE1126"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "COM",
    "name": "Comoros",
    "emoji": "🇰🇲",
    "colors": [
      "#FFC72C",
      "#FFFFFF",
      "#E03C31",
      "#3A75C4",
      "#3D9B35"
    ],
    "pattern": "h-stripes"
  },
  {
    "code": "COG",
    "name": "Congo",
    "emoji": "🇨🇬",
    "colors": [
      "#009543",
      "#FBDE4A",
      "#DC241F"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "COD",
    "name": "DR Congo",
    "emoji": "🇨🇩",
    "colors": [
      "#007FFF",
      "#F7D618",
      "#CE1021"
    ],
    "pattern": "solid"
  },
  {
    "code": "CRI",
    "name": "Costa Rica",
    "emoji": "🇨🇷",
    "colors": [
      "#002B7F",
      "#FFFFFF",
      "#CE1126"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "CIV",
    "name": "Ivory Coast",
    "emoji": "🇨🇮",
    "colors": [
      "#F77F00",
      "#FFFFFF",
      "#009A44"
    ],
    "pattern": "v-tricolor"
  },
  {
    "code": "HRV",
    "name": "Croatia",
    "emoji": "🇭🇷",
    "colors": [
      "#FF0000",
      "#FFFFFF",
      "#171796"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "CUB",
    "name": "Cuba",
    "emoji": "🇨🇺",
    "colors": [
      "#002A8F",
      "#FFFFFF",
      "#CB1515"
    ],
    "pattern": "h-stripes"
  },
  {
    "code": "CYP",
    "name": "Cyprus",
    "emoji": "🇨🇾",
    "colors": [
      "#FFFFFF",
      "#D57800",
      "#4E5B31"
    ],
    "pattern": "solid"
  },
  {
    "code": "CZE",
    "name": "Czechia",
    "emoji": "🇨🇿",
    "colors": [
      "#FFFFFF",
      "#D7141A",
      "#11457E"
    ],
    "pattern": "h-bicolor"
  },
  {
    "code": "DNK",
    "name": "Denmark",
    "emoji": "🇩🇰",
    "colors": [
      "#C60C30",
      "#FFFFFF"
    ],
    "pattern": "cross"
  },
  {
    "code": "DJI",
    "name": "Djibouti",
    "emoji": "🇩🇯",
    "colors": [
      "#6AB2E7",
      "#12AD2B",
      "#FFFFFF",
      "#D7141A"
    ],
    "pattern": "h-bicolor"
  },
  {
    "code": "DMA",
    "name": "Dominica",
    "emoji": "🇩🇲",
    "colors": [
      "#006B3F",
      "#FCD116",
      "#000000",
      "#FFFFFF",
      "#D7141A"
    ],
    "pattern": "cross"
  },
  {
    "code": "DOM",
    "name": "Dominican Republic",
    "emoji": "🇩🇴",
    "colors": [
      "#002F6C",
      "#CE1126",
      "#FFFFFF"
    ],
    "pattern": "cross"
  },
  {
    "code": "ECU",
    "name": "Ecuador",
    "emoji": "🇪🇨",
    "colors": [
      "#FFD100",
      "#003893",
      "#CE1126"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "EGY",
    "name": "Egypt",
    "emoji": "🇪🇬",
    "colors": [
      "#CE1126",
      "#FFFFFF",
      "#000000"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "SLV",
    "name": "El Salvador",
    "emoji": "🇸🇻",
    "colors": [
      "#0F47AF",
      "#FFFFFF",
      "#0F47AF"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "GNQ",
    "name": "Equatorial Guinea",
    "emoji": "🇬🇶",
    "colors": [
      "#3E9A00",
      "#FFFFFF",
      "#E32118",
      "#0073CE"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "ERI",
    "name": "Eritrea",
    "emoji": "🇪🇷",
    "colors": [
      "#12AD2B",
      "#0F75BC",
      "#EA0437",
      "#FFC72C"
    ],
    "pattern": "h-bicolor"
  },
  {
    "code": "EST",
    "name": "Estonia",
    "emoji": "🇪🇪",
    "colors": [
      "#0072CE",
      "#000000",
      "#FFFFFF"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "SWZ",
    "name": "Eswatini",
    "emoji": "🇸🇿",
    "colors": [
      "#3E5EB9",
      "#FED100",
      "#B10C0C"
    ],
    "pattern": "h-stripes"
  },
  {
    "code": "ETH",
    "name": "Ethiopia",
    "emoji": "🇪🇹",
    "colors": [
      "#009A44",
      "#FED100",
      "#EF3340"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "FJI",
    "name": "Fiji",
    "emoji": "🇫🇯",
    "colors": [
      "#68BFE5",
      "#C8102E",
      "#012169",
      "#FFFFFF"
    ],
    "pattern": "cross"
  },
  {
    "code": "FIN",
    "name": "Finland",
    "emoji": "🇫🇮",
    "colors": [
      "#FFFFFF",
      "#003580"
    ],
    "pattern": "cross"
  },
  {
    "code": "FRA",
    "name": "France",
    "emoji": "🇫🇷",
    "colors": [
      "#002395",
      "#FFFFFF",
      "#ED2939"
    ],
    "pattern": "v-tricolor"
  },
  {
    "code": "GAB",
    "name": "Gabon",
    "emoji": "🇬🇦",
    "colors": [
      "#009E60",
      "#FCD116",
      "#3A75C4"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "GMB",
    "name": "Gambia",
    "emoji": "🇬🇲",
    "colors": [
      "#CE1126",
      "#0C1C8C",
      "#3A7728",
      "#FFFFFF"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "GEO",
    "name": "Georgia",
    "emoji": "🇬🇪",
    "colors": [
      "#FFFFFF",
      "#FF0000"
    ],
    "pattern": "cross"
  },
  {
    "code": "DEU",
    "name": "Germany",
    "emoji": "🇩🇪",
    "colors": [
      "#000000",
      "#DD0000",
      "#FFCE00"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "GHA",
    "name": "Ghana",
    "emoji": "🇬🇭",
    "colors": [
      "#CF0921",
      "#FCD20F",
      "#006B3F"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "GRC",
    "name": "Greece",
    "emoji": "🇬🇷",
    "colors": [
      "#0D5EAF",
      "#FFFFFF"
    ],
    "pattern": "cross"
  },
  {
    "code": "GRD",
    "name": "Grenada",
    "emoji": "🇬🇩",
    "colors": [
      "#CE1126",
      "#FCD116",
      "#007A3D"
    ],
    "pattern": "solid"
  },
  {
    "code": "GTM",
    "name": "Guatemala",
    "emoji": "🇬🇹",
    "colors": [
      "#4997D0",
      "#FFFFFF",
      "#4997D0"
    ],
    "pattern": "v-tricolor"
  },
  {
    "code": "GIN",
    "name": "Guinea",
    "emoji": "🇬🇳",
    "colors": [
      "#CE1126",
      "#FCD116",
      "#009460"
    ],
    "pattern": "v-tricolor"
  },
  {
    "code": "GNB",
    "name": "Guinea-Bissau",
    "emoji": "🇬🇼",
    "colors": [
      "#CE1126",
      "#FCD116",
      "#009E49"
    ],
    "pattern": "v-tricolor"
  },
  {
    "code": "GUY",
    "name": "Guyana",
    "emoji": "🇬🇾",
    "colors": [
      "#009E49",
      "#FCD116",
      "#CE1126",
      "#000000"
    ],
    "pattern": "solid"
  },
  {
    "code": "HTI",
    "name": "Haiti",
    "emoji": "🇭🇹",
    "colors": [
      "#00209F",
      "#D21034"
    ],
    "pattern": "h-bicolor"
  },
  {
    "code": "HND",
    "name": "Honduras",
    "emoji": "🇭🇳",
    "colors": [
      "#0073CF",
      "#FFFFFF",
      "#0073CF"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "HUN",
    "name": "Hungary",
    "emoji": "🇭🇺",
    "colors": [
      "#CE2939",
      "#FFFFFF",
      "#477050"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "ISL",
    "name": "Iceland",
    "emoji": "🇮🇸",
    "colors": [
      "#02529C",
      "#DC1E35",
      "#FFFFFF"
    ],
    "pattern": "cross"
  },
  {
    "code": "IND",
    "name": "India",
    "emoji": "🇮🇳",
    "colors": [
      "#FF9933",
      "#FFFFFF",
      "#138808"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "IDN",
    "name": "Indonesia",
    "emoji": "🇮🇩",
    "colors": [
      "#FF0000",
      "#FFFFFF"
    ],
    "pattern": "h-bicolor"
  },
  {
    "code": "IRN",
    "name": "Iran",
    "emoji": "🇮🇷",
    "colors": [
      "#239F40",
      "#FFFFFF",
      "#DA0000"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "IRQ",
    "name": "Iraq",
    "emoji": "🇮🇶",
    "colors": [
      "#CE1126",
      "#FFFFFF",
      "#000000"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "IRL",
    "name": "Ireland",
    "emoji": "🇮🇪",
    "colors": [
      "#169B62",
      "#FFFFFF",
      "#FF883E"
    ],
    "pattern": "v-tricolor"
  },
  {
    "code": "ISR",
    "name": "Israel",
    "emoji": "🇮🇱",
    "colors": [
      "#0038B8",
      "#FFFFFF"
    ],
    "pattern": "h-stripes"
  },
  {
    "code": "ITA",
    "name": "Italy",
    "emoji": "🇮🇹",
    "colors": [
      "#009246",
      "#FFFFFF",
      "#CE2B37"
    ],
    "pattern": "v-tricolor"
  },
  {
    "code": "JAM",
    "name": "Jamaica",
    "emoji": "🇯🇲",
    "colors": [
      "#009B3A",
      "#FED100",
      "#000000"
    ],
    "pattern": "cross"
  },
  {
    "code": "JPN",
    "name": "Japan",
    "emoji": "🇯🇵",
    "colors": [
      "#FFFFFF",
      "#BC002D"
    ],
    "pattern": "circle"
  },
  {
    "code": "JOR",
    "name": "Jordan",
    "emoji": "🇯🇴",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#007A3D",
      "#CE1126"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "KAZ",
    "name": "Kazakhstan",
    "emoji": "🇰🇿",
    "colors": [
      "#00AFCA",
      "#FEC50C"
    ],
    "pattern": "circle"
  },
  {
    "code": "KEN",
    "name": "Kenya",
    "emoji": "🇰🇪",
    "colors": [
      "#000000",
      "#BB0000",
      "#006600"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "KIR",
    "name": "Kiribati",
    "emoji": "🇰🇮",
    "colors": [
      "#CE1126",
      "#002B7F",
      "#FFFFFF",
      "#FFD100"
    ],
    "pattern": "h-bicolor"
  },
  {
    "code": "PRK",
    "name": "North Korea",
    "emoji": "🇰🇵",
    "colors": [
      "#024FA2",
      "#ED1C27",
      "#FFFFFF"
    ],
    "pattern": "h-stripes"
  },
  {
    "code": "KOR",
    "name": "South Korea",
    "emoji": "🇰🇷",
    "colors": [
      "#FFFFFF",
      "#CD2E3A",
      "#0047A0"
    ],
    "pattern": "circle"
  },
  {
    "code": "KWT",
    "name": "Kuwait",
    "emoji": "🇰🇼",
    "colors": [
      "#007A3D",
      "#FFFFFF",
      "#CE1126",
      "#000000"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "KGZ",
    "name": "Kyrgyzstan",
    "emoji": "🇰🇬",
    "colors": [
      "#E8112D",
      "#FFD100"
    ],
    "pattern": "circle"
  },
  {
    "code": "LAO",
    "name": "Laos",
    "emoji": "🇱🇦",
    "colors": [
      "#CE1126",
      "#002868",
      "#CE1126"
    ],
    "pattern": "circle"
  },
  {
    "code": "LVA",
    "name": "Latvia",
    "emoji": "🇱🇻",
    "colors": [
      "#9E3039",
      "#FFFFFF",
      "#9E3039"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "LBN",
    "name": "Lebanon",
    "emoji": "🇱🇧",
    "colors": [
      "#ED1C24",
      "#FFFFFF",
      "#00A651"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "LSO",
    "name": "Lesotho",
    "emoji": "🇱🇸",
    "colors": [
      "#00209F",
      "#FFFFFF",
      "#009543"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "LBR",
    "name": "Liberia",
    "emoji": "🇱🇷",
    "colors": [
      "#BF0A30",
      "#FFFFFF",
      "#002868"
    ],
    "pattern": "h-stripes"
  },
  {
    "code": "LBY",
    "name": "Libya",
    "emoji": "🇱🇾",
    "colors": [
      "#E70013",
      "#000000",
      "#239E46"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "LIE",
    "name": "Liechtenstein",
    "emoji": "🇱🇮",
    "colors": [
      "#002B7F",
      "#CE1126"
    ],
    "pattern": "h-bicolor"
  },
  {
    "code": "LTU",
    "name": "Lithuania",
    "emoji": "🇱🇹",
    "colors": [
      "#FDB913",
      "#006A44",
      "#C1272D"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "LUX",
    "name": "Luxembourg",
    "emoji": "🇱🇺",
    "colors": [
      "#ED2939",
      "#FFFFFF",
      "#00A1DE"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "MDG",
    "name": "Madagascar",
    "emoji": "🇲🇬",
    "colors": [
      "#FFFFFF",
      "#FC3D32",
      "#007E3A"
    ],
    "pattern": "v-bicolor"
  },
  {
    "code": "MWI",
    "name": "Malawi",
    "emoji": "🇲🇼",
    "colors": [
      "#000000",
      "#CE1126",
      "#339E35"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "MYS",
    "name": "Malaysia",
    "emoji": "🇲🇾",
    "colors": [
      "#CC0000",
      "#FFFFFF",
      "#000066",
      "#FFCC00"
    ],
    "pattern": "h-stripes"
  },
  {
    "code": "MDV",
    "name": "Maldives",
    "emoji": "🇲🇻",
    "colors": [
      "#D21034",
      "#007E3A",
      "#FFFFFF"
    ],
    "pattern": "circle"
  },
  {
    "code": "MLI",
    "name": "Mali",
    "emoji": "🇲🇱",
    "colors": [
      "#14B53A",
      "#FCD116",
      "#CE1126"
    ],
    "pattern": "v-tricolor"
  },
  {
    "code": "MLT",
    "name": "Malta",
    "emoji": "🇲🇹",
    "colors": [
      "#FFFFFF",
      "#CF142B"
    ],
    "pattern": "v-bicolor"
  },
  {
    "code": "MHL",
    "name": "Marshall Islands",
    "emoji": "🇲🇭",
    "colors": [
      "#003893",
      "#DD7500",
      "#FFFFFF"
    ],
    "pattern": "solid"
  },
  {
    "code": "MRT",
    "name": "Mauritania",
    "emoji": "🇲🇷",
    "colors": [
      "#006233",
      "#FFD700",
      "#D01C1C"
    ],
    "pattern": "solid"
  },
  {
    "code": "MUS",
    "name": "Mauritius",
    "emoji": "🇲🇺",
    "colors": [
      "#EA2839",
      "#1A2061",
      "#FFD500",
      "#00A14B"
    ],
    "pattern": "h-stripes"
  },
  {
    "code": "MEX",
    "name": "Mexico",
    "emoji": "🇲🇽",
    "colors": [
      "#006847",
      "#FFFFFF",
      "#CE1126"
    ],
    "pattern": "v-tricolor"
  },
  {
    "code": "FSM",
    "name": "Micronesia",
    "emoji": "🇫🇲",
    "colors": [
      "#6798C7",
      "#FFFFFF"
    ],
    "pattern": "solid"
  },
  {
    "code": "MDA",
    "name": "Moldova",
    "emoji": "🇲🇩",
    "colors": [
      "#003DA5",
      "#FFD100",
      "#C8102E"
    ],
    "pattern": "v-tricolor"
  },
  {
    "code": "MCO",
    "name": "Monaco",
    "emoji": "🇲🇨",
    "colors": [
      "#CE1126",
      "#FFFFFF"
    ],
    "pattern": "h-bicolor"
  },
  {
    "code": "MNG",
    "name": "Mongolia",
    "emoji": "🇲🇳",
    "colors": [
      "#E4002B",
      "#0066B3",
      "#E4002B"
    ],
    "pattern": "v-tricolor"
  },
  {
    "code": "MNE",
    "name": "Montenegro",
    "emoji": "🇲🇪",
    "colors": [
      "#C40308",
      "#D4AF37"
    ],
    "pattern": "solid"
  },
  {
    "code": "MAR",
    "name": "Morocco",
    "emoji": "🇲🇦",
    "colors": [
      "#C1272D",
      "#006233"
    ],
    "pattern": "circle"
  },
  {
    "code": "MOZ",
    "name": "Mozambique",
    "emoji": "🇲🇿",
    "colors": [
      "#006600",
      "#000000",
      "#FFD100",
      "#D21034"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "MMR",
    "name": "Myanmar",
    "emoji": "🇲🇲",
    "colors": [
      "#FECB00",
      "#34B233",
      "#EA2839"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "NAM",
    "name": "Namibia",
    "emoji": "🇳🇦",
    "colors": [
      "#003580",
      "#D21034",
      "#009543",
      "#FFCE00"
    ],
    "pattern": "solid"
  },
  {
    "code": "NRU",
    "name": "Nauru",
    "emoji": "🇳🇷",
    "colors": [
      "#002B7F",
      "#FFC72C",
      "#FFFFFF"
    ],
    "pattern": "solid"
  },
  {
    "code": "NPL",
    "name": "Nepal",
    "emoji": "🇳🇵",
    "colors": [
      "#DC143C",
      "#003893",
      "#FFFFFF"
    ],
    "pattern": "solid"
  },
  {
    "code": "NLD",
    "name": "Netherlands",
    "emoji": "🇳🇱",
    "colors": [
      "#AE1C28",
      "#FFFFFF",
      "#21468B"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "NZL",
    "name": "New Zealand",
    "emoji": "🇳🇿",
    "colors": [
      "#00247D",
      "#CC142B",
      "#FFFFFF"
    ],
    "pattern": "cross"
  },
  {
    "code": "NIC",
    "name": "Nicaragua",
    "emoji": "🇳🇮",
    "colors": [
      "#0067C6",
      "#FFFFFF",
      "#0067C6"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "NER",
    "name": "Niger",
    "emoji": "🇳🇪",
    "colors": [
      "#E05206",
      "#FFFFFF",
      "#0DB02B"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "NGA",
    "name": "Nigeria",
    "emoji": "🇳🇬",
    "colors": [
      "#008751",
      "#FFFFFF",
      "#008751"
    ],
    "pattern": "v-tricolor"
  },
  {
    "code": "MKD",
    "name": "North Macedonia",
    "emoji": "🇲🇰",
    "colors": [
      "#CE2028",
      "#FFE600"
    ],
    "pattern": "circle"
  },
  {
    "code": "NOR",
    "name": "Norway",
    "emoji": "🇳🇴",
    "colors": [
      "#BA0C2F",
      "#FFFFFF",
      "#00205B"
    ],
    "pattern": "cross"
  },
  {
    "code": "OMN",
    "name": "Oman",
    "emoji": "🇴🇲",
    "colors": [
      "#FFFFFF",
      "#DB161B",
      "#008000"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "PAK",
    "name": "Pakistan",
    "emoji": "🇵🇰",
    "colors": [
      "#01411C",
      "#FFFFFF"
    ],
    "pattern": "circle"
  },
  {
    "code": "PLW",
    "name": "Palau",
    "emoji": "🇵🇼",
    "colors": [
      "#4AADD6",
      "#FFDE00"
    ],
    "pattern": "circle"
  },
  {
    "code": "PSE",
    "name": "Palestine",
    "emoji": "🇵🇸",
    "colors": [
      "#000000",
      "#FFFFFF",
      "#007A3D",
      "#EE2A35"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "PAN",
    "name": "Panama",
    "emoji": "🇵🇦",
    "colors": [
      "#005293",
      "#DA121A",
      "#FFFFFF"
    ],
    "pattern": "cross"
  },
  {
    "code": "PNG",
    "name": "Papua New Guinea",
    "emoji": "🇵🇬",
    "colors": [
      "#000000",
      "#CE1126",
      "#FFCE00"
    ],
    "pattern": "h-bicolor"
  },
  {
    "code": "PRY",
    "name": "Paraguay",
    "emoji": "🇵🇾",
    "colors": [
      "#D52B1E",
      "#FFFFFF",
      "#0038A8"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "PER",
    "name": "Peru",
    "emoji": "🇵🇪",
    "colors": [
      "#D91023",
      "#FFFFFF",
      "#D91023"
    ],
    "pattern": "v-tricolor"
  },
  {
    "code": "PHL",
    "name": "Philippines",
    "emoji": "🇵🇭",
    "colors": [
      "#0038A8",
      "#CE1126",
      "#FCD116",
      "#FFFFFF"
    ],
    "pattern": "h-bicolor"
  },
  {
    "code": "POL",
    "name": "Poland",
    "emoji": "🇵🇱",
    "colors": [
      "#FFFFFF",
      "#DC143C"
    ],
    "pattern": "h-bicolor"
  },
  {
    "code": "PRT",
    "name": "Portugal",
    "emoji": "🇵🇹",
    "colors": [
      "#006600",
      "#FF0000"
    ],
    "pattern": "v-bicolor"
  },
  {
    "code": "QAT",
    "name": "Qatar",
    "emoji": "🇶🇦",
    "colors": [
      "#FFFFFF",
      "#8D1B3D"
    ],
    "pattern": "v-bicolor"
  },
  {
    "code": "ROU",
    "name": "Romania",
    "emoji": "🇷🇴",
    "colors": [
      "#002B7F",
      "#FCD116",
      "#CE1126"
    ],
    "pattern": "v-tricolor"
  },
  {
    "code": "RUS",
    "name": "Russia",
    "emoji": "🇷🇺",
    "colors": [
      "#FFFFFF",
      "#0039A6",
      "#D52B1E"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "RWA",
    "name": "Rwanda",
    "emoji": "🇷🇼",
    "colors": [
      "#00A1DE",
      "#FAD201",
      "#20603D"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "KNA",
    "name": "Saint Kitts and Nevis",
    "emoji": "🇰🇳",
    "colors": [
      "#009E49",
      "#000000",
      "#CE1126",
      "#FCD116"
    ],
    "pattern": "solid"
  },
  {
    "code": "LCA",
    "name": "Saint Lucia",
    "emoji": "🇱🇨",
    "colors": [
      "#65C5F2",
      "#FFD100",
      "#000000",
      "#FFFFFF"
    ],
    "pattern": "solid"
  },
  {
    "code": "VCT",
    "name": "Saint Vincent and the Grenadines",
    "emoji": "🇻🇨",
    "colors": [
      "#00247D",
      "#FFD100",
      "#009E49"
    ],
    "pattern": "v-tricolor"
  },
  {
    "code": "WSM",
    "name": "Samoa",
    "emoji": "🇼🇸",
    "colors": [
      "#CE1126",
      "#002B7F",
      "#FFFFFF"
    ],
    "pattern": "solid"
  },
  {
    "code": "SMR",
    "name": "San Marino",
    "emoji": "🇸🇲",
    "colors": [
      "#FFFFFF",
      "#5EB6E4"
    ],
    "pattern": "h-bicolor"
  },
  {
    "code": "STP",
    "name": "Sao Tome and Principe",
    "emoji": "🇸🇹",
    "colors": [
      "#12AD2B",
      "#FFCE00",
      "#D21034",
      "#000000"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "SAU",
    "name": "Saudi Arabia",
    "emoji": "🇸🇦",
    "colors": [
      "#006C35",
      "#FFFFFF"
    ],
    "pattern": "solid"
  },
  {
    "code": "SEN",
    "name": "Senegal",
    "emoji": "🇸🇳",
    "colors": [
      "#00853F",
      "#FDEF42",
      "#E31B23"
    ],
    "pattern": "v-tricolor"
  },
  {
    "code": "SRB",
    "name": "Serbia",
    "emoji": "🇷🇸",
    "colors": [
      "#C6363C",
      "#0C4076",
      "#FFFFFF"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "SYC",
    "name": "Seychelles",
    "emoji": "🇸🇨",
    "colors": [
      "#003D88",
      "#FCD856",
      "#D62828",
      "#FFFFFF",
      "#007A3D"
    ],
    "pattern": "h-stripes"
  },
  {
    "code": "SLE",
    "name": "Sierra Leone",
    "emoji": "🇸🇱",
    "colors": [
      "#1EB53A",
      "#FFFFFF",
      "#0072C6"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "SGP",
    "name": "Singapore",
    "emoji": "🇸🇬",
    "colors": [
      "#ED2939",
      "#FFFFFF"
    ],
    "pattern": "h-bicolor"
  },
  {
    "code": "SVK",
    "name": "Slovakia",
    "emoji": "🇸🇰",
    "colors": [
      "#FFFFFF",
      "#0B4EA2",
      "#EE1C25"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "SVN",
    "name": "Slovenia",
    "emoji": "🇸🇮",
    "colors": [
      "#FFFFFF",
      "#005CE6",
      "#ED1C24"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "SLB",
    "name": "Solomon Islands",
    "emoji": "🇸🇧",
    "colors": [
      "#005189",
      "#215B33",
      "#FCD116",
      "#FFFFFF"
    ],
    "pattern": "h-bicolor"
  },
  {
    "code": "SOM",
    "name": "Somalia",
    "emoji": "🇸🇴",
    "colors": [
      "#4189DD",
      "#FFFFFF"
    ],
    "pattern": "circle"
  },
  {
    "code": "ZAF",
    "name": "South Africa",
    "emoji": "🇿🇦",
    "colors": [
      "#007749",
      "#FFB612",
      "#002395",
      "#E03C31"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "SSD",
    "name": "South Sudan",
    "emoji": "🇸🇸",
    "colors": [
      "#000000",
      "#DA121A",
      "#0F47AF",
      "#078930",
      "#FCD116"
    ],
    "pattern": "h-stripes"
  },
  {
    "code": "ESP",
    "name": "Spain",
    "emoji": "🇪🇸",
    "colors": [
      "#AA151B",
      "#F1BF00",
      "#AA151B"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "LKA",
    "name": "Sri Lanka",
    "emoji": "🇱🇰",
    "colors": [
      "#FFBE29",
      "#8D153A",
      "#00534E",
      "#E06714"
    ],
    "pattern": "v-tricolor"
  },
  {
    "code": "SDN",
    "name": "Sudan",
    "emoji": "🇸🇩",
    "colors": [
      "#D21034",
      "#FFFFFF",
      "#000000",
      "#007229"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "SUR",
    "name": "Suriname",
    "emoji": "🇸🇷",
    "colors": [
      "#377E3F",
      "#FFFFFF",
      "#B40A2D",
      "#ECC81D"
    ],
    "pattern": "h-stripes"
  },
  {
    "code": "SWE",
    "name": "Sweden",
    "emoji": "🇸🇪",
    "colors": [
      "#006AA7",
      "#FECC00"
    ],
    "pattern": "cross"
  },
  {
    "code": "CHE",
    "name": "Switzerland",
    "emoji": "🇨🇭",
    "colors": [
      "#FF0000",
      "#FFFFFF"
    ],
    "pattern": "cross"
  },
  {
    "code": "SYR",
    "name": "Syria",
    "emoji": "🇸🇾",
    "colors": [
      "#CE1126",
      "#FFFFFF",
      "#000000",
      "#007A3D"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "TJK",
    "name": "Tajikistan",
    "emoji": "🇹🇯",
    "colors": [
      "#CC0000",
      "#FFFFFF",
      "#006600",
      "#F8C300"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "TZA",
    "name": "Tanzania",
    "emoji": "🇹🇿",
    "colors": [
      "#1EB53A",
      "#00A3DD",
      "#000000",
      "#FFD100"
    ],
    "pattern": "cross"
  },
  {
    "code": "THA",
    "name": "Thailand",
    "emoji": "🇹🇭",
    "colors": [
      "#A51931",
      "#FFFFFF",
      "#2D2A4A"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "TLS",
    "name": "Timor-Leste",
    "emoji": "🇹🇱",
    "colors": [
      "#DA291C",
      "#FFC72C",
      "#000000",
      "#FFFFFF"
    ],
    "pattern": "solid"
  },
  {
    "code": "TGO",
    "name": "Togo",
    "emoji": "🇹🇬",
    "colors": [
      "#006A4E",
      "#FFCE00",
      "#D21034",
      "#FFFFFF"
    ],
    "pattern": "h-stripes"
  },
  {
    "code": "TON",
    "name": "Tonga",
    "emoji": "🇹🇴",
    "colors": [
      "#C10000",
      "#FFFFFF"
    ],
    "pattern": "cross"
  },
  {
    "code": "TTO",
    "name": "Trinidad and Tobago",
    "emoji": "🇹🇹",
    "colors": [
      "#CE1126",
      "#000000",
      "#FFFFFF"
    ],
    "pattern": "cross"
  },
  {
    "code": "TUN",
    "name": "Tunisia",
    "emoji": "🇹🇳",
    "colors": [
      "#E70013",
      "#FFFFFF"
    ],
    "pattern": "circle"
  },
  {
    "code": "TUR",
    "name": "Turkey",
    "emoji": "🇹🇷",
    "colors": [
      "#E30A17",
      "#FFFFFF"
    ],
    "pattern": "circle"
  },
  {
    "code": "TKM",
    "name": "Turkmenistan",
    "emoji": "🇹🇲",
    "colors": [
      "#2E8B57",
      "#FFFFFF",
      "#D21034"
    ],
    "pattern": "solid"
  },
  {
    "code": "TUV",
    "name": "Tuvalu",
    "emoji": "🇹🇻",
    "colors": [
      "#5B97C9",
      "#012169",
      "#C8102E",
      "#FFCE00"
    ],
    "pattern": "cross"
  },
  {
    "code": "UGA",
    "name": "Uganda",
    "emoji": "🇺🇬",
    "colors": [
      "#000000",
      "#FCDC04",
      "#D90000"
    ],
    "pattern": "h-stripes"
  },
  {
    "code": "UKR",
    "name": "Ukraine",
    "emoji": "🇺🇦",
    "colors": [
      "#0057B7",
      "#FFDD00"
    ],
    "pattern": "h-bicolor"
  },
  {
    "code": "ARE",
    "name": "UAE",
    "emoji": "🇦🇪",
    "colors": [
      "#00732F",
      "#FFFFFF",
      "#000000",
      "#FF0000"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "GBR",
    "name": "United Kingdom",
    "emoji": "🇬🇧",
    "colors": [
      "#012169",
      "#FFFFFF",
      "#C8102E"
    ],
    "pattern": "cross"
  },
  {
    "code": "USA",
    "name": "United States",
    "emoji": "🇺🇸",
    "colors": [
      "#B22234",
      "#FFFFFF",
      "#3C3B6E"
    ],
    "pattern": "h-stripes"
  },
  {
    "code": "URY",
    "name": "Uruguay",
    "emoji": "🇺🇾",
    "colors": [
      "#0038A8",
      "#FFFFFF",
      "#FCD116"
    ],
    "pattern": "h-stripes"
  },
  {
    "code": "UZB",
    "name": "Uzbekistan",
    "emoji": "🇺🇿",
    "colors": [
      "#0099B5",
      "#FFFFFF",
      "#1EB53A",
      "#CE1126"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "VUT",
    "name": "Vanuatu",
    "emoji": "🇻🇺",
    "colors": [
      "#D21034",
      "#009543",
      "#000000",
      "#FCD116"
    ],
    "pattern": "h-bicolor"
  },
  {
    "code": "VAT",
    "name": "Vatican City",
    "emoji": "🇻🇦",
    "colors": [
      "#FFE000",
      "#FFFFFF"
    ],
    "pattern": "v-bicolor"
  },
  {
    "code": "VEN",
    "name": "Venezuela",
    "emoji": "🇻🇪",
    "colors": [
      "#FCE300",
      "#00247D",
      "#CF142B"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "VNM",
    "name": "Vietnam",
    "emoji": "🇻🇳",
    "colors": [
      "#DA251D",
      "#FFFF00"
    ],
    "pattern": "circle"
  },
  {
    "code": "YEM",
    "name": "Yemen",
    "emoji": "🇾🇪",
    "colors": [
      "#CE1126",
      "#FFFFFF",
      "#000000"
    ],
    "pattern": "h-tricolor"
  },
  {
    "code": "ZMB",
    "name": "Zambia",
    "emoji": "🇿🇲",
    "colors": [
      "#198A00",
      "#EF7D00",
      "#000000",
      "#DE2010"
    ],
    "pattern": "solid"
  },
  {
    "code": "ZWE",
    "name": "Zimbabwe",
    "emoji": "🇿🇼",
    "colors": [
      "#006400",
      "#FFD700",
      "#D40000",
      "#000000",
      "#FFFFFF"
    ],
    "pattern": "h-stripes"
  }
];

function getCountryPool(count) {
  const result = [...COUNTRIES_DATA];
  if (count && count <= result.length) {
    return result.slice(0, count);
  }
  return result;
}

// Vector Graphic Helper Functions for Authentic National Flags
function drawAuthenticFlag(ctx, country, w, h) {
  const code = country.code;
  const colors = country.colors;

  const drawStar = (cx, cy, r, points = 5, color = '#FFD700') => {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? r : r * 0.42;
      const angle = (i * Math.PI) / points - Math.PI / 2;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  const drawCrescent = (cx, cy, r, color = '#FFFFFF', angle = 0) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(r * 0.38, 0, r * 0.82, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  // 1. Specific Iconic World Flags
  switch (code) {
    case 'USA': { // United States: 13 stripes + Blue Canton + Stars
      const sH = h / 13;
      for (let i = 0; i < 13; i++) {
        ctx.fillStyle = i % 2 === 0 ? '#B22234' : '#FFFFFF';
        ctx.fillRect(0, i * sH, w, sH + 1);
      }
      const cW = w * 0.45;
      const cH = sH * 7;
      ctx.fillStyle = '#3C3B6E';
      ctx.fillRect(0, 0, cW, cH);
      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 6; c++) {
          drawStar(cW * 0.12 + c * (cW * 0.15), cH * 0.14 + r * (cH * 0.18), 7, 5, '#FFFFFF');
        }
      }
      return;
    }

    case 'GBR': { // United Kingdom: Union Jack
      ctx.fillStyle = '#012169';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 70;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(w, h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(w, 0); ctx.lineTo(0, h); ctx.stroke();
      ctx.strokeStyle = '#C8102E';
      ctx.lineWidth = 26;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(w, h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(w, 0); ctx.lineTo(0, h); ctx.stroke();
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect((w - 100) / 2, 0, 100, h);
      ctx.fillRect(0, (h - 100) / 2, w, 100);
      ctx.fillStyle = '#C8102E';
      ctx.fillRect((w - 60) / 2, 0, 60, h);
      ctx.fillRect(0, (h - 60) / 2, w, 60);
      return;
    }

    case 'BRA': { // Brazil: Green field, Yellow Rhombus, Blue Globe
      ctx.fillStyle = '#009739';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#FEDD00';
      ctx.beginPath();
      ctx.moveTo(w / 2, h * 0.12);
      ctx.lineTo(w * 0.92, h / 2);
      ctx.lineTo(w / 2, h * 0.88);
      ctx.lineTo(w * 0.08, h / 2);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#012169';
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, h * 0.22, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(w / 2, h / 2 + 10, h * 0.22, Math.PI * 1.05, Math.PI * 1.85);
      ctx.stroke();
      drawStar(w / 2 - 15, h / 2 + 25, 5, 5, '#FFFFFF');
      drawStar(w / 2 + 20, h / 2 + 35, 6, 5, '#FFFFFF');
      drawStar(w / 2 + 35, h / 2 + 15, 4, 5, '#FFFFFF');
      return;
    }

    case 'ARG': { // Argentina: Sky Blue, White, Sky Blue + Sun of May
      const band = h / 3;
      ctx.fillStyle = '#74ACDF'; ctx.fillRect(0, 0, w, band);
      ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, band, w, band);
      ctx.fillStyle = '#74ACDF'; ctx.fillRect(0, band * 2, w, band);
      const scx = w / 2, scy = h / 2, sr = h * 0.09;
      ctx.fillStyle = '#F6B40E';
      ctx.beginPath();
      ctx.arc(scx, scy, sr, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#F6B40E';
      ctx.lineWidth = 4;
      for (let i = 0; i < 16; i++) {
        const a = (i * Math.PI * 2) / 16;
        ctx.beginPath();
        ctx.moveTo(scx + Math.cos(a) * sr, scy + Math.sin(a) * sr);
        ctx.lineTo(scx + Math.cos(a) * (sr + 22), scy + Math.sin(a) * (sr + 22));
        ctx.stroke();
      }
      return;
    }

    case 'JPN': { // Japan: White field, Red Sun disc
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#BC002D';
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, h * 0.32, 0, Math.PI * 2);
      ctx.fill();
      return;
    }

    case 'BGD': { // Bangladesh: Green field, Red disc
      ctx.fillStyle = '#006A4E';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#F42A41';
      ctx.beginPath();
      ctx.arc(w * 0.48, h / 2, h * 0.33, 0, Math.PI * 2);
      ctx.fill();
      return;
    }

    case 'CAN': { // Canada: Red, White, Red + Red Maple Leaf
      ctx.fillStyle = '#FF0000';
      ctx.fillRect(0, 0, w * 0.25, h);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(w * 0.25, 0, w * 0.50, h);
      ctx.fillStyle = '#FF0000';
      ctx.fillRect(w * 0.75, 0, w * 0.25, h);
      ctx.fillStyle = '#FF0000';
      ctx.beginPath();
      const lx = w / 2, ly = h / 2;
      ctx.moveTo(lx, ly - 70);
      ctx.lineTo(lx + 20, ly - 35);
      ctx.lineTo(lx + 55, ly - 50);
      ctx.lineTo(lx + 45, ly - 10);
      ctx.lineTo(lx + 70, ly + 5);
      ctx.lineTo(lx + 35, ly + 25);
      ctx.lineTo(lx + 40, ly + 45);
      ctx.lineTo(lx + 8, ly + 30);
      ctx.lineTo(lx + 6, ly + 65);
      ctx.lineTo(lx - 6, ly + 65);
      ctx.lineTo(lx - 8, ly + 30);
      ctx.lineTo(lx - 40, ly + 45);
      ctx.lineTo(lx - 35, ly + 25);
      ctx.lineTo(lx - 70, ly + 5);
      ctx.lineTo(lx - 45, ly - 10);
      ctx.lineTo(lx - 55, ly - 50);
      ctx.lineTo(lx - 20, ly - 35);
      ctx.closePath();
      ctx.fill();
      return;
    }

    case 'IND': { // India: Saffron, White, Green + Ashoka Chakra
      const band = h / 3;
      ctx.fillStyle = '#FF9933'; ctx.fillRect(0, 0, w, band);
      ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, band, w, band);
      ctx.fillStyle = '#138808'; ctx.fillRect(0, band * 2, w, band);
      const cx = w / 2, cy = h / 2, r = h * 0.11;
      ctx.strokeStyle = '#000080';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      for (let i = 0; i < 24; i++) {
        const a = (i * Math.PI * 2) / 24;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
        ctx.stroke();
      }
      return;
    }

    case 'DEU': { // Germany: Black, Red, Gold
      const band = h / 3;
      ctx.fillStyle = '#000000'; ctx.fillRect(0, 0, w, band);
      ctx.fillStyle = '#DD0000'; ctx.fillRect(0, band, w, band);
      ctx.fillStyle = '#FFCE00'; ctx.fillRect(0, band * 2, w, band);
      return;
    }

    case 'FRA': { // France: Blue, White, Red
      const band = w / 3;
      ctx.fillStyle = '#002654'; ctx.fillRect(0, 0, band, h);
      ctx.fillStyle = '#FFFFFF'; ctx.fillRect(band, 0, band, h);
      ctx.fillStyle = '#ED2939'; ctx.fillRect(band * 2, 0, band, h);
      return;
    }

    case 'ITA': { // Italy: Green, White, Red
      const band = w / 3;
      ctx.fillStyle = '#009246'; ctx.fillRect(0, 0, band, h);
      ctx.fillStyle = '#FFFFFF'; ctx.fillRect(band, 0, band, h);
      ctx.fillStyle = '#CE2B37'; ctx.fillRect(band * 2, 0, band, h);
      return;
    }

    case 'CHE': { // Switzerland: Red with White Cross
      ctx.fillStyle = '#D52B1E';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#FFFFFF';
      const cSize = w * 0.55;
      const thick = cSize * 0.32;
      ctx.fillRect((w - thick) / 2, (h - cSize) / 2, thick, cSize);
      ctx.fillRect((w - cSize) / 2, (h - thick) / 2, cSize, thick);
      return;
    }

    case 'TUR': { // Turkey: Red with White Crescent & Star
      ctx.fillStyle = '#E30A17';
      ctx.fillRect(0, 0, w, h);
      drawCrescent(w * 0.42, h / 2, h * 0.22, '#FFFFFF', 0);
      drawStar(w * 0.62, h / 2, 32, 5, '#FFFFFF');
      return;
    }

    case 'PAK': { // Pakistan: Green with White Hoist + Crescent & Star
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, w * 0.25, h);
      ctx.fillStyle = '#01411C';
      ctx.fillRect(w * 0.25, 0, w * 0.75, h);
      drawCrescent(w * 0.60, h / 2, h * 0.22, '#FFFFFF', -0.3);
      drawStar(w * 0.74, h * 0.40, 30, 5, '#FFFFFF');
      return;
    }

    case 'CHN': { // China: Red with 5 Gold Stars
      ctx.fillStyle = '#DE2910';
      ctx.fillRect(0, 0, w, h);
      drawStar(w * 0.28, h * 0.32, 48, 5, '#FFDE00');
      drawStar(w * 0.44, h * 0.18, 16, 5, '#FFDE00');
      drawStar(w * 0.50, h * 0.28, 16, 5, '#FFDE00');
      drawStar(w * 0.50, h * 0.42, 16, 5, '#FFDE00');
      drawStar(w * 0.44, h * 0.52, 16, 5, '#FFDE00');
      return;
    }

    case 'KOR': { // South Korea: White with Taegeuk & Trigrams
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#CD2E3A';
      ctx.beginPath(); ctx.arc(w / 2, h / 2, h * 0.22, Math.PI, 0); ctx.fill();
      ctx.fillStyle = '#0047A0';
      ctx.beginPath(); ctx.arc(w / 2, h / 2, h * 0.22, 0, Math.PI); ctx.fill();
      ctx.fillStyle = '#CD2E3A';
      ctx.beginPath(); ctx.arc(w / 2 - h * 0.11, h / 2, h * 0.11, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#0047A0';
      ctx.beginPath(); ctx.arc(w / 2 + h * 0.11, h / 2, h * 0.11, 0, Math.PI * 2); ctx.fill();
      return;
    }

    case 'VNM': { // Vietnam: Red with Gold Star
      ctx.fillStyle = '#DA251D';
      ctx.fillRect(0, 0, w, h);
      drawStar(w / 2, h / 2, h * 0.30, 5, '#FFFF00');
      return;
    }

    case 'GRC': { // Greece: 9 stripes + Cross Canton
      const sH = h / 9;
      for (let i = 0; i < 9; i++) {
        ctx.fillStyle = i % 2 === 0 ? '#0D5EAF' : '#FFFFFF';
        ctx.fillRect(0, i * sH, w, sH + 1);
      }
      const cSize = sH * 5;
      ctx.fillStyle = '#0D5EAF';
      ctx.fillRect(0, 0, cSize, cSize);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect((cSize - 20) / 2, 0, 20, cSize);
      ctx.fillRect(0, (cSize - 20) / 2, cSize, 20);
      return;
    }

    case 'ISR': { // Israel: Two Blue stripes + Star of David
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#0038B8';
      ctx.fillRect(0, h * 0.14, w, h * 0.12);
      ctx.fillRect(0, h * 0.74, w, h * 0.12);
      ctx.strokeStyle = '#0038B8';
      ctx.lineWidth = 8;
      const drawTri = (cy, flip) => {
        const r = 50;
        ctx.beginPath();
        for (let i = 0; i < 3; i++) {
          const a = (i * Math.PI * 2) / 3 + (flip ? Math.PI : 0) - Math.PI / 2;
          const x = w / 2 + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r;
          if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      };
      drawTri(h / 2, false);
      drawTri(h / 2, true);
      return;
    }

    case 'ZAF': { // South Africa: Iconic Y-band
      ctx.fillStyle = '#E03C31'; ctx.fillRect(0, 0, w, h / 2);
      ctx.fillStyle = '#001489'; ctx.fillRect(0, h / 2, w, h / 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(0, h * 0.15); ctx.lineTo(w * 0.45, h * 0.5); ctx.lineTo(w, h * 0.5);
      ctx.lineTo(w, h * 0.65); ctx.lineTo(w * 0.45, h * 0.65); ctx.lineTo(0, h * 0.85);
      ctx.fill();
      ctx.fillStyle = '#007749';
      ctx.beginPath();
      ctx.moveTo(0, h * 0.22); ctx.lineTo(w * 0.40, h * 0.5); ctx.lineTo(w, h * 0.5);
      ctx.lineTo(w, h * 0.60); ctx.lineTo(w * 0.40, h * 0.60); ctx.lineTo(0, h * 0.78);
      ctx.fill();
      ctx.fillStyle = '#FFB81C';
      ctx.beginPath(); ctx.moveTo(0, h * 0.22); ctx.lineTo(w * 0.32, h * 0.5); ctx.lineTo(0, h * 0.78); ctx.fill();
      ctx.fillStyle = '#000000';
      ctx.beginPath(); ctx.moveTo(0, h * 0.28); ctx.lineTo(w * 0.25, h * 0.5); ctx.lineTo(0, h * 0.72); ctx.fill();
      return;
    }

    case 'SWE': case 'NOR': case 'FIN': case 'DNK': case 'ISL': { // Nordic Cross
      ctx.fillStyle = colors[0];
      ctx.fillRect(0, 0, w, h);
      const cx = w * 0.38;
      const bW = w * 0.24, bH = h * 0.24;
      ctx.fillStyle = colors[1];
      ctx.fillRect(cx - bW / 2, 0, bW, h);
      ctx.fillRect(0, (h - bH) / 2, w, bH);
      if (colors.length >= 3) {
        ctx.fillStyle = colors[2];
        const inW = bW * 0.5, inH = bH * 0.5;
        ctx.fillRect(cx - inW / 2, 0, inW, h);
        ctx.fillRect(0, (h - inH) / 2, w, inH);
      }
      return;
    }

    default:
      break;
  }

  // 2. Generic Patterns for all other nations:
  ctx.fillStyle = colors[0];
  ctx.fillRect(0, 0, w, h);

  if (colors.length > 1) {
    switch (country.pattern) {
      case 'h-tricolor': {
        const band = h / 3;
        ctx.fillStyle = colors[0]; ctx.fillRect(0, 0, w, band);
        ctx.fillStyle = colors[1]; ctx.fillRect(0, band, w, band);
        ctx.fillStyle = colors[2] || colors[0]; ctx.fillRect(0, band * 2, w, band);
        break;
      }
      case 'v-tricolor': {
        const band = w / 3;
        ctx.fillStyle = colors[0]; ctx.fillRect(0, 0, band, h);
        ctx.fillStyle = colors[1]; ctx.fillRect(band, 0, band, h);
        ctx.fillStyle = colors[2] || colors[0]; ctx.fillRect(band * 2, 0, band, h);
        break;
      }
      case 'h-bicolor': {
        ctx.fillStyle = colors[0]; ctx.fillRect(0, 0, w, h / 2);
        ctx.fillStyle = colors[1]; ctx.fillRect(0, h / 2, w, h / 2);
        break;
      }
      case 'v-bicolor': {
        ctx.fillStyle = colors[0]; ctx.fillRect(0, 0, w / 2, h);
        ctx.fillStyle = colors[1]; ctx.fillRect(w / 2, 0, w / 2, h);
        break;
      }
      case 'circle': {
        ctx.fillStyle = colors[0]; ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = colors[1];
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, h * 0.32, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case 'cross': {
        ctx.fillStyle = colors[0]; ctx.fillRect(0, 0, w, h);
        const bW = w * 0.22, bH = h * 0.22;
        ctx.fillStyle = colors[1];
        ctx.fillRect((w - bW) / 2, 0, bW, h);
        ctx.fillRect(0, (h - bH) / 2, w, bH);
        if (colors.length >= 3) {
          ctx.fillStyle = colors[2];
          ctx.fillRect((w - bW * 0.5) / 2, 0, bW * 0.5, h);
          ctx.fillRect(0, (h - bH * 0.5) / 2, w, bH * 0.5);
        }
        break;
      }
      case 'h-stripes': {
        const count = colors.length;
        const bH = h / count;
        for (let i = 0; i < count; i++) {
          ctx.fillStyle = colors[i];
          ctx.fillRect(0, i * bH, w, bH + 1);
        }
        break;
      }
      default: {
        ctx.fillStyle = colors[0]; ctx.fillRect(0, 0, w, h);
        if (colors.length > 1) {
          drawStar(w / 2, h / 2, h * 0.25, 5, colors[1]);
        }
        break;
      }
    }
  }
}

// Generates Ultra-Clean, High-Contrast 512x512 Canvas Texture for 3D Ball Spheres
// Full authentic national flag covering the sphere + sleek high-contrast nameplate at bottom
function createFlagTextureCanvas(country) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  // 1. Full-Sphere Authentic National Flag with rich vivid saturation ("seturation kore dao")
  ctx.save();
  if ('filter' in ctx) {
    ctx.filter = 'saturate(1.3) contrast(1.10)';
  }
  drawAuthenticFlag(ctx, country, w, h);
  ctx.restore();

  // 2. High-Contrast Bottom Nameplate / Country Identifier
  ctx.save();
  const displayName = country.name.toUpperCase();
  const code = country.code;
  const labelText = `${displayName} (${code})`;

  ctx.font = '900 24px "Outfit", "Segoe UI", Arial, sans-serif';
  const textMetrics = ctx.measureText(labelText);
  const textW = textMetrics.width;
  const pillW = Math.min(w * 0.88, Math.max(160, textW + 36));
  const pillH = 46;
  const pillX = (w - pillW) / 2;
  const pillY = h * 0.78;

  // Pill Glass Backing
  ctx.fillStyle = 'rgba(6, 10, 22, 0.92)';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
  ctx.shadowBlur = 12;
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(pillX, pillY, pillW, pillH, 12);
  } else {
    ctx.rect(pillX, pillY, pillW, pillH);
  }
  ctx.fill();

  // Glowing Golden Border
  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth = 3.5;
  ctx.stroke();

  // Sharp Bold White Text
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 8;
  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(labelText, w / 2, pillY + pillH / 2 + 1);
  ctx.restore();

  return canvas;
}

// Generates a Giant High-Resolution Authentic Flag Banner Canvas for Winner Showcase
function createWinnerHighResFlagCanvas(country) {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  // Render Full Authentic Flag
  drawAuthenticFlag(ctx, country, w, h);

  // High-Resolution Champion Banner at bottom
  ctx.save();
  ctx.fillStyle = 'rgba(6, 10, 24, 0.85)';
  ctx.fillRect(0, h - 85, w, 85);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 42px "Outfit", "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0,0,0,1.0)';
  ctx.shadowBlur = 10;
  ctx.fillText(`${country.name.toUpperCase()} (${country.code})`, w / 2, h - 42);
  ctx.restore();

  // Premium Gold Frame
  ctx.strokeStyle = '#FFD700';
  ctx.lineWidth = 10;
  ctx.strokeRect(5, 5, w - 10, h - 10);

  return canvas;
}

// Generates a Crisp Mini Authentic Flag Canvas for UI Podiums & Lists
function createMiniFlagCanvas(country, width = 36, height = 24) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  drawAuthenticFlag(ctx, country, width, height);
  canvas.style.borderRadius = '4px';
  canvas.style.verticalAlign = 'middle';
  canvas.style.boxShadow = '0 1px 4px rgba(0,0,0,0.5)';
  return canvas;
}
