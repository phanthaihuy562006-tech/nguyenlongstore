const API_BASE='/api/admin';

document.addEventListener('DOMContentLoaded',async()=>{
  const user=JSON.parse(localStorage.getItem('user')||'{}');
  if(user.role!=='admin'){
    alert('Không có quyền truy cập!');window.location.href='home.html';return;
  }
  const token=localStorage.getItem('token');
  const headers={'Authorization':'Bearer '+token};

  const catRes=await fetch('/api/categories');
  const categories=await catRes.json();
  const catSelect=document.getElementById('prodCategory');
  categories.forEach(cat=>{
    const opt=document.createElement('option');opt.value=cat._id;opt.textContent=cat.name;
    catSelect.appendChild(opt);
  });

  async function loadProducts(){
    const res=await fetch('/api/admin/products',{headers});
    const products=await res.json();
    const list=document.getElementById('productList');
    list.innerHTML=products.map(p=>`
      <div class="admin-item">
        <span>${p.name} - ${p.price}đ</span>
        <button class="btn btn-secondary delete-product" data-id="${p._id}">Xoá</button>
        <input type="number" class="discount-input" placeholder="Giảm giá %" value="${p.discount||''}" data-id="${p._id}">
        <button class="btn btn-primary update-discount" data-id="${p._id}">Cập nhật giảm giá</button>
      </div>
    `).join('');
    document.querySelectorAll('.delete-product').forEach(btn=>{
      btn.addEventListener('click',async()=>{
        const id=btn.dataset.id;
        await fetch(`/api/admin/products/${id}`,{method:'DELETE',headers});
        loadProducts();
      });
    });
    document.querySelectorAll('.update-discount').forEach(btn=>{
      btn.addEventListener('click',async()=>{
        const id=btn.dataset.id;
        const discount=document.querySelector(`.discount-input[data-id="${id}"]`).value;
        await fetch(`/api/admin/products/${id}/discount`,{
          method:'PUT',headers:{...headers,'Content-Type':'application/json'},
          body:JSON.stringify({discount:Number(discount)})
        });
        alert('Đã cập nhật giảm giá');
      });
    });
  }
  loadProducts();

  document.getElementById('productForm').addEventListener('submit',async(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append('name',document.getElementById('prodName').value);
    formData.append('price',document.getElementById('prodPrice').value);
    formData.append('category',document.getElementById('prodCategory').value);
    formData.append('tag',document.getElementById('prodTag').value);
    formData.append('hiddenContent',document.getElementById('prodHiddenContent').value);
    formData.append('discount',document.getElementById('prodDiscount').value||0);
    const imageFile=document.getElementById('prodImage').files[0];
    if(imageFile)formData.append('image',imageFile);
    const res=await fetch('/api/admin/products',{method:'POST',headers:{'Authorization':headers['Authorization']},body:formData});
    if(res.ok){alert('Thêm thành công');loadProducts();}
    else alert('Lỗi thêm sản phẩm');
  });

  async function loadPendingDeposits(){
    const res=await fetch('/api/admin/pending-deposits',{headers});
    const deposits=await res.json();
    const list=document.getElementById('pendingDeposits');
    list.innerHTML=deposits.map(d=>`
      <div class="admin-item">
        <span>${d.user?.username} - ${d.amount}đ - ${d.status}</span>
        <button class="btn btn-primary approve" data-id="${d._id}">Duyệt</button>
        <button class="btn btn-secondary reject" data-id="${d._id}">Từ chối</button>
      </div>
    `).join('');
    document.querySelectorAll('.approve').forEach(b=>{
      b.addEventListener('click',async()=>{
        await fetch(`/api/admin/deposits/${b.dataset.id}/approve`,{method:'PUT',headers});
        loadPendingDeposits();
      });
    });
    document.querySelectorAll('.reject').forEach(b=>{
      b.addEventListener('click',async()=>{
        await fetch(`/api/admin/deposits/${b.dataset.id}/reject`,{method:'PUT',headers});
        loadPendingDeposits();
      });
    });
  }
  loadPendingDeposits();

  // Thêm tiền (giới hạn 100tr)
  document.getElementById('addBalanceForm').addEventListener('submit',async(e)=>{
    e.preventDefault();
    const username=document.getElementById('balanceUsername').value.trim();
    const amountInput=document.getElementById('balanceAmount');
    const amount=Number(amountInput.value);
    if(amount>100000000){
      document.getElementById('balanceMsg').innerHTML='Số tiền không được vượt quá 100.000.000 VND';
      return;
    }
    try{
      const res=await fetch(`${API_BASE}/add-balance`,{
        method:'POST',headers:{...headers,'Content-Type':'application/json'},
        body:JSON.stringify({username,amount})
      });
      const data=await res.json();
      document.getElementById('balanceMsg').innerHTML=data.message||'Thành công';
    }catch(err){
      document.getElementById('balanceMsg').innerHTML='Lỗi kết nối';
    }
  });

  // Thêm admin
  document.getElementById('makeAdminForm').addEventListener('submit',async(e)=>{
    e.preventDefault();
    const username=document.getElementById('adminUsername').value.trim();
    try{
      const res=await fetch(`${API_BASE}/make-admin`,{
        method:'POST',headers:{...headers,'Content-Type':'application/json'},
        body:JSON.stringify({username})
      });
      const data=await res.json();
      document.getElementById('adminMsg').innerHTML=data.message||'Thành công';
    }catch(err){
      document.getElementById('adminMsg').innerHTML='Lỗi kết nối';
    }
  });
});
