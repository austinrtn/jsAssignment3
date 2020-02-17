var allStudents = [];

class Student {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
}

function getScores(){
  var scores = [];
  for (var i = 0; i < allStudents.length; i++)
    scores.push(parseFloat(allStudents[i].score));
  return scores;
}

function printTable(){
  let table = document.getElementById("studentTable");
  for(var i = 1;i<table.rows.length;){
            table.deleteRow(i);
        }

  for (var i = 0; i < allStudents.length; i++) {
    let row = table.insertRow(i+1);

    let nameCell = row.insertCell(0);
    nameCell.innerHTML=allStudents[i].name;

    let scoreCell = row.insertCell(1);
    scoreCell.innerHTML=allStudents[i].score;
  }
  if(allStudents.length > 0) updateStatsTable();
  saveTable();
}

function updateStatsTable(){
  let table = document.getElementById("statsTable");
  for(var i = 1;i<table.rows.length;){
            table.deleteRow(i);
    }

  let row = table.insertRow(1);

  let avgCell = row.insertCell(0);
  avgCell.innerHTML = getAvg();

  let lowestCell = row.insertCell(1);
  lowestCell.innerHTML = getLowest();

  let highestCell = row.insertCell(2);
  highestCell.innerHTML = getHighest();
}

function getAvg(){
  let avg = (getScores().reduce((a, b) => a + b, 0) / getScores().length);
  return avg;
}

function getLowest(){
  return Math.min(...getScores());
}

function getHighest(){
  return Math.max(...getScores());
}


function addStudent(){
  let name = $("#addName").val(), score = $("#addScore").val();
  if(name != "" && score !=""){
    allStudents.push(new Student(name, score));
    $("#addName").val("");
    $("#addScore").val("");
    printTable();
  }
  else alert("You are missing one or more fields.");
}

function saveTable(){
  let jsonStudents = JSON.stringify(allStudents);
  localStorage.setItem("allStudents", jsonStudents);
  return jsonStudents;
}

if(localStorage.getItem("allStuents") != null){
  allStuents = JSON.parse(localStorage.getItem("allStudents"));
}


printTable();
