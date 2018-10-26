from flask import Flask, render_template, url_for, request, redirect, session
import data_manager, util, os

app = Flask(__name__)


@app.route('/')
def index():
    if 'user_name' in session:
        username = session['user_name']
    else:
        username = None
    return render_template('index.html', username=username)


@app.route('/registration', methods=['GET'])
def registration():
    return render_template('log-reg.html')


@app.route('/registration', methods=['POST'])
def save_registartion():
    password = request.form['password']
    username = request.form['username']
    not_allowed_username = ['', 'admin', 'adminidtartor']
    if username in not_allowed_username or password == '':
        message = "Invalid username or password!"
        error = True
        return render_template('log-reg.html', error=error,
                               message=message)
    else:
        error = True
        if not data_manager.check_username(username):
            heshed_password = util.hash_password(password)
            data_manager.registration(username, heshed_password)
            return redirect(url_for('index', error=error))
        else:
            error = True
            message = "Username already in use!"
            return render_template('log-reg.html', error=error, message=message)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('log-reg.html', login=True)
    elif request.method == 'POST':
        session.pop('user_name', None)
        username = request.form['username']
        password = request.form['password']
        if username == '' or password == '':
            message = 'Invalid username or password'
            return render_template('/log-reg.html', login=True,
                                   error=True, message=message)
        hash_password = data_manager.get_password_by_username(username)
        logged_in = util.verify_password(password, hash_password['password'])
        if logged_in:
            session['user_name'] = username
            return redirect(url_for('index'))
        else:
            message = 'Invalid username or password'
            return render_template('/log-reg.html', login=True,
                                   error=True, message=message)


@app.route('/vote', methods=['POST'])
def vote_to_planet():
    planetname = request.form['planetname']
    data_manager.vote_planet(session['user_name'], planetname)
    return redirect(url_for('index'))


@app.route('/logout')
def logout():
    session.pop('user_name', None)
    return redirect(url_for('index'))



app.secret_key = os.urandom(24)

if __name__ == '__main__':
    app.run(debug=True)
