$(document).ready(
  setInterval(
    renderDate, 10
  )
)


function renderDate () {
  $('#current-date').text(
    moment().format('MMMM Do YYYY, h:mm:ss.SS a')
  )
}