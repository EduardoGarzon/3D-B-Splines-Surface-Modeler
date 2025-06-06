// VRP: { x: 100, y: 15, z: 0 },
// P: { x: 20, y: 10, z: 25 },
// Y: { x: 0, y: 1, z: 0 }  

// d_near: - 100
// d_far: 1000

// xmin: -8    
// ymin: -6
// xmax: 8
// ymax: 6

// umin: 0
// vmin: 0
// umax: 319
// vmax: 219

// --------------------------------------------------------------------------------------------------
// INTERFACE
// --------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------
// PARAMETROS DA CAMERA
// --------------------------------------------------------------------------------------------------
document.getElementById("button-define-camera").addEventListener("click", function () {

    let VRP = {};
    VRP.x = parseInt(document.getElementById("VRP-x").value);
    VRP.y = parseInt(document.getElementById("VRP-y").value);
    VRP.z = parseInt(document.getElementById("VRP-z").value);

    if (isNaN(VRP.x) || isNaN(VRP.y) || isNaN(VRP.z)) {
        alert("Por favor, insira valores válidos para o VRP da camera.");
        return;
    }

    let P = {};
    P.x = parseInt(document.getElementById("P-x").value);
    P.y = parseInt(document.getElementById("P-y").value);
    P.z = parseInt(document.getElementById("P-z").value);

    if (isNaN(P.x) || isNaN(P.y) || isNaN(P.z)) {
        alert("Por favor, insira valores válidos para o Ponto Focal da camera.");
        return;
    }

    let Y = {};
    Y.x = parseInt(document.getElementById("Y-x").value);
    Y.y = parseInt(document.getElementById("Y-y").value);
    Y.z = parseInt(document.getElementById("Y-z").value);

    if (isNaN(Y.x) || isNaN(Y.y) || isNaN(Y.z)) {
        alert("Por favor, insira valores válidos para o View Up da camera.");
        return;
    }

    camera.VRP = VRP;
    camera.P = P;
    camera.Y = Y;

    console.log("Parametros da Camera Definidos: ", camera);
});

// --------------------------------------------------------------------------------------------------
// PARAMETROS PLANOS NEAR E FAR
// --------------------------------------------------------------------------------------------------
document.getElementById("button-definir-planos-near-far").addEventListener("click", () => {
    d_near = parseInt(document.getElementById("plano-near").value);
    d_far = parseInt(document.getElementById("plano-far").value);

    if (d_near && d_far) {
        console.log("--------------------------------------------------------------------------------------------");
        console.log("Plano Near definido: ", d_near);
        console.log("Plano Far definido: ", d_far);
        console.log("--------------------------------------------------------------------------------------------");
    } else {
        alert("Por favor, informe valores validos para os planos Near e Far.");
    }
});

// --------------------------------------------------------------------------------------------------
// MALHA WIREFRAME
// --------------------------------------------------------------------------------------------------

// PONTOS DE CONTROLE
document.getElementById("button-define-control-points").addEventListener("click", function () {
    let controlPointsI = parseInt(document.getElementById("control-points-i").value);
    let controlPointsJ = parseInt(document.getElementById("control-points-j").value);

    if (isNaN(controlPointsI) || isNaN(controlPointsJ)) {
        alert("Por favor, insira valores válidos para os Pontos de Controle.");
        return;
    }

    console.log("--------------------------------------------------------------------------------------------");
    console.log("Pontos de Controle Definidos[i]:", controlPointsI);
    console.log("Pontos de Controle Definidos[j]:", controlPointsJ);
    console.log("--------------------------------------------------------------------------------------------");

    NI = controlPointsI - 1;
    NJ = controlPointsJ - 1;
});

// GRAU DA SPLINE
document.getElementById("button-define-spline-degree").addEventListener("click", function () {
    let splineDegreeI = parseInt(document.getElementById("spline-degree-i").value);
    let splineDegreeJ = parseInt(document.getElementById("spline-degree-j").value);

    if (isNaN(splineDegreeI) || isNaN(splineDegreeJ)) {
        alert("Por favor, insira valores válidos para o Grau da Spline.");
        return;
    }

    console.log("--------------------------------------------------------------------------------------------");
    console.log("Grau da spline na direção i definidos:", splineDegreeI);
    console.log("Grau da spline na direção j definidos:", splineDegreeJ);
    console.log("--------------------------------------------------------------------------------------------");

    TI = splineDegreeI;
    TJ = splineDegreeJ;
});

// RESOLUCAO DA MALHA
document.getElementById("button-define-resolution").addEventListener("click", function () {
    let resolutionI = parseInt(document.getElementById("resolution-i").value);
    let resolutionJ = parseInt(document.getElementById("resolution-j").value);

    if (isNaN(resolutionI) || isNaN(resolutionJ)) {
        alert("Por favor, insira valores válidos para a Resolucao da Malha.");
        return;
    }

    console.log("--------------------------------------------------------------------------------------------");
    console.log("Resolucao da malha na direção i definido:", resolutionI);
    console.log("Resolucao da malha na direção j definido:", resolutionJ);
    console.log("--------------------------------------------------------------------------------------------");

    RESOLUTIONI = resolutionI;
    RESOLUTIONJ = resolutionJ;
});

// GERAR MALHA
document.getElementById("button-generate-surface").addEventListener("click", function () {
    if ((NI >= 3 && NI <= 99) && (NJ >= 3 && NJ <= 99) && (TI >= 3 && TI <= 5) && (TJ >= 3 && TJ <= 5) && (RESOLUTIONI >= 10 && RESOLUTIONI <= 100) && (RESOLUTIONJ >= 10 && RESOLUTIONJ <= 100)) {
        if (camera.VRP.x) {
            if (window_plane.xmax && viewport.umax) {
                gerarSuperficie(NI, NJ, TI, TJ, RESOLUTIONI, RESOLUTIONJ);
                executarPipelineVisualizacao(lista_superficies_SRU[lista_superficies_SRU.length - 1]);
            } else {
                alert("Por favor, defina corretamente os valores de Window e/ou Viewport.");
            }
        } else {
            alert("Por favor, defina corretamente as componentes da camera.");
        }
    } else {
        alert("Por favor, informe corretamente os dados para calcular a malha.")
    }
});

// --------------------------------------------------------------------------------------------------
// COR DAS ARESTAS VISIVEIS E NÃO VISIVEIS
// --------------------------------------------------------------------------------------------------
let cor_aresta_visivel = "#00FF00";     // Verde.
let cor_aresta_nao_visivel = "#FF0000"; // Vermelho.

document.getElementById("definir-cor-aresta-visivel").addEventListener("click", () => {
    cor_aresta_visivel = document.getElementById("color-aresta-visivel").value;

    if (!cor_aresta_visivel) {
        alert("Falha ao definir cor da aresta visivel.");
    }
});

