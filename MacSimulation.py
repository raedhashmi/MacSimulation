from flask import Flask, send_file, jsonify
import webview
import time

app = Flask(__name__)

@app.route('/')
def index():
    return send_file('templates/index.html')

@app.route('/resources/<resource>')
def send_resource(resource):
    return send_file(f'templates/{resource}')

@app.route('/closeApp', methods=['POST'])
def close_app():
    window.destroy()
    print('\033[31mClosed application!\033[37m')
    return jsonify({'status': 'success'})

if __name__ == '__main__':
    window = webview.create_window('Mac Simulation', app, fullscreen=True, frameless=True, http_port=3000)
    print('\033[32mApplication Started. Press CTRL+Q in application to exit at any time!\033[0m')
    time.sleep(2)
    print('\033[2mApplication accessible at http://localhost:3000\033[0m')
    webview.start(http_port=3000)