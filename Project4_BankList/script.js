'use strict';
const userNameInput = document.querySelector('.login_user');
const userPinInput = document.querySelector('.login_pin');
const loginButton = document.querySelector('.login_button');
const movements = document.querySelector('.movements');
const account1 = {
    userName: 'kiran',
    pin: 888,
    interestRate: 1.5,
    movements: [10, 100, 400, -30, 90, -300, 500, -50, 900, -500, -100],
    movementsTime: ["2021-03-29T13:32:43.869Z", "2021-03-29T13:32:43.869Z",
                    "2021-03-27T13:32:43.869Z", "2021-03-26T13:32:43.869Z",
                    "2021-03-23T13:32:43.869Z", "2021-03-21T13:32:43.869Z",
                    "2021-03-18T13:32:43.869Z", "2021-03-15T13:32:43.869Z",
                    "2021-03-12T13:32:43.869Z", "2021-03-10T13:32:43.869Z",
                    "2021-02-29T13:32:43.869Z"],
    native:'en-US'
}
const account2 = {
    userName: 'harsha',
    pin: 111,
    interestRate: 1.5,
    movements: [1000, -400, 200, -11, -300, 900, -100, 5000, -500, 500, -1500, 1000],
    movementsTime: ["2021-03-29T13:32:43.869Z", "2021-03-28T13:32:43.869Z",
                    "2021-03-27T13:32:43.869Z", "2021-03-23T13:32:43.869Z",
                    "2021-03-20T13:32:43.869Z", "2021-03-19T13:32:43.869Z",
                    "2021-03-15T13:32:43.869Z", "2021-03-15T13:32:43.869Z",
                    "2021-03-13T13:32:43.869Z", "2021-03-12T13:32:43.869Z",
                    "2021-03-10T13:32:43.869Z", "2021-03-09T13:32:43.869Z"],
    native: 'en-US'
}
const account3 = {
    userName: 'lileep',
    pin: 222,
    interestRate: 1.5,
    movements: [950, -1590, -330, -290, -800, 890, -50, 1900, 500, -100, -990],
    movementsTime: ["2021-03-29T13:32:43.869Z", "2021-03-29T13:32:43.869Z",
                    "2021-03-27T13:32:43.869Z", "2021-03-26T13:32:43.869Z",
                    "2021-03-23T13:32:43.869Z", "2021-03-21T13:32:43.869Z",
                    "2021-03-18T13:32:43.869Z", "2021-03-15T13:32:43.869Z",
                    "2021-03-12T13:32:43.869Z", "2021-03-10T13:32:43.869Z",
                    "2021-02-29T13:32:43.869Z"],
    native: 'en-US'
}
const account4 = {
    userName: 'tharun',
    pin: 333,
    interestRate: 1.5,
    movements: [190, -800, 80, -50, 1900, 500, -100, -990, -50, 900, -500, -100],
    movementsTime: ["2021-03-29T13:32:43.869Z", "2021-03-28T13:32:43.869Z",
                    "2021-03-27T13:32:43.869Z", "2021-03-23T13:32:43.869Z",
                    "2021-03-20T13:32:43.869Z", "2021-03-19T13:32:43.869Z",
                    "2021-03-15T13:32:43.869Z", "2021-03-15T13:32:43.869Z",
                    "2021-03-13T13:32:43.869Z", "2021-03-12T13:32:43.869Z",
                    "2021-03-10T13:32:43.869Z", "2021-03-09T13:32:43.869Z"],
    native: 'en-US'
}
const account5 = {
    userName: 'nikhil',
    pin: 444,
    interestRate: 1.5,
    movements: [100, 450, 890, -50, -1900, 500, -100, -990, -50, 900, -500, 1000, -1000, 500],
    movementsTime: ["2021-03-29T13:32:43.869Z", "2021-03-23T13:32:43.869Z",
                    "2021-03-22T13:32:43.869Z", "2021-03-20T13:32:43.869Z",
                    "2021-03-15T13:32:43.869Z", "2021-03-10T13:32:43.869Z",
                    "2021-03-10T13:32:43.869Z", "2021-03-09T13:32:43.869Z",
                    "2021-03-05T13:32:43.869Z", "2021-03-03T13:32:43.869Z",
                    "2021-03-01T13:32:43.869Z", "2021-03-01T13:32:43.869Z",
                    "2021-02-29T13:32:43.869Z", "2021-02-25T13:32:43.869Z"],
    native: 'en-US'
}
const accounts = [account1, account2, account3, account4, account5];

