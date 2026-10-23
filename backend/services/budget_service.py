import math
from ..data.destinations import find_destination


def calculate_budget(
    destination: str,
    days: int,
    travelers: int,
    accommodation: str = "hotel",
    transportation: str = "mixed",
    travel_style: str = "moderate",
    currency: str = "USD",
    total_budget: float = 0,
    activity_costs: float = 0,
) -> dict:
    dest = find_destination(destination)

    if dest:
        accom_nightly = dest["accommodation_cost"].get(accommodation, 100)
        food_daily = dest["food_cost"].get(
            _style_to_food_tier(travel_style), 40
        )
        transport_daily = dest["transport_cost"].get(transportation, 25)
    else:
        accom_nightly = {"budget": 30, "hotel": 100, "boutique": 180, "luxury": 400, "apartment": 70}.get(accommodation, 100)
        food_daily = {"budget": 15, "moderate": 40, "luxury": 100}.get(
            _style_to_food_tier(travel_style), 40
        )
        transport_daily = {"public": 10, "rental": 50, "mixed": 25, "walking": 3}.get(transportation, 25)

    rooms = math.ceil(travelers / 2)
    accommodation_total = accom_nightly * days * rooms
    food_total = food_daily * days * travelers
    transport_total = transport_daily * days * travelers
    activities_total = activity_costs if activity_costs > 0 else days * travelers * 15
    other_total = round(
        (accommodation_total + food_total + transport_total) * 0.1
    )

    total_estimated = (
        accommodation_total
        + food_total
        + transport_total
        + activities_total
        + other_total
    )

    return {
        "total": total_budget,
        "currency": currency,
        "breakdown": {
            "accommodation": accommodation_total,
            "food": food_total,
            "transportation": transport_total,
            "activities": activities_total,
            "other": other_total,
        },
        "totalEstimated": total_estimated,
        "remaining": total_budget - total_estimated if total_budget > 0 else 0,
    }


def _style_to_food_tier(style: str) -> str:
    if style in ("relaxed", "moderate"):
        return "moderate"
    if style == "adventure":
        return "budget"
    if style == "active":
        return "moderate"
    return "moderate"
