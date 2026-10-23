import uuid
from datetime import datetime, timedelta

from ..data.destinations import find_destination
from ..data.activities import filter_activities, get_activities_for_destination
from .budget_service import calculate_budget


_trips_store: dict[str, dict] = {}


def generate_trip(request_data: dict) -> dict:
    destination = request_data["destination"]
    start = datetime.strptime(request_data["startDate"], "%Y-%m-%d")
    end = datetime.strptime(request_data["endDate"], "%Y-%m-%d")
    days_count = max(1, (end - start).days + 1)
    travelers = request_data.get("travelers", 2)
    interests = request_data.get("interests", [])
    travel_style = request_data.get("travelStyle", "moderate")
    accommodation = request_data.get("accommodation", "hotel")
    transportation = request_data.get("transportation", "mixed")
    total_budget = float(request_data.get("budget", 0))
    currency = request_data.get("currency", "USD")

    dest_info = find_destination(destination)
    dest_key = _destination_key(destination)
    activities = filter_activities(dest_key, interests)

    if not activities:
        activities = _generic_activities(destination, days_count)

    days = _build_days(start, days_count, activities, travel_style, destination)

    activity_costs = sum(
        a["estimatedCost"]
        for day in days
        for a in day["activities"]
        if a["estimatedCost"]
    )

    budget = calculate_budget(
        destination=destination,
        days=days_count,
        travelers=travelers,
        accommodation=accommodation,
        transportation=transportation,
        travel_style=travel_style,
        currency=currency,
        total_budget=total_budget,
        activity_costs=activity_costs * travelers,
    )

    trip_id = f"trip_{uuid.uuid4().hex[:12]}"

    trip = {
        "id": trip_id,
        "destination": dest_info["name"] if dest_info else destination,
        "startDate": request_data["startDate"],
        "endDate": request_data["endDate"],
        "travelers": travelers,
        "travelStyle": travel_style,
        "interests": interests,
        "days": days,
        "budget": budget,
        "notes": _build_notes(dest_info, travel_style),
        "dataSource": "sample",
    }

    _trips_store[trip_id] = trip
    return trip


def get_trip(trip_id: str) -> dict | None:
    return _trips_store.get(trip_id)


def _destination_key(destination: str) -> str:
    d = destination.lower().strip()
    keys = {
        "kyoto": "kyoto", "japan": "kyoto",
        "bali": "bali", "indonesia": "bali",
        "paris": "paris", "france": "paris",
        "london": "london", "united kingdom": "london", "uk": "london",
        "marrakech": "marrakech", "morocco": "marrakech",
        "amalfi": "amalfi", "italy": "amalfi",
    }
    for keyword, key in keys.items():
        if keyword in d:
            return key
    return ""


def _build_days(
    start: datetime,
    num_days: int,
    activities: list[dict],
    style: str,
    destination: str,
) -> list[dict]:
    acts_per_day = {"relaxed": 3, "moderate": 4, "active": 5, "adventure": 5}.get(
        style, 4
    )
    time_slots = ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00"]

    days = []
    act_idx = 0
    for i in range(num_days):
        date = start + timedelta(days=i)
        day_acts = []

        for j in range(min(acts_per_day, len(time_slots))):
            if act_idx < len(activities):
                act = activities[act_idx].copy()
                act_idx += 1
            else:
                act_idx = 0
                act = activities[act_idx % len(activities)].copy() if activities else _placeholder_activity(destination, j)
                act_idx += 1

            act["time"] = time_slots[j]
            day_acts.append({
                "time": act["time"],
                "name": act["name"],
                "description": act["description"],
                "location": act.get("location", destination),
                "duration": act.get("duration", "1-2 hours"),
                "estimatedCost": act.get("estimatedCost", 0),
                "category": act.get("category", "sightseeing"),
            })

        if i == 0:
            title = f"Arrival & First Impressions"
        elif i == num_days - 1:
            title = f"Final Day & Departure"
        else:
            cats = list({a["category"] for a in day_acts})
            title = " & ".join(c.title() for c in cats[:2]) if cats else f"Day {i + 1}"

        days.append({
            "dayNumber": i + 1,
            "date": date.strftime("%Y-%m-%d"),
            "title": title,
            "activities": day_acts,
        })

    return days


def _placeholder_activity(destination: str, index: int) -> dict:
    placeholders = [
        {"name": "Morning Exploration", "description": f"Explore the local sights of {destination}.", "category": "sightseeing"},
        {"name": "Local Cuisine Experience", "description": "Sample local dishes at a recommended restaurant.", "category": "food"},
        {"name": "Cultural Visit", "description": "Visit a notable cultural site or museum.", "category": "culture"},
        {"name": "Afternoon Stroll", "description": "Walk through a scenic area and take in the atmosphere.", "category": "relaxation"},
        {"name": "Evening Entertainment", "description": "Enjoy the local evening scene.", "category": "nightlife"},
    ]
    p = placeholders[index % len(placeholders)]
    return {
        **p,
        "location": destination,
        "duration": "1-2 hours",
        "estimatedCost": 10,
        "interests": [],
        "timeOfDay": "morning",
    }


def _build_notes(dest_info: dict | None, style: str) -> list[str]:
    notes = ["All prices are estimates based on sample data — actual costs may vary."]
    if dest_info:
        notes.append(f"Best time to visit: {dest_info.get('best_season', 'year-round')}.")
    notes.append(
        "This itinerary was generated from a curated sample dataset, not live booking data."
    )
    if style == "adventure":
        notes.append("Some adventure activities may require advance booking or fitness preparation.")
    return notes
