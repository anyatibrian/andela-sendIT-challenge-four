let login_btn = document.getElementById('login');
login_btn.addEventListener('click', loginUser);

function loginUser(e){
    e.preventDefault();
    let username = document.getElementById('username').value;
    let password =document.getElementById('password').value;

    let data={
        username:username,
        password:password
    };
    fetch("http://127.0.0.1:5000/api/v1/auth/login",{
        method:'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json'
        },
        body:JSON.stringify(data)
    }).then((response)=>response.json())
        .then((data)=>{

            if (data['access-token']=== data['access-token'] && username =='admin'){
                document.getElementById('login_error').innerText=data['message'];
                document.getElementById('login_error').style.color='white';

                window.location.replace('../templates/adminParcel.html');
                let token = data['access-token'];

               // storing our data locally in the browser
               localStorage.setItem('access-token', token);
               localStorage.setItem('logged-in-user', username);

            }else if (data['access-token']){
                document.getElementById('login_error').innerText=data['message'];
                document.getElementById('login_error').style.color='white';

                window.location.replace('../templates/parcelOrder.html');
                //storing our data locally in the browser
                let token = data['access-token'];
                localStorage.setItem('access-token', token);
                localStorage.setItem('logged-in-user', username);

            }else{
                // redirect the user to the sign up page
               return false
            }
    });
}