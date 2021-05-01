function onlySprints() {
  var elements = document.getElementsByClassName("gallery3");
  for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
  }

  let x = document.getElementById("sprints");
  x.style.display = "block";
}

function onlyAlone() {
  var elements = document.getElementsByClassName("gallery3");
  for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
  }

  let x = document.getElementById("team_meet");
  x.style.display = "block";
}

function onlyTogether() {
  var elements = document.getElementsByClassName("gallery3");
  for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
  }

  let x = document.getElementById("boss_meet");
  x.style.display = "block";
}