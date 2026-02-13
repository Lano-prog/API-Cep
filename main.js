let $ = document.querySelector.bind(document);

$("#form-cep").addEventListener("submit", e => {
    e.preventDefault();
    const cep_digitado = $("#cep").value;

    if (cep_digitado.length == 8) {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://viacep.com.br/ws/${cep_digitado}/json`, requestOptions)
            .then(response => response.text())
            .then(result => {
                const infos = JSON.parse(result);

                if (infos.erro) {
                    $("#alert-cep").classList.add("active");
                } else {
                    if ($("#alert-cep").classList.contains("active")) {
                        $("#alert-cep").classList.remove("active");
                    }

                    const add = infos.logradouro;
                    const uf = infos.uf;
                    const localidade = infos.localidade;
                    const Bairro = infos.bairro;

                    $("#Logradouro").textContent = add;
                    $("#UF").textContent = uf;
                    $("#DDD").textContent = localidade;
                    $("#Bairro").textContent = Bairro;
                }
            });
    }
});
