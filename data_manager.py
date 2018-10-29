import database_common

@database_common.connection_handler
def registration(cursor, username, password):
    cursor.execute('''
                    INSERT INTO users (user_name, password)
                    VALUES (%(user_name)s, %(password)s);
                    ''', {'user_name':username, 'password':password})


@database_common.connection_handler
def check_username(cursor, username):
    cursor.execute('''
                    SELECT user_name FROM users
                    WHERE user_name=%(user_name)s
                    ''', {'user_name':username})
    existing_user = cursor.fetchone()
    if existing_user:
        return True
    else:
        return False

@database_common.connection_handler
def get_password_by_username(cursor, username):
    cursor.execute('''
                    SELECT password FROM users
                    WHERE user_name=%(user_name)s
                    ''', {'user_name':username})
    return cursor.fetchone()

@database_common.connection_handler
def vote_planet(cursor, username, planetname, planetid):
    cursor.execute('''
                    SELECT id FROM users
                    WHERE user_name = %(username)s;
                    ''', {'username':username})
    userid = cursor.fetchone()
    cursor.execute('''
                    INSERT INTO planet_votes (planet_name, user_id, planet_id)
                    VALUES (%(planet_name)s, %(user_id)s, %(planet_id)s);
                    ''', {'planet_name':planetname, 'user_id':userid['id'],
                          'planet_id':planetid})
