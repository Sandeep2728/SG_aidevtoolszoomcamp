## Django TODO App - Quick Start

This folder contains a minimal Django TODO application.

Steps to run locally (PowerShell):

```powershell
# create virtual env
python -m venv .venv
; .\.venv\Scripts\Activate.ps1

# install requirements
pip install -r requirements.txt

# apply migrations
python manage.py migrate

# create optional superuser (for admin)
python manage.py createsuperuser

# run dev server
python manage.py runserver

# open http://127.0.0.1:8000/ in your browser
```
#
Notes:
- Uses SQLite by default; no DB setup required.
- If you want the project inside a different folder, move files accordingly.
