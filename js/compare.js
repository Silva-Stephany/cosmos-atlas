let exoplanetas = [];


async function carregarDados() {

    const resposta =
        await fetch("../data/exoplanets.csv");

    const texto =
        await resposta.text();


    const linhas =
        texto
            .trim()
            .split("\n");


    const cabecalho =
        linhas[0]
            .replace("\r", "")
            .split(",");


    exoplanetas =
        linhas
            .slice(1)
            .filter(
                linha =>
                    linha.trim() !== ""
            )
            .map(
                linha => {

                    const valores =
                        linha
                            .replace("\r", "")
                            .split(",");


                    const objeto = {};


                    cabecalho.forEach(
                        (coluna, indice) => {

                            objeto[coluna] =
                                valores[indice];

                        }
                    );


                    return objeto;

                }
            );


    prepararSeletores();

    atualizarComparacao();

}



function prepararSeletores() {

    const planetas =
        exoplanetas
            .filter(
                item =>
                    item.pl_name
            )
            .sort(
                (a, b) =>
                    a.pl_name
                        .localeCompare(
                            b.pl_name
                        )
            );


    const selectA =
        document.getElementById(
            "planetA"
        );


    const selectB =
        document.getElementById(
            "planetB"
        );


    planetas.forEach(
        planeta => {

            const optionA =
                document.createElement(
                    "option"
                );

            optionA.value =
                planeta.pl_name;

            optionA.textContent =
                planeta.pl_name;


            const optionB =
                optionA.cloneNode(
                    true
                );


            selectA.appendChild(
                optionA
            );


            selectB.appendChild(
                optionB
            );

        }
    );


    if (
        planetas.length > 1
    ) {

        selectA.selectedIndex = 0;

        selectB.selectedIndex = 1;

    }

}



function encontrarPlaneta(
    nome
) {

    return exoplanetas.find(
        item =>
            item.pl_name === nome
    );

}



function formatarNumero(
    valor,
    casas = 2
) {

    if (
        valor === undefined ||
        valor === null ||
        valor === ""
    ) {

        return "—";

    }


    const numero =
        Number(valor);


    if (
        isNaN(numero)
    ) {

        return "—";

    }


    return numero.toFixed(
        casas
    );

}



function preencherPainel(
    planeta,
    sufixo
) {

    if (!planeta) {
        return;
    }


    document
        .getElementById(
            "name" + sufixo
        )
        .textContent =
        planeta.pl_name ||
        "—";


    document
        .getElementById(
            "host" + sufixo
        )
        .textContent =
        planeta.hostname
            ? "Host star: " +
              planeta.hostname
            : "Host star: —";


    document
        .getElementById(
            "radius" + sufixo
        )
        .textContent =
        planeta.pl_rade
            ? formatarNumero(
                planeta.pl_rade
            ) +
              " R⊕"
            : "—";


    document
        .getElementById(
            "mass" + sufixo
        )
        .textContent =
        planeta.pl_bmasse
            ? formatarNumero(
                planeta.pl_bmasse
            ) +
              " M⊕"
            : "—";


    document
        .getElementById(
            "period" + sufixo
        )
        .textContent =
        planeta.pl_orbper
            ? formatarNumero(
                planeta.pl_orbper
            ) +
              " days"
            : "—";


    document
        .getElementById(
            "temperature" + sufixo
        )
        .textContent =
        planeta.pl_eqt
            ? formatarNumero(
                planeta.pl_eqt,
                0
            ) +
              " K"
            : "—";


    document
        .getElementById(
            "distance" + sufixo
        )
        .textContent =
        planeta.sy_dist
            ? formatarNumero(
                planeta.sy_dist,
                1
            ) +
              " pc"
            : "—";


    document
        .getElementById(
            "year" + sufixo
        )
        .textContent =
        planeta.disc_year ||
        "—";

}



function atualizarComparacao() {

    const nomeA =
        document
            .getElementById(
                "planetA"
            )
            .value;


    const nomeB =
        document
            .getElementById(
                "planetB"
            )
            .value;


    const planetaA =
        encontrarPlaneta(
            nomeA
        );


    const planetaB =
        encontrarPlaneta(
            nomeB
        );


    preencherPainel(
        planetaA,
        "A"
    );


    preencherPainel(
        planetaB,
        "B"
    );

}



document
    .getElementById(
        "planetA"
    )
    .addEventListener(
        "change",
        atualizarComparacao
    );


document
    .getElementById(
        "planetB"
    )
    .addEventListener(
        "change",
        atualizarComparacao
    );


carregarDados();
