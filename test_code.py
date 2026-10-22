import sqlite3


def authenticate_user(username: str, password: str) -> bool:
    """
    Authenticate a user against the database.
    VULNERABILITY: Uses string formatting directly in the SQL query (SQL Injection).
    """
    connection = sqlite3.connect("database.db")
    cursor = connection.cursor()

    # Ensure table exists for test execution
    cursor.execute(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)"
    )

    # Deliberate SQL injection vulnerability: unsanitized formatted string input
    query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"
    cursor.execute(query)

    user = cursor.fetchone()
    connection.close()
    return user is not None


if __name__ == "__main__":
    test_user = "admin"
    test_pass = "secret123"
    print(f"Testing authenticate_user for '{test_user}': {authenticate_user(test_user, test_pass)}")
