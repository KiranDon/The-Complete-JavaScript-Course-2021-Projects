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