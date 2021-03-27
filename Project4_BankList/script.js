'use strict';
const userNameInput = document.querySelector('.login_user');
const userPinInput = document.querySelector('.login_pin');
const loginButton = document.querySelector('.login_button');
const movements = document.querySelector('.movements');
const account1 = {
    userName: 'kiran',
    pin: 888,
    interestRate: 1.5,
    movements: [10, 100, 400, -30, 90, -300, 500, -50, 900, -500, -100]
}
const account2 = {
    userName: 'harsha',
    pin: 111,
    interestRate: 2,
    movements: [1000, -400, 200, -11 -300, 900, -100, 5000, -500, 500, -1500, 1000]
}
const account3 = {
    userName: 'lileep',
    pin: 222,
    interestRate: 0.5,
    movements: [950, -1590, -330, -290, -800, 890, -50, 1900, 500, -100, -990]
}
const account4 = {
    userName: 'tharun',
    pin: 333,
    interestRate: 0.8,
    movements: [190, -800, 80, -50, 1900, 500, -100, -990, -50, 900, -500, -100]
}
const account5 = {
    userName: 'nikhil',
    pin: 444,
    interestRate: 1,
    movements: [100, 450, 890, -50, -1900, 500, -100, -990 -50, 900, -500, 1000, -1000, 500]
}
const accounts = [account1, account2, account3, account4, account5];
const calculateBalance = function(movs){
        let balance = 0;
        movs.forEach(function(mov){
            balance+=mov;
        });
        return balance;
};

const updateMovements = function(movs){
    movements.innerHTML = '';
    movs.forEach(function(mov, index){
        const type = mov>0?'deposit':'withdraw';
        console.log(mov, type, index);
        let html = `<div class="movement_row">
                    <div class="movement_type-${type}">${index+1} ${type}</div>
                    <div class="movement_value">${mov}$</div>
                </div>`;
        movements.insertAdjacentHTML('afterbegin', html);
    });
};

const updateUi = function(acc){
    console.log("updated the ui");
    acc.balance = calculateBalance(acc.movements);
    document.querySelector('.current_balance_value').textContent = `${acc.balance}$`;
    updateMovements(acc.movements);
};

var currentAccount;
loginButton.addEventListener('click', function(e){
    e.preventDefault();
    let user = userNameInput.value;
    let pin = Number(userPinInput.value);
    console.log(user, pin);
    accounts.forEach(function(account){
        if(account.userName===user && account.pin===pin)
        {
            currentAccount = account;
            updateUi(currentAccount);
        }
        else{
            
        }
    });
});