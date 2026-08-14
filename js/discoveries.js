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
   CARREGAR DADOS
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

                            objeto[
                                coluna
                            ] =
                                valores[
                                    indice
                                ] || "";

                        }
                    );


                    return objeto;

                }
            );


    atualizarDescobertas();

}



/* =========================================
   ANALYTICS
========================================= */

function atualizarDescobertas() {

    const contagemAnual = {};


    exoplanetas.forEach(
        planeta => {

            const ano =
                Number(
                    planeta.disc_year
                );


            if (
                !isNaN(ano) &&
                ano > 0
            ) {

                if (
                    !contagemAnual[
                        ano
                    ]
                ) {

                    contagemAnual[
                        ano
                    ] = 0;

                }


                contagemAnual[
                    ano
                ]++;

            }

        }
    );


    const anos =
        Object
            .keys(
                contagemAnual
            )
            .map(Number)
            .sort(
                (a, b) =>
                    a - b
            );


    const primeiroAno =
        anos.length > 0
            ? anos[0]
            : "—";


    let anoPico = "—";

    let quantidadePico = 0;


    Object
        .entries(
            contagemAnual
        )
        .forEach(
            (
                [
                    ano,
                    quantidade
                ]
            ) => {

                if (
                    quantidade >
                    quantidadePico
                ) {

                    quantidadePico =
                        quantidade;

                    anoPico =
                        ano;

                }

            }
        );


    document
        .getElementById(
            "firstYear"
        )
        .textContent =
        primeiroAno;


    document
        .getElementById(
            "peakYear"
        )
        .textContent =
        anoPico;


    document
        .getElementById(
            "peakCount"
        )
        .textContent =
        quantidadePico
            .toLocaleString(
                "en-US"
            );


    criarGraficoTimeline(
        anos,
        contagemAnual
    );


    criarGraficoMetodos(
        anos
    );

}



/* =========================================
   DISCOVERIES BY YEAR
========================================= */

function criarGraficoTimeline(
    anos,
    contagemAnual
) {

    const canvas =
        document.getElementById(
            "discoveriesChart"
        );


    if (!canvas) {
        return;
    }


    new Chart(
        canvas,
        {

            type:
                "line",

            data: {

                labels:
                    anos,

                datasets: [
                    {

                        label:
                            "Confirmed discoveries",

                        data:
                            anos.map(
                                ano =>
                                    contagemAnual[
                                        ano
                                    ]
                            ),

                        borderColor:
                            "rgba(102, 217, 255, 1)",

                        backgroundColor:
                            "rgba(102, 217, 255, 0.12)",

                        pointBackgroundColor:
                            "rgba(157, 124, 255, 1)",

                        borderWidth:
                            2,

                        pointRadius:
                            2,

                        tension:
                            0.35,

                        fill:
                            true

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
   METHODS OVER TIME
========================================= */

function criarGraficoMetodos(
    anos
) {

    const metodosEncontrados =
        [
            ...new Set(
                exoplanetas
                    .map(
                        planeta =>
                            (
                                planeta
                                    .discoverymethod ||
                                ""
                            )
                            .trim()
                    )
                    .filter(Boolean)
            )
        ];


    console.log(
        "Discovery methods found:",
        metodosEncontrados
    );


    const contagemTotal =
        {};


    exoplanetas.forEach(
        planeta => {

            const metodo =
                (
                    planeta
                        .discoverymethod ||
                    ""
                )
                .trim();


            if (!metodo) {
                return;
            }


            if (
                !contagemTotal[
                    metodo
                ]
            ) {

                contagemTotal[
                    metodo
                ] = 0;

            }


            contagemTotal[
                metodo
            ]++;

        }
    );


    const principaisMetodos =
        Object
            .entries(
                contagemTotal
            )
            .sort(
                (a, b) =>
                    b[1] -
                    a[1]
            )
            .slice(
                0,
                4
            )
            .map(
                item =>
                    item[0]
            );


    const datasets =
        principaisMetodos
            .map(
                metodo => {

                    const valores =
                        anos.map(
                            ano => {

                                return exoplanetas
                                    .filter(
                                        planeta => {

                                            const metodoPlaneta =
                                                (
                                                    planeta
                                                        .discoverymethod ||
                                                    ""
                                                )
                                                .trim();


                                            const anoPlaneta =
                                                Number(
                                                    planeta
                                                        .disc_year
                                                );


                                            return (
                                                metodoPlaneta ===
                                                    metodo &&
                                                anoPlaneta ===
                                                    ano
                                            );

                                        }
                                    )
                                    .length;

                            }
                        );


                    return {

                        label:
                            metodo,

                        data:
                            valores,

                        tension:
                            0.35,

                        borderWidth:
                            2,

                        pointRadius:
                            2,

                        pointHoverRadius:
                            5,

                        fill:
                            false

                    };

                }
            );


    const canvas =
        document.getElementById(
            "methodsTimelineChart"
        );


    if (!canvas) {
        return;
    }


    new Chart(
        canvas,
        {

            type:
                "line",

            data: {

                labels:
                    anos,

                datasets:
                    datasets

            },


            options: {

                responsive:
                    true,

                maintainAspectRatio:
                    false,

                interaction: {

                    mode:
                        "index",

                    intersect:
                        false

                },


                plugins: {

                    legend: {

                        labels: {
                            color:
                                "#a7b0cf"
                        }

                    },


                    tooltip: {

                        callbacks: {

                            label:
                                contexto => {

                                    return (
                                        contexto
                                            .dataset
                                            .label +
                                        ": " +
                                        contexto
                                            .raw +
                                        " discoveries"
                                    );

                                }

                        }

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
   START
========================================= */

carregarDados();
