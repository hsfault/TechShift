const P = (o) => ({ ...o, image: `/media/products/${o.id}.jpg` })

export const products = [
  P({ id: 'hp-elitebook-840-g9', brand: 'HP', series: 'EliteBook', name: 'EliteBook 840 G9', category: 'business', price: 289000, sale: 15, rating: 4.8, reviews: 126, badge: 'Best seller', cpu: 'Intel Core i7-1255U', ram: 16, storage: '512 GB SSD', display: '14″ FHD IPS, anti-glare', gpu: 'Intel Iris Xe', battery: 'Up to 14 hrs', weight: '1.36 kg', os: 'Windows 11 Pro', blurb: 'The boardroom classic. Magnesium chassis, a sharp anti-glare screen and the security features IT teams ask for by name.' }),
  P({ id: 'hp-probook-450-g10', brand: 'HP', series: 'ProBook', name: 'ProBook 450 G10', category: 'business', price: 189000, sale: 0, rating: 4.6, reviews: 88, badge: '', cpu: 'Intel Core i5-1335U', ram: 16, storage: '512 GB SSD', display: '15.6″ FHD IPS', gpu: 'Intel Iris Xe', battery: 'Up to 10 hrs', weight: '1.79 kg', os: 'Windows 11 Pro', blurb: 'A full-size workhorse with a numeric keypad, a roomy screen and the durability of a business-class build.' }),
  P({ id: 'hp-pavilion-x360', brand: 'HP', series: 'Pavilion', name: 'Pavilion x360 14', category: 'student', price: 164000, sale: 10, rating: 4.5, reviews: 64, badge: '', cpu: 'Intel Core i5-1335U', ram: 8, storage: '512 GB SSD', display: '14″ FHD touch', gpu: 'Intel Iris Xe', battery: 'Up to 11 hrs', weight: '1.51 kg', os: 'Windows 11 Home', blurb: 'Laptop, tablet and note-taker in one. The hinge folds flat for sketching, reading and presenting.' }),
  P({ id: 'lenovo-thinkpad-t14', brand: 'Lenovo', series: 'ThinkPad', name: 'ThinkPad T14 Gen 4', category: 'business', price: 259000, sale: 12, rating: 4.8, reviews: 142, badge: 'Best seller', cpu: 'Intel Core i7-1355U', ram: 16, storage: '512 GB SSD', display: '14″ WUXGA IPS', gpu: 'Intel Iris Xe', battery: 'Up to 13 hrs', weight: '1.37 kg', os: 'Windows 11 Pro', blurb: 'The ThinkPad keyboard everyone loves, military-grade testing and ports for everything you plug in.' }),
  P({ id: 'lenovo-thinkpad-x1-carbon', brand: 'Lenovo', series: 'ThinkPad', name: 'ThinkPad X1 Carbon Gen 11', category: 'ultrabook', price: 459000, sale: 8, rating: 4.9, reviews: 97, badge: 'Top rated', cpu: 'Intel Core i7-1355U', ram: 32, storage: '1 TB SSD', display: '14″ 2.8K OLED', gpu: 'Intel Iris Xe', battery: 'Up to 15 hrs', weight: '1.12 kg', os: 'Windows 11 Pro', blurb: 'Carbon fibre, barely a kilo and an OLED screen that makes every document look printed.' }),
  P({ id: 'lenovo-legion-5-pro', brand: 'Lenovo', series: 'Legion', name: 'Legion 5 Pro 16', category: 'gaming', price: 419000, sale: 18, rating: 4.7, reviews: 73, badge: '', cpu: 'AMD Ryzen 7 7745HX', ram: 32, storage: '1 TB SSD', display: '16″ QHD+ 165 Hz', gpu: 'NVIDIA RTX 4060 8 GB', battery: 'Up to 8 hrs', weight: '2.49 kg', os: 'Windows 11 Home', blurb: 'A 16-inch QHD+ panel and a chip that keeps frame rates high without turning the desk into a heater.' }),
  P({ id: 'lenovo-ideapad-slim-3', brand: 'Lenovo', series: 'IdeaPad', name: 'IdeaPad Slim 3', category: 'student', price: 124000, sale: 20, rating: 4.4, reviews: 210, badge: 'Great value', cpu: 'AMD Ryzen 5 7520U', ram: 8, storage: '512 GB SSD', display: '15.6″ FHD', gpu: 'AMD Radeon', battery: 'Up to 9 hrs', weight: '1.62 kg', os: 'Windows 11 Home', blurb: 'Everything a student needs, nothing they do not. Light, quick and priced to leave room for books.' }),
  P({ id: 'dell-latitude-7440', brand: 'Dell', series: 'Latitude', name: 'Latitude 7440', category: 'business', price: 349000, sale: 10, rating: 4.7, reviews: 58, badge: '', cpu: 'Intel Core i7-1365U', ram: 16, storage: '512 GB SSD', display: '14″ FHD+', gpu: 'Intel Iris Xe', battery: 'Up to 16 hrs', weight: '1.26 kg', os: 'Windows 11 Pro', blurb: 'Quiet, refined and built for a long working day. Fast sign-in, strong battery and a keyboard with real travel.' }),
  P({ id: 'dell-xps-15', brand: 'Dell', series: 'XPS', name: 'XPS 15 9530', category: 'ultrabook', price: 539000, sale: 5, rating: 4.8, reviews: 81, badge: 'Creator pick', cpu: 'Intel Core i7-13700H', ram: 32, storage: '1 TB SSD', display: '15.6″ 3.5K OLED', gpu: 'NVIDIA RTX 4050', battery: 'Up to 12 hrs', weight: '1.86 kg', os: 'Windows 11 Home', blurb: 'A cinema-grade OLED screen in a machined aluminium body. The one editors and designers keep asking about.' }),
  P({ id: 'dell-inspiron-15', brand: 'Dell', series: 'Inspiron', name: 'Inspiron 15 3530', category: 'student', price: 139000, sale: 15, rating: 4.3, reviews: 175, badge: '', cpu: 'Intel Core i5-1335U', ram: 8, storage: '512 GB SSD', display: '15.6″ FHD 120 Hz', gpu: 'Intel Iris Xe', battery: 'Up to 9 hrs', weight: '1.65 kg', os: 'Windows 11 Home', blurb: 'A dependable all-rounder with a smooth 120 Hz screen for studying, streaming and everything in between.' }),
  P({ id: 'asus-rog-strix-g16', brand: 'ASUS', series: 'ROG', name: 'ROG Strix G16', category: 'gaming', price: 489000, sale: 20, rating: 4.8, reviews: 102, badge: 'Hot deal', cpu: 'Intel Core i9-13980HX', ram: 32, storage: '1 TB SSD', display: '16″ QHD+ 240 Hz', gpu: 'NVIDIA RTX 4070 8 GB', battery: 'Up to 7 hrs', weight: '2.50 kg', os: 'Windows 11 Home', blurb: 'Desktop-class power in a 16-inch frame. A 240 Hz screen and per-key lighting for players who notice every frame.' }),
  P({ id: 'asus-vivobook-15', brand: 'ASUS', series: 'Vivobook', name: 'Vivobook 15', category: 'student', price: 119000, sale: 12, rating: 4.4, reviews: 190, badge: '', cpu: 'AMD Ryzen 5 7530U', ram: 8, storage: '512 GB SSD', display: '15.6″ FHD', gpu: 'AMD Radeon', battery: 'Up to 10 hrs', weight: '1.70 kg', os: 'Windows 11 Home', blurb: 'Slim, bright and easy to carry. A friendly first laptop that still feels quick a few years in.' }),
  P({ id: 'asus-zenbook-14-oled', brand: 'ASUS', series: 'Zenbook', name: 'Zenbook 14 OLED', category: 'ultrabook', price: 279000, sale: 10, rating: 4.7, reviews: 119, badge: 'New', cpu: 'Intel Core Ultra 7 155H', ram: 16, storage: '1 TB SSD', display: '14″ 2.8K OLED 120 Hz', gpu: 'Intel Arc', battery: 'Up to 14 hrs', weight: '1.20 kg', os: 'Windows 11 Home', blurb: 'A vivid 120 Hz OLED panel in a body that weighs about as much as a notebook. Made for travel.' }),
  P({ id: 'acer-nitro-v-16', brand: 'Acer', series: 'Nitro', name: 'Nitro V 16', category: 'gaming', price: 259000, sale: 14, rating: 4.5, reviews: 67, badge: '', cpu: 'AMD Ryzen 7 8845HS', ram: 16, storage: '512 GB SSD', display: '16″ WUXGA 165 Hz', gpu: 'NVIDIA RTX 4050 6 GB', battery: 'Up to 7 hrs', weight: '2.50 kg', os: 'Windows 11 Home', blurb: 'The entry point to serious gaming. A fast 165 Hz screen and a capable GPU without the flagship price.' }),
  P({ id: 'msi-katana-15', brand: 'MSI', series: 'Katana', name: 'Katana 15', category: 'gaming', price: 299000, sale: 0, rating: 4.5, reviews: 54, badge: '', cpu: 'Intel Core i7-13620H', ram: 16, storage: '1 TB SSD', display: '15.6″ FHD 144 Hz', gpu: 'NVIDIA RTX 4060 8 GB', battery: 'Up to 6 hrs', weight: '2.25 kg', os: 'Windows 11 Home', blurb: 'Sharp styling and a strong RTX 4060 for high settings at 144 Hz. Built to be played hard.' }),
]

export const brands = ['HP', 'Lenovo', 'Dell', 'ASUS', 'Acer', 'MSI']

export const categories = [
  ['business', 'Business'],
  ['gaming', 'Gaming'],
  ['ultrabook', 'Ultrabook'],
  ['student', 'Student'],
]

export const getProduct = (id) => products.find((p) => p.id === id)

export const seriesOf = (brand) => [
  ...new Set(products.filter((p) => !brand || p.brand === brand).map((p) => p.series)),
]

export const maxSale = Math.max(...products.map((p) => p.sale))

export const specsOf = (p) => [
  ['Processor', p.cpu],
  ['Memory', `${p.ram} GB`],
  ['Storage', p.storage],
  ['Display', p.display],
  ['Graphics', p.gpu],
  ['Battery', p.battery],
  ['Weight', p.weight],
  ['Operating system', p.os],
]