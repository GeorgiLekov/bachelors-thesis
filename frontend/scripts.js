const mockedTokenForTesting = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTMxMDk1NzgzMjM4ODc4MGM4Njc2NTEiLCJpYXQiOjE2OTc3NDExOTgsImV4cCI6MTY5ODAwMDM5OH0.UpMggbdseZh9kcYRk1CeNLmEcsMD9agDmmNZxPYp2lQ'
async function test(){
    console.log('scripts loaded')
    const response = await fetch('http://localhost:4000/api/workouts', {
        method: 'get',
        headers: { authorization: `Bearer ${mockedTokenForTesting}`}
    });
    const json = await response.json();
    console.log(json, 'json');
    const button = document.querySelector(".login-button");
    button.addEventListener(('click'), function (){
    })
}
test();
