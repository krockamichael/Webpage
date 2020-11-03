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

  var sections_for_meetings_alone = 2
  for (i = 1; i <= sections_for_meetings_alone; i++) {
      let x = document.getElementById("meet_alone_" + i.toString());
      x.style.display = "block";
  }
}

function onlyTogether() {
  var elements = document.getElementsByClassName("gallery3");
  for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
  }

  var sections_for_meetings_together = 2
  for (i = 1; i <= sections_for_meetings_together; i++) {
      let x = document.getElementById("meet_together_" + i.toString());
      x.style.display = "block";
  }
}