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
          { data: { id: '39', source: '3', target: '9' } },
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

  var originalAdjacencyMatrix = [];
  var adjacencyMatrix = [];
  var bfsMatrix = [];
  var baseMatrix = [];
  // var auxMatrix = [];

  for (var i = 0; i < vertices.length; i++){
    originalAdjacencyMatrix[i] = new Array(vertices.length).fill(0);
    originalAdjacencyMatrix[i][i] = 1;
    adjacencyMatrix = deepCopy(originalAdjacencyMatrix);
    bfsMatrix = deepCopy(originalAdjacencyMatrix);
    baseMatrix = deepCopy(originalAdjacencyMatrix);
    // auxMatrix = originalAdjacencyMatrix;
  }
  
  for (var i = 0; i < vertices.length; i++){
    // console.log("#oi", vertices[i].id())
    var edges = cy.edges(`[source = '${vertices[i].id()}']`);
    console.log("edges: ", edges)
    for (var j = 0; j < edges.length; j++){
      // console.log("### oi : ",edges[j].id());
      originalAdjacencyMatrix[parseInt(edges[j].id()[0])][parseInt(edges[j].id()[1])] = 1;
      originalAdjacencyMatrix[parseInt(edges[j].id()[1])][parseInt(edges[j].id()[0])] = 1;
      adjacencyMatrix[parseInt(edges[j].id()[0])][parseInt(edges[j].id()[1])] = 1;
      adjacencyMatrix[parseInt(edges[j].id()[1])][parseInt(edges[j].id()[0])] = 1;
    }
  }
  
  // console.log("###", originalAdjacencyMatrix);

  var isAllOne = true;
  var i = 0;
  var verifyAllOne = function(){
    myDiv.innerHTML = "Verificando se o grafo é completo...";
    if( i < vertices.length ){
      vertices[i].addClass('highlighted');
      // console.log("pulou!!!");
      for (var j = 0; j < vertices.length; j++){
        // console.log("&&&: ", i, " ", j);
        if (adjacencyMatrix[i][j] != 1){
          isAllOne = false;
          myDiv.innerHTML = "Grafo não é completo!";
          break;
        }
      }
      i++;
      if (isAllOne != false){
        setTimeout(verifyAllOne, 1000);
      }
    }
  }

  // async function squareGraph(){
  //   // await delay(4000);
  //   // var auxMatrix2 = deepCopy(adjacencyMatrix);
  //   // console.log("auxmatrix2: ", auxMatrix2);
  //   // await delay(2000);
  //   //precisamos checar cada possivel aresta do grafo, e adicionamos os adjacentes a cada um dos endpoints das arestas à adjacencia
  //   for (var i = 0; i < vertices.length; i++){
  //     for (var j = 0; j < vertices.length; j++){
  //       if (adjacencyMatrix[i][j] == 1 && i != j){
  //         console.log("###: ",i, " ", j, adjacencyMatrix[i][j])
  //         for (var aux = 0; aux < vertices.length; aux++){
  //           if (adjacencyMatrix[i][aux] == 1)
  //             adjacencyMatrix[j][aux] = 1;
  //         }
  //         for (var aux = 0; aux < vertices.length; aux++){
  //           if (adjacencyMatrix[j][aux] == 1)
  //             adjacencyMatrix[i][aux] = 1;
  //         }
  //       }
  //     }
  //   }
  //   // console.log("auxmatrix2: ", auxMatrix2);
  //   // return auxMatrix2;
  // }

  

  function seidel(){
    isAllOne = true;
    i = 0;
    // var auxMatrix = adjacencyMatrix;
    // console.log("adj: ", auxMatrix)
    // verifyAllOne();
    //if isAllOne != true
    myDiv.innerHTML = "Computando grafo quadrado...";
    auxMatrix = adjacencyMatrix;

    console.log("antes do squareGraph: ", adjacencyMatrix);
    
    //squareGraph();
    for (var i = 0; i < adjacencyMatrix.length; i++){
      for (var j = 0; j < adjacencyMatrix.length; j++){
        if (adjacencyMatrix[i][j] == 1){
          // console.log("###: ",i, " ", j, adjacencyMatrix[i][j])
          for (var aux = 0; aux < adjacencyMatrix.length; aux++){
            if (adjacencyMatrix[i][aux] == 1){
              adjacencyMatrix[j][aux] = 1;
            }
          }
          for (var aux = 0; aux < adjacencyMatrix.length; aux++){
            if (adjacencyMatrix[j][aux] == 1){
              adjacencyMatrix[i][aux] = 1;
            }
          }
        }
      }
    }
    
    console.log("depois do squareGraph: ", adjacencyMatrix);
    //then call seidel for squared graph
    console.log("### TESTISSIMO: ", isAllOne)


    //
    //return statement
  }



  seidel();