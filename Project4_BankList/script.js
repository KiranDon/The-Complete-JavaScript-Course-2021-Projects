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
    interestRate: 1.5,
    movements: [1000, -400, 200, -11 -300, 900, -100, 5000, -500, 500, -1500, 1000]
}
const account3 = {
    userName: 'lileep',
    pin: 222,
    interestRate: 1.5,
    movements: [950, -1590, -330, -290, -800, 890, -50, 1900, 500, -100, -990]
}
const account4 = {
    userName: 'tharun',
    pin: 333,
    interestRate: 1.5,
    movements: [190, -800, 80, -50, 1900, 500, -100, -990, -50, 900, -500, -100]
}
const account5 = {
    userName: 'nikhil',
    pin: 444,
    interestRate: 1.5,
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

const updateMovements = function(movementsArr, sorted = false){
    movements.innerHTML = '';

    const movs = sorted ? movementsArr.slice().sort((a, b) => a-b) : movementsArr;
    
    movs.forEach(function(mov, index){
        const type = mov>0?'deposit':'withdraw';
        let html = `<div class="movement_row">
                    <div class="movement_type-${type}">${index+1} ${type}</div>
                    <div class="movement_value">${mov}$</div>
                </div>`;
        movements.insertAdjacentHTML('afterbegin', html);
    });
};
const calcDisplaySummary = function(acc){
 const movs = acc.movements;
 const incoming = movs.filter(mov => mov>0).reduce((acc, mov)=> acc+mov, 0);
 const outgoing = movs.filter(mov => mov<0).reduce((acc, mov)=> acc+mov, 0);
 const interest = movs.filter(mov => mov>0).map(deposit => (deposit*acc.interestRate)/100).filter(interests => interests>=1).reduce((acc, intr) => acc+intr, 0);

 document.querySelector('.in').textContent = `${incoming}$`;
 document.querySelector('.out').textContent = `${Math.abs(outgoing)}$`;
 document.querySelector('.int').textContent = `${interest}$`;
 console.log(incoming, outgoing, interest, incoming+outgoing);
};

const updateUi = function(acc){
    if(acc)
    {
        console.log("updated the ui");

        //clearing the input feilds
        userNameInput.value = userPinInput.value = '';
        userNameInput.blur();
        userPinInput.blur();

        document.querySelector('.welcome').textContent = `Welcome back, ${currentAccount.userName[0].toUpperCase() + currentAccount.userName.slice(1)}`;
        document.querySelector('.app').style.opacity = 100;
        acc.balance = calculateBalance(acc.movements);
        document.querySelector('.current_balance_value').textContent = `${acc.balance}$`;
        updateMovements(acc.movements);
        calcDisplaySummary(acc);
    }
    else
    {
        document.querySelector('.app').style.opacity = 0;
        alert("Account logged out.");
    }
};

var currentAccount;
loginButton.addEventListener('click', function(e){
    e.preventDefault();
    let user = userNameInput.value;
    let pin = Number(userPinInput.value);

    console.log(user, pin);
    currentAccount = accounts.find(acc => acc.userName===user);
    if(!currentAccount)
    {
        alert("Account does'nt exist.");
        document.querySelector('.app').style.opacity = 0;
    }
    else if(currentAccount.pin!==pin)
    {
        alert("Incorrect password.");
        document.querySelector('.app').style.opacity = 0;
    }
    else
    {
        console.log(currentAccount);
        updateUi(currentAccount);
    }
    // accounts.forEach(function(account){
    //     if(account.userName===user && account.pin===pin)
    //     {
    //         currentAccount = account;
    //         updateUi(currentAccount);
    //     }
    //     else{
            
    //     }
    // });
});
const logout = function(){
    console.log('logged out');
    currentAccount = undefined;
    updateUi(currentAccount);
    document.querySelector('.welcome').textContent = `Login to get started.`;

};
document.querySelector('.button_logout').addEventListener('click', logout);

var sortedState = false;
const sortMovs = function(){
    updateMovements(currentAccount.movements, !sortedState);
    sortedState = !sortedState;
};
document.querySelector('.button_sort').addEventListener('click', sortMovs);

document.querySelector('.transferButton').addEventListener('click', function(e)
{
    e.preventDefault();
    let receiver = document.querySelector('.transferTo').value;
    let amount = Number(document.querySelector('.transferAmount').value);
    console.log(receiver, amount);
    const receiverAccount = accounts.find(account => account.userName===receiver);
    if(receiverAccount && amount <= currentAccount.balance)
    {
        currentAccount.movements.push(-amount);
        receiverAccount.movements.push(amount);
        console.log(currentAccount, receiverAccount);
        updateUi(currentAccount);
        console.log(currentAccount.balance, calculateBalance(currentAccount.movements));


        //clearing feilds
        document.querySelector('.transferTo').value = document.querySelector('.transferAmount').value = '';
        document.querySelector('.transferTo').blur();
        document.querySelector('.transferAmount').blur();
    }
    else if(amount > currentAccount.balance)
    {
        alert("You does'nt have sufficient funds to transfer.");
    }
    else
    {
        alert("Receiver's account does'nt exist.");
    }
});

document.querySelector('.closeButton').addEventListener('click', function(e){
    e.preventDefault();
    let account = document.querySelector('.closeAccount').value;
    let accountPin = Number(document.querySelector('.closeAccountPin').value);

    // let accToBeDeleted = accounts.find(acc => acc.userName===account);
    // console.log(accounts, accToBeDeleted);
    if(account && account===currentAccount.userName && accountPin === currentAccount.pin)
    {
        accounts.splice(accounts.findIndex(acc => acc === currentAccount), 1);
        alert("Account deleted.");
        document.querySelector('.app').style.opacity = 0;
        console.log(accounts);
        document.querySelector('.welcome').textContent = `Login to get started.`;

        //clearing feilds
        document.querySelector('.closeAccount').value = document.querySelector('.closeAccountPin').value = '';
        document.querySelector('.closeAccount').blur();
        document.querySelector('.closeAccountPin').blur();
    }
    else if(account && account!==currentAccount.userName)
    {
        alert("You can't delete other user's account.");
    }
    else if(account && account===currentAccount.userName && accountPin !== currentAccount.pin)
    {
        alert("Invalid pin enterd.");
    }

});

document.querySelector('.loanButton').addEventListener('click', function(e){
    e.preventDefault();
    let loanAmount = Number(document.querySelector('.loanAmount').value);
    const movs = currentAccount.movements;
    const deposits = movs.filter(mov => mov > 0);
    const eligible = deposits.some(deposit => deposit >= (10*loanAmount)/100);
    console.log(deposits, eligible);
    if(eligible)
    {
        console.log("Eligible");
        currentAccount.movements.push(loanAmount);
        updateUi(currentAccount);

        //clearing feilds
        document.querySelector('.loanAmount').value = '';
        document.querySelector('.loanAmount').blur();
    }
    else
    {
        alert("You have'nt deposited any amount greater than 10 percent of requested amount.\nYour request for loan can't be processed.");
    }
});