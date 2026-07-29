const API_BASE='/api';

async function login(username,password){
  const res=await fetch(`${API_BASE}/auth/login`,{
    method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({username,password})
  });
  const data=await res.json();
  if(res.ok){
    localStorage.setItem('token',data.token);
    localStorage.setItem('user',JSON.stringify(data.user));
    return{success:true};
  }
  return{success:false,message:data.message||'Đăng nhập thất bại'};
}

async function register(username,password){
  const res=await fetch(`${API_BASE}/auth/register`,{
    method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({username,password})
  });
  const data=await res.json();
  return res.ok?{success:true}:{success:false,message:data.message};
}

function logout(){
  localStorage.removeItem('token');localStorage.removeItem('user');
  window.location.href='home.html';
}

function getCurrentUser(){
  const userStr=localStorage.getItem('user');
  return userStr?JSON.parse(userStr):null;
}

function isAdmin(){
  const user=getCurrentUser();
  return user&&user.role==='admin';
}

function checkAuthUI(){
  const userIcon=document.getElementById('userIcon');
  const logoutLink=document.getElementById('logoutLink');
  const adminMenuLink=document.getElementById('adminMenuLink');
  const user=getCurrentUser();
  if(user){
    if(userIcon)userIcon.innerHTML='👤 '+user.username;
    if(logoutLink)logoutLink.style.display='block';
    if(adminMenuLink&&user.role==='admin')adminMenuLink.style.display='block';
  }else{
    if(userIcon)userIcon.innerHTML='👤';
    if(logoutLink)logoutLink.style.display='none';
    if(adminMenuLink)adminMenuLink.style.display='none';
  }
}

document.addEventListener('click',(e)=>{
  if(e.target&&e.target.id==='logoutLink'){
    e.preventDefault();logout();
  }
});
