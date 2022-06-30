import calendar
from hijri_converter import Hijri, Gregorian
import json

dates = []
for year in range(2022, 2077):
    for month in range(1, 13):
        for day in range(1, calendar.monthrange(year, month)[1] + 1):
            hijri = Gregorian(year, month, day).to_hijri()
            gregorian = f'{year}-{month}-{day}'
            dates.append({ 'gregorian': gregorian, 'hijri': str(hijri) })

print(json.dumps(dates))
