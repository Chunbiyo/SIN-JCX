from tulip import TulipClient

tulip_client = TulipClient(api_key="YourTulipAPIKey")

def manage_treasury(deposit_amount, yield_farm):
    try:
        deposit = tulip_client.deposit(deposit_amount, yield_farm)
        return deposit
    except Exception as e:
        print(f"Treasury management failed: {e}")