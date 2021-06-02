const delay = ms => new Promise(res => setTimeout(res, ms));

const deepCopy = (arr) => {
  let copy = [];
  arr.forEach(elem => {
    if(Array.isArray(elem)){
      copy.push(deepCopy(elem))
    }else{
        copy.push(elem)
    }
  })
  return copy;
}

function multiply(a, b) {
  var aNumRows = a.length, aNumCols = a[0].length,
      bNumRows = b.length, bNumCols = b[0].length,
      m = new Array(aNumRows);  // initialize array of rows
  for (var r = 0; r < aNumRows; ++r) {
    m[r] = new Array(bNumCols); // initialize the current row
    for (var c = 0; c < bNumCols; ++c) {
      m[r][c] = 0;             // initialize the current cell
      for (var i = 0; i < aNumCols; ++i) {
        console.log("testao", b[i][c]);
        m[r][c] += a[r][i] * b[i][c];
      }
    }
  }
  return m;
}

var cy = cytoscape({
    container: document.getElementById('cy'),
  
    boxSelectionEnabled: false,
    autounselectify: true,
  
    style: cytoscape.stylesheet()
      .selector('node')
        .style({
          'content': 'data(id)'
        })
      .selector('edge')
        .style({
          'curve-style': 'bezier',
          'target-arrow-shape': 'none',
          'width': 4,
          'line-color': '#ddd',
          'target-arrow-color': '#ddd'
        })
      .selector('.highlighted')
        .style({
          'background-color': '#61bffc',
          'line-color': '#61bffc',
          'target-arrow-color': '#61bffc',
          'transition-property': 'background-color, line-color, target-arrow-color',
          'transition-duration': '0.5s'
        }),
  
    elements: {
        nodes: [
          { data: { id: '0' } },
          { data: { id: '1' } },
          { data: { id: '2' } },
          { data: { id: '3' } },
          { data: { id: '4' } },
          { data: { id: '5' } },
          { data: { id: '6' } },
          { data: { id: '7' } },
          { data: { id: '8' } },
          { data: { id: '9' } },
        ],
  
        edges: [
          { data: { id: '01', source: '0', target: '1' } },
          { data: { id: '06', source: '0', target: '6' } },
          { data: { id: '07', source: '0', target: '7' } },
          { data: { id: '12', source: '1', target: '2' } },
          { data: { id: '56', source: '5', target: '6' } },
          { data: { id: '49', source: '4', target: '9' } },
          { data: { id: '23', source: '2', target: '3' } },
          { data: { id: '34', source: '3', target: '4' } },
          { data: { id: '45', source: '4', target: '5' } },
          { data: { id: '78', source: '7', target: '8' } },
          { data: { id: '89', source: '8', target: '9' } },
        ]
      },
  
    layout: {
      name: 'breadthfirst',
      directed: false,
      roots: '#0',
      padding: 10
    }
  });

  var myDiv = document.getElementById("divId");
  
  
  var vertices = cy.nodes();

  var originalAdjacencyMatrix = new Array(vertices.length);
  var bfsMatrix = [];
  var baseMatrix = [];
  
  // console.log("###", originalAdjacencyMatrix);

  var isAllOne = true;
  var i = 0;
  var verifyAllOne = function(adjacencyMatrix){
    myDiv.innerHTML = "Verificando se o grafo é completo...";
    for (var i = 0; i < vertices.length; i++){
    // if( i < vertices.length ){
      vertices[i].addClass('highlighted');
      // console.log("pulou!!!");
      for (var j = 0; j < vertices.length; j++){
        if (isAllOne != false && i!=j){
          // setTimeout(verifyAllOne, 1000);
          if (adjacencyMatrix[i][j] != 1){
            isAllOne = false;
            myDiv.innerHTML = "Grafo não é completo!";
            break;
          }
        }
        // console.log("&&&: ", i, " ", j);
      }
    }
  }

  

  function seidel(adjacencyMatrix){
    isAllOne = true;
    verifyAllOne(adjacencyMatrix);
    
    if (isAllOne)
      return adjacencyMatrix;
    myDiv.innerHTML = "Computando grafo quadrado...";

    // console.log("antes do squareGraph: ", adjacencyMatrix);
    
    var auxMatrix = Array(vertices.length)
    for (var i = 0; i < vertices.length; i++){
      auxMatrix[i] = new Array(vertices.length).fill(0);
    }

    var auxMatrix2 = Array(vertices.length)
    for (var i = 0; i < vertices.length; i++){
      auxMatrix2[i] = new Array(vertices.length).fill(0);
    }

    //squareGraph();

    // for (var r = 0; r < vertices.length; ++r) {
    //   auxMatrix[r] = new Array(vertices.length); // initialize the current row
    //   for (var c = 0; c < vertices.length; ++c) {
    //     auxMatrix[r][c] = 0;             // initialize the current cell
    //     for (var i = 0; i < vertices.length; ++i) {
    //       auxMatrix[r][c] += adjacencyMatrix[r][i] * adjacencyMatrix[i][c];
    //     }
    //   }
    // }

    // for (var i = 0; i < adjacencyMatrix.length; i++){
    //   for (var j = 0; j < adjacencyMatrix.length; j++){
    //     if (i!=j &&(adjacencyMatrix[i][j] == 1 || auxMatrix[i][j] > 0))
    //     auxMatrix2[i][j] = 1;
    //     else
    //     auxMatrix2[i][j] = 0;
    //   }
    // }
    // console.log("auxMatrix2: ", auxMatrix)

    for (var i = 0; i < adjacencyMatrix.length; i++){
      for (var j = 0; j < adjacencyMatrix.length; j++){
        if (adjacencyMatrix[i][j] == 1 && i!=j){
          // console.log("###: ",i, " ", j)
          for (var aux = 0; aux < adjacencyMatrix.length; aux++){
            if (adjacencyMatrix[i][aux] == 1){
              auxMatrix[j][aux] = 1;
            }
          }
          for (var aux = 0; aux < adjacencyMatrix.length; aux++){
            if (adjacencyMatrix[j][aux] == 1){
              auxMatrix[i][aux] = 1;
            }
          }
        }
      }
    }
    
    var returnMatrix = Array(vertices.length)
    for (var i = 0; i < vertices.length; i++){
      returnMatrix[i] = new Array(vertices.length).fill(0);
    }

    returnMatrix = seidel(auxMatrix);
    // console.log("return matrix: ",returnMatrix);

    var xMatrix = Array(vertices.length)
    for (var i = 0; i < vertices.length; i++){
      xMatrix[i] = new Array(vertices.length).fill(0);
    }

    //xMatrix = multiply([returnMatrix], [adjacencyMatrix]);
    for (var r = 0; r < vertices.length; ++r) {
      xMatrix[r] = new Array(vertices.length); // initialize the current row
      for (var c = 0; c < vertices.length; ++c) {
        xMatrix[r][c] = 0;             // initialize the current cell
        for (var i = 0; i < vertices.length; ++i) {
          xMatrix[r][c] += returnMatrix[r][i] * adjacencyMatrix[i][c];
        }
      }
    }


    var degree = Array(vertices.length).fill(0);
    for (var i = 0; i < vertices.length; i++){
      for (var j = 0; j < vertices.length; j++){
        if(adjacencyMatrix[i][j] == 1 && i != j)
          degree[i]++;
      }
    }

    var dMatrix = Array(vertices.length)
    for (var i = 0; i < vertices.length; i++){
      dMatrix[i] = new Array(vertices.length).fill(0);
    }

    
    for (var i = 0; i < vertices.length; i++){
      for (var j = 0; j < vertices.length; j++){
          if ( xMatrix[i][j] >= (returnMatrix[i][j] * degree[j]) )
            dMatrix[i][j] = 2 * returnMatrix[i][j];
          else
            dMatrix[i][j] = (2 * returnMatrix[i][j]) - 1;                 
      }
    }
    
    console.log("###return ", returnMatrix);
    console.log("###xMatrix ", xMatrix);
    console.log("###dmatrix ", dMatrix);


    return dMatrix;
    // console.log("depois do squareGraph: ", auxMatrix);
    //then call seidel for squared graph

    //return statement
  }

  var start = function() {
    for (var i = 0; i < vertices.length; i++){
      originalAdjacencyMatrix[i] = new Array(vertices.length).fill(0);
      // originalAdjacencyMatrix[i][i] = 1;
    }
    
    for (var i = 0; i < vertices.length; i++){
      // console.log("#oi", vertices[i].id())
      var edges = cy.edges(`[source = '${vertices[i].id()}']`);
      for (var j = 0; j < edges.length; j++){
        originalAdjacencyMatrix[parseInt(edges[j].id()[0])][parseInt(edges[j].id()[1])] = 1;
        originalAdjacencyMatrix[parseInt(edges[j].id()[1])][parseInt(edges[j].id()[0])] = 1;
      }
    }

    var adjacencyMatrix = [];
    adjacencyMatrix = deepCopy(originalAdjacencyMatrix);
    // console.log("original: ", originalAdjacencyMatrix)
    seidel(adjacencyMatrix);

  }

  start();