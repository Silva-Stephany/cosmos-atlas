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


    prepararFiltros();

    atualizarTabela();

}



function prepararFiltros() {

    const metodos = [
        ...new Set(
            exoplanetas
                .map(
                    item =>
                        item.discoverymethod
                )
                .filter(Boolean)
        )
    ].sort();


    const anos = [
        ...new Set(
            exoplanetas
                .map(
                    item =>
                        item.disc_year
                )
                .filter(Boolean)
        )
    ].sort(
        (a, b) =>
            Number(b) -
            Number(a)
    );


    const selectMetodo =
        document.getElementById(
            "filterMethod"
        );


    const selectAno =
        document.getElementById(
            "filterYear"
        );


    metodos.forEach(
        metodo => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                metodo;

            option.textContent =
                metodo;

            selectMetodo
                .appendChild(
                    option
                );

        }
    );


    anos.forEach(
        ano => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                ano;

            option.textContent =
                ano;

            selectAno
                .appendChild(
                    option
                );

        }
    );

}



function obterDadosFiltrados() {

    const busca =
        document
            .getElementById(
                "searchPlanet"
            )
            .value
            .toLowerCase()
            .trim();


    const metodo =
        document
            .getElementById(
                "filterMethod"
            )
            .value;


    const ano =
        document
            .getElementById(
                "filterYear"
            )
            .value;


    return exoplanetas.filter(
        item => {

            const planeta =
                (
                    item.pl_name ||
                    ""
                )
                .toLowerCase();


            const estrela =
                (
                    item.hostname ||
                    ""
                )
                .toLowerCase();


            const correspondeBusca =
                busca === "" ||
                planeta.includes(
                    busca
                ) ||
                estrela.includes(
                    busca
                );


            const correspondeMetodo =
                metodo === "All" ||
                item.discoverymethod ===
                metodo;


            const correspondeAno =
                ano === "All" ||
                item.disc_year ===
                ano;


            return (
                correspondeBusca &&
                correspondeMetodo &&
                correspondeAno
            );

        }
    );

}



function atualizarTabela() {

    const dados =
        obterDadosFiltrados();


    document
        .getElementById(
            "resultCount"
        )
        .textContent =
        dados.length
            .toLocaleString(
                "en-US"
            );


    const tabela =
        document
            .getElementById(
                "planetTable"
            );


    tabela.innerHTML = "";


    dados
        .slice(
            0,
            250
        )
        .forEach(
            item => {

                const linha =
                    document
                        .createElement(
                            "tr"
                        );


                const raio =
                    item.pl_rade
                        ? Number(
                            item.pl_rade
                        ).toFixed(2)
                        : "—";


                const massa =
                    item.pl_bmasse
                        ? Number(
                            item.pl_bmasse
                        ).toFixed(2)
                        : "—";


                const distancia =
                    item.sy_dist
                        ? Number(
                            item.sy_dist
                        ).toFixed(1)
                        : "—";


                linha.innerHTML = `

                    <td>
                        <strong>
                            ${item.pl_name || "—"}
                        </strong>
                    </td>

                    <td>
                        ${item.hostname || "—"}
                    </td>

                    <td>
                        ${item.discoverymethod || "—"}
                    </td>

                    <td>
                        ${item.disc_year || "—"}
                    </td>

                    <td>
                        ${
                            raio === "—"
                                ? "—"
                                : raio +
                                  " R⊕"
                        }
                    </td>

                    <td>
                        ${
                            massa === "—"
                                ? "—"
                                : massa +
                                  " M⊕"
                        }
                    </td>

                    <td>
                        ${
                            distancia === "—"
                                ? "—"
                                : distancia +
                                  " pc"
                        }
                    </td>

                `;


                tabela
                    .appendChild(
                        linha
                    );

            }
        );

}



document
    .getElementById(
        "searchPlanet"
    )
    .addEventListener(
        "input",
        atualizarTabela
    );


document
    .getElementById(
        "filterMethod"
    )
    .addEventListener(
        "change",
        atualizarTabela
    );


document
    .getElementById(
        "filterYear"
    )
    .addEventListener(
        "change",
        atualizarTabela
    );


carregarDados();
