//Const Botão Buscar
const btnbuscar = document.getElementById("btn-buscar");

//************ Chamada Get Usuario Git e getReposUsuarioGit *************//

btnbuscar.onclick = () =>{
    getUsuarioGit();
    getReposUsuarioGit();
}

//************ Função getUsuarioGit *****************//

function getUsuarioGit(){

    const nome = document.getElementById("nome").value;

    fetch(`https://api.github.com/users/${nome}`)
    .then(response=>{
        if(!response.ok){   
            throw Error("Erro na chamada API");
        }
        return response.json();
    })
    .then(data => {

        const html= `<section class="secao_4">
                        <div id="informacoes" class="d-flex flex-column text-center">
                        <h1 class="h1_dados" style="font-size: 30px;">Dados do Usuário</h1>
                            <div id="img_usuario">
                                <img src="${data.avatar_url}" alt="..." width="200px">
                            </div>
                            <div id="info_usuario">
                                <h1 style="color: white; font-size: 20px; margin-top:30px;">Usuário: ${data.login}</h1>
                                <h1 style="color: white; font-size: 20px;">E-mail: ${data.email}</h1>
                                <h1 style="color: white; font-size: 20px;">Bio: ${data.bio}</h1>
                                <h1 style="color: white; font-size: 20px;">Nº Seguidores: ${data.followers}</h1>
                                <h1 style="color: white; font-size: 20px; margin-bottom:30px;">Nº Seguindo: ${data.following}</h1>
                            </div>
                        </div>
                    </section>`
        document
        .querySelector('#secao_4')
        .insertAdjacentHTML('beforeend', html);
    })
    .catch(error => {
        console.log(error);
    })
}

//************ Função getReposUsuarioGit *****************//

function getReposUsuarioGit(){

    const nome = document.getElementById("nome").value;

    fetch(`https://api.github.com/users/${nome}/repos?sort=stargazers_count?order=desc`)
    .then(response=>{
        if(!response.ok){   
            throw Error("Erro na chamada API");
        }
        return response.json();
    })
    .then(data => {

        const titulo=`<h1 class="h1_dados" 
                     style="font-size: 30px;">
                     Repositórios
                     </h1>`
        document
        .querySelector('#info_repos')
        .insertAdjacentHTML('afterbegin', titulo);

        data.forEach(function(element){
    
        const html=`<h1 style="color: white; font-size:16px;">Nome: ${element.name} </h1>   
                    <h1 style="color: white; font-size:16px;">Descrição: ${element.description} </h1>
                    <h1 style="color: white; font-size:16px;">Nº Estrelas: ${element.stargazers_count} </h1>
                    <h1 style="color: white; font-size:16px;">Linguagem: ${element.language} </h1>
                    <h1 style="color: white; font-size:16px;">Link Git:<a href="https://api.github.com/repos/${element.full_name}"> Link</a></h1><br>`
        document
        .querySelector('#info_repos')
        .insertAdjacentHTML('beforeend', html);
        })
    })
    .catch(error => {
        console.log(error);
    })
}