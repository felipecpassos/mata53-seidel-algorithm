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
  
  var isAllOne = true;
  var i = 0;
  var verifyAllOne = function(adjacencyMatrix){
    // myDiv.innerHTML = "Verificando se o grafo é completo...";
    for (var i = 0; i < vertices.length; i++){
    // if( i < vertices.length ){
      vertices[i].addClass('highlighted');
      for (var j = 0; j < vertices.length; j++){
        if (isAllOne != false && i!=j){
          // setTimeout(verifyAllOne, 1000);
          if (adjacencyMatrix[i][j] != 1){
            isAllOne = false;
            // myDiv.innerHTML = "Grafo não é completo!";
            break;
          }
        }
      }
    }
  }

  

  async function seidel(adjacencyMatrix){
    console.log("delaying...");
    await delay(5000);
    myDiv.innerHTML = "Computando matrizes dos grafos quadrados...";
    myDiv.style.color = "red";

    var zMatrix = Array(vertices.length)
    for (var i = 0; i < vertices.length; i++){
      zMatrix[i] = new Array(vertices.length).fill(0);
    }

    var bMatrix = Array(vertices.length)
    for (var i = 0; i < vertices.length; i++){
      bMatrix[i] = new Array(vertices.length).fill(0);
    }

    //squareGraph();
    //calculate z
    for (var r = 0; r < vertices.length; ++r) {
      zMatrix[r] = new Array(vertices.length); // initialize the current row
      for (var c = 0; c < vertices.length; ++c) {
        zMatrix[r][c] = 0;             // initialize the current cell
        for (var i = 0; i < vertices.length; ++i) {
          zMatrix[r][c] += adjacencyMatrix[r][i] * adjacencyMatrix[i][c];
        }
      }
    }
    //calculate b
    for (var i = 0; i < adjacencyMatrix.length; i++){
      for (var j = 0; j < adjacencyMatrix.length; j++){
        if (i!=j &&(adjacencyMatrix[i][j] == 1 || zMatrix[i][j] > 0))
         bMatrix[i][j] = 1;
        else
         bMatrix[i][j] = 0;
      }
    }

    var auxBool = false;
    for (var i = 0; i < adjacencyMatrix.length; i++){
      for (var j = 0; j < adjacencyMatrix.length; j++){
        if(bMatrix[i][j] != 1 && i!=j){
          auxBool = true;
        }
      }
    }

    var d2Matrix = Array(vertices.length)
    for (var i = 0; i < vertices.length; i++){
      d2Matrix[i] = new Array(vertices.length).fill(0);
    }

    //if bij = 1 for all i!=j then return nxn matrix D = 2B - A
    if (auxBool == false){
      for (var i = 0; i < adjacencyMatrix.length; i++){
        for (var j = 0; j < adjacencyMatrix.length; j++){
          if(i!=j)
            d2Matrix[i][j] = 2;
        }
      }
  
      for (var i = 0; i < adjacencyMatrix.length; i++){
        for (var j = 0; j < adjacencyMatrix.length; j++){
          d2Matrix[i][j] = d2Matrix[i][j] - adjacencyMatrix[i][j];
        }
      }
      
      return d2Matrix;
    }

    var returnMatrix = Array(vertices.length)
    for (var i = 0; i < vertices.length; i++){
      returnMatrix[i] = new Array(vertices.length).fill(0);
    }

    deleteTable();
    createTable(bMatrix);

    returnMatrix = await seidel(bMatrix);

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
        if(i!=j){
          if ( xMatrix[i][j] >= (returnMatrix[i][j] * degree[j]) )
            dMatrix[i][j] = 2 * returnMatrix[i][j];
          else
            dMatrix[i][j] = (2 * returnMatrix[i][j]) - 1;                 
        }
      }
    }

    // createTable(dMatrix);
    return dMatrix;
    //then call seidel for squared graph

    //return statement
  }

  var start = async function() {
    for (var i = 0; i < vertices.length; i++){
      originalAdjacencyMatrix[i] = new Array(vertices.length).fill(0);
      // originalAdjacencyMatrix[i][i] = 1;
    }
    
    for (var i = 0; i < vertices.length; i++){
      var edges = cy.edges(`[source = '${vertices[i].id()}']`);
      for (var j = 0; j < edges.length; j++){
        originalAdjacencyMatrix[parseInt(edges[j].id()[0])][parseInt(edges[j].id()[1])] = 1;
        originalAdjacencyMatrix[parseInt(edges[j].id()[1])][parseInt(edges[j].id()[0])] = 1;
      }
    }

    var adjacencyMatrix = [];
    adjacencyMatrix = deepCopy(originalAdjacencyMatrix);
    // console.log("FINAL: ", seidel(adjacencyMatrix));
    myDiv.innerHTML = "Matriz de adjacencias original:";
    myDiv.style.color = "blue";
    var distanceMatrix = [];
    createTable(originalAdjacencyMatrix);
    distanceMatrix = await seidel(adjacencyMatrix);
    // myDiv.remove();
    await delay(2000);
    deleteTable();
    createTable(distanceMatrix);
    myDiv.innerHTML = "Matriz de distâncias calculada!";
    myDiv.style.color = "green";
  }

  start();


  function deleteTable(){
    var table = document.getElementById('table');
    table.remove();
  }

  function createTable(tableData) {
    var table = document.createElement('table');
    table.setAttribute("id", "table");
    var tableBody = document.createElement('tbody');
    tableBody.setAttribute("id", "tbody")
  
    tableData.forEach(function(rowData) {
      var row = document.createElement('tr');
  
      rowData.forEach(function(cellData) {
        var cell = document.createElement('td');
        cell.appendChild(document.createTextNode(cellData));
        row.appendChild(cell);
      });
  
      tableBody.appendChild(row);
    });
  
    table.appendChild(tableBody);
    document.body.appendChild(table);
  }
  
  