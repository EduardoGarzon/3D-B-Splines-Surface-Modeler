// --------------------------------------------------------------------------------------------------
// OBJETO 3D PARA TESTE
// --------------------------------------------------------------------------------------------------

let objeto_SRU = [
    [21.2, 34.1, 18.8, 5.9, 20],
    [0.7, 3.4, 5.6, 2.9, 20.9],
    [42.3, 27.2, 14.6, 29.7, 31.6],
    [1, 1, 1, 1, 1]
]

console.log("OBJETO SRU: ", objeto_SRU);





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
    // Verifica se o número de colunas da matriz A é igual ao número de linhas da matriz B
    if (A[0].length !== B.length) {
        throw "As matrizes não podem ser multiplicadas: número de colunas de A não é igual ao número de linhas de B.";
    }

    // Matriz resultante terá o número de linhas de A e o número de colunas de B
    let result = new Array(A.length).fill().map(() => new Array(B[0].length).fill(0));

    // Realiza a multiplicação das matrizes
    for (let i = 0; i < A.length; i++) {  // Linhas de A
        for (let j = 0; j < B[0].length; j++) {  // Colunas de B
            for (let k = 0; k < A[0].length; k++) {  // Colunas de A / Linhas de B
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
        centroid.x += vertices[i][0]; // Coordenada x
        centroid.y += vertices[i][1]; // Coordenada y
        centroid.z += vertices[i][2]; // Coordenada z
    }

    // Dividir pela quantidade de vértices para obter a média
    centroid.x /= totalVertices;
    centroid.y /= totalVertices;
    centroid.z /= totalVertices;

    return centroid;
}

// Função para calcular um vetor unitário.
function vetorUnitario(vetor, norma) {
    return {
        x: vetor.x / norma,
        y: vetor.y / norma,
        z: vetor.z / norma
    };
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
// CAMERA:
// --------------------------------------------------------------------------------------------------

// PARÂMETROS DA CÂMERA.
const camera = {
    VRP: { x: 25, y: 15, z: 80 },   // Exemplo de valor para VRP.
    P: { x: 20, y: 10, z: 25 },     // Exemplo de valor para P (posição da câmera).
    Y: { x: 0, y: 1, z: 0 }         // Vetor up.
};





// --------------------------------------------------------------------------------------------------
// BASE CANONICA ORTONORMAL DO SRC:
// --------------------------------------------------------------------------------------------------



// Cálculo do vetor N (direção da linha de visão).
let N = subtract(camera.VRP, camera.P);

// Cálculo do vetor n (unitário, direção da linha de visão).
let n = normalize(N);

// Cálculo do vetor V (ajuste do vetor up).
let Y_dot_n = dotProduct(camera.Y, n);
let V = subtract(camera.Y, { x: Y_dot_n * n.x, y: Y_dot_n * n.y, z: Y_dot_n * n.z });

// Cálculo do vetor v (unitário, ajustado).
let v = normalize(V);

// Cálculo do vetor u (perpendicular a n e v).
let u = crossProduct(v, n);

console.log("n (unitário):", n);
console.log("v (unitário):", v);
console.log("u (unitário):", u);





// --------------------------------------------------------------------------------------------------
// MATRIZ DE TRANSFORMACAO DE CAMERA SRU,SRC
// --------------------------------------------------------------------------------------------------

// Verificação de dotProduct para evitar NaN.
let dotU = dotProduct(camera.VRP, u);
let dotV = dotProduct(camera.VRP, v);
let dotN = dotProduct(camera.VRP, n);

// Se algum valor de dotProduct for NaN, definir um valor padrão.
if (isNaN(dotU)) dotU = 0;
if (isNaN(dotV)) dotV = 0;
if (isNaN(dotN)) dotN = 0;

// MATRIZ DE TRANSFORMACAO DE CAMERA (M_SRU_SRC = R * T).
let M_SRU_SRC = [
    [u.x, u.y, u.z, -dotU],
    [v.x, v.y, v.z, -dotV],
    [n.x, n.y, n.z, -dotN],
    [0, 0, 0, 1]
]

console.log("Matriz M_SRU_SRC:", M_SRU_SRC);





// --------------------------------------------------------------------------------------------------
// RECORTE 3D
// --------------------------------------------------------------------------------------------------

// Distâncias do plano near e far.
let d_near = 1.0;
let d_far = 1000.0;

// Função para verificar se o centroide do objeto está dentro dos planos near e far.
function checkNearFar(centroide, camera, d_near, d_far) {
    // Calcular a distância do centroide ao plano near.
    let dist_near = dotProduct(subtract(centroide, camera.VRP), n) - d_near;

    // Calcular a distância do centroide ao plano far.
    let dist_far = dotProduct(subtract(centroide, camera.VRP), n) - d_far;

    // Exibir as distâncias para depuração
    console.log("Distância do centroide ao plano Near:", dist_near);
    console.log("Distância do centroide ao plano Far:", dist_far);

    // Verificar se o centroide está fora do plano near.
    if (dist_near < 0) {
        console.log("O objeto está atrás do plano Near.");
        return "Objeto está para trás do plano Near.";
    }

    // Verificar se o centroide está fora do plano far
    if (dist_far > 0) {
        console.log("O objeto está além do plano Far.");
        return "Objeto está para frente do plano Far.";
    }

    // Se o centroide está entre os planos near e far
    console.log("O objeto está dentro dos planos Near e Far.");
    return "Objeto dentro do volume de visão.";
}

// Calculando o Centroide do objeto.
//let centroide = calculateCentroid(objeto_SRC);

// Verificar se o centroide está dentro ou fora dos planos near e far.
//let resultado = checkNearFar(centroide, camera, d_near, d_far);

// Exibir o resultado final.
//console.log("Centroide do objeto:", centroide);
//console.log("Resultado da verificação:", resultado);





// --------------------------------------------------------------------------------------------------
// PROJECAO
// --------------------------------------------------------------------------------------------------

// MATRIZ DE PROJECAO AXONOMETRICA ISOMETRICA
let M_proj = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
]





// --------------------------------------------------------------------------------------------------
// MAPEAMENTO PARA O SRT
// --------------------------------------------------------------------------------------------------

// Coordenadas no mundo.
let window_plane = {
    xmin: -50,
    ymin: -50,
    xmax: 50,
    ymax: 50
}

// Valores do exemplo da planilha.
// xmin: -8,
// ymin: -6,
// xmax: 8,
// ymax: 6

// Coordenadas de tela.
let viewport = {
    umin: 0,
    vmin: 0,
    umax: 319,
    vmax: 219
}

// MATRIZ DE TRANSFORMACAO JANELA -> PORTA DE VISÃO.
let M_jp = [
    [((viewport.umax - viewport.umin) / (window_plane.xmax - window_plane.xmin)), 0, 0, (-window_plane.xmin * ((viewport.umax - viewport.umin) / (window_plane.xmax - window_plane.xmin)) + viewport.umin)],
    [0, ((viewport.vmin - viewport.vmax) / (window_plane.ymax - window_plane.ymin)), 0, (window_plane.ymin * ((viewport.vmax - viewport.vmin) / (window_plane.ymax - window_plane.ymin)) + viewport.vmax)],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
]

console.log("MATRIZ DE TRANSFORMACAO JANELA -> PORTA DE VISAO: ", M_jp);

// CONCATENANDO AS MATRIZES DO PIPELINE AXONOMETRICO. (M_SRU_SRT = M_jp * M_proj * M_SRU_SRC).
let M_SRU_SRT = multiplyMatrices(multiplyMatrices(M_jp, M_proj), M_SRU_SRC);

console.log("MATRIZ PARA PROJECAO AXONOMETRIA NO SRT COMPLETA: ", M_SRU_SRT);





// --------------------------------------------------------------------------------------------------
// CALCULO DA VISIBILIDADE PELA NORMAL DA FACE
// --------------------------------------------------------------------------------------------------

// Coordenadas dos vértices das faces do objeto SRU.
let faces_Objeto_SRU = {
    ABE: {
        A: {
            x: 21.2,
            y: 0.7,
            z: 42.3
        },
        B: {
            x: 34.1,
            y: 3.4,
            z: 27.2
        },
        E: {
            x: 20,
            y: 20.9,
            z: 31.6

        }
    },
    BCE: {
        B: {
            x: 34.1,
            y: 3.4,
            z: 27.2
        },
        C: {
            x: 18.8,
            y: 5.6,
            z: 16.6
        },
        E: {
            x: 20,
            y: 20.9,
            z: 31.6
        }
    },
    CDE: {
        C: {
            x: 18.8,
            y: 5.6,
            z: 16.6
        },
        D: {
            x: 5.9,
            y: 2.9,
            z: 29.7
        },
        E: {
            x: 20,
            y: 20.9,
            z: 31.6
        }
    },
    DAE: {
        D: {
            x: 5.9,
            y: 2.9,
            z: 29.7
        },
        A: {
            x: 21.2,
            y: 0.7,
            z: 42.3
        },
        E: {
            x: 20,
            y: 20.9,
            z: 31.6
        },
    },
    ADCB: {
        A: {
            x: 21.2,
            y: 0.7,
            z: 42.3
        },
        D: {
            x: 5.9,
            y: 2.9,
            z: 29.7
        },
        C: {
            x: 18.8,
            y: 5.6,
            z: 16.6
        },
        B: {
            x: 34.1,
            y: 3.4,
            z: 27.2
        }
    }
}

// Calculando o centroide de cada face do objeto SRU.
console.log("CENTROIDE DE CADA FACE DO OBJETO SRU:");

let Centroide_ABE = calculateCentroidFace(faces_Objeto_SRU.ABE);
console.log("Face ABE: ", Centroide_ABE);

let Centroide_BCE = calculateCentroidFace(faces_Objeto_SRU.BCE);
console.log("Face BCE: ", Centroide_BCE);

let Centroide_CDE = calculateCentroidFace(faces_Objeto_SRU.CDE);
console.log("Face CDE: ", Centroide_CDE);

let Centroide_DAE = calculateCentroidFace(faces_Objeto_SRU.DAE);
console.log("Face DAE: ", Centroide_DAE);

let Centroide_ADCB = calculateCentroidFace(faces_Objeto_SRU.ADCB);
console.log("Face ADCB: ", Centroide_ADCB);


// Calculando a ordem de desenho de cada face (d(CENTROIDE, VRP)).
console.log("DISTANCIA DO OBSERVADOR E CADA CENTROIDE DE CADA FACE SRU:");

let distancia_CO_VRP_ABE = Math.sqrt(Math.pow((camera.VRP.x - Centroide_ABE.x), 2) + Math.pow((camera.VRP.y - Centroide_ABE.y), 2) + Math.pow((camera.VRP.z - Centroide_ABE.z), 2));
console.log("Face ABE: ", distancia_CO_VRP_ABE);

let distancia_CO_VRP_BCE = Math.sqrt(Math.pow((camera.VRP.x - Centroide_BCE.x), 2) + Math.pow((camera.VRP.y - Centroide_BCE.y), 2) + Math.pow((camera.VRP.z - Centroide_BCE.z), 2));
console.log("Face BCE: ", distancia_CO_VRP_BCE);

let distancia_CO_VRP_CDE = Math.sqrt(Math.pow((camera.VRP.x - Centroide_CDE.x), 2) + Math.pow((camera.VRP.y - Centroide_CDE.y), 2) + Math.pow((camera.VRP.z - Centroide_CDE.z), 2));
console.log("Face CDE: ", distancia_CO_VRP_CDE);

let distancia_CO_VRP_DAE = Math.sqrt(Math.pow((camera.VRP.x - Centroide_DAE.x), 2) + Math.pow((camera.VRP.y - Centroide_DAE.y), 2) + Math.pow((camera.VRP.z - Centroide_DAE.z), 2));
console.log("Face DAE: ", distancia_CO_VRP_DAE);

let distancia_CO_VRP_ADCB = Math.sqrt(Math.pow((camera.VRP.x - Centroide_ADCB.x), 2) + Math.pow((camera.VRP.y - Centroide_ADCB.y), 2) + Math.pow((camera.VRP.z - Centroide_ADCB.z), 2));
console.log("Face ADCB: ", distancia_CO_VRP_ADCB);

// Determinando a ordem de desenho de cada face do objeto SRU com base na distância.
console.log("ORDEM DE DESENHO DE CADA FACE DO OBJETO SRU:");

let ordem_de_desenho_faces = new Array();

ordem_de_desenho_faces.push(distancia_CO_VRP_ABE, distancia_CO_VRP_BCE, distancia_CO_VRP_CDE, distancia_CO_VRP_DAE, distancia_CO_VRP_ADCB);
ordem_de_desenho_faces.sort((a, b) => b - a);

console.log(ordem_de_desenho_faces);


// Calculando a normal de cada face e determinando sua visibilidade.

// FACE ABE:
console.log("VISIBILIDADE FACE ABE:");

// B(P3 - P2).
let vetor_BE = subtract(faces_Objeto_SRU.ABE.E, faces_Objeto_SRU.ABE.B);
console.log("Vetor BE: ", vetor_BE);

// A(P1 - P2).
let vetor_BA = subtract(faces_Objeto_SRU.ABE.A, faces_Objeto_SRU.ABE.B);
console.log("Vetor BA: ", vetor_BA);

// N = B X A.
let vetor_N = crossProduct(vetor_BE, vetor_BA);
console.log("Vetor N: ", vetor_N);
console.log("Comprimento vetor N: ", magnitude(vetor_N));

// Vetor Normal (n) normalizado.
let vetor_normal = vetorUnitario(vetor_N, magnitude(vetor_N));
console.log("Vetor normal: ", vetor_normal);

// O = (VRP - Q) / |VRP - Q|.
let vetor_O = subtract(camera.VRP, Centroide_ABE);
console.log("Vetor O: ", vetor_O);
console.log("Comprimento vetor O: ", magnitude(vetor_O));

// Vetor O normalizado.
let vetor_o = vetorUnitario(vetor_O, magnitude(vetor_O));
console.log("Vetor o: ", vetor_o);

// Calculando a visibilidade: O * N > 0.
let teste_visibilidade = dotProduct(vetor_o, vetor_normal);
let faces_visiveis = new Array();

if (teste_visibilidade > 0) {
    faces_visiveis.push(faces_Objeto_SRU.ABE);
}

console.log("Visibilidade: ", teste_visibilidade);


// FACE BCE:
console.log("VISIBILIDADE FACE BCE:");
let vetor_CE = subtract(faces_Objeto_SRU.BCE.E, faces_Objeto_SRU.BCE.C);
console.log("Vetor CE: ", vetor_CE);

let vetor_CB = subtract(faces_Objeto_SRU.BCE.B, faces_Objeto_SRU.BCE.C);
console.log("Vetor CB: ", vetor_CB);

vetor_N = crossProduct(vetor_CE, vetor_CB);
console.log("Vetor N: ", vetor_N);
console.log("Comprimento vetor N: ", magnitude(vetor_N));

vetor_normal = vetorUnitario(vetor_N, magnitude(vetor_N));
console.log("Vetor normal: ", vetor_normal);

vetor_O = subtract(camera.VRP, Centroide_BCE);
console.log("Vetor O: ", vetor_O);
console.log("Comprimento vetor O: ", magnitude(vetor_O));

vetor_o = vetorUnitario(vetor_O, magnitude(vetor_O));
console.log("Vetor o: ", vetor_o);

teste_visibilidade = dotProduct(vetor_o, vetor_normal);

if (teste_visibilidade > 0) {
    faces_visiveis.push(faces_Objeto_SRU.BCE);
}

console.log("Visibilidade: ", teste_visibilidade);


// FACE CDE:
console.log("VISIBILIDADE FACE CDE:");
let vetor_DE = subtract(faces_Objeto_SRU.CDE.E, faces_Objeto_SRU.CDE.D);
console.log("Vetor DE: ", vetor_DE);

let vetor_DC = subtract(faces_Objeto_SRU.CDE.C, faces_Objeto_SRU.CDE.D);
console.log("Vetor DC: ", vetor_DC);

vetor_N = crossProduct(vetor_DE, vetor_DC);
console.log("Vetor N: ", vetor_N);
console.log("Comprimento vetor N: ", magnitude(vetor_N));

vetor_normal = vetorUnitario(vetor_N, magnitude(vetor_N));
console.log("Vetor normal: ", vetor_normal);

vetor_O = subtract(camera.VRP, Centroide_CDE);
console.log("Vetor O: ", vetor_O);
console.log("Comprimento vetor O: ", magnitude(vetor_O));

vetor_o = vetorUnitario(vetor_O, magnitude(vetor_O));
console.log("Vetor o: ", vetor_o);

teste_visibilidade = dotProduct(vetor_o, vetor_normal);

if (teste_visibilidade > 0) {
    faces_visiveis.push(faces_Objeto_SRU.CDE);
}

console.log("Visibilidade: ", teste_visibilidade);


// FACE DAE:
console.log("VISIBILIDADE FACE DAE:");
let vetor_AE = subtract(faces_Objeto_SRU.DAE.E, faces_Objeto_SRU.DAE.A);
console.log("Vetor AE: ", vetor_AE);

let vetor_AD = subtract(faces_Objeto_SRU.DAE.D, faces_Objeto_SRU.DAE.A);
console.log("Vetor AD: ", vetor_AD);

vetor_N = crossProduct(vetor_AE, vetor_AD);
console.log("Vetor N: ", vetor_N);
console.log("Comprimento vetor N: ", magnitude(vetor_N));

vetor_normal = vetorUnitario(vetor_N, magnitude(vetor_N));
console.log("Vetor normal: ", vetor_normal);

vetor_O = subtract(camera.VRP, Centroide_DAE);
console.log("Vetor O: ", vetor_O);
console.log("Comprimento vetor O: ", magnitude(vetor_O));

vetor_o = vetorUnitario(vetor_O, magnitude(vetor_O));
console.log("Vetor o: ", vetor_o);

teste_visibilidade = dotProduct(vetor_o, vetor_normal);

if (teste_visibilidade > 0) {
    faces_visiveis.push(faces_Objeto_SRU.DAE);
}

console.log("Visibilidade: ", teste_visibilidade);


// FACE ADCB:
console.log("VISIBILIDADE FACE ADCB:");
vetor_DC = subtract(faces_Objeto_SRU.ADCB.C, faces_Objeto_SRU.ADCB.D);
console.log("Vetor DC: ", vetor_DC);

let vetor_DA = subtract(faces_Objeto_SRU.ADCB.A, faces_Objeto_SRU.ADCB.D);
console.log("Vetor DA: ", vetor_DA);

vetor_N = crossProduct(vetor_DC, vetor_DA);
console.log("Vetor N: ", vetor_N);
console.log("Comprimento vetor N: ", magnitude(vetor_N));

vetor_normal = vetorUnitario(vetor_N, magnitude(vetor_N));
console.log("Vetor normal: ", vetor_normal);

vetor_O = subtract(camera.VRP, Centroide_ADCB);
console.log("Vetor O: ", vetor_O);
console.log("Comprimento vetor O: ", magnitude(vetor_O));

vetor_o = vetorUnitario(vetor_O, magnitude(vetor_O));
console.log("Vetor o: ", vetor_o);

teste_visibilidade = dotProduct(vetor_o, vetor_normal);

if (teste_visibilidade > 0) {
    faces_visiveis.push(faces_Objeto_SRU.ADCB);
}

console.log("Visibilidade: ", teste_visibilidade);


console.log("FACES VISIVEIS E SUAS RESPECTIVAS DISTANCIAS AO OBSERVADOR:");
console.log(faces_visiveis);
console.log("Distância ABE: ", distancia_CO_VRP_ABE);
console.log("Distância DAE: ", distancia_CO_VRP_DAE);





// --------------------------------------------------------------------------------------------------
// ALGORITMO DO PINTOR
// --------------------------------------------------------------------------------------------------

function algoritmoDoPintor(faces, distancias) {

    // Filtrando apenas as faces visíveis (baseado no cálculo da normal).
    let facesVisiveis = Object.keys(faces).filter(face => distancias[face] !== null);

    // Ordenando as faces visíveis pela distância do observador (decrescente).
    facesVisiveis.sort((a, b) => distancias[b] - distancias[a]);

    console.log("Faces Visiveis: ", facesVisiveis);

    // 3. Desenhar as faces na ordem correta (da mais distante para a mais próxima).
    for (let face of facesVisiveis) {
        let pontosConvertidos = converterFaceParaArray(faces[face]);
        desenharFace(pontosConvertidos); // Aqui entra a função de renderização.
    }
}

function converterFaceParaArray(face) {
    return Object.entries(face).map(([nome, ponto]) => ({
        nome, // Mantém o identificador do vértice (ex: "A", "B", "E").
        x: ponto.x,
        y: ponto.y
    }));
}





// --------------------------------------------------------------------------------------------------
// CANVAS PARA PLOTAR A CENA
// --------------------------------------------------------------------------------------------------

// Criando o canvas e adicionando ao body.
const canvas = document.createElement("canvas");
canvas.width = 800;  // Tamanho do viewport umax.
canvas.height = 600; // Tamanho do viewport vmax.
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

// Função para desenhar uma face e exibir rótulos dos vértices.
function desenharFace(pontos, cor = "rgba(0, 150, 255, 0.5)") {

    // Uma face precisa de pelo menos 3 pontos.
    if (pontos.length < 3) return;

    ctx.beginPath();
    ctx.moveTo(pontos[0].x, pontos[0].y);

    for (let i = 1; i < pontos.length; i++) {
        ctx.lineTo(pontos[i].x, pontos[i].y);
    }

    ctx.closePath();
    ctx.fillStyle = cor;
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();

    // Desenhar os rótulos nos vértices.
    pontos.forEach(ponto => desenharRotulo(ponto));
}

// Função para desenhar o rótulo ao lado de cada vértice.
function desenharRotulo(ponto) {
    ctx.fillStyle = "black"; // Cor do texto.
    ctx.font = "14px Arial"; // Fonte do texto.
    ctx.fillText(ponto.nome, ponto.x + 5, ponto.y - 5); // Posição do texto ajustada.
}





// --------------------------------------------------------------------------------------------------
// TESTANDO
// --------------------------------------------------------------------------------------------------

console.log("TESTANDO PIPELINE:");

// Matriz dos pontos das faces visiveis.
let matriz_faces_visiveis = [
    [21.2, 34.1, 5.9, 20],
    [0.7, 3.4, 2.9, 20.9],
    [42.3, 27.2, 29.7, 31.6],
    [1, 1, 1, 1]
]

// Convertendo os pontos SRU das faces visiveis para o SRT em projecao axonométrica.
let objeto_SRT = multiplyMatrices(M_SRU_SRT, matriz_faces_visiveis);

// Dividindo coordenadas Xsrt e Ysrt pelo fator homogeneo h.
for (let i = 0; i < objeto_SRT.length - 2; i++) {
    for (let j = 0; j < objeto_SRT.length; j++) {
        objeto_SRT[i][j] = objeto_SRT[i][j] / objeto_SRT[3][j];
    }
}

console.log("OBJETO EM PROJECAO AXONOMETRICA: ", objeto_SRT)


// Pontos das faces visiveis do objeto SRT.
let faces_visiveis_SRT = {
    ABE: { A: { x: objeto_SRT[0][0], y: objeto_SRT[1][0], z: objeto_SRT[2][0] }, B: { x: objeto_SRT[0][1], y: objeto_SRT[1][1], z: objeto_SRT[2][1] }, E: { x: objeto_SRT[0][3], y: objeto_SRT[1][3], z: objeto_SRT[2][3] } },
    DAE: { D: { x: objeto_SRT[0][2], y: objeto_SRT[1][2], z: objeto_SRT[2][2] }, A: { x: objeto_SRT[0][0], y: objeto_SRT[1][0], z: objeto_SRT[2][0] }, E: { x: objeto_SRT[0][3], y: objeto_SRT[1][3], z: objeto_SRT[2][3] } }
}

// Distancia das faces visiveis.
let distancias = {
    ABE: distancia_CO_VRP_ABE,
    DAE: distancia_CO_VRP_DAE
}

algoritmoDoPintor(faces_visiveis_SRT, distancias);