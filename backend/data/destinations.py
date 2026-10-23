DESTINATIONS = {
    "kyoto": {
        "name": "Kyoto, Japan",
        "country": "Japan",
        "region": "East Asia",
        "description": (
            "Japan's cultural capital, home to over 2,000 temples and shrines, "
            "traditional tea houses, zen gardens, and one of the world's most "
            "refined culinary scenes."
        ),
        "highlights": [
            "Ancient temples and shrines",
            "Traditional geisha districts",
            "Zen rock gardens",
            "Cherry blossom season",
            "Kaiseki cuisine",
        ],
        "best_season": "Spring (March-May) and Autumn (October-November)",
        "accommodation_cost": {
            "budget": 35,
            "hotel": 110,
            "boutique": 200,
            "luxury": 450,
            "apartment": 75,
        },
        "food_cost": {"budget": 20, "moderate": 45, "luxury": 120},
        "transport_cost": {"public": 12, "rental": 65, "mixed": 30, "walking": 3},
        "interests": ["culture", "history", "food", "nature", "art", "photography"],
    },
    "bali": {
        "name": "Bali, Indonesia",
        "country": "Indonesia",
        "region": "Southeast Asia",
        "description": (
            "A tropical paradise known for lush rice terraces, ancient Hindu "
            "temples, world-class surf breaks, and a vibrant wellness scene."
        ),
        "highlights": [
            "Rice terrace trekking",
            "Hindu water temples",
            "Surf and beach culture",
            "Ubud art market",
            "Sunset at Tanah Lot",
        ],
        "best_season": "April-October (dry season)",
        "accommodation_cost": {
            "budget": 15,
            "hotel": 60,
            "boutique": 130,
            "luxury": 350,
            "apartment": 40,
        },
        "food_cost": {"budget": 8, "moderate": 20, "luxury": 65},
        "transport_cost": {"public": 5, "rental": 20, "mixed": 12, "walking": 2},
        "interests": [
            "nature",
            "adventure",
            "relaxation",
            "culture",
            "food",
            "photography",
        ],
    },
    "paris": {
        "name": "Paris, France",
        "country": "France",
        "region": "Western Europe",
        "description": (
            "The City of Light, celebrated for world-class museums, romantic "
            "boulevards, iconic architecture, and an unmatched cafe culture."
        ),
        "highlights": [
            "The Louvre and Musee d'Orsay",
            "Eiffel Tower views",
            "Montmartre artists' quarter",
            "Seine river walks",
            "Patisseries and bistros",
        ],
        "best_season": "April-June and September-October",
        "accommodation_cost": {
            "budget": 50,
            "hotel": 160,
            "boutique": 280,
            "luxury": 600,
            "apartment": 100,
        },
        "food_cost": {"budget": 25, "moderate": 55, "luxury": 150},
        "transport_cost": {"public": 10, "rental": 50, "mixed": 25, "walking": 2},
        "interests": ["art", "culture", "food", "history", "shopping", "photography"],
    },
    "london": {
        "name": "London, United Kingdom",
        "country": "United Kingdom",
        "region": "Western Europe",
        "description": (
            "A global metropolis blending centuries of history with cutting-edge "
            "culture, world-famous museums, royal palaces, and diverse neighborhoods."
        ),
        "highlights": [
            "British Museum (free entry)",
            "Tower of London",
            "West End theatre",
            "Borough Market",
            "Hyde Park and Kensington Gardens",
        ],
        "best_season": "May-September",
        "accommodation_cost": {
            "budget": 45,
            "hotel": 150,
            "boutique": 260,
            "luxury": 550,
            "apartment": 95,
        },
        "food_cost": {"budget": 22, "moderate": 50, "luxury": 130},
        "transport_cost": {"public": 15, "rental": 55, "mixed": 28, "walking": 3},
        "interests": [
            "history",
            "culture",
            "art",
            "food",
            "shopping",
            "nightlife",
        ],
    },
    "marrakech": {
        "name": "Marrakech, Morocco",
        "country": "Morocco",
        "region": "North Africa",
        "description": (
            "A sensory feast of spice-scented souks, ornate palaces, vibrant "
            "Jemaa el-Fnaa square, and the backdrop of the Atlas Mountains."
        ),
        "highlights": [
            "Jemaa el-Fnaa night market",
            "Bahia Palace",
            "Majorelle Garden",
            "Atlas Mountains day trip",
            "Traditional hammam",
        ],
        "best_season": "March-May and September-November",
        "accommodation_cost": {
            "budget": 15,
            "hotel": 50,
            "boutique": 120,
            "luxury": 300,
            "apartment": 35,
        },
        "food_cost": {"budget": 8, "moderate": 18, "luxury": 55},
        "transport_cost": {"public": 3, "rental": 25, "mixed": 10, "walking": 1},
        "interests": [
            "culture",
            "food",
            "shopping",
            "history",
            "adventure",
            "photography",
        ],
    },
    "amalfi": {
        "name": "Amalfi Coast, Italy",
        "country": "Italy",
        "region": "Southern Europe",
        "description": (
            "A stunning stretch of Mediterranean coastline with pastel cliff-side "
            "villages, lemon groves, turquoise waters, and exceptional Italian cuisine."
        ),
        "highlights": [
            "Positano village views",
            "Path of the Gods hike",
            "Ravello gardens",
            "Fresh seafood dining",
            "Boat tours along the coast",
        ],
        "best_season": "May-September",
        "accommodation_cost": {
            "budget": 40,
            "hotel": 140,
            "boutique": 250,
            "luxury": 500,
            "apartment": 90,
        },
        "food_cost": {"budget": 20, "moderate": 45, "luxury": 110},
        "transport_cost": {"public": 8, "rental": 45, "mixed": 22, "walking": 2},
        "interests": [
            "nature",
            "food",
            "relaxation",
            "photography",
            "adventure",
            "culture",
        ],
    },
}


def find_destination(query: str) -> dict | None:
    q = query.lower().strip()
    for key, dest in DESTINATIONS.items():
        if key in q or dest["name"].lower() in q or dest["country"].lower() in q:
            return dest
    for key, dest in DESTINATIONS.items():
        if any(w in q for w in key.split()) or any(
            w in q for w in dest["name"].lower().split(",")
        ):
            return dest
    return None


def search_by_interests(interests: list[str], region: str = "") -> list[dict]:
    results = []
    for dest in DESTINATIONS.values():
        score = len(set(i.lower() for i in interests) & set(dest["interests"]))
        if region and region.lower() not in dest["region"].lower():
            continue
        if score > 0:
            results.append({**dest, "_score": score})
    results.sort(key=lambda d: d["_score"], reverse=True)
    for r in results:
        r.pop("_score", None)
    return results
