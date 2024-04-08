var dt = new Date();
function renderDate() {
    dt.setDate(1);
    var day = dt.getDay();
    var today = new Date();
    var endDate = new Date(
        dt.getFullYear(),
        dt.getMonth() + 1,
        0
    ).getDate();
    var prevDate = new Date(
        dt.getFullYear(),
        dt.getMonth(),
        0
    ).getDate();
    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]
    document.getElementById("month").innerHTML = months[dt.getMonth()];
    document.getElementById("date_str").innerHTML = dt.toDateString();
    var cells = "";
    for (x = day; x > 0; x--) {
        cells += "<div class='prev_date'>" + (prevDate - x + 1) + "</div>";
    }
    console.log(day);
    for (i = 1; i <= endDate; i++) {
        if (i == today.getDate() && dt.getMonth() == today.getMonth()) cells += "<div name='dt' class='today'>" + i + "</div>";
        else 
            cells += `<div name='dt' data-date='${dt.getFullYear()}:${dt.getMonth()+1}:${i}'>${i}</div>`;
    }
    document.getElementsByClassName("days")[0].innerHTML = cells;

}

function moveDate(para) {
    if (para == "prev") {
        dt.setMonth(dt.getMonth() - 1);
    } else if (para == 'next') {
        dt.setMonth(dt.getMonth() + 1);
    }
    renderDate();
}

setTimeout(() => {
    const dateContainer = document.getElementsByName('dt');
    const dateModal = new bootstrap.Modal(document.getElementById('dateModal'));
    const txtBox = document.getElementById('txtBox');
    dateContainer.forEach((dt) => {
        dt.addEventListener('click', (e)=> {
            let dateOfEle = (e.target.dataset.date).split(':');
            dateOfEle = `${dateOfEle[0]}-${dateOfEle[1]}-${dateOfEle[2]}`;
            console.log(dateOfEle)
            fetch(`get_data.php?date=${dateOfEle}`).then(res=>res.text())
            .then(res => {
                txtBox.value = res;
                console.log(res);
            })
            dateModal.show();
            if(!dt.contains(e.target)){
                dateModal.hide();
            }
        })
    })
}, 2000);
