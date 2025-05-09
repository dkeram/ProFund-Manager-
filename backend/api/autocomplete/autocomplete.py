import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def vat_proxy(request, vat_number):
    external_url = f"https://opendata-api.businessportal.gr/api/opendata/v1/companies?afm={vat_number}-H'api_key:TyYDMbKjEdKR18krtDEUbet0DkoAo43f'"
    
    try:
        response = requests.get(external_url)

        if response.status_code == 200:
            return JsonResponse(response.json(), safe=False)
        else:
            return JsonResponse({'error': 'Failed to fetch VAT data from external API'}, status=response.status_code)
    
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