//reversing the times of movements
accounts.forEach(acc => {
    acc.movementsTime.reverse();
});

const formatNumber = (num) => new Intl.NumberFormat('en-IN').format(num);

const calculateBalance = function(movs){
        let balance = 0;
        movs.forEach(function(mov){
            balance+=mov;
        });
        return balance;
};

const updateMovements = function(acc, sorted = false){
    movements.innerHTML = '';

    const movs = sorted ? acc.movements.slice().sort((a, b) => a-b) : acc.movements;
    const movsTimes = acc.movementsTime;
    // console.log(movsTimes);
    
    movs.forEach(function(mov, index){
        const type = mov>0?'deposit':'withdraw';

        const dateOfTransaction = new Date(acc.movementsTime[index]);
        const date = String(dateOfTransaction.getDate()).padStart(2, '0');
        const month = String(dateOfTransaction.getMonth()+1).padStart(2, '0');
        const year = dateOfTransaction.getFullYear();

        const now = new Date();
        const thatDate = new Date(acc.movementsTime[index]);
        const daysPassed = Math.round((now-thatDate)/(1000 * 60 * 60 * 24));
        // console.log(daysPassed);
        let movementDateString = '';
        if(daysPassed===0)
        {
            movementDateString = 'Today';
        }
        else if(daysPassed===1)
        {
            movementDateString = 'Yesterday';
        }
        else if(daysPassed>=2 && daysPassed<=5)
        {
            movementDateString = `${daysPassed} days ago.`;
        }
        else
        {
            movementDateString = `${date}/${month}/${year}`;
        }

        let html = `<div class="movement_row">
                    <div class="movement_type-${type}">${index+1} ${type}</div>
                    <div class="movements__date">${movementDateString}</div>
                    <div class="movement_value">${formatNumber(mov)}$</div>
                </div>`;
        movements.insertAdjacentHTML('afterbegin', html);
    });
};
const calcDisplaySummary = function(acc){
 const movs = acc.movements;
 const incoming = movs.filter(mov => mov>0).reduce((acc, mov)=> acc+mov, 0);
 const outgoing = movs.filter(mov => mov<0).reduce((acc, mov)=> acc+mov, 0);
 const interest = movs.filter(mov => mov>0).map(deposit => (deposit*acc.interestRate)/100).filter(interests => interests>=1).reduce((acc, intr) => acc+intr, 0);

 document.querySelector('.in').textContent = `${formatNumber(incoming)}$`;
 document.querySelector('.out').textContent = `${formatNumber(Math.abs(outgoing))}$`;
 document.querySelector('.int').textContent = `${formatNumber(interest)}$`;
//  console.log(incoming, outgoing, interest, incoming+outgoing);
};

const updateUi = function(acc){
    if(acc)
    {
        // console.log("updated the ui");

        //clearing the input feilds
        userNameInput.value = userPinInput.value = '';
        userNameInput.blur();
        userPinInput.blur();

        document.querySelector('.welcome').textContent = `Welcome back, ${currentAccount.userName[0].toUpperCase() + currentAccount.userName.slice(1)}`;
        document.querySelector('.app').style.opacity = 100;
        acc.balance = calculateBalance(acc.movements);
        document.querySelector('.current_balance_value').textContent = `${formatNumber(acc.balance)}$`;
        // updateMovements(currentAccount);
        calcDisplaySummary(acc);

        //time
        const now = new Date();
        const date = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth()+1).padStart(2, '0');
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        
        document.querySelector('.current_date').textContent = `${date}/${month}/${year} ${hours}:${minutes}`;

        updateMovements(acc);
    }
    else
    {
        document.querySelector('.app').style.opacity = 0;
        alert("Account logged out.");
    }
};

