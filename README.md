# MAPD726 Group 1

## Start Node.js backend
```
cd backend/node_server
npm install
npm start
```


## Start Python backend
```
cd backend/python_server
pip install -r requirements.txt
uvicorn main:app --reload
```

## Train the model from scratch (optional)
```
cd backend/python_server
pip install -r requirements.txt
python train.py
```

## Start frontend
```
cd frontend
npm install
npx expo start
```
Then press i for ios or a for android