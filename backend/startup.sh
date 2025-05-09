#!/bin/bash
gunicorn <nombre_del_proyecto>.wsgi --bind=0.0.0.0 --timeout 600
