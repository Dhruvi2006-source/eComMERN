const images = [
  "https://sweetlemonstudio.com/wp-content/uploads/2021/09/IMG_2204h-1024x683.jpg",
  "https://assets.entrepreneur.com/content/3x2/2000/20171212213121-apple-website.jpeg",
  "https://wforwoman.com/cdn/shop/files/23AUW19649-810532_1.jpg?v=1721340388",
  "https://media.powerlook.in/catalog/product/1/1/1149321.jpg?aio=w-640",
  "https://sb.kaleidousercontent.com/67418/1920x1100/0135fd63fd/transparent-boots.png",
  "https://media.voguebusiness.com/photos/5ce3d84932029c6ded13e829/2:3/w_2560%2Cc_limit/online-product-may-19-article.jpg",
];

function ImageGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div
        className="
          grid 
          grid-cols-2 
          sm:grid-cols-4 
          lg:grid-cols-6 
          gap-3
          auto-rows-[140px] 
          sm:auto-rows-[180px] 
          lg:auto-rows-[220px]"
      >
        {images.map((img, index) => {
          // Fancy span logic to mix up layout
          const spanClasses = [
            "col-span-2 row-span-2",
            "col-span-1 row-span-1",
            "col-span-1 row-span-2",
            "col-span-2 row-span-1",
            "col-span-1 row-span-1",
            "col-span-2 row-span-2",
          ];

          return (
            <div
              key={index}
              className={`relative group overflow-hidden rounded-xl shadow-xl ${spanClasses[index % spanClasses.length]} transition-all`}
            >
              <img
                src={img}
                alt={`img-${index}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
              <div className="absolute bottom-2 left-2 text-white text-xs sm:text-sm font-medium bg-black/50 px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition duration-300">
                Coming soon..
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ImageGrid;
