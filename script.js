let currentDate = moment();

const incrementCurrentDate = () => {
  currentDate.add(1, 'days');
  renderHours();
}

const decrementCurrentDate = () => {
  currentDate.subtract(1, 'days');
  renderHours();
}

const renderCurrentDate = () => {
  const currentTime = moment().format(', h:mm:ss.SS a');
  $('#current-date').text(
    currentDate.format('dddd, MMMM Do YYYY') + currentTime
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

const renderHours = () => {
  $('#scheduler').empty();
  for (let i = 9; i < 18; i++) {
    $('#scheduler').append(buildHourContainer(currentDate.hour(i)))
  }
}

const buildHourContainer = (datetime) => {

  const hourString = datetime.format('h a');
  const hourId = datetime.format('MM_DD_Y_HH');

  const activity = localStorage.getItem(hourId);
  const hourContainer = $('<li>');
  hourContainer.addClass('row hour-container');

  const hourLabel = $('<h5>');
  hourLabel.text(hourString);
  hourLabel.addClass('col-2 hour-label');
  
  const activityForm = $(`<form id="${hourString}-form"></form>`);
  const activityInput = $(`<input type="text" data-id="${hourId}">`);
  
  const activityButton = $(`<button type="submit" form="${hourString}-form"></button>`);
  const saveIcon = $('<i>');
  saveIcon.addClass('far fa-save');
  saveIcon.attr('aria-hidden', true);

  if (activity) {
    activityInput.val(activity);
  }

  activityForm.addClass('col-10');
  activityForm.submit((event) => {
    event.preventDefault();
    const activity = activityInput.val().trim();
    localStorage.setItem(hourId, activity);
  });

  activityButton.addClass('btn btn-dark');
  activityButton.css({'outline': 'none', 'border': 'none'});
  activityButton.append(saveIcon);

  activityForm.append(activityInput, activityButton);
  hourContainer.append(hourLabel, activityForm);
  

  const inputHour = datetime.hour();
  const inputYear = datetime.year();
  const inputDayOfYear = datetime.dayOfYear();
  const currentHour = moment().hour();
  const currentYear = moment().year();
  const currentDayOfYear = moment().dayOfYear();

  console.log({inputHour, inputYear, inputDayOfYear})
  console.log({currentHour, currentYear, currentDayOfYear})
  if (inputYear > currentYear || inputDayOfYear > currentDayOfYear) {
    hourContainer.addClass('future-hour');
  } else if (inputYear < currentYear || inputDayOfYear < currentDayOfYear) {
    hourContainer.addClass('past-hour');
  } else {
    if (inputHour === currentHour) {
      hourContainer.addClass('active-hour');
    } 
    if (inputHour < currentHour) {
      hourContainer.addClass('past-hour');
    }
    if (inputHour > currentHour) {
      hourContainer.addClass('future-hour');
    }
  }

  return hourContainer;
}



$(document).ready(() => {
  setInterval(
    renderCurrentDate, 10
  )
  renderHours();
});