function reply_click(clickedID) {
    let residents = clickedID.split(",");

    for (let i = 0; i < residents.length; i++) {
        $.getJSON(residents[i], function (response) {

            console.log(response);
        });
    }
}



