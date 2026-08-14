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

    atualizarDescobertas();

}



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
                    !contagemAnual[ano]
                ) {

                    contagemAnual[ano] = 0;

                }

                contagemAnual[ano]++;

            }

        }
    );


    const anos =
        Object.keys(
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


    Object.entries(
        contagemAnual
    ).forEach(
        ([ano, quantidade]) => {

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



function criarGraficoTimeline(
    anos,
    contagemAnual
) {

    new Chart(
        document.getElementById(
            "discoveriesChart"
        ),
        {

            type: "line",

            data: {

                labels: anos,

                datasets: [
                    {

                        label:
                            "Confirmed discoveries",

                        data:
                            anos.map(
                                ano =>
                                    contagemAnual[ano]
                            ),

                        borderColor:
                            "rgba(102, 217, 255, 1)",

                        backgroundColor:
                            "rgba(102, 217, 255, 0.12)",

                        pointBackgroundColor:
                            "rgba(157, 124, 255, 1)",

                        borderWidth: 2,

                        pointRadius: 2,

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
                    }

                },

                scales: {

                    x: {

                        ticks: {
                            color: "#a7b0cf"
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



function criarGraficoMetodos(
    anos
) {

    const principaisMetodos = [
        "Transit",
        "Radial Velocity",
        "Imaging",
        "Microlensing"
    ];


    const datasets =
        principaisMetodos.map(
            metodo => {

                const valores =
                    anos.map(
                        ano => {

                            return exoplanetas
                                .filter(
                                    planeta =>
                                        planeta.discoverymethod ===
                                        metodo &&
                                        Number(
                                            planeta.disc_year
                                        ) ===
                                        ano
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
                        1

                };

            }
        );


    new Chart(
        document.getElementById(
            "methodsTimelineChart"
        ),
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

                plugins: {

                    legend: {

                        labels: {
                            color:
                                "#a7b0cf"
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



carregarDados();
