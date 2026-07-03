
function scrollToSection(id){
document.getElementById(id).scrollIntoView({behavior:'smooth'});
}

function toggleMenu(){
document.getElementById('nav').classList.toggle('active');
}

window.addEventListener('scroll',()=>{
let s=document.documentElement.scrollTop;
let h=document.documentElement.scrollHeight-document.documentElement.clientHeight;
document.querySelector('.progress-bar').style.width=(s/h)*100+'%';
});

const cursor=document.querySelector('.cursor');
document.addEventListener('mousemove',(e)=>{
cursor.style.left=e.clientX+'px';
cursor.style.top=e.clientY+'px';
});

const words=["Designer","Developer","Creator"];
let i=0,j=0,del=false;

function type(){
let w=words[i];
j+=del?-1:1;
document.querySelector('.typing').textContent=w.substring(0,j);
if(!del&&j===w.length){del=true;setTimeout(type,1000);return}
if(del&&j===0){del=false;i=(i+1)%words.length}
setTimeout(type,120);
}
type();