document.getElementById("definir-cor-aresta-nao-visivel").addEventListener("click", () => {
    cor_aresta_nao_visivel = document.getElementById("color-aresta-nao-visivel").value;

    if (!cor_aresta_nao_visivel) {
        alert("Falha ao definir cor da aresta não visivel.");
    }
});

// --------------------------------------------------------------------------------------------------
// PARAMETROS WINDOW E VIEWPORT
// --------------------------------------------------------------------------------------------------
document.getElementById("button-definir-window").addEventListener("click", () => {
    let xmax = parseInt(document.getElementById("window-x-max").value);
    let xmin = parseInt(document.getElementById("window-x-min").value);
    let ymax = parseInt(document.getElementById("window-y-max").value);
    let ymin = parseInt(document.getElementById("window-y-min").value);

    if (!isNaN(xmax) && !isNaN(xmin) && !isNaN(ymax) && !isNaN(ymin)) {
        window_plane = { xmax, xmin, ymax, ymin }

        console.log("--------------------------------------------------------------------------------------------");
        console.log("Valores definidos para Window:", window_plane);
        console.log("--------------------------------------------------------------------------------------------");

    } else {
        alert("Por favor, informe valores válidos para a Window.");
    }
});

document.getElementById("button-definir-viewport").addEventListener("click", () => {
    let umax = parseInt(document.getElementById("viewport-u-max").value);
    let umin = parseInt(document.getElementById("viewport-u-min").value);
    let vmax = parseInt(document.getElementById("viewport-v-max").value);
    let vmin = parseInt(document.getElementById("viewport-v-min").value);

    if (!isNaN(umax) && !isNaN(umin) && !isNaN(vmax) && !isNaN(vmin)) {
        viewport = { umax, umin, vmax, vmin }

        console.log("--------------------------------------------------------------------------------------------");
        console.log("Valores definidos para Viewport:", viewport);
        console.log("--------------------------------------------------------------------------------------------");

    } else {
        alert("Por favor, informe valores válidos para a Viewport.");
    }
});

// --------------------------------------------------------------------------------------------------
// MANIPULACAO DOS PONTOS DE CONTROLE
// --------------------------------------------------------------------------------------------------

// MOVIMENTACAO DA DIV
function tornarDivArrastavel(elemento) {
    let offsetX = 0, offsetY = 0, isDragging = false;

    // Pressiona o mouse na div.
    elemento.addEventListener("mousedown", function (event) {
        isDragging = true;
        offsetX = event.clientX - elemento.offsetLeft;
        offsetY = event.clientY - elemento.offsetTop;
    });

    // Move o mouse.
    document.addEventListener("mousemove", function (event) {
        if (isDragging) {
            elemento.style.left = (event.clientX - offsetX) + "px";
            elemento.style.top = (event.clientY - offsetY) + "px";
        }
    });

    // Solta o mouse.
    document.addEventListener("mouseup", function () {
        isDragging = false;
    });
}

// MOVIMENTACAO DA DIV
tornarDivArrastavel(document.getElementById("div-editar-pontos-controle-superficie"));

// EXIBE OS PONTOS DE CONTROLE DA SUPERFICIE PARA EDICAO
document.getElementById("button-editar-pontos-controle").addEventListener("click", function () {

    let superficies_select = document.getElementById("superficies-armazenadas");
    let superficie_selecionada = superficies_select.value;

    if (!isNaN(superficie_selecionada)) {
        document.getElementById("div-editar-pontos-controle-superficie").style.display = "block";

        let tabela = document.getElementById("tabela-pontos-controle").getElementsByTagName('tbody')[0];
        tabela.innerHTML = "";

        let contador = 1;

        let superficie = lista_superficies_SRU[superficie_selecionada];

        if (superficie.NI != 0 && superficie.NJ != 0 && superficie.matriz_pontos_de_controle_SRU.length > 0) {
            for (let i = 0; i <= superficie.NI; i++) {
                for (let j = 0; j <= superficie.NJ; j++) {
                    let ponto = superficie.matriz_pontos_de_controle_SRU[i][j];

                    let row = tabela.insertRow();
                    row.insertCell(0).textContent = `Ponto ${contador}`;

                    let inputX = document.createElement("input");
                    inputX.type = "number";
                    inputX.value = ponto.x;
                    row.insertCell(1).appendChild(inputX);

                    let inputY = document.createElement("input");
                    inputY.type = "number";
                    inputY.value = ponto.y;
                    row.insertCell(2).appendChild(inputY);

                    let inputZ = document.createElement("input");
                    inputZ.type = "number";
                    inputZ.value = ponto.z;
                    row.insertCell(3).appendChild(inputZ);

                    row.dataset.i = i;
                    row.dataset.j = j;

                    contador++;
                }
            }
        }
    } else {
        alert("Por favor, selecione uma superficie.");
    }
});

// SALVA AS ALTERACOES FEITAS E REDESENHA A CENA
document.getElementById("button-salvar-pontos-controle").addEventListener("click", function () {
    let tabela = document.getElementById("tabela-pontos-controle").getElementsByTagName('tbody')[0];

    let superficies_select = document.getElementById("superficies-armazenadas");
    let superficie_selecionada = superficies_select.value;

    let superficie = lista_superficies_SRU[superficie_selecionada];

    if (superficie) {
        for (let row of tabela.rows) {
            let i = row.dataset.i;
            let j = row.dataset.j;

            let novoX = parseFloat(row.cells[1].getElementsByTagName("input")[0].value);
            let novoY = parseFloat(row.cells[2].getElementsByTagName("input")[0].value);
            let novoZ = parseFloat(row.cells[3].getElementsByTagName("input")[0].value);

            if (!isNaN(novoX) && !isNaN(novoY) && !isNaN(novoZ)) {
                superficie.matriz_pontos_de_controle_SRU[i][j] = { x: novoX, y: novoY, z: novoZ };
            }
        }
    } else {
        alert("Falha ao salvar alteracoes.");
    }

    console.log("--------------------------------------------------------------------------------------------");
    console.log("MATRIZ PONTOS DE CONTROLE SRU ATUALIZADA: ", superficie.matriz_pontos_de_controle_SRU);
    console.log("--------------------------------------------------------------------------------------------");

    gerarSuperficie(superficie.NI, superficie.NJ, superficie.TI, superficie.TJ, superficie.RESOLUTIONI, superficie.RESOLUTIONJ, true, superficie_selecionada);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    lista_superficies_SRU.forEach((superficie) => {
        executarPipelineVisualizacao(superficie);
    });
});

// FECHA A JANELA DE EDICAO DE PONTOS DE CONTROLE
document.getElementById("button-fechar-janela-pontos-controle").addEventListener("click", function () {
    document.getElementById("div-editar-pontos-controle-superficie").style.display = "none";
});

// --------------------------------------------------------------------------------------------------
// OPERACOES GEOMETRICAS
// --------------------------------------------------------------------------------------------------
let matriz_translacao = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
];

