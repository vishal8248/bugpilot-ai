import os

import psycopg2
from dotenv import load_dotenv

load_dotenv()


DATABASE_URL = os.getenv("DATABASE_URL")


def get_connection():
    return psycopg2.connect(DATABASE_URL)


def create_database():

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS investigations (

        id SERIAL PRIMARY KEY,

        title TEXT,

        description TEXT,

        environment TEXT,

        stack_trace TEXT,

        issue_type TEXT,

        severity TEXT,

        assigned_team TEXT,

        root_cause TEXT,

        investigation_report TEXT,

        actual_solution TEXT,

        status TEXT DEFAULT 'Open',

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    connection.commit()

    cursor.close()
    connection.close()


def save_investigation(result):

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
    INSERT INTO investigations (

        title,
        description,
        environment,
        stack_trace,
        issue_type,
        severity,
        assigned_team,
        root_cause,
        investigation_report

    )
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (

        result["title"],
        result["description"],
        result["environment"],
        result["stack_trace"],
        result["issue_type"],
        result["severity"],
        result["assigned_team"],
        result["root_cause"],
        result["investigation_report"]

    ))

    connection.commit()

    cursor.close()
    connection.close()


def get_all_investigations():

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            id,
            title,
            severity,
            assigned_team,
            environment,
            created_at
        FROM investigations
        WHERE status = 'Open'
        ORDER BY id DESC
    """)

    rows = cursor.fetchall()

    cursor.close()
    connection.close()

    return rows


def get_closed_investigations():

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            id,
            title,
            severity,
            assigned_team,
            environment,
            created_at
        FROM investigations
        WHERE status = 'Closed'
        ORDER BY id DESC
    """)

    rows = cursor.fetchall()

    cursor.close()
    connection.close()

    return rows


def get_investigation_by_id(ticket_id):

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT *
        FROM investigations
        WHERE id = %s
    """, (ticket_id,))

    row = cursor.fetchone()

    cursor.close()
    connection.close()

    return row


def close_ticket(ticket_id, actual_solution):

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        UPDATE investigations
        SET
            actual_solution = %s,
            status = 'Closed'
        WHERE id = %s
    """, (

        actual_solution,
        ticket_id

    ))

    connection.commit()

    cursor.close()
    connection.close()


def get_closed_tickets_for_rag():

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            id,
            title,
            description,
            environment,
            stack_trace,
            issue_type,
            severity,
            assigned_team,
            root_cause,
            investigation_report,
            actual_solution
        FROM investigations
        WHERE status = 'Closed'
        AND actual_solution IS NOT NULL
    """)

    rows = cursor.fetchall()

    cursor.close()
    connection.close()

    return rows


def get_history_ticket(ticket_id):

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        SELECT *
        FROM investigations
        WHERE id = %s
          AND status = 'Closed'
    """, (ticket_id,))

    row = cursor.fetchone()

    cursor.close()
    connection.close()

    return rowy