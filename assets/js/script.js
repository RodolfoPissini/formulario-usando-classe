class FormValid{
    constructor(){
        this.formulario = document.querySelector('.formulario');
        this.evento();
    }
    evento(){
        this.formulario.addEventListener('submit', e =>{
            this.handleSubmit(e);
        })
    }
    handleSubmit(e){
        e.preventDefault();
        const validaCampo = this.camposValidados();
        const validaEmail = this.emailValidados();
        const validaSenha = this.senhaValidados();
        if(validaCampo && validaEmail && validaSenha){
            alert('formulário enviado')
            this.formulario.submit()
        }
    }
    camposValidados(){
        let valido = true
        for(let ErrorText of this.formulario.querySelectorAll('.erros')){ 
            ErrorText.remove();
        }
        for(let campo of this.formulario.querySelectorAll('.valida')){
            const label = campo.nextElementSibling.innerText;
            
            if(!campo.value){
                this.criaErro(campo, `O campo ${label} não pode estar vazio`);
                valido = false;
            }
           if(campo.classList.contains('cpf')){
               if(!this.verificaCPF(campo)) valido = false;
           }
        }
        return valido;
    }
    verificaCPF(campo){
        let valido = true
        const cpf = new ValidaCPF(campo.value);
        if(!cpf.valida()){
            this.criaErro(campo, 'CPF Inválido')
            valido = false;
        }
    
        return valido;
    }
    emailValidados(){
        let validos = true;
        const email = document.querySelector('.email');
        const sameEmail = document.querySelector('.repetir-email')

        if(this.validaEmail(email)){
            this.criaErro(email, 'Email não valido');
            validos = false;
        }

        if(email.value !== sameEmail.value){
            this.criaErro(email, `O campo email e repetir email precisam ser iguai`);
            this.criaErro(sameEmail, `O campo repetir email e email precisam ser iguai`);
            validos = false;
        }
        
        return validos;
    } 
    validaEmail(campo){
        let re = /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/;
        let teste  = !re.test(campo.value);
        return teste;
    }
    senhaValidados(){
        let validos = true;
        const  senha = document.querySelector('.senha');
        const rSenha = document.querySelector('.repetir-senha');
        if(senha.value.length < 5){
            this.criaErro(senha,'Senha muito pequena');
            validos = false;
        }
        if(senha.value !== rSenha.value){
            this.criaErro(senha, 'Senha e repetir senha precisam iguais')
            this.criaErro(rSenha, 'Repetir senha e senha precisam iguais')
            validos = false;
        }
        return validos;
        
    }   
            
    criaErro(campo, msg){
        const div = document.createElement('div');
        div.innerText = msg;
        div.classList.add('erros');
        campo.insertAdjacentElement('afterend', div);
    }
}
const formulario = new FormValid();

function mascara(i){
   
    var v = i.value;
    
    if(isNaN(v[v.length-1])){
       i.value = v.substring(0, v.length-1);
       return;
    }
    
    i.setAttribute("maxlength", "14");
    if (v.length == 3 || v.length == 7) i.value += ".";
    if (v.length == 11) i.value += "-";
 
 }