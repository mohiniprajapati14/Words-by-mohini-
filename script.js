function scrollToSection(id){
  document.getElementById(id).scrollIntoView({behavior:'smooth'});
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('active');
    }
  });
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
