# MAPD726 Group 1

## Start Node.js backend (without docker)
```
cd backend/node_server
npm install
npm start
```

## Start Node.js backend with docker
```
cd backend/node_server
docker build -t node_api .
docker run -p 5001:5001 node_api
```

## Start Python backend
```
cd backend/python_server
pip install -r requirements.txt
uvicorn server:app --reload
```

## Train the model from scratch (optional)
```
cd backend/python_server
pip install -r requirements.txt
python preprocess.py
python train.py
```

## Start frontend (iOS)
```
cd frontend
npm install
npx expo prebuild --clean
cd ios
pod install
cd ..
npx expo run:ios
```

## Generate APK file for android (fast)
```
cd frontend
npm install
npx expo prebuild --clean
cd android
echo "sdk.dir=/Users/rickie/Library/Android/sdk" >> local.properties
```
replace /Users/rickie/Library/Android/sdk with your android sdk
```
./gradlew signingReport

```
copy the SHA1 signing and generate a new google-services.json file, download it and move it to ./frontend file

```
npx expo prebuild #do not add --clean tag



```


## Start frontend (Android)
```
cd frontend
npm install
npx expo prebuild --clean
cd android
echo "sdk.dir=/Users/rickie/Library/Android/sdk" >> local.properties
```
replace /Users/rickie/Library/Android/sdk with your android sdk
```
./gradlew signingReport

```
copy the SHA1 signing and generate a new google-services.json file

```
npx expo run:android
```

## Links
Datasets: https://www.kaggle.com/datasets/rkiattisak/traveler-trip-data?resource=download

## Development Environment:
Node.js v22.9.0
Expo: 6.3.12

# Emulator
iOS: 18.2

# Hardware info
MacOS: 15.3.1
MacBook Air 13 inch, 8GB ram, M2 processor
