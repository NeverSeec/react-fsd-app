Profiler с memo TaskCard
![profiler.png](profiler_memo.png)

Profiler БЕЗ TaskCard
![profiler_memo.png](profiler_memo.png)

Вывод:

1. Использование React.memo для TaskCard дало улучшение производительности
   До мемо: 6ms
   После мемо: 2.5ms
2. Компонент FilterButton - самый легкий, т.к. меняет только состояние active и быстро ререндерится 



