# -*- coding: utf-8 -*-
"""
Created on Fri Feb 12 10:36:06 2021

@author: devid
"""

import pyautogui 
import cv2
import numpy as np
import os
import base64
from PIL import Image
import io
import time
import socket

HOST = '127.0.0.1'  # Standard loopback interface address (localhost)
PORT = 9898        # Port to listen on (non-privileged ports are > 1023)

# img should be numpy array
def encode2b64str(img):
    img_pil = Image.fromarray(img)
    rawBytes = io.BytesIO()
    img_pil.save(rawBytes, "PNG")
    rawBytes.seek(0)
    b64_encoded_bytes = base64.b64encode(rawBytes.read())
    b64_encoded_str = b64_encoded_bytes.decode("utf-8")
    return b64_encoded_str

# cfac = compression factor
def capture_screen(cfac = 1):
    image = pyautogui.screenshot() 
    image_cv = np.array(image)
    # image_cv = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
    if cfac < 0.9 and cfac > 0:
        h, w , _ = image_cv.shape
        compressed = cv2.resize(image_cv, (int(w*cfac), int(h*cfac) ))
        # cv2.imshow("compressed", compressed)
        # cv2.waitKey(10)
        return compressed
    else:
        return image_cv 

# return a header of size 10 char
def header(siz):
    hs = 10
    d = str(siz)
    if len(d) < (hs-1):
        for i in range(0, (hs-len(d) - 1)):
            d = "0" + d
    else: raise("SIZE of b64 stream is greater than 7 digits")
    return "#" + d

def init():
    pass

# ----- main -------

done = False
# idea of storing in file was dropped due to read problem as well as high latency.

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    print("-- Listening --")
    conn, addr = s.accept()
    print("-- accepted --")
    with conn:
        print('Connected by', addr)
        while True:
            img = capture_screen()
            b64str = encode2b64str(img)
            data = conn.recv(1024)
            # print("R : ", data)
            if not data:
                break
            # print("sending data : ", len(b64str))
            head = header(len(b64str))
            conn.sendall(bytes((head + b64str), "utf-8"))
            # conn.sendall(b'Hello testing completed')