let matriz_escala = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
];

let matriz_rotacao = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
];

// TRANSLACAO
document.getElementById("button-aplicar-translacao").addEventListener("click", () => {
    let superficies_select = document.getElementById("superficies-armazenadas");
    let superficie_selecionada = superficies_select.value;
    let superficie = lista_superficies_SRU[superficie_selecionada];

    if (superficie) {
        let tx = parseFloat(document.getElementById("translation-x").value);
        let ty = parseFloat(document.getElementById("translation-y").value);
        let tz = parseFloat(document.getElementById("translation-z").value);

        if (isNaN(tx) || isNaN(ty) || isNaN(tz)) {
            alert("Por favor, insira valores válidos para a translação.");
            return;
        }

        matriz_translacao = set_Matriz_Translacao(tx, ty, tz);

        console.log("--------------------------------------------------------------------------------------------");
        console.log("Matriz de Translação definida:", matriz_translacao);
        console.log("--------------------------------------------------------------------------------------------");

        superficie.matriz_pontos_de_controle_SRU = multiplicar_matriz_transformacao_geometrica(superficie.matriz_pontos_de_controle_SRU, matriz_translacao);

        console.log("--------------------------------------------------------------------------------------------");
        console.log("Matriz Pontos de Controle SRU transladada:", superficie.matriz_pontos_de_controle_SRU);
        console.log("--------------------------------------------------------------------------------------------");

        gerarSuperficie(superficie.NI, superficie.NJ, superficie.TI, superficie.TJ, superficie.RESOLUTIONI, superficie.RESOLUTIONJ, true, superficie_selecionada);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        lista_superficies_SRU.forEach((superficie) => {
            executarPipelineVisualizacao(superficie);
        });

    } else {
        alert("Por favor, selecione uma superficie.");
    }
});

// ESCALA
document.getElementById("button-aplicar-escala").addEventListener("click", () => {
    let superficies_select = document.getElementById("superficies-armazenadas");
    let superficie_selecionada = superficies_select.value;
    let superficie = lista_superficies_SRU[superficie_selecionada];

    if (superficie) {
        let sx = parseFloat(document.getElementById("scale-x").value);
        let sy = parseFloat(document.getElementById("scale-y").value);
        let sz = parseFloat(document.getElementById("scale-z").value);

        if (isNaN(sx) || isNaN(sy) || isNaN(sz)) {
            alert("Por favor, insira valores válidos para a escala.");
            return;
        }

        matriz_escala = set_Matriz_Escala(sx, sy, sz);

        console.log("--------------------------------------------------------------------------------------------");
        console.log("Matriz de Escala definida:", matriz_escala);
        console.log("--------------------------------------------------------------------------------------------");

        superficie.matriz_pontos_de_controle_SRU = multiplicar_matriz_transformacao_geometrica(superficie.matriz_pontos_de_controle_SRU, matriz_escala);

        console.log("--------------------------------------------------------------------------------------------");
        console.log("Matriz Pontos de Controle SRU escalonada:", superficie.matriz_pontos_de_controle_SRU);
        console.log("--------------------------------------------------------------------------------------------");

        gerarSuperficie(superficie.NI, superficie.NJ, superficie.TI, superficie.TJ, superficie.RESOLUTIONI, superficie.RESOLUTIONJ, true, superficie_selecionada);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        lista_superficies_SRU.forEach((superficie) => {
            executarPipelineVisualizacao(superficie);
        });
    } else {
        alert("Por favor, selecione uma superficie.");
    }
});

// ROTACAO
document.getElementById("button-aplicar-rotacao").addEventListener("click", () => {
    let superficies_select = document.getElementById("superficies-armazenadas");
    let superficie_selecionada = superficies_select.value;
    let superficie = lista_superficies_SRU[superficie_selecionada];

    if (superficie) {
        let angleDeg = parseFloat(document.getElementById("rotation-angle").value);
        let axis = document.getElementById("rotation-axis").value;

        if (isNaN(angleDeg)) {
            alert("Por favor, insira um ângulo válido para a rotação.");
            return;
        }

        // Converte graus para radianos.
        let angleRad = angleDeg * Math.PI / 180;

        matriz_rotacao = set_Matriz_Rotacao(angleRad, axis);

        console.log("--------------------------------------------------------------------------------------------");
        console.log("Eixo de Rotacao definido: ", axis)
        console.log("Matriz de Rotação definida:", matriz_rotacao);
        console.log("--------------------------------------------------------------------------------------------");

        superficie.matriz_pontos_de_controle_SRU = multiplicar_matriz_transformacao_geometrica(superficie.matriz_pontos_de_controle_SRU, matriz_rotacao);

        console.log("--------------------------------------------------------------------------------------------");
        console.log("Matriz Pontos de Controle SRU rotacionada:", superficie.matriz_pontos_de_controle_SRU);
        console.log("--------------------------------------------------------------------------------------------");

        gerarSuperficie(superficie.NI, superficie.NJ, superficie.TI, superficie.TJ, superficie.RESOLUTIONI, superficie.RESOLUTIONJ, true, superficie_selecionada);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        lista_superficies_SRU.forEach((superficie) => {
            executarPipelineVisualizacao(superficie);
        });

    } else {
        alert("Por favor, selecione uma superficie.");
    }
});

// Cria a matriz de translação.
function set_Matriz_Translacao(tx, ty, tz) {
    return [
        [1, 0, 0, tx],
        [0, 1, 0, ty],
        [0, 0, 1, tz],
        [0, 0, 0, 1]
    ];
}

// Cria a matriz de escala.
function set_Matriz_Escala(sx, sy, sz) {
    return [
        [sx, 0, 0, 0],
        [0, sy, 0, 0],
        [0, 0, sz, 0],
        [0, 0, 0, 1]
    ];
}

