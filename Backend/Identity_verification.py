from civic_sip import CivicSip

civic_client = CivicSip(your_api_key="YourCivicAPIKeyHere")

def verify_identity(jwt_token):
    try:
        verification_response = civic_client.verify(jwt_token)
        return verification_response
    except Exception as e:
        print(f"Identity verification failed: {e}")
	        return None