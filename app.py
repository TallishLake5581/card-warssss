import os
from flask import Flask, request, jsonify
import time

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return "200 App server running", 200

@app.route('/static/version.txt', methods=['GET'])
def version_check():
    return "1.0.0", 200

@app.route('/account/preAuth/', methods=['GET', 'POST'])
def pre_auth():
    print("[+] تم طلب المصادقة (preAuth)")
    return jsonify({
        "status": "OK",
        "userId": "marwan_admin",
        "sessionId": "session_123456",
        "isBanned": False
    }), 200

@app.route('/time/', methods=['GET', 'POST'])
def server_time():
    return jsonify({
        "serverTime": int(time.time())
    }), 200

@app.route('/<path:subpath>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def catch_all(subpath):
    print(f"[طلب جديد] مسار: /{subpath}")
    return jsonify({"status": "success", "message": "OK"}), 200

if __name__ == '__main__':
    # قراءة المنفذ الذي يحدده Railway تلقائياً
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)