// Cria a matriz de rotação em radianos.
function set_Matriz_Rotacao(angle, axis) {

    const c = Math.cos(angle);
    const s = Math.sin(angle);

    if (axis === 'x' || axis === 'X') {
        return [
            [1, 0, 0, 0],
            [0, c, -s, 0],
            [0, s, c, 0],
            [0, 0, 0, 1]
        ];
    } else if (axis === 'y' || axis === 'Y') {
        return [
            [c, 0, s, 0],
            [0, 1, 0, 0],
            [-s, 0, c, 0],
            [0, 0, 0, 1]
        ];
    } else if (axis === 'z' || axis === 'Z') {
        return [
            [c, -s, 0, 0],
            [s, c, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];
    } else {
        console.log("--------------------------------------------------------------------------------------------");
        console.error("Eixo de rotação inválido. Use 'x', 'y' ou 'z'.");
        console.log("--------------------------------------------------------------------------------------------");
        return null;
    }
}

// Função para multiplicar um ponto (objeto com x, y, z) por uma matriz de transformação 4x4.
function multiplicar_ponto_matriz_transformacao_geometrica(point, T) {

    let x = point.x, y = point.y, z = point.z;

    // Multiplica pelo vetor coluna, calculando cada componente.
    let xp = T[0][0] * x + T[0][1] * y + T[0][2] * z + T[0][3] * 1;
    let yp = T[1][0] * x + T[1][1] * y + T[1][2] * z + T[1][3] * 1;
    let zp = T[2][0] * x + T[2][1] * y + T[2][2] * z + T[2][3] * 1;

    return { x: xp, y: yp, z: zp };
}

// Função para multiplicar uma matriz ([[{x, y, z}], [{...}], [{...}], ...]) por outra matriz ([[n1, n2, n3], [...], [...], ...]).
function multiplicar_matriz_transformacao_geometrica(matrixPoints, T) {

    let result = [];

    for (let i = 0; i < matrixPoints.length; i++) {
        result[i] = [];

        for (let j = 0; j < matrixPoints[i].length; j++) {
            result[i][j] = multiplicar_ponto_matriz_transformacao_geometrica(matrixPoints[i][j], T);
        }
    }

    return result;
}

// --------------------------------------------------------------------------------------------------
// BAIXAR E CARREGAR AS SUPERFICIES
// --------------------------------------------------------------------------------------------------
document.getElementById("button-exportar-superficies").addEventListener("click", () => {
    let dados = {
        camera: camera,
        d_near: d_near,
        d_far: d_far,
        window_plane: window_plane,
        viewport: viewport,
        lista_superficies_SRU: lista_superficies_SRU
    }

    let dataStr = JSON.stringify(dados, null, 2);
    let blob = new Blob([dataStr], { type: "application/json" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "superficies.json";
    a.click();
});

document.getElementById("input_surfaces_data_file").addEventListener("change", (event) => {
    let file = event.target.files[0];
    let dados = {};

    if (!file) {
        console.log("--------------------------------------------------------------------------------------------");
        console.error("Nenhum arquivo selecionado.");
        console.log("--------------------------------------------------------------------------------------------");

        return;
    }

    let reader = new FileReader();

    reader.onload = function (e) {
        try {
            let conteudo = e.target.result;

            if (typeof conteudo === "string") {
                dados = JSON.parse(conteudo);
            } else {
                dados = conteudo;
            }

            document.getElementById("button-carregar-arquivo").textContent = file.name;

            console.log("--------------------------------------------------------------------------------------------");
            console.log("Camera carregada do arquivo: ", dados.camera);
            console.log("Planos Near e Far carregados do arquivo: ", dados.d_near, dados.d_far);
            console.log("Superfícies carregadas do arquivo:", dados.lista_superficies_SRU);
            console.log("--------------------------------------------------------------------------------------------");

            camera = dados.camera;
            d_near = dados.d_near;
            d_far = dados.d_far;
            lista_superficies_SRU = dados.lista_superficies_SRU;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            lista_superficies_SRU.forEach((superficie) => {
                executarPipelineVisualizacao(superficie);
            });

            atualizarSelectSuperficies();

        } catch (error) {
            console.log("--------------------------------------------------------------------------------------------");
            console.error("Erro ao carregar JSON:", error);
            console.log("--------------------------------------------------------------------------------------------");

        }
    };

    reader.readAsText(file);
});





// --------------------------------------------------------------------------------------------------
// CANVAS HTML
// --------------------------------------------------------------------------------------------------
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;  // Tamanho do viewport umax.
canvas.height = 600; // Tamanho do viewport vmax.





// --------------------------------------------------------------------------------------------------
// FUNCOES PARA CALCULOS MATEMATICOS
// --------------------------------------------------------------------------------------------------

// Função para calcular o módulo de um vetor.
function magnitude(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}

// Função para calcular o produto escalar entre dois vetores.
function dotProduct(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}

// Função para subtrair dois vetores.
function subtract(v1, v2) {
    return { x: v1.x - v2.x, y: v1.y - v2.y, z: v1.z - v2.z };
}

// Função para normalizar um vetor.
function normalize(v) {
    let mag = magnitude(v);
    if (mag === 0) {
        console.error("Não é possível normalizar um vetor com magnitude zero!");
        return { x: 0, y: 0, z: 0 }; // Retorna um vetor nulo em caso de erro
    }
    return { x: v.x / mag, y: v.y / mag, z: v.z / mag };
}

// Função para calcular o produto vetorial entre dois vetores.
function crossProduct(v1, v2) {
    return {
        x: v1.y * v2.z - v1.z * v2.y,
        y: v1.z * v2.x - v1.x * v2.z,
        z: v1.x * v2.y - v1.y * v2.x
    };
}

// Função para multiplicação de matrizes.
function multiplyMatrices(A, B) {

    if (A[0].length !== B.length) {
        throw "As matrizes não podem ser multiplicadas: número de colunas de A não é igual ao número de linhas de B.";
    }

    // Matriz resultante terá o número de linhas de A e o número de colunas de B.
    let result = new Array(A.length).fill().map(() => new Array(B[0].length).fill(0));

    for (let i = 0; i < A.length; i++) {                // Linhas de A
        for (let j = 0; j < B[0].length; j++) {         // Colunas de B
            for (let k = 0; k < A[0].length; k++) {     // Colunas de A / Linhas de B
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }

    return result;
}

// Função para calcular o centroide de um objeto.
function calculateObjectCentroid(vertices) {
    let centroid = { x: 0, y: 0, z: 0 };
    let totalVertices = vertices.length;

    for (let i = 0; i < totalVertices; i++) {
        centroid.x += vertices[i][0]; // Coordenada x.
        centroid.y += vertices[i][1]; // Coordenada y.
        centroid.z += vertices[i][2]; // Coordenada z.
    }

    centroid.x /= totalVertices;
    centroid.y /= totalVertices;
    centroid.z /= totalVertices;

    return centroid;
}

// Função para calcular o centroide de uma face.
function calculateCentroidFace(face) {
    let xTotal = 0, yTotal = 0, zTotal = 0;
    let numeroDeVertices = 0;

    for (let vertice in face) {
        let ponto = face[vertice];
        xTotal += ponto.x;
        yTotal += ponto.y;
        zTotal += ponto.z;
        numeroDeVertices++;
    }

    let xCentroide = xTotal / numeroDeVertices;
    let yCentroide = yTotal / numeroDeVertices;
    let zCentroide = zTotal / numeroDeVertices;

    return { x: xCentroide, y: yCentroide, z: zCentroide };
}





// --------------------------------------------------------------------------------------------------
// SUPERFÍCIE B-SPLINE
// --------------------------------------------------------------------------------------------------

// CONSTANTES DEFININDO A QUANTIDADE DE PONTOS DE CONTROLE, GRAU E RESOLUCAO DA SUPERFICIE.
let NI = 0;
let NJ = 0;
let TI = 0;
let TJ = 0;
let RESOLUTIONI = 0;
let RESOLUTIONJ = 0;

let matriz_pontos_de_controle = [];
let matriz_pontos_superficie = [];
let lista_superficies_SRU = [];

// CALCULOS PARA GERAR A MALHA
function gerarSuperficie(NI, NJ, TI, TJ, RESOLUTIONI, RESOLUTIONJ, atualizandoSuperficie = false, index_surface_control_points_atualizados = -1) {

    console.log("--------------------------------------------------------------------------------------------");
    console.log("EXECUTANDO GERACAO DA SUPERFICIE");
    console.log("--------------------------------------------------------------------------------------------");

    // Gerar o vetor de nós para uma spline clamped.
    function splineKnots(n, degree) {
        const totalKnots = n + degree + 2;
        const knots = new Array(totalKnots);
        const L = n - degree + 2;

        // Nós iniciais.
        for (let i = 0; i <= degree; i++) {
            knots[i] = 0;
        }

        // Nós finais.
        for (let i = totalKnots - degree - 1; i < totalKnots; i++) {
            knots[i] = L;
        }

        // Nós internos.
        if (n - degree > 0) {
            let step = L / (n - degree + 1);

            for (let i = degree + 1; i < totalKnots - degree - 1; i++) {
                knots[i] = (i - degree) * step;
            }
        }

        return knots;
    }

    // Fórmula recursiva de Cox‑de‑Boor para calcular a função de blending (ou base) de uma B‑Spline.
    function splineBlend(i, degree, knots, u) {

        if (degree === 0) {

            if (knots[i] <= u && u < knots[i + 1]) return 1;

            if (u === knots[knots.length - 1] && u === knots[i + 1]) return 1;

            return 0;

        } else {

            let denom1 = knots[i + degree] - knots[i];
            let denom2 = knots[i + degree + 1] - knots[i + 1];
            let term1 = 0;
            let term2 = 0;

            if (denom1 !== 0) {
                term1 = ((u - knots[i]) / denom1) * splineBlend(i, degree - 1, knots, u);
            }

            if (denom2 !== 0) {
                term2 = ((knots[i + degree + 1] - u) / denom2) * splineBlend(i + 1, degree - 1, knots, u);
            }

            return term1 + term2;
        }
    }

    // Nova superficie ou superficie remodelada.
    if (atualizandoSuperficie == false) {
        for (let i = 0; i <= NI; i++) {
            matriz_pontos_de_controle[i] = [];

            for (let j = 0; j <= NJ; j++) {
                matriz_pontos_de_controle[i][j] = {
                    x: (i - (NI / 2)) * 3,
                    y: (j - (NJ / 2)) * 3,
                    z: (Math.floor(Math.random() * 10000) / 5000.0) - 1
                };
            }
        }
    } else {
        if (index_surface_control_points_atualizados >= 0) {
            matriz_pontos_de_controle = lista_superficies_SRU[index_surface_control_points_atualizados].matriz_pontos_de_controle_SRU;
        } else {
            alert("Falha ao gerar superficie com os pontos de controle atualizados.");
            return;
        }
    }

    // Calcula os vetores de nós para cada direção.
    const knotsI = splineKnots(NI, TI);
    const knotsJ = splineKnots(NJ, TJ);

    // Calcula os incrementos para os parâmetros (u e v) usados para avaliar a spline.
    const incrementI = (NI - TI + 2) / (RESOLUTIONI - 1);
    const incrementJ = (NJ - TJ + 2) / (RESOLUTIONJ - 1);

    // Matriz de Pontos da Superfície: RESOLUTIONI x RESOLUTIONJ.
    matriz_pontos_superficie = new Array(RESOLUTIONI);
    for (let i = 0; i < RESOLUTIONI; i++) {
        matriz_pontos_superficie[i] = new Array(RESOLUTIONJ);
    }

    // Calcula os pontos da superfície para os valores internos.
    // Cada posição da matriz recebe as coordenadas (x, y, z) avaliadas da superfície B‑Spline.
    let u = 0;
    for (let i = 0; i < RESOLUTIONI - 1; i++) {
        let v = 0;

        for (let j = 0; j < RESOLUTIONJ - 1; j++) {
            let sum = { x: 0, y: 0, z: 0 };

            // Percorre todos os pontos de controle.
            for (let ki = 0; ki <= NI; ki++) {
                for (let kj = 0; kj <= NJ; kj++) {
                    let bi = splineBlend(ki, TI, knotsI, u);
                    let bj = splineBlend(kj, TJ, knotsJ, v);

                    sum.x += matriz_pontos_de_controle[ki][kj].x * bi * bj;
                    sum.y += matriz_pontos_de_controle[ki][kj].y * bi * bj;
                    sum.z += matriz_pontos_de_controle[ki][kj].z * bi * bj;
                }
            }

            matriz_pontos_superficie[i][j] = sum;
            v += incrementJ;
        }

        u += incrementI;
    }

    // Calcula os pontos da última coluna.
    u = 0;
    for (let i = 0; i < RESOLUTIONI - 1; i++) {
        let sum = { x: 0, y: 0, z: 0 };

        for (let ki = 0; ki <= NI; ki++) {
            let bi = splineBlend(ki, TI, knotsI, u);

            sum.x += matriz_pontos_de_controle[ki][NJ].x * bi;
            sum.y += matriz_pontos_de_controle[ki][NJ].y * bi;
            sum.z += matriz_pontos_de_controle[ki][NJ].z * bi;
        }

        matriz_pontos_superficie[i][RESOLUTIONJ - 1] = sum;
        u += incrementI;
    }
    // Último ponto da última coluna.
    matriz_pontos_superficie[RESOLUTIONI - 1][RESOLUTIONJ - 1] = { ...matriz_pontos_de_controle[NI][NJ] };

    // Calcula os pontos da última linha.
    let v = 0;
    for (let j = 0; j < RESOLUTIONJ - 1; j++) {
        let sum = { x: 0, y: 0, z: 0 };

        for (let kj = 0; kj <= NJ; kj++) {
            let bj = splineBlend(kj, TJ, knotsJ, v);

            sum.x += matriz_pontos_de_controle[NI][kj].x * bj;
            sum.y += matriz_pontos_de_controle[NI][kj].y * bj;
            sum.z += matriz_pontos_de_controle[NI][kj].z * bj;
        }

        matriz_pontos_superficie[RESOLUTIONI - 1][j] = sum;
        v += incrementJ;
    }
    matriz_pontos_superficie[RESOLUTIONI - 1][RESOLUTIONJ - 1] = { ...matriz_pontos_de_controle[NI][NJ] };

    console.log("--------------------------------------------------------------------------------------------");
    console.log("MATRIZ PONTOS DE CONTROLE: ", matriz_pontos_de_controle);
    console.log("MATRIZ PONTOS DA MALHA: ", matriz_pontos_superficie);
    console.log("--------------------------------------------------------------------------------------------");


    if (atualizandoSuperficie == false) {
        salvarSuperficie(matriz_pontos_de_controle, matriz_pontos_superficie, NI, NJ, TI, TJ, RESOLUTIONI, RESOLUTIONJ, window_plane, viewport, cor_aresta_visivel, cor_aresta_nao_visivel);
    } else {
        lista_superficies_SRU[index_surface_control_points_atualizados].matriz_pontos_superficie_SRU = matriz_pontos_superficie;
    }

    matriz_pontos_de_controle = [];
    matriz_pontos_superficie = [];
}

// SALVAR SUPERFICIE GERADA
function salvarSuperficie(matriz_pontos_de_controle_SRU, matriz_pontos_superficie_SRU, NI, NJ, TI, TJ, RESOLUTIONI, RESOLUTIONJ, window_plane, viewport, cor_aresta_visivel, cor_aresta_nao_visivel) {

    lista_superficies_SRU.push({
        id: lista_superficies_SRU.length,
        matriz_pontos_de_controle_SRU,
        matriz_pontos_superficie_SRU,
        NI,
        NJ,
        TI,
        TJ,
        RESOLUTIONI,
        RESOLUTIONJ,
        window_plane,
        viewport,
        cor_aresta_visivel,
        cor_aresta_nao_visivel
    });

    atualizarSelectSuperficies();

    console.log("--------------------------------------------------------------------------------------------");
    console.log("LISTA DE SUPERFICIES: ", lista_superficies_SRU);
    console.log("--------------------------------------------------------------------------------------------");
}

// ATUALIZA O SELECT DAS SUPERFICIES ARMAZENADAS
function atualizarSelectSuperficies() {
    let superficies_select = document.getElementById("superficies-armazenadas");
    superficies_select.innerHTML = "";

    let option = document.createElement("option");
    option.value = "#";
    option.textContent = `Selecione uma superfície`;
    option.selected = true;
    option.disabled = true;
    superficies_select.appendChild(option);

    lista_superficies_SRU.forEach((superficie, index) => {
        option = document.createElement("option");
        option.value = index;
        option.textContent = `Superfície ${index + 1}`;

        superficies_select.appendChild(option);
    });
}





// --------------------------------------------------------------------------------------------------
// PIPELINE DE VISUALIZACAO
// --------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------
// CAMERA:
// --------------------------------------------------------------------------------------------------
let camera = {
    VRP: {},
    P: {},
    Y: {}

    // VRP: { x: 100, y: 15, z: 0 },
    // P: { x: 20, y: 10, z: 25 },
    // Y: { x: 0, y: 1, z: 0 }  
};

// --------------------------------------------------------------------------------------------------
// MATRIZ TRANSFORMACAO DE CAMERA SRU,SRC
// --------------------------------------------------------------------------------------------------
function set_Matriz_SRU_SRC(camera, n_unitario, v_unitario, u_unitario) {

    let dotU = dotProduct(camera.VRP, u_unitario);
    let dotV = dotProduct(camera.VRP, v_unitario);
    let dotN = dotProduct(camera.VRP, n_unitario);

    if (isNaN(dotU)) dotU = 0;
    if (isNaN(dotV)) dotV = 0;
    if (isNaN(dotN)) dotN = 0;

    return [
        [u_unitario.x, u_unitario.y, u_unitario.z, -dotU],
        [v_unitario.x, v_unitario.y, v_unitario.z, -dotV],
        [n_unitario.x, n_unitario.y, n_unitario.z, -dotN],
        [0, 0, 0, 1]
    ]
}

// --------------------------------------------------------------------------------------------------
// RECORTE 3D: VERIFICANDO SE A SUPERFICIE ESTA CONTIDA NO PLANOS NEAR E FAR
// --------------------------------------------------------------------------------------------------

// Funcao para calcular o centroide da superficie.
function calcular_centroide_superficie(matriz_pontos_superficie_SRU) {
    let somaX = 0, somaY = 0, somaZ = 0;
    let totalPontos = 0;

    for (let i = 0; i < matriz_pontos_superficie_SRU.length; i++) {
        for (let j = 0; j < matriz_pontos_superficie_SRU[i].length; j++) {
            let ponto = matriz_pontos_superficie_SRU[i][j];
            somaX += ponto.x;
            somaY += ponto.y;
            somaZ += ponto.z;
            totalPontos++;
        }
    }

    return {
        x: somaX / totalPontos,
        y: somaY / totalPontos,
        z: somaZ / totalPontos
    };
}

let d_near; // - 100
let d_far; // 1000

// Função para verificar se o centroide do objeto está dentro dos planos near e far.
function check_Near_Far(centroide_superficie, camera, d_near, d_far, n_unitario) {

    let proj = dotProduct(subtract(centroide_superficie, camera.VRP), n_unitario);

    console.log("--------------------------------------------------------------------------------------------");
    console.log("Projeção do centroide na direção N:", proj);
    console.log("Plano Near esperado em:", d_near);
    console.log("Plano Far esperado em:", d_far);
    console.log("--------------------------------------------------------------------------------------------");

    if (proj < d_near) {
        console.log("O objeto está atrás do plano Near.");
        return false;
    }

    if (proj > d_far) {
        console.log("--------------------------------------------------------------------------------------------");
        console.log("O objeto está além do plano Far.");
        console.log("--------------------------------------------------------------------------------------------");

        return false;
    }

    console.log("--------------------------------------------------------------------------------------------");
    console.log("O objeto está dentro dos planos Near e Far.");
    console.log("--------------------------------------------------------------------------------------------");

    return true;
}

// --------------------------------------------------------------------------------------------------
// MATRIZ IDENTIDADE PROJECAO AXONOMETRICA ISOMETRICA
// --------------------------------------------------------------------------------------------------
function set_Matriz_Proj_Axonometrica_Isometrica() {
    return [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ]
}

// --------------------------------------------------------------------------------------------------
// COORDENADAS DE MUNDO -> JANELA DE VISÃO
// --------------------------------------------------------------------------------------------------
let window_plane = {
    // xmin: -8,
    // ymin: -6,
    // xmax: 8,
    // ymax: 6
};

// --------------------------------------------------------------------------------------------------
// COORDENADAS DE TELA -> VIEW PORT
// --------------------------------------------------------------------------------------------------
let viewport = {
    // umin: 0,
    // vmin: 0,
    // umax: 319,
    // vmax: 219
};

// --------------------------------------------------------------------------------------------------
// MATRIZ TRANSFORMACAO JANELA -> PORTA DE VISÃO
// --------------------------------------------------------------------------------------------------
function set_Matriz_Window_ViewPort(window_plane, viewport) {
    return [
        [((viewport.umax - viewport.umin) / (window_plane.xmax - window_plane.xmin)), 0, 0, (-window_plane.xmin * ((viewport.umax - viewport.umin) / (window_plane.xmax - window_plane.xmin)) + viewport.umin)],
        [0, ((viewport.vmin - viewport.vmax) / (window_plane.ymax - window_plane.ymin)), 0, (window_plane.ymin * ((viewport.vmax - viewport.vmin) / (window_plane.ymax - window_plane.ymin)) + viewport.vmax)],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ]
}

// --------------------------------------------------------------------------------------------------
// CALCULO DA VISIBILIDADE PELA NORMAL DA FACE
// --------------------------------------------------------------------------------------------------
function calcular_visibilidade_faces(camera, matriz_pontos_superficie_SRU, RESOLUTIONI, RESOLUTIONJ, cor_aresta_visivel, cor_aresta_nao_visivel) {

    let faces_ordenadas_SRU = [];

    for (let i = 0; i < RESOLUTIONI - 1; i++) {
        for (let j = 0; j < RESOLUTIONJ - 1; j++) {

            let P0 = matriz_pontos_superficie_SRU[i][j];
            let P1 = matriz_pontos_superficie_SRU[i][j + 1];
            let P2 = matriz_pontos_superficie_SRU[i + 1][j + 1];
            let P3 = matriz_pontos_superficie_SRU[i + 1][j];

            let centroide = {
                x: (P0.x + P1.x + P2.x + P3.x) / 4,
                y: (P0.y + P1.y + P2.y + P3.y) / 4,
                z: (P0.z + P1.z + P2.z + P3.z) / 4
            };

            let vet_VRP_CO = subtract(camera.VRP, centroide);
            let distancia = Math.sqrt(vet_VRP_CO.x * vet_VRP_CO.x + vet_VRP_CO.y * vet_VRP_CO.y + vet_VRP_CO.z * vet_VRP_CO.z);

            let V1 = {
                x: P1.x - P0.x,
                y: P1.y - P0.y,
                z: P1.z - P0.z
            };
            let V2 = {
                x: P3.x - P0.x,
                y: P3.y - P0.y,
                z: P3.z - P0.z
            };

            let normal = crossProduct(V1, V2);
            normal = normalize(normal);

            let O = subtract(camera.VRP, centroide);
            O = normalize(O);

            let visibilidade = dotProduct(O, normal);
            if (visibilidade > 0) {
                faces_ordenadas_SRU.push({
                    vertices: [P0, P1, P2, P3],
                    centroide: centroide,
                    distancia: distancia,
                    visibilidade: true,
                    aresta_color: cor_aresta_visivel
                });
            } else {
                faces_ordenadas_SRU.push({
                    vertices: [P0, P1, P2, P3],
                    centroide: centroide,
                    distancia: distancia,
                    visibilidade: false,
                    aresta_color: cor_aresta_nao_visivel
                })
            }
        }
    }

    faces_ordenadas_SRU.sort((a, b) => b.distancia - a.distancia);

    return faces_ordenadas_SRU;
}

// --------------------------------------------------------------------------------------------------
// CALCULO PARA TRANSFORMAR CADA PONTO DE CADA FACE SRU EM SRT
// --------------------------------------------------------------------------------------------------

// Função para multiplicar um ponto (objeto com x, y, z) por uma matriz de transformação 4x4.
function transformar_Ponto_SRU_SRT(ponto_face_SRU, M_SRU_SRT) {

    let x = ponto_face_SRU.x, y = ponto_face_SRU.y, z = ponto_face_SRU.z;
    let xp = M_SRU_SRT[0][0] * x + M_SRU_SRT[0][1] * y + M_SRU_SRT[0][2] * z + M_SRU_SRT[0][3] * 1;
    let yp = M_SRU_SRT[1][0] * x + M_SRU_SRT[1][1] * y + M_SRU_SRT[1][2] * z + M_SRU_SRT[1][3] * 1;
    let zp = M_SRU_SRT[2][0] * x + M_SRU_SRT[2][1] * y + M_SRU_SRT[2][2] * z + M_SRU_SRT[2][3] * 1;

    return { x: xp, y: yp, z: zp };
}

// Função para multiplicar uma matriz ([[{x, y, z}], [{...}], [{...}], ...]) por outra matriz ([[n1, n2, n3], [...], [...], ...]).
function transformar_Faces_SRU_SRT(faces_SRU, M_SRU_SRT) {

    return faces_SRU.map(face => {

        let verticesTransformados = face.vertices.map(ponto => transformar_Ponto_SRU_SRT(ponto, M_SRU_SRT));

        return {
            ...face,
            vertices: verticesTransformados,
        };
    });
}

// --------------------------------------------------------------------------------------------------
// CALCULO PARA TRANSFORMAR A MATRIZ PONTOS DE CONTROLE SRU PARA SRT
// --------------------------------------------------------------------------------------------------

// Função para multiplicar um ponto (objeto com x, y, z) por uma matriz de transformação 4x4.
function transformar_Ponto_Controle_SRU_SRT(point, T) {

    let x = point.x, y = point.y, z = point.z;

    let xp = T[0][0] * x + T[0][1] * y + T[0][2] * z + T[0][3] * 1;
    let yp = T[1][0] * x + T[1][1] * y + T[1][2] * z + T[1][3] * 1;
    let zp = T[2][0] * x + T[2][1] * y + T[2][2] * z + T[2][3] * 1;

    return { x: xp, y: yp, z: zp };
}

// Função para multiplicar uma matriz ([[{x, y, z}], [{...}], [{...}], ...]) por outra matriz ([[n1, n2, n3], [...], [...], ...]).
function transformar_Matriz_Pontos_Controle_SRU_SRT(matrixPoints, T) {

    let result = [];

    for (let i = 0; i < matrixPoints.length; i++) {
        result[i] = [];

        for (let j = 0; j < matrixPoints[i].length; j++) {
            result[i][j] = transformar_Ponto_Controle_SRU_SRT(matrixPoints[i][j], T);
        }
    }

    return result;
}

// --------------------------------------------------------------------------------------------------
// ALGORITMO DO PINTOR
// --------------------------------------------------------------------------------------------------
function algoritmoDoPintor(faces_ordenadas_SRT) {
    faces_ordenadas_SRT.forEach(face => {
        desenharFace(face.vertices, face.aresta_color);
    });
}

function desenharFace(vertices, corAresta, corPreenchimento = "rgb(255, 255, 255)") {
    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);

    for (let i = 1; i < vertices.length; i++) {
        ctx.lineTo(vertices[i].x, vertices[i].y);
    }

    ctx.closePath();

    ctx.fillStyle = corPreenchimento;
    ctx.fill();

    ctx.strokeStyle = corAresta;
    ctx.stroke();
}

// --------------------------------------------------------------------------------------------------
// DESENHANDO OS PONTOS DE CONTROLE DA MALHA
// --------------------------------------------------------------------------------------------------
function desenharPontosControle(matriz_pontos_de_controle_SRT, cor = "red", raio = 6) {
    let contador = 1;

    for (let i = 0; i < matriz_pontos_de_controle_SRT.length; i++) {
        for (let j = 0; j < matriz_pontos_de_controle_SRT[i].length; j++) {
            let ponto = matriz_pontos_de_controle_SRT[i][j];

            ctx.beginPath();
            ctx.arc(ponto.x, ponto.y, raio, 0, 2 * Math.PI);
            ctx.fillStyle = cor;
            ctx.fill();

            ctx.fillStyle = "white";
            ctx.font = "bold 10px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.fillText(contador, ponto.x, ponto.y);

            contador++;
        }
    }
}

// --------------------------------------------------------------------------------------------------
// EXECUTANDO O PIPELINE DE VISUALIZACAO
// --------------------------------------------------------------------------------------------------
function executarPipelineVisualizacao(superficie) {

    console.log("--------------------------------------------------------------------------------------------");
    console.log("EXECUTANDO PIPELINE DE VISUALIZACAO");
    console.log("--------------------------------------------------------------------------------------------");

    // --------------------------------------------------------------------------------------------------
    // BASE CANONICA ORTONORMAL DO SRC
    // --------------------------------------------------------------------------------------------------

    // vetor N (direção da linha de visão).
    let N = subtract(camera.VRP, camera.P);
    let n_unitario = normalize(N);

    // vetor V (Vetor View Up).
    let Y_dot_n = dotProduct(n_unitario, camera.Y);
    let V = subtract(camera.Y, { x: Y_dot_n * n_unitario.x, y: Y_dot_n * n_unitario.y, z: Y_dot_n * n_unitario.z });
    let v_unitario = normalize(V);

    // vetor u (perpendicular a n e v).
    let u_unitario = crossProduct(v_unitario, n_unitario);

    // DEFININDO A MATRIZ TRANSFORMACAO DE CAMERA.
    let M_SRU_SRC = set_Matriz_SRU_SRC(camera, n_unitario, v_unitario, u_unitario);

    // --------------------------------------------------------------------------------------------------
    // RECORTE 3D
    // --------------------------------------------------------------------------------------------------

    let centroide_superficie = calcular_centroide_superficie(superficie.matriz_pontos_superficie_SRU);

    let recorte_3D_check = check_Near_Far(centroide_superficie, camera, d_near, d_far, n_unitario);

    if (recorte_3D_check) {
        console.log("--------------------------------------------------------------------------------------------");
        console.log("SUPERFICIE NÃO RECORTADA.");
        console.log("--------------------------------------------------------------------------------------------");

        // --------------------------------------------------------------------------------------------------
        // PROJECAO
        // --------------------------------------------------------------------------------------------------

        // DEFININDO A MATRIZ IDENTIDADE DE PROJECAO AXONOMETRICA ISOMETRICA.
        let M_proj = set_Matriz_Proj_Axonometrica_Isometrica();

        // --------------------------------------------------------------------------------------------------
        // MAPEAMENTO PARA O SRT
        // --------------------------------------------------------------------------------------------------

        // DEFININDO MATRIZ TRANSFORMACAO JANELA -> PORTA DE VISÃO.
        let M_jp = set_Matriz_Window_ViewPort(superficie.window_plane, superficie.viewport);

        // CONCATENANDO AS MATRIZES DO PIPELINE. (M_SRU_SRT = M_jp * M_proj * M_SRU_SRC).
        let M_SRU_SRT = multiplyMatrices(multiplyMatrices(M_jp, M_proj), M_SRU_SRC);

        // --------------------------------------------------------------------------------------------------
        // CALCULO DA VISIBILIDADE PELA NORMAL DA FACE
        // --------------------------------------------------------------------------------------------------
        let faces_ordenadas_SRU = calcular_visibilidade_faces(camera, superficie.matriz_pontos_superficie_SRU, superficie.RESOLUTIONI, superficie.RESOLUTIONJ, superficie.cor_aresta_visivel, superficie.cor_aresta_nao_visivel);

        // --------------------------------------------------------------------------------------------------
        // CALCULO PARA TRANSFORMAR CADA FACE SRU PARA SRT
        // --------------------------------------------------------------------------------------------------
        let faces_ordenadas_SRT = transformar_Faces_SRU_SRT(faces_ordenadas_SRU, M_SRU_SRT);

        // --------------------------------------------------------------------------------------------------
        // CALCULO PARA TRANSFORMAR A MATRIZ PONTOS DE CONTROLE SRU PARA SRT
        // --------------------------------------------------------------------------------------------------
        let matriz_pontos_de_controle_SRT = transformar_Matriz_Pontos_Controle_SRU_SRT(superficie.matriz_pontos_de_controle_SRU, M_SRU_SRT);

        // --------------------------------------------------------------------------------------------------
        // ALGORITMO DO PINTOR PARA DESENHAR AS FACES ORDENADAS
        // --------------------------------------------------------------------------------------------------
        algoritmoDoPintor(faces_ordenadas_SRT);

        // --------------------------------------------------------------------------------------------------
        // DESENHANDO OS PONTOS DE CONOTROLE DA MALHA
        // --------------------------------------------------------------------------------------------------
        desenharPontosControle(matriz_pontos_de_controle_SRT);

        console.log("--------------------------------------------------------------------------------------------");
        console.log("CAMERA: ", camera);
        console.log("MATRIZ TRANSFORMACAO DE CAMERA: ", M_SRU_SRC);
        console.log("CENTROIDE DA SUPERFICIE: ", centroide_superficie);
        console.log("MATRIZ PROJECAO AXONOMETRICA ISOMETRICA: ", M_proj);
        console.log("WINDOW: ", superficie.window_plane);
        console.log("VIEWPORT: ", superficie.viewport);
        console.log("MATRIZ TRANSFORMACAO JANELA -> PORTA DE VISÃO: ", M_jp);
        console.log("MATRIZ PARA PROJECAO AXONOMETRIA ISOMETROCA NO SRT: ", M_SRU_SRT);
        console.log("FACES SRU ORDENADAS (VISIVEIS E NAO VISIVEIS) DA SUPERFICIE: ", faces_ordenadas_SRU);
        console.log("FACES SRT ORDENADAS (VISIVEIS E NAO VISIVEIS) DA SUPERFICIE: ", faces_ordenadas_SRT);
        console.log("MATRIZ PONTOS DE CONTROLE SRT: ", matriz_pontos_de_controle_SRT);
        console.log("--------------------------------------------------------------------------------------------");

    } else {
        alert("CENTROIDE DA SUPERFICIE FORA DOS LIMITES NEAR/FAR.");

        lista_superficies_SRU = lista_superficies_SRU.filter(obj => obj.id !== superficie.id);

        console.log("--------------------------------------------------------------------------------------------");
        console.log("SUPERFICIE RECORTADA.");
        console.log("--------------------------------------------------------------------------------------------");
        console.log(lista_superficies_SRU);
        console.log("--------------------------------------------------------------------------------------------");
    }
}