const modalButtons = document.querySelectorAll('.openModal');
const closeButtons = document.querySelectorAll('.closeButton');
const overlay = document.querySelector('.overlay');

modalButtons.forEach(function(button){
    button.onclick = function(){
        let currentModal = button.getAttribute('data-modal');
        openModal(currentModal);
    }
});

closeButtons.forEach(function(button){
    button.onclick = function(){
        console.log("closed");
        var currentModal = button.closest('.modal').id;
        closeModal(currentModal);
    }
})

const openModal = function(currentModal){

    document.getElementById(currentModal).classList.remove('hidden');

    overlay.classList.remove('hidden');
}

const closeModal = function(currentModal){
    document.getElementById(currentModal).classList.add('hidden');
    overlay.classList.add('hidden');
}

overlay.addEventListener('click', function(){
    for(let i=1; i<=modalButtons.length; i++)
    {
        document.getElementById('modal'+i).classList.add('hidden');
        overlay.classList.add('hidden');
    }
});

document.addEventListener('keydown', function(e){
    if(e.keyCode===27)
    {
        for(let i=1; i<=modalButtons.length; i++)
        {
            document.getElementById('modal'+i). classList.add('hidden');
            overlay.classList.add('hidden');
        }
    }
});











// const openModalButtons = document.querySelectorAll('.openModal');
// const modal = document.querySelector('.modal');
// const overlay = document.querySelector('.overlay');
// const closeButton = document.querySelector('.closeButton');

// const openModal = function(){
//     modal.classList.remove('hidden');
//     overlay.classList.remove('hidden');
// }

// const closeModal = function(){
//     modal.classList.add('hidden');
//     overlay.classList.add('hidden');
// }

// // openModalButtons.forEach(function(button){
// //     button.onclick = function(){
// //         openModal();
// //         console.log("button clicked", button.getAttribute('data-modal'))
// //     };
// // });
// for(let i=0; i<openModalButtons.length; i++)
// {
//     openModalButtons[i].addEventListener('click', openModal);
// }

// closeButton.addEventListener('click', closeModal);

// overlay.addEventListener('click', closeModal);

// document.addEventListener('keydown', function(e){
//     if(e.keyCode===27 && !modal.classList.contains('hidden'))
//     {
//         closeModal();
//     }
// });