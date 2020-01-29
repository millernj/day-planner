$(document).ready(
  setInterval(
    renderDate, 10
  )
)


function renderDate () {
  $('#current-date').text(
    moment().format('MMMM Do YYYY, h:mm:ss.SS a')
  )
  updateClock();
}

function updateClock(){
  var now = moment(),
      second = now.seconds() * 6,
      minute = now.minutes() * 6 + second / 60,
      hour = ((now.hours() % 12) / 12) * 360 + 90 + minute / 12;

  $('#hour').css("transform", "rotate(" + hour + "deg)");
  $('#minute').css("transform", "rotate(" + minute + "deg)");
  $('#second').css("transform", "rotate(" + second + "deg)");
}