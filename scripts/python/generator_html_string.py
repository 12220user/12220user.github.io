import os
import sys
import json


config = {}


os.system( 'cd '+ os.path.abspath(os.path.dirname(__file__)))
try:
    with open("config.json") as f:
        config = json.loads(f.read())
except FileNotFoundError:    
    with open("config.json" , 'w') as f:
        f.write(json.dumps({'path':'../../data/'}))
        config = {'path':'../../data/'}

print('\nЗагрузка конфигурации прошла успешно. \nПуть рабочей папки : ' + config['path'] + '\n')

file = config['path']+ input("Выберите файл для трансформации : "+ config['path'])

data = ''
with open(file) as f:
    print('Чтение файла')
    data = f.read()

print('Трансформируем файл')

data = data.replace('"' , '\'')
data = data.replace('\'' , '\\\\\\\'')
data = data.replace('   ' , '')
data = data.replace('\n' , '')

print('Все прошло успешно, сохраняем файл.')

with open(file+'-transfrormed' , 'w') as f:
    f.write(data)
    print('Файт сохранен : ' + file+'-transfrormed')