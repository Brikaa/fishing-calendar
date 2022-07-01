(async () => {
    const SPRING_DAYS = [12, 13, 14, 15, 16, 17, 18, 27, 28, 29, 30, 1, 2, 3, 4];

    const GREGORIAN_MONTHS = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    const HIJRI_MONTHS = [
        'Muḥarram',
        'Ṣafar',
        'Rabīʿ al-Awwal',
        'Rabīʿ al-Thānī',
        'Jumādā al-Awwal',
        'Jumādā al-Thānī',
        'Rajab',
        'Shaʿbān',
        'Ramaḍān ',
        'Shawwāl',
        'Dhū al-Qaʿdah',
        'Dhū al-Ḥijjah'
    ];

    const ELEMENTS = {
        year_selector: document.getElementById('year-selector'),
        calendar_area: document.getElementById('calendar-area'),
        loading_area: document.getElementById('loading-area'),
        month_selector: document.getElementById('month-selector')
    };

    ELEMENTS.loading_area.removeAttribute('hidden');
    const calendar_res = await fetch('/resources/calendar.json');
    const calendar = await calendar_res.json();
    ELEMENTS.loading_area.setAttribute('hidden', 'true');

    for (const year in calendar) {
        const option = document.createElement('option');
        option.setAttribute('value', year);
        option.innerText = year;
        ELEMENTS.year_selector.appendChild(option);
    }

    GREGORIAN_MONTHS.forEach((month, i) => {
        const option = document.createElement('option');
        option.setAttribute('value', i + 1);
        option.innerText = month;
        ELEMENTS.month_selector.appendChild(option);
    });

    ELEMENTS.year_selector.addEventListener('change', (e) => {
        ELEMENTS.calendar_area.innerHTML = '';
        const year = e.target.value;
        const selected_month = ELEMENTS.month_selector.value;
        const all_months =
            selected_month === 'all' ? calendar[year] : { [selected_month]: calendar[year][selected_month] };
        for (const month in all_months) {
            const month_element = document.createElement('h3');
            month_element.innerText = GREGORIAN_MONTHS[parseInt(month) - 1];
            ELEMENTS.calendar_area.appendChild(month_element);

            const table = document.createElement('table');
            let row;
            calendar[year][month].forEach((day_date, i) => {
                if (i % 7 === 0 || i % 28 === 0) {
                    row = document.createElement('tr');
                    table.appendChild(row);
                }
                const cell = document.createElement('td');
                const gregorian_day = parseInt(day_date.gregorian.split('-')[2]);
                const [hijri_year, hijri_month, hijri_day] = day_date.hijri
                    .split('-')
                    .map((x) => parseInt(x));

                if (SPRING_DAYS.includes(hijri_day)) {
                    cell.classList.add('spring');
                } else {
                    cell.classList.add('neap');
                }

                const hijri_month_str =
                    hijri_day === 1 || i === 0
                        ? `${HIJRI_MONTHS[hijri_month - 1]}, ${hijri_year}`
                        : '';

                if (!month_element.innerText.includes(hijri_month_str)) {
                    month_element.innerText += ` - ${hijri_month_str}`;
                }

                cell.innerText = `${gregorian_day} (${hijri_day})`;
                row.appendChild(cell);
            });
            ELEMENTS.calendar_area.appendChild(table);
        }
    });
})();
