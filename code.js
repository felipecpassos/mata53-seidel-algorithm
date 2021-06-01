const delay = ms => new Promise(res => setTimeout(res, ms));

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
          { data: { id: '4' } }
        ],
  
        edges: [
          { data: { id: '04', source: '0', target: '4' } },
          { data: { id: '01', source: '0', target: '1' } },
          { data: { id: '14', source: '1', target: '4' } },
          { data: { id: '12', source: '1', target: '2' } },
          { data: { id: '24', source: '2', target: '4' } },
          { data: { id: '23', source: '2', target: '3' } },
          { data: { id: '34', source: '3', target: '4' } }
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

  var adjacencyMatrix = [];
  var auxMatrix = [];

  for (var i = 0; i < vertices.length; i++){
    adjacencyMatrix[i] = new Array(vertices.length).fill(0);
    adjacencyMatrix[i][i] = 1;
    auxMatrix = adjacencyMatrix;
  }
  
  for (var i = 0; i < vertices.length; i++){
    // console.log("#oi", vertices[i].id())
    var edges = cy.edges(`[source = '${vertices[i].id()}']`);
    for (var j = 0; j < edges.length; j++){
      // console.log("### oi : ",edges[j].id());
      adjacencyMatrix[parseInt(edges[j].id()[0])][parseInt(edges[j].id()[1])] = 1;
      adjacencyMatrix[parseInt(edges[j].id()[1])][parseInt(edges[j].id()[0])] = 1;
    }
  }
  
  console.log("###", adjacencyMatrix);

  var isAllOne = true;
  var i = 0;
  var verifyAllOne = function(){
    myDiv.innerHTML = "Verificando se o grafo é completo...";
    if( i < vertices.length ){
      vertices[i].addClass('highlighted');
      console.log("pulou!!!");
      for (var j = 0; j < vertices.length; j++){
        console.log("&&&: ", i, " ", j);
        if (auxMatrix[i][j] != 1){
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

  var squareGraph = async function(){
    //roda bfs para todo vértice v, e adiciona à lista de adjacencia os vértices que possuam distancia 2 a v
    
  }

  var seidel = async function(){
    isAllOne = true;
    i = 0;
    auxMatrix = adjacencyMatrix;
    console.log("adj: ", auxMatrix)
    verifyAllOne();
    await delay(4000);
    //if isAllOne != true
    myDiv.innerHTML = "Computando grafo quadrado...";
    auxMatrix = adjacencyMatrix;
    squareGraph();
    console.log("### TESTISSIMO: ", isAllOne)
  }
  
  seidel();

  // var bfs = cy.elements().bfs('#0', function(){}, true);
  
  // // console.log("###", cy.nodes());
  // // console.log("###2", cy.edges("[source = 'a']"));

  // var i = 0;
  // var highlightNextEle = function(){
  //   if( i < vertices.length ){
  //     vertices[i].addClass('highlighted');
  
  //     i++;
  //     setTimeout(highlightNextEle, 1000);
  //   }
  // };
  
  // // kick off first highlight
  // highlightNextEle();
  