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


    calcularHabitabilidade();

}



function numeroValido(valor) {

    const numero =
        Number(valor);

    return !isNaN(numero) &&
        valor !== "";

}



function calcularScore(planeta) {

    let score = 0;


    const raio =
        Number(planeta.pl_rade);

    const massa =
        Number(planeta.pl_bmasse);

    const insolacao =
        Number(planeta.pl_insol);

    const temperatura =
        Number(planeta.pl_eqt);


    /*
        EDUCATIONAL MODEL ONLY
    */


    if (
        numeroValido(planeta.pl_rade)
    ) {

        if (
            raio >= 0.8 &&
            raio <= 1.5
        ) {

            score += 35;

        }

        else if (
            raio >= 0.5 &&
            raio <= 2
        ) {

            score += 20;

        }

    }


    if (
        numeroValido(planeta.pl_insol)
    ) {

        if (
            insolacao >= 0.5 &&
            insolacao <= 1.5
        ) {

            score += 35;

        }

        else if (
            insolacao >= 0.25 &&
            insolacao <= 2
        ) {

            score += 20;

        }

    }


    if (
        numeroValido(planeta.pl_eqt)
    ) {

        if (
            temperatura >= 200 &&
            temperatura <= 300
        ) {

            score += 20;

        }

        else if (
            temperatura >= 170 &&
            temperatura <= 330
        ) {

            score += 10;

        }

    }


    if (
        numeroValido(planeta.pl_bmasse)
    ) {

        if (
            massa >= 0.5 &&
            massa <= 5
        ) {

            score += 10;

        }

        else if (
            massa > 0 &&
            massa <= 10
        ) {

            score += 5;

        }

    }


    return score;

}



function calcularHabitabilidade() {

    const analisados =
        exoplanetas
            .filter(
                planeta =>
                    numeroValido(
                        planeta.pl_rade
                    ) ||
                    numeroValido(
                        planeta.pl_insol
                    ) ||
                    numeroValido(
                        planeta.pl_eqt
                    ) ||
                    numeroValido(
                        planeta.pl_bmasse
                    )
            )
            .map(
                planeta => {

                    return {

                        ...planeta,

                        score:
                            calcularScore(
                                planeta
                            )

                    };

                }
            )
            .sort(
                (a, b) =>
                    b.score -
                    a.score
            );


    const maiorScore =
        analisados.length > 0
            ? analisados[0].score
            : 0;


    const planetaTopo =
        analisados.length > 0
            ? analisados[0].pl_name
            : "—";


    document
        .getElementById(
            "habitabilityAnalyzed"
        )
        .textContent =
        analisados.length
            .toLocaleString(
                "en-US"
            );


    document
        .getElementById(
            "habitabilityHighest"
        )
        .textContent =
        maiorScore + "/100";


    document
        .getElementById(
            "habitabilityTopPlanet"
        )
        .textContent =
        planetaTopo;


    preencherTabela(
        analisados.slice(
            0,
            100
        )
    );

}



function formatar(
    valor,
    casas = 2
) {

    if (
        !numeroValido(valor)
    ) {

        return "—";

    }


    return Number(
        valor
    ).toFixed(
        casas
    );

}



function preencherTabela(
    dados
) {

    const tabela =
        document.getElementById(
            "habitabilityTable"
        );


    tabela.innerHTML = "";


    dados.forEach(
        planeta => {

            const linha =
                document.createElement(
                    "tr"
                );


            linha.innerHTML = `

                <td>
                    <strong>
                        ${planeta.pl_name || "—"}
                    </strong>
                </td>

                <td>
                    ${planeta.hostname || "—"}
                </td>

                <td>
                    ${
                        numeroValido(
                            planeta.pl_rade
                        )
                            ? formatar(
                                planeta.pl_rade
                            ) + " R⊕"
                            : "—"
                    }
                </td>

                <td>
                    ${
                        numeroValido(
                            planeta.pl_bmasse
                        )
                            ? formatar(
                                planeta.pl_bmasse
                            ) + " M⊕"
                            : "—"
                    }
                </td>

                <td>
                    ${
                        numeroValido(
                            planeta.pl_insol
                        )
                            ? formatar(
                                planeta.pl_insol
                            ) + " S⊕"
                            : "—"
                    }
                </td>

                <td>
                    ${
                        numeroValido(
                            planeta.pl_eqt
                        )
                            ? formatar(
                                planeta.pl_eqt,
                                0
                            ) + " K"
                            : "—"
                    }
                </td>

                <td>
                    <strong>
                        ${planeta.score}/100
                    </strong>
                </td>

            `;


            tabela.appendChild(
                linha
            );

        }
    );

}



carregarDados();
