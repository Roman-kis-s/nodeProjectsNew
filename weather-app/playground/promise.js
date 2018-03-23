// let somePromise = new Promise((resolve, reject) =>{
//
//        reject('Not working.');
//     resolve('Hey. It`s worked.');
// });
//
// somePromise.then((message) => {
//     console.log('Success', message);
// }, (errorMessage) =>{
//     console.log('Error message', errorMessage);
// });

let asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof a === 'number' && typeof b === 'number'){
                resolve(a + b);
            }else {
                reject('Arguments must be numbers');
            }
        }, 100);
    });
};

asyncAdd(4, 6).then((result) => {
    console.log('Result:', result);
    return asyncAdd(result, '10');
}).then((result) => {
    console.log('Result should be number:', result);
}).catch((errorMessage) => {
    console.log(errorMessage);
});