var currentAccount, timer;
loginButton.addEventListener('click', function(e){
    e.preventDefault();
    let user = userNameInput.value;
    let pin = Number(userPinInput.value);

    // console.log(user, pin);
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
        // console.log(currentAccount);
        updateUi(currentAccount);
        if(timer) clearInterval(timer);
        timer = startLogoutTimer();
        // updateMovements(currentAccount);
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
    // console.log('logged out');
    currentAccount = undefined;
    updateUi(currentAccount);
    document.querySelector('.welcome').textContent = `Login to get started.`;

};
document.querySelector('.button_logout').addEventListener('click', logout);

var sortedState = false;
const sortMovs = function(){
    updateMovements(currentAccount, !sortedState);
    sortedState = !sortedState;
};
document.querySelector('.button_sort').addEventListener('click', sortMovs);

document.querySelector('.transferButton').addEventListener('click', function(e)
{
    e.preventDefault();
    let receiver = document.querySelector('.transferTo').value;
    let amount = Number(document.querySelector('.transferAmount').value);
    // console.log(receiver, amount);
    const receiverAccount = accounts.find(account => account.userName===receiver);
    if(receiverAccount && amount && amount <= currentAccount.balance)
    {
        currentAccount.movements.push(-amount);
        receiverAccount.movements.push(amount);

        let transactTime = new Date().toISOString();
        currentAccount.movementsTime.push(transactTime);
        receiverAccount.movementsTime.push(transactTime);
        // updateMovements(currentAccount);


        // console.log(currentAccount, receiverAccount);
        updateUi(currentAccount);
        // console.log(currentAccount.balance, calculateBalance(currentAccount.movements));


        //clearing feilds
        document.querySelector('.transferTo').value = document.querySelector('.transferAmount').value = '';
        document.querySelector('.transferTo').blur();
        document.querySelector('.transferAmount').blur();

        //resetting the logout timer..
        clearInterval(timer);
        timer = startLogoutTimer();
    }
    else if(amount > currentAccount.balance)
    {
        alert("You does'nt have sufficient funds to transfer.");
    }
    else if(!amount)
    {
        alert("Please enter valid amount.");
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
        // console.log(accounts);
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
    // console.log(deposits, eligible);
    if(eligible)
    {
        // console.log("Eligible");
        currentAccount.movements.push(loanAmount);

        let transactTime = new Date().toISOString();
        currentAccount.movementsTime.push(transactTime);
        updateUi(currentAccount);

        //clearing feilds
        document.querySelector('.loanAmount').value = '';
        document.querySelector('.loanAmount').blur();

        //resetting the logout timer..
        clearInterval(timer);
        timer = startLogoutTimer();
    }
    else
    {
        alert("You have'nt deposited any amount greater than 10 percent of requested amount.\nYour request for loan can't be processed.");
    }
});

//logout timer

const startLogoutTimer = function(){
    // clearInterval(timer);
    let time = 300;
    const tick = function(){
        const min = String(Math.trunc(time/60)).padStart(2, 0);
        const sec = String(Math.trunc(time%60)).padStart(2, 0);

            document.querySelector('.logout_timer').textContent = `${min}:${sec}`;
            
            
            if(time===0)
            {
                clearInterval(timer);
                logout();
            }
            time--;
        };
    tick();
    timer = setInterval(tick, 1000);
    return timer;
};


//Intl (Internationalization)

// let num = 123456;
// console.log(new Intl.NumberFormat('en-IN').format(num));

// const formatNumber = (num) => new Intl.NumberFormat('en-IN').format(num);
// console.log(formatNumber(123456));
// console.log(formatNumber(1000));
// console.log(formatNumber(10000));
// console.log(formatNumber(100000));
// console.log(formatNumber(10000000));
