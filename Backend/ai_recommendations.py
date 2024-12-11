from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def recommend_tasks(user_interests, tasks):
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([user_interests] + tasks)
    similarities = cosine_similarity(vectors[0:1], vectors[1:])
    recommendations = sorted(
        [(tasks[i], similarity) for i, similarity in enumerate(similarities[0])],
        key=lambda x: -x[1],
    )
	    return recommendations[:5]