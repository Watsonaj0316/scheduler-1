$(function() {
    // Function to display the current date
    function displayCurrentDate() {
        var currentDate = dayjs().format('dddd, MMMM D');
        $('#currentDay').text(currentDate);
    }

    // Function to save entered events in local storage
    $('.saveBtn').on('click', function() {
        var timeBlockId = $(this).closest('.time-block').attr('id');
        var eventDescription = $(this).siblings('.description').val();
        localStorage.setItem(timeBlockId, eventDescription);
    });

    // Function to update time block colors based on the current time
    function updateTimeBlockColors() {
        var currentHour = dayjs().hour();

        $('.time-block').each(function() {
            var blockHour = parseInt($(this).attr('id').split('-')[1]);

            if (blockHour < currentHour) {
                $(this).addClass('past').removeClass('present future');
            } else if (blockHour === currentHour) {
                $(this).addClass('present').removeClass('past future');
            } else {
                $(this).addClass('future').removeClass('past present');
            }
        });
    }

    // Function to retrieve and display saved events from local storage
    function displaySavedEvents() {
        $('.time-block').each(function() {
            var timeBlockId = $(this).attr('id');
            var savedEvent = localStorage.getItem(timeBlockId);

            if (savedEvent) {
                $(this).find('.description').val(savedEvent);
            }
        });
    }

    // Call necessary functions when the page is loaded
    displayCurrentDate();
    updateTimeBlockColors();
    displaySavedEvents();

    // Update time block colors every minute
    setInterval(updateTimeBlockColors, 60000);
});
