# moneyhack-backend

## Команда для запуска Geth

```
geth --dev --rpccorsdomain "*" --rpc --networkid 8545 --minerthreads "1"  --rpcapi "admin,debug,miner,shh,txpool,personal,eth,net,web3" console
```

## Команда для запуска Mist

Windows. Перейти в папку с программой и выполнить:
```
Mist.exe --rpc http://localhost:8545 --swarmurl "null"
```

MacOS
```
/Applications/Mist.app/Contents/MacOS/Mist --rpc http://localhost:8545 --swarmurl "null"
```

Linux
```
mist --rpc http://localhost:8545 --swarmurl "null"
```
## IDE для Solidity

https://remix.ethereum.org/


## Конфигурация Git

```
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```

## Коммит файлов проекта

```
git add . // добавить все файлы проекта в будущий коммит
git commit -m "message"
```

## Отправка проекта в репозиторий на GitHub
```
git remote add origin git@github.com:divideby/moneyhack-backend.git
git push -u origin master
```

## Команды для создания и управления ветками
```
git branch // посмотреть все ветки проекта
git branch dt-contract-integration
git checkout dt-contract-integration
```

## Установка Express

```
npm install express --save
```
