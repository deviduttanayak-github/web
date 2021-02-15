# Screen Sharing Web Application over a LAN (v1.0)

---

Libraries used in <b>python</b> to get a base64 encoded image.
```
opencv
pyautogui 
numpy
PIL 
```
Libraries used in <b>node js</b> to transmit the base64 string.
```
socket.io
express
cors
```

TCP socket helped to transport the encoded image from python to node js.  

<b>How to run</b>
- first run the python script 
```
python img_gen.py
``` 
- start your node server
```
node index.js
```
- Find your IP address in that LAN (wifi/hotspot/etc.) use that IP address and server port to ping from another device connected in same network.  
<i>
Get IP by "ipconfig" in windows and "ifconfig" in any Linux distro. Use the IP v4 for WiFi LAN or WLAN </i>