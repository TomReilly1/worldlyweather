from crypt import methods
import json
from urllib import request
from flask import Flask, render_template


app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html')

@app.route("/api", methods=['GET'])
def api():
    print(request)
    return "This is API"

if __name__ == "__main__":
    app.run(debug=True)
