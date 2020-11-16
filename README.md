Вместе с проектами заливал и их билды, чтобы можно было показать результат без лишних деплоев на сторонних серверах.

В качестве пакетного менеджера использовал npm. Если будете качать проекты на локал, то он понадобиться. После скачки из папки любого проекта просто

npm run start

все настроено.

Для запуска без установок пакетов

npm run restart


Теперь по каждому из заданий

******************************
task_1
----------
Просмотр результата: https://vladimirleontev281.github.io/testTask_res/task_1/dist

Коментарии.

  Мне кажется, что правильнее, когда класс-модификатор присваиваться основному блоку,
  а через него (класс-модификатор блока) активируются css-свойства внутренних элементов.

  Но ТЗ требует присваивать "red" на сам input.
  Для того, чтобы не отойти от ТЗ дополнительно к своему видению реализации 
  добавил буквальное исполнение (строки помеченные (*)).
  Но если буквальность не так важна, то строки (*) стоит удалить 
  (как и блок .box__input.red в index.css).

  Немного разнообразил задачу. Надеюсь не будет воспринято как злостное нарушение ТЗ. :)
  А вообще, все что касается additional необязательно и это можно исключить из html, css и js
  без потери основной работоспособности (только если исключать, то везде :) )

Сборка просто для отработки старта статического сервера, если будете качать на локал. Для CSS добавил стандартный набор (автопрефиксер, склейка, минификация) просто чтоб было :). Остальное просто копируется в билд-директорию.

******************************
task_2
----------
Просмотр результата: https://vladimirleontev281.github.io/testTask_res/task_2/dist/filter?size=M&color=1&color=2&manufacturer=aaa&manufacturer=ddd

Параметры можно менять местами, исключать (вплоть до url без параметров), вводить непредусмотренные параметры и непредусмотренные значения. Логика следующая:

- непредусмотренные параметры игнорируются;
- непредусмотренные значения предусмотренных параметров игнорируется;
- в случае отсутсятвия в url-параметрах валидных значений параметров или параметров в принципе, то логика следующая:
    - радиобатн либо пуст, либо дефолтное значение,
    - чекбоксы неактивны,
    - мультиселлект либо значение "не выбрано", либо дефолтное значение,
    - чекбокс "распродажа" неактивен.

"Либо" обусловлено флагом DEFAULT=true/false (константа в начале кода). В случае DEFAULT=true при отсутствии/невалидности значений в url-параметрах радиобатону и мультиселекту присваиваются дефолтные значения. Эти дефолтные значения находятся в source/default.json

Попробовал офрмить проект по БЭМ, уж не знаю получилось ли :). Соответственно был необходим сборщик для склейки. Для HTML склейка модулей. Для CSS стандартный набор - склейка, автопрефиксер, минификация. Для js над кроссбраузеностью не заморачивался, подумал что для такого маленького проекта тянуть babel и webpack будет слишком. Просто копируется.

******************************
task_3
----------
Просмотр результата: https://vladimirleontev281.github.io/testTask_res/task_3/dist/

Сделал эмуляцию задержки ответа сервера. Время задержки в константах в начале кода, там интуитивно понятно.

Немного разнообразил задачу. Добавил preloader, который работает от нажатия кнопки до получения ответов от псевдосервера, и прописал простенький оповещатель дополнительно к выводу в консоль.

Сборка: HTML просто копируется, JS - склейка (хоть там и один файл), на CSS стандартный набор - склейка, автопрефиксер, минификация. 

Анимация preloader-а позаимствована отсюда: https://nisnom.com/veb-razrabotki/tappy-loader-prikolnaya-css-animatsiya-v-vide-stuchashhih-paltsev-po-stolu/#more-3062

******************************
task_4
----------
Просмотр результата: 


******************************
task_5
----------
Просмотр результата: 


******************************
task_6
----------
Просмотр результата: 


******************************