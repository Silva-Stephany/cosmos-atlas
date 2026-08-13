async function carregarExoplanetas() {
    const resposta = await fetch("data/exoplanets.csv");
    const texto = await resposta.text();

    const linhas = texto
        .trim()
        .split("\n");

    const cabecalho = linhas[0]
        .replace("\r", "")
        .split(",");

    const dados = linhas
        .slice(1)
        .filter(linha => linha.trim() !== "")
        .map(linha => {

            const valores = linha
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

        });

    return dados;
}


function contarValoresUnicos(
    dados,
    campo
) {

    const valores = dados
        .map(item => item[campo])
        .filter(
            valor =>
                valor &&
                valor.trim() !== ""
        );

    return new Set(valores).size;

}


async function atualizarOverview() {

    const exoplanetas =
        await carregarExoplanetas();


    /* PLANETAS CONFIRMADOS */

    const totalPlanetas =
        exoplanetas.length;


    /* SISTEMAS PLANETÁRIOS */

    const totalSistemas =
        contarValoresUnicos(
            exoplanetas,
            "hostname"
        );


    /* MÉTODOS DE DESCOBERTA */

    const totalMetodos =
        contarValoresUnicos(
            exoplanetas,
            "discoverymethod"
        );


    /* ANO MAIS RECENTE */

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


    /* ATUALIZA OS CARDS */

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

}


document.addEventListener(
    "DOMContentLoaded",
    atualizarOverview
);
