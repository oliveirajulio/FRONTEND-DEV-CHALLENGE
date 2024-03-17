let imputemail = document.querySelector("#email")
let imputpassword = document.querySelector("#password")
let button = document.getElementById("btn-entrar")

button.addEventListener("click", () => {
    
    let emaildigitado = imputemail.value.toLowerCase()
    let senhadigitada = imputpassword.value

    autenticar(emaildigitado, senhadigitada);
})

function autenticar(email, senha) {

    const URL = 'http://localhost:3400/login'

    fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })

    }).then(response => response = response.json())
        .then(response => {
            console.log(response);

            if (!!response.mensagem) {
                alert(response.mensagem);
                return;
            }

            appearloadind();

            savetoken(response.token);
            saveuser(response.usuario);

            setTimeout(() => {
                window.open('products.html', '_self');
            }, 3000)


        })

        .catch(erro => {
            console.log(erro)

        })

}

function appearloadind() {
    const divloading = document.getElementById("loading");
    divloading.style.display = "block"

    const divbtn = document.getElementById("btn-entrar")
    divbtn.style.display = "none"
}