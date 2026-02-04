import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

PORT = 8080
DIRECTORY = r"c:\Users\DELL\Desktop\mtc connect app"

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        return super().end_headers()

    def log_message(self, format, *args):
        print(f"[{self.log_date_time_string()}] {format % args}")

def run_server():
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        url = f"http://localhost:{PORT}/PROJECT_VIEWER.html"
        print(f"\n{'='*60}")
        print(f"🚀 MTC Connect App Project Viewer")
        print(f"{'='*60}")
        print(f"\n✅ Server running at: {url}")
        print(f"\n📂 Project directory: {DIRECTORY}")
        print(f"\n💡 Press Ctrl+C to stop the server\n")
        
        try:
            webbrowser.open(url)
        except:
            print(f"⚠️  Could not open browser. Open manually: {url}\n")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n✋ Server stopped.")

if __name__ == "__main__":
    run_server()
