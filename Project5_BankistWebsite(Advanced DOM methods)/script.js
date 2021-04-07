// script for modal starts here
const openModalButtons = document.querySelectorAll('.openModal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeButton = document.querySelector('.closeButton');

const openModal = function(e){
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    document.body.style.position = 'fixed';
}

const closeModal = function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    document.body.style.position = '';
}

for(let i=0; i<openModalButtons.length; i++)
{
    openModalButtons[i].addEventListener('click', openModal);
}

closeButton.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e){
    if(e.keyCode===27 && !modal.classList.contains('hidden'))
    {
        closeModal();
    }
});
// script for modal Ends here

const learnMore = document.querySelector('.learnMoreButton');
learnMore.addEventListener('click', function(e){
    e.preventDefault();
    // let s1Cords = document.getElementById('section1').getBoundingClientRect();
    // console.log(s1Cords);
    // console.log(window.pageXOffset, window.pageYOffset);
    // window.scrollTo(s1Cords.left + window.pageXOffset, s1Cords.top + window.pageYOffset);
    document.getElementById('section1').scrollIntoView({behavior: 'smooth'});
});

//tabbed section
const tabButtonsSection = document.querySelector('.tabButtons');
const tabButtons = document.querySelectorAll('.tabButton');
const tabData = document.querySelectorAll('.tabData');

tabButtonsSection.addEventListener('click', function(e){
    const clicked = e.target.closest('.tabButton');
    // console.log(clicked);

    if(!clicked) return;

    //styling buttons
    tabButtons.forEach(b => b.classList.remove('tabButtonActive'));

    clicked.classList.add('tabButtonActive');

    //styling data
    tabData.forEach(d => d.classList.remove('tabDataActive'));
    // console.log(clicked.dataset.tab);
    document.querySelector(`.tabData${clicked.dataset.tab}`).classList.add('tabDataActive');
});

//sticky nav (using Intersection Observer API)
const header = document.querySelector('header');
const navHeight = document.querySelector('nav').getBoundingClientRect().height;

const stickyNav = function(entries){
    const [entry] = entries;
    if(!entry.isIntersecting)
    {
        document.querySelector('nav').classList.add('sticky');
    }
    else
    {
        document.querySelector('nav').classList.remove('sticky');
    }
};

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
});
headerObserver.observe(header);

//adding hover effect to navLinks...

const navArea = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.navLink');

const handleHover = function(e)
{
    if(e.target.classList.contains('navLink'))
    {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.navLink');
        const logo = document.querySelector('.navImage');

        // console.log(this);
        siblings.forEach(sib => {
            if(sib!==link)
            {
                sib.style.opacity = this;
                logo.style.opacity = this;
            }
        })
    }
}
navArea.addEventListener('mouseover', handleHover.bind(0.5));
navArea.addEventListener('mouseout', handleHover.bind(1));
