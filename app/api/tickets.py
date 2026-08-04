from fastapi import APIRouter
from pydantic import BaseModel

from app.services.investigation_service import (
    get_open_tickets,
    get_history_tickets,
    get_history_ticket,
    get_ticket,
    close_open_ticket,
)

router = APIRouter()


@router.get("/tickets/open")
def open_tickets():

    return get_open_tickets()


@router.get("/tickets/history")
def history_tickets():

    return get_history_tickets()


@router.get("/tickets/history/{ticket_id}")
def history_ticket(ticket_id: int):

    return get_history_ticket(ticket_id)


class CloseTicketRequest(BaseModel):
    ticket_id: int
    actual_solution: str


@router.post("/tickets/close")
def close_ticket(request: CloseTicketRequest):

    close_open_ticket(
        ticket_id=request.ticket_id,
        actual_solution=request.actual_solution,
    )

    return {
        "message": "Ticket closed successfully."
    }


# KEEP THIS LAST
@router.get("/tickets/{ticket_id}")
def ticket(ticket_id: int):

    return get_ticket(ticket_id)