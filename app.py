from flask import Flask
from flask_assets import Environment, Bundle
from flask import render_template



app = Flask(__name__, static_url_path='/static')
assets = Environment(app)



css_main = Bundle('css/style.css', output='gen/main.css')

assets.register('css_main', css_main)


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/matiere')
def matiere():
    return render_template('matiere.html')

@app.route('/interro')
def interro():
    return render_template('interro.html')

@app.route('/cours')
def cours():
    return render_template('cours.html')

@app.route('/create')
def create():
    return render_template('create.html')



if __name__ == '__main__':
    app.run(debug=True)