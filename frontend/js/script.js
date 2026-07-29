(function(){
  if(!document.getElementById('page-loader')){
    const loaderHTML=`
      <div id="page-loader">
        <div id="loader-progress"></div>
        <div class="cube-wrapper">
          <div class="cube">
            <div class="face front">◈</div>
            <div class="face back">◈</div>
            <div class="face right">◈</div>
            <div class="face left">◈</div>
            <div class="face top">◈</div>
            <div class="face bottom">◈</div>
          </div>
        </div>
        <div id="loader-text">ĐANG TẢI DỮ LIỆU</div>
      </div>
    `;
    document.body.insertAdjacentHTML('afterbegin',loaderHTML);
  }
  const loader=document.getElementById('page-loader');
  window.addEventListener('load',()=>{
    setTimeout(()=>{
      if(loader){
        loader.classList.add('fade-out');
        loader.addEventListener('transitionend',()=>loader.remove());
      }
      document.body.classList.add('loaded');
    },500);
  });
  setTimeout(()=>{if(loader&&!loader.classList.contains('fade-out'))loader.classList.add('fade-out')},3000);
})();

document.addEventListener('DOMContentLoaded',()=>{
  const menuToggle=document.getElementById('menuToggle');
  const mainMenu=document.getElementById('mainMenu');
  if(menuToggle&&mainMenu){
    menuToggle.addEventListener('click',()=>mainMenu.classList.toggle('active'));
    document.addEventListener('click',(e)=>{
      if(!menuToggle.contains(e.target)&&!mainMenu.contains(e.target)) mainMenu.classList.remove('active');
    });
  }
  const searchToggle=document.getElementById('searchToggle');
  const searchBox=document.getElementById('searchBox');
  if(searchToggle&&searchBox){
    searchToggle.addEventListener('click',()=>{
      searchBox.style.display=searchBox.style.display==='none'?'flex':'none';
    });
  }
  const fadeEls=document.querySelectorAll('.fade-in');
  const observer=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible')});
  },{threshold:0.1});
  fadeEls.forEach(el=>observer.observe(el));
});

async function loadCategories(){
  try{
    const res=await fetch('/api/categories');
    const categories=await res.json();
    const container=document.getElementById('categoryContainer');
    if(!container)return;
    container.innerHTML='';
    categories.forEach(cat=>{
      const catSection=document.createElement('div');
      catSection.className='category-section fade-in';
      catSection.innerHTML=`
        <div class="see-more">
          <a href="danhmuc.html?category=${cat.slug}" class="btn btn-secondary btn-sm">Xem thêm ${cat.name}</a>
        </div>
        <div class="category-grid" id="cat-${cat._id}"></div>
      `;
      container.appendChild(catSection);
      fetch(`/api/products?category=${cat._id}&limit=4`)
        .then(res=>res.json())
        .then(products=>{
          const grid=document.getElementById(`cat-${cat._id}`);
          products.forEach(prod=>{
            const card=document.createElement('div');
            card.className='category-card';
            card.innerHTML=`
              <img src="${prod.image||'public/images/placeholder.png'}" alt="${prod.name}">
              <span class="badge-active">ACTIVE</span>
              <div class="card-body">
                <div class="product-tag">${prod.tag||cat.name}</div>
                <div class="product-name">${prod.name}</div>
                <div class="product-price">${prod.price.toLocaleString()}đ</div>
                <button class="btn-buy" onclick="buyNow('${prod._id}')">Mua ngay</button>
              </div>
            `;
            grid.appendChild(card);
          });
        });
    });
  }catch(err){console.error('Lỗi tải danh mục:',err)}
}

function buyNow(productId){
  const token=localStorage.getItem('token');
  if(!token){alert('Vui lòng đăng nhập để mua hàng.');window.location.href='login.html';return}
  window.location.href=`productpurchasehistory.html?buy=${productId}`;
}

if(typeof checkAuthUI==='function') document.addEventListener('DOMContentLoaded',checkAuthUI);
