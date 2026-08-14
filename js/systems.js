let exoplanetas = [];


/* =========================================
   CSV PARSER
========================================= */

function parseCSVLine(linha) {

    const valores = [];

    let atual = "";
    let dentroDeAspas = false;


    for (
        let i = 0;
        i < linha.length;
        i++
    ) {

        const caractere =
            linha[i];


        if (
            caractere === '"'
        ) {

            dentroDeAspas =
                !dentroDeAspas;

        }

        else if (
            caractere === "," &&
            !dentroDeAspas
        ) {

            valores.push(
                atual.trim()
            );

            atual = "";

        }

        else {

            atual += caractere;

        }

    }


    valores.push(
        atual.trim()
    );


    return valores;

}


/* =========================================
   LOAD DATA
========================================= */

async function carregarDados() {

    const resposta =
        await fetch(
            "../data/exoplanets.csv"
        );


    const texto =
        await resposta.text();


    const linhas =
        texto
            .trim()
            .split(/\r?\n/);


    const cabecalho =
        parseCSVLine(
            linhas[0]
        );


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
                        parseCSVLine(
                            linha
                        );


                    const objeto = {};


                    cabecalho.forEach(
                        (
                            coluna,
                            indice
                        ) => {

                            objeto[coluna] =
                                valores[indice] ||
                                "";

                        }
                    );


                    return objeto;

                }
            );


    analisarSistemas();

}


/* =========================================
   SYSTEM ANALYTICS
========================================= */

function analisarSistemas() {

    const sistemas = {};


    exoplanetas.forEach(
        planeta => {

            const estrela =
                (
                    planeta.hostname ||
                    ""
                ).trim();


            if (!estrela) {
                return;
            }


            if (
                !sistemas[estrela]
            ) {

                sistemas[estrela] = {

                    estrela:
                        estrela,

                    planetas:
                        0,

                    distancia:
                        planeta.sy_dist,

                    temperatura:
                        planeta.st_teff,

                    raio:
                        planeta.st_rad,

                    massa:
                        planeta.st_mass

                };

            }


            sistemas[
                estrela
            ].planetas++;

        }
    );


    const listaSistemas =
        Object.values(
            sistemas
        );


    /* TOTAL SYSTEMS */

    const totalSistemas =
        listaSistemas.length;


    /* MULTI PLANET */

    const multiplanetarios =
        listaSistemas.filter(
            sistema =>
                sistema.planetas > 1
        ).length;


    /* LARGEST SYSTEM */

    const ranking =
        [...listaSistemas]
            .sort(
                (a, b) =>
                    b.planetas -
                    a.planetas
            );


    const maiorSistema =
        ranking.length > 0
            ? ranking[0]
            : null;


    /* AVERAGE DISTANCE */

    const distancias =
        listaSistemas
            .map(
                sistema =>
                    Number(
                        sistema.distancia
                    )
            )
            .filter(
                valor =>
                    !isNaN(valor) &&
                    valor > 0
            );


    const distanciaMedia =
        distancias.length > 0
            ? distancias.reduce(
                (total, valor) =>
                    total + valor,
                0
            ) /
              distancias.length
            : 0;


    /* KPIs */

    document
        .getElementById(
            "totalSystems"
        )
        .textContent =
        totalSistemas
            .toLocaleString(
                "en-US"
            );


    document
        .getElementById(
            "multiSystems"
        )
        .textContent =
        multiplanetarios
            .toLocaleString(
                "en-US"
            );


    document
        .getElementById(
            "largestSystem"
        )
        .textContent =
        maiorSistema
            ? maiorSistema.estrela +
              " (" +
              maiorSistema.planetas +
              ")"
            : "—";


    document
        .getElementById(
            "averageDistance"
        )
        .textContent =
        distanciaMedia > 0
            ? distanciaMedia
                .toFixed(1) +
              " pc"
            : "—";


    criarRanking(
        ranking
    );


    criarDistribuicao(
        listaSistemas
    );


    preencherTabela(
        ranking
    );

}


/* =========================================
   RANKING CHART
========================================= */

