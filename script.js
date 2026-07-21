document.getElementById('openBtn').addEventListener('click',()=>{
 document.getElementById('letter').classList.remove('hidden');
 document.getElementById('letter').scrollIntoView({behavior:'smooth'});
});
