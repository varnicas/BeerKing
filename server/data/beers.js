const beers = [
  {
    name: "Heineken silver",
    image:
      "https://www.drinksupermarket.com/media/catalog/product/h/e/heineken-silver-premium-lager-330ml.jpg",
    percentage: "4%",
    type: "lager",
    manufacturer: "Heineken",
    price: "2.5",
  },
  {
    name: "Heineken 0.0",
    image: "https://www.kavakonstantakopoulos.gr/images/thumbs/0003637.jpeg",
    percentage: "0%",
    type: "lager",
    manufacturer: "Heineken",
    price: "2.3",
  },
  {
    name: "Paulaner Weissbier",
    image:
      "https://beerhunter.co.uk/wp-content/uploads/2022/07/ulaner-Weissbier-330ml-Bottles-5.5-ABV-12-Pack-single-bottle.jpg",
    percentage: "5,5%",
    type: "wheat beer",
    manufacturer: "Paulaner",
    price: "3.5",
  },
  {
    name: "Weissbier Dunkel",
    image:
      "https://birrabiss.com/wp-content/uploads/2016/05/Paul-Dunkel-web.png",
    percentage: "5,3%",
    type: "dark wheat",
    manufacturer: "Paulaner",
    price: "3.4",
  },
  {
    name: "Heineken original",
    image:
      "https://www.conatycatering.com/image/cache/uploads/Main_Product_Images/02369220-1000x1000.jpg",
    percentage: "5%",
    type: "pilsner",
    manufacturer: "Heineken",
    price: "3.5",
  },
  {
    name: "Münchner Hell",
    image: "https://birrabiss.com/wp-content/uploads/2016/05/Paul-Hell-web.png",
    percentage: "4,9%",
    type: "lager",
    manufacturer: "Paulaner",
    price: "3.6",
  },
  {
    name: "Paulaner Salvator",
    image:
      "https://images.squarespace-cdn.com/content/v1/553bfa4be4b0786b41dbc163/1685024193941-AZP0AO49GKHWIVCASIRO/R0018110.JPG?format=1000w",
    percentage: "7,9%",
    type: "double bock",
    manufacturer: "Paulaner",
    price: "4",
  },
  {
    name: "Budweiser Original",
    image:
      "https://www.conatycatering.com/image/cache/uploads/Main_Product_Images/02303292-1000x1000.jpg",
    percentage: "5%",
    type: "american lager",
    manufacturer: "Budweiser",
    price: "4.5",
  },
  {
    name: "Budweiser Zero",
    image:
      "data:image/jpeg;base64,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",
    percentage: "0%",
    type: "lager",
    manufacturer: "Budweiser",
    price: "4.2",
  },
  {
    name: "Karlovačko original",
    image:
      "https://images.gotoliquorstore.com/product/1000013063/2a5fa625-0f21-4c14-acf3-996c2c59afd7_1000_m.jpg",
    percentage: "5%",
    type: "lager",
    manufacturer: "Karlovačko",
    price: "3",
  },
  {
    name: "Karlovačko limun",
    image:
      "https://d19p4plxg0u3gz.cloudfront.net/334e0398-33ae-11eb-bf29-5aabeb47754a/v/cbf7fd72-38e2-11eb-b297-0242ac15000f/1000x1000-cbf80ec0-38e2-11eb-aca8-0242ac15000f.webp",
    percentage: "2%",
    type: "radler",
    manufacturer: "Karlovačko",
    price: "2.3",
  },
  {
    name: "Corona extra",
    image:
      "https://oasiscatering.com.au/cdn/shop/products/corona-bottles-330ml.png?v=1635465854",
    percentage: "4,5%",
    type: "pale lager",
    manufacturer: "Corona",
    price: "4",
  },
  {
    name: "Corona light",
    image: "https://images.heb.com/is/image/HEBGrocery/000208692-1",
    percentage: "4%",
    type: "pilsner",
    manufacturer: "Corona",
    price: "3.8",
  },
  {
    name: "Corona familiar",
    image: "https://images.heb.com/is/image/HEBGrocery/001432793-1",
    percentage: "4,8%",
    type: "mexican lager",
    manufacturer: "Corona",
    price: "4.3",
  },
  {
    name: "Hard seltzer",
    image:
      "https://images.gotoliquorstore.com/product/1000048230/838c8e9f-5027-4e0f-847e-360cb0ce464c_1000_m.jpg",
    percentage: "4,5%",
    type: "flavored malt",
    manufacturer: "Corona",
    price: "4",
  },
  {
    name: "Guinness draught",
    image:
      "https://www.365drinks.co.uk/cdn/shop/products/guinness-draught-stout-beer-cans-24x440ml-220_1024x1024.jpg?v=1596115173",
    percentage: "4,2%",
    type: "lager",
    manufacturer: "Guinness",
    price: "4.6",
  },
  {
    name: "Guinness smooth",
    image:
      "https://i0.wp.com/adiba.com/wp-content/uploads/2023/01/664.jpg?fit=1000%2C1000&ssl=1",
    percentage: "4,5%",
    type: "stout",
    manufacturer: "Guinness",
    price: "4.4",
  },
  {
    name: "Guinness original",
    image:
      "https://www.drinksupermarket.com/media/catalog/product/g/u/guinness-original-stout-330ml.jpg",
    percentage: "4,2%",
    type: "porter",
    manufacturer: "Guinness",
    price: "4.2",
  },
  {
    name: "Hop house 13",
    image:
      "https://www.drinksupermarket.com/media/catalog/product/h/o/hop-house-13-lager-650ml.jpg",
    percentage: "4,1%",
    type: "stout",
    manufacturer: "Guinness",
    price: "4.8",
  },
  {
    name: "Stella Artois",
    image:
      "https://www.apolonia.com/fotos/produtos/12/123900_01_06-11-2017_g.jpg",
    percentage: "5%",
    type: "lager",
    manufacturer: "Stella Artois",
    price: "3.8",
  },
  {
    name: "Stella Liberte",
    image:
      "https://minusmoonshine.com/cdn/shop/products/678994CA-9827-4534-8A41-2EE6E96C6F0C_1000x1000.jpg?v=1660308124",
    percentage: "0%",
    type: "lager",
    manufacturer: "Stella Artois",
    price: "3.6",
  },
];

export default beers;
