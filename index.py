# All code was written by raedhashmi

from flask import Flask, send_file
import webview
import signal
import sys
import time

app = Flask(__name__)

@app.route('/')
def index():
    return send_file('templates/index.html')

@app.route('/resources/<resource>')
def send_resource(resource):
    return send_file(f'templates/{resource}')

def signal_handler(sig, frame):
    print('\033[31mClosed Application! \033[37m')
    window.destroy()
    sys.exit(0)

if __name__ == '__main__':
    window = webview.create_window('Mac Simulation', app, fullscreen=True, frameless=True)
    print('\033[32mStarted Application. Press CTRL+C to exit anytime!')
    signal.signal(signal.SIGINT, signal_handler)
    
    # Start the webview in a separate thread
    webview.start()

    # Main loop to keep the application running and check for CTRL+C
    try:
        while True:
            time.sleep(0.01)
    except KeyboardInterrupt:
        signal_handler(signal.SIGINT, None)