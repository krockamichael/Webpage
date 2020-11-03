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

  var sections_for_team_meetings = 2
  for (i = 1; i <= sections_for_team_meetings; i++) {
      let x = document.getElementById("team_meet_" + i.toString());
      x.style.display = "block";
  }
}

function onlyTogether() {
  var elements = document.getElementsByClassName("gallery3");
  for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
  }

  var sections_for_boss_meetings = 2
  for (i = 1; i <= sections_for_boss_meetings; i++) {
      let x = document.getElementById("boss_meet_" + i.toString());
      x.style.display = "block";
  }
}