from flask import Flask
from flask_assets import Environment, Bundle
from flask import render_template


app = Flask(__name__, static_url_path='/static')
assets = Environment(app)

css_main = Bundle('css/style.css', output='gen/main.css')
css_texte = Bundle('css/style_texte.css', output='gen/main.css')

assets.register('css_main', css_main)
assets.register('css_texte', css_texte)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/oral')
def oral():
    return render_template('oral.html')

@app.route('/ecrit')
def ecrit():
    return render_template('ecrit.html')

@app.route('/oral/analyses')
def oral_analyses():
    return render_template('analyses.html')

@app.route('/oral/analyses/texte')
def oral_analyses_texte():
    return render_template('texte.html')

@app.route('/oral/oeuvre')
def oral_oeuvre():
    return render_template('oral.html')

@app.route('/oral/grammaire')
def oral_grammaire():
    return render_template('oral.html')

if __name__ == '__main__':
    app.run(debug=True)
