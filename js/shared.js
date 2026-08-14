async function carregarExoplanetas() {

    const resposta =
        await fetch("data/exoplanets.csv");

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


    const dados =
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


    return dados;

}



function contarValoresUnicos(
    dados,
    campo
) {

    const valores =
        dados
            .map(
                item =>
                    item[campo]
            )
            .filter(
                valor =>
                    valor &&
                    valor.trim() !== ""
            );


    return new Set(
        valores
    ).size;

}



async function atualizarOverview() {

    const exoplanetas =
        await carregarExoplanetas();


    /* =========================
       KPIs
    ========================= */


    const totalPlanetas =
        exoplanetas.length;


    const totalSistemas =
        contarValoresUnicos(
            exoplanetas,
            "hostname"
        );


    const totalMetodos =
        contarValoresUnicos(
            exoplanetas,
            "discoverymethod"
        );


    const anos =
        exoplanetas
            .map(
                item =>
                    Number(
                        item.disc_year
                    )
            )
            .filter(
                ano =>
                    !isNaN(ano) &&
                    ano > 0
            );


    const anoMaisRecente =
        anos.length > 0
            ? Math.max(...anos)
            : "-";


    /* =========================
       ATUALIZA OS CARDS
    ========================= */


    const kpiPlanets =
        document.getElementById(
            "kpiPlanets"
        );


    const kpiSystems =
        document.getElementById(
            "kpiSystems"
        );


    const kpiMethods =
        document.getElementById(
            "kpiMethods"
        );


    const kpiYear =
        document.getElementById(
            "kpiYear"
        );


    if (kpiPlanets) {

        kpiPlanets.textContent =
            totalPlanetas
                .toLocaleString(
                    "en-US"
                );

    }


    if (kpiSystems) {

        kpiSystems.textContent =
            totalSistemas
                .toLocaleString(
                    "en-US"
                );

    }


    if (kpiMethods) {

        kpiMethods.textContent =
            totalMetodos
                .toLocaleString(
                    "en-US"
                );

    }


    if (kpiYear) {

        kpiYear.textContent =
            anoMaisRecente;

    }


    /* =========================
       GRÁFICOS
    ========================= */


    criarGraficoMetodos(
        exoplanetas
    );


    criarGraficoTimeline(
        exoplanetas
    );

}



/* =========================================
   DISCOVERY METHODS
========================================= */


function criarGraficoMetodos(
    dados
) {

    const contagem = {};


    dados.forEach(
        item => {

            const metodo =
                item.discoverymethod;


            if (
                metodo &&
                metodo.trim() !== ""
            ) {

                if (
                    !contagem[metodo]
                ) {

                    contagem[metodo] = 0;

                }


                contagem[metodo]++;

            }

        }
    );


    const ranking =
        Object
            .entries(
                contagem
            )
            .sort(
                (a, b) =>
                    b[1] - a[1]
            )
            .slice(
                0,
                8
            );


    const canvas =
        document.getElementById(
            "chartMethods"
        );


    if (!canvas) {
        return;
    }


    new Chart(
        canvas,
        {

            type: "bar",

            data: {

                labels:
                    ranking.map(
                        item =>
                            item[0]
                    ),

                datasets: [
                    {

                        label:
                            "Confirmed exoplanets",

                        data:
                            ranking.map(
                                item =>
                                    item[1]
                            ),

                        backgroundColor:
                            "rgba(113, 151, 255, 0.72)",

                        borderColor:
                            "rgba(157, 124, 255, 1)",

                        borderWidth: 1,

                        borderRadius: 8

                    }
                ]

            },


            options: {

                responsive: true,

                maintainAspectRatio: false,

                indexAxis: "y",

                plugins: {

                    legend: {
                        display: false
                    },

                    tooltip: {

                        callbacks: {

                            label:
                                contexto =>
                                    " " +
                                    contexto.raw +
                                    " planets"

                        }

                    }

                },


                scales: {

                    x: {

                        beginAtZero: true,

                        ticks: {
                            color: "#a7b0cf"
                        },

                        grid: {
                            color:
                                "rgba(255,255,255,0.05)"
                        }

                    },


                    y: {

                        ticks: {
                            color: "#a7b0cf"
                        },

                        grid: {
                            display: false
                        }

                    }

                }

            }

        }
    );

}



/* =========================================
   DISCOVERIES THROUGH TIME
========================================= */


function criarGraficoTimeline(
    dados
) {

    const contagem = {};


    dados.forEach(
        item => {

            const ano =
                Number(
                    item.disc_year
                );


            if (
                !isNaN(ano) &&
                ano > 0
            ) {

                if (
                    !contagem[ano]
                ) {

                    contagem[ano] = 0;

                }


                contagem[ano]++;

            }

        }
    );


    const anos =
        Object
            .keys(
                contagem
            )
            .map(Number)
            .sort(
                (a, b) =>
                    a - b
            );


    const canvas =
        document.getElementById(
            "chartTimeline"
        );


    if (!canvas) {
        return;
    }


    new Chart(
        canvas,
        {

            type: "line",

            data: {

                labels:
                    anos,

                datasets: [
                    {

                        label:
                            "Discoveries",

                        data:
                            anos.map(
                                ano =>
                                    contagem[ano]
                            ),

                        borderColor:
                            "rgba(102, 217, 255, 1)",

                        backgroundColor:
                            "rgba(102, 217, 255, 0.12)",

                        pointBackgroundColor:
                            "rgba(157, 124, 255, 1)",

                        pointRadius: 2,

                        pointHoverRadius: 5,

                        borderWidth: 2,

                        tension: 0.35,

                        fill: true

                    }
                ]

            },


            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    },

                    tooltip: {

                        callbacks: {

                            label:
                                contexto =>
                                    " " +
                                    contexto.raw +
                                    " discoveries"

                        }

                    }

                },


                scales: {

                    x: {

                        ticks: {

                            color:
                                "#a7b0cf",

                            maxRotation:
                                45,

                            minRotation:
                                0

                        },

                        grid: {
                            display: false
                        }

                    },


                    y: {

                        beginAtZero: true,

                        ticks: {
                            color: "#a7b0cf"
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
   INICIALIZAÇÃO
========================================= */


document.addEventListener(
    "DOMContentLoaded",
    atualizarOverview
);
