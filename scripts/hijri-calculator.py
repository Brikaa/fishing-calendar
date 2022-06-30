import calendar
from hijri_converter import Hijri, Gregorian
import json

dates = {}
for year in range(2022, 2077):
    year_dates = {}
    for month in range(1, 13):
        month_dates = []
        for day in range(1, calendar.monthrange(year, month)[1] + 1):
            hijri = Gregorian(year, month, day).to_hijri()
            gregorian = f'{year}-{month}-{day}'
            month_dates.append({ 'gregorian': gregorian, 'hijri': str(hijri) })
        year_dates[month] = month_dates
    dates[year] = year_dates

print(json.dumps(dates))
