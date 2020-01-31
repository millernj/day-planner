let currentDate = moment();

const incrementCurrentDate = () => {
  currentDate.add(1, 'days');
}

const decrementCurrentDate = () => {
  currentDate.subtract(1, 'days');
}

const renderCurrentDate = () => {
  const currentTime = moment().format(', h:mm:ss.SS a');
  $('#current-date').text(
    currentDate.format('MMMM Do YYYY') + currentTime
  )
  updateClock();
}

const updateClock = () => {
  var now = moment(),
      second = now.seconds() * 6,
      minute = now.minutes() * 6 + second / 60,
      hour = ((now.hours() % 12) / 12) * 360 + 90 + minute / 12;

  $('#hour').css("transform", "rotate(" + hour + "deg)");
  $('#minute').css("transform", "rotate(" + minute + "deg)");
  $('#second').css("transform", "rotate(" + second + "deg)");
}

$(document).ready(
  setInterval(
    renderCurrentDate, 10
  )
)