function criarRanking(
    ranking
) {

    const top =
        ranking.slice(
            0,
            12
        );


    const canvas =
        document.getElementById(
            "systemsRankingChart"
        );


    if (!canvas) {
        return;
    }


    new Chart(
        canvas,
        {

            type:
                "bar",

            data: {

                labels:
                    top.map(
                        sistema =>
                            sistema.estrela
                    ),

                datasets: [
                    {

                        label:
                            "Confirmed planets",

                        data:
                            top.map(
                                sistema =>
                                    sistema.planetas
                            ),

                        backgroundColor:
                            "rgba(113, 151, 255, 0.72)",

                        borderColor:
                            "rgba(157, 124, 255, 1)",

                        borderWidth:
                            1,

                        borderRadius:
                            8

                    }
                ]

            },


            options: {

                responsive:
                    true,

                maintainAspectRatio:
                    false,

                indexAxis:
                    "y",

                plugins: {

                    legend: {
                        display:
                            false
                    }

                },

                scales: {

                    x: {

                        beginAtZero:
                            true,

                        ticks: {
                            color:
                                "#a7b0cf",
                            precision:
                                0
                        },

                        grid: {
                            color:
                                "rgba(255,255,255,0.05)"
                        }

                    },

                    y: {

                        ticks: {
                            color:
                                "#a7b0cf"
                        },

                        grid: {
                            display:
                                false
                        }

                    }

                }

            }

        }
    );

}


/* =========================================
   SYSTEM DISTRIBUTION
========================================= */

function criarDistribuicao(
    sistemas
) {

    const distribuicao = {};


    sistemas.forEach(
        sistema => {

            const quantidade =
                sistema.planetas;


            if (
                !distribuicao[
                    quantidade
                ]
            ) {

                distribuicao[
                    quantidade
                ] = 0;

            }


            distribuicao[
                quantidade
            ]++;

        }
    );


    const categorias =
        Object
            .keys(
                distribuicao
            )
            .map(Number)
            .sort(
                (a, b) =>
                    a - b
            );


    const canvas =
        document.getElementById(
            "systemDistributionChart"
        );


    if (!canvas) {
        return;
    }


    new Chart(
        canvas,
        {

            type:
                "bar",

            data: {

                labels:
                    categorias.map(
                        quantidade =>
                            quantidade +
                            (
                                quantidade === 1
                                    ? " planet"
                                    : " planets"
                            )
                    ),

                datasets: [
                    {

                        label:
                            "Planetary systems",

                        data:
                            categorias.map(
                                quantidade =>
                                    distribuicao[
                                        quantidade
                                    ]
                            ),

                        backgroundColor:
                            "rgba(102, 217, 255, 0.58)",

                        borderColor:
                            "rgba(102, 217, 255, 1)",

                        borderWidth:
                            1,

                        borderRadius:
                            8

                    }
                ]

            },


            options: {

                responsive:
                    true,

                maintainAspectRatio:
                    false,

                plugins: {

                    legend: {
                        display:
                            false
                    }

                },

                scales: {

                    x: {

                        ticks: {
                            color:
                                "#a7b0cf"
                        },

                        grid: {
                            display:
                                false
                        }

                    },

                    y: {

                        beginAtZero:
                            true,

                        ticks: {
                            color:
                                "#a7b0cf"
                        },

                        grid: {
                            color:
                                "rgba(255,255,255,0.05)"
                        }

                    }

                }

            }

        }
    );

}


/* =========================================
   TABLE
========================================= */

function formatar(
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


function preencherTabela(
    ranking
) {

    const tabela =
        document.getElementById(
            "systemsTable"
        );


    tabela.innerHTML = "";


    ranking
        .slice(
            0,
            150
        )
        .forEach(
            sistema => {

                const linha =
                    document.createElement(
                        "tr"
                    );


                linha.innerHTML = `

                    <td>
                        <strong>
                            ${sistema.estrela}
                        </strong>
                    </td>

                    <td>
                        ${sistema.planetas}
                    </td>

                    <td>
                        ${
                            formatar(
                                sistema.distancia,
                                1
                            ) === "—"
                                ? "—"
                                : formatar(
                                    sistema.distancia,
                                    1
                                ) + " pc"
                        }
                    </td>

                    <td>
                        ${
                            formatar(
                                sistema.temperatura,
                                0
                            ) === "—"
                                ? "—"
                                : formatar(
                                    sistema.temperatura,
                                    0
                                ) + " K"
                        }
                    </td>

                    <td>
                        ${
                            formatar(
                                sistema.raio
                            ) === "—"
                                ? "—"
                                : formatar(
                                    sistema.raio
                                ) + " R☉"
                        }
                    </td>

                    <td>
                        ${
                            formatar(
                                sistema.massa
                            ) === "—"
                                ? "—"
                                : formatar(
                                    sistema.massa
                                ) + " M☉"
                        }
                    </td>

                `;


                tabela.appendChild(
                    linha
                );

            }
        );

}


carregarDados